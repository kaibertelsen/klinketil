

function runnNumberxlsFile(typefil){
    const runnnumberField = document.getElementById("runnumberfield");

    const result = rowsFromRunNr(runnnumberField.value,totaltimerows);
    if(result.array.length == 0){
        alert("Det er ikke noe data å eksportere!");
    }else{
    let filename = "Eksport-timeliste-"+runnnumberField.value+"-"+result.higestnr;

    if(typefil == "CSV"){
    let filename = "Eksport-timeliste-MyShare"+runnnumberField.value+"-"+result.higestnr;
     var saveddata = exportMyshare(result.array);
    //kjøre filen gjonnom en export property
    exportCSV(saveddata,filename);
    }else{
    let filename = "Eksport-timeliste-"+runnnumberField.value+"-"+result.higestnr;
    var saveddata = exportField(result.array);
    exportXLS(saveddata,filename);
    }
    //skriver inn nummeret på bruker
    let eksportdata = {
        exportfromnr: runnnumberField.value,
        exporttonr: result.higestnr,
        exportname:filename+".xlsx",
        exportdate:getTodayInISOFormat()
      };
    memberobject.updateMetaData(eksportdata)
    .then(function() {
      console.log("Metadata er oppdatert!");
    })
    .catch(function(error) {
      console.error("Feil ved oppdatering av metadata:", error);
    });

    localmetadata.exportfromnr = runnnumberField.value;
    localmetadata.exporttonr = result.higestnr;
    localmetadata.exportname = filename+".xlsx";
    localmetadata.exportdate = getTodayInISOFormat();


    let note = "Du har nå eksportert fra nummer "+localmetadata.exportfromnr+" til "+localmetadata.exporttonr+". Ny eksport vil da starte fra "+(Number(localmetadata.exporttonr)+1)+".";
        document.getElementById("exportnote").textContent = note;
        document.getElementById("runnumberfield").value = (Number(localmetadata.exporttonr)+1);
}
}

async function exportCSV(rows, name) {
    // Hent nøklene fra det første objektet for å bruke som headers
    const headers = Object.keys(rows[0]);

    // Lag CSV-dataen som en streng
    let csvContent = headers.join(',') + '\n'; // Legg til header-raden

    rows.forEach(row => {
        const rowData = headers.map(header => {
            let value = row[header];

            // Hvis verdien er NaN eller inneholder specialValue: "NaN", erstatt med tom string
            if (typeof value === 'object' && value?.specialValue === 'NaN') {
                value = '';
            }

            // Hvis verdien er NaN (ikke et tall), erstatt med tom string
            if (isNaN(value) && typeof value === 'number') {
                value = '';
            }

            // Hvis verdien er en tekst som inneholder komma, omslutt med anførselstegn
            if (typeof value === 'string' && value.includes(',')) {
                value = `"${value}"`;
            }

            return value;
        }).join(','); // Slå sammen radverdier med komma
        csvContent += rowData + '\n'; // Legg til rad i CSV-en
    });

    // Opprett en Blob med CSV-innholdet
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Lag nedlastingslenke
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Klinketil-" + name + ".csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function rowsFromRunNr(fromnr,data){
    fromnr = Number(fromnr);
    var rows = [];
    var higestnr = 0;
    for(var i = 0;i<data.length;i++){
        if(data[i].timenr >= fromnr){

            if(data[i]?.userexportid && data[i].userexportid !== "-" && data[i].userexportid !== ""){
                rows.push(data[i]);
                if(data[i].timenr>higestnr){
                    higestnr = data[i].timenr;
                }
            }  
        }
    }
    //sortere array etter Nr
    rows =  sortarrayrows("timenr",true,rows).array;
    return {array:rows,higestnr:higestnr};
}

function exportField(data){
   
    // Definer et mapping-objekt som knytter gamle nøkler til nye nøkler
    const keyMapping = {
        "lock": "Fakturert",
        "projectname": "Prosjekt",
        "airtable": "airtableId",
        "projectid": "projectId",
        "dato": "Dato",
        "name": "Navn",
        "kommentar": "Kommentar",
        "timeverdi": "Timer",
        "valuenumber": "Beløp",
        "approval": "Godkjent",
        "statusintern": "internalStatus",
        "userage":"Alder",
        "dob":"F.dato",
        "userexportid":"Person ID",
        "userkontonr":"Kontonr",
        "timenr":"Nr",
        "useremail":"E-post",
        "groupname":"Gruppe",
        "timeunitvalue":"Antall enheter"

    };
    
    // Spesifiser nøkler du vil fjerne fra objektene
    const keysToRemove = ["statusintern", "projectid","airtable"];
    
    // Definer ønsket rekkefølge for de nye nøklene
    const newOrder = findKeysforExportonKlient(data);
    
    // Omdøpe alle nøklene, fjerne spesifiserte nøkler, og endre rekkefølgen
    const reorderedData = data.map(item => {
        let newItem = {};
    
        // Iterer over alle nøklene i 'newOrder' for å følge ønsket rekkefølge
        newOrder.forEach(newKey => {
            // Finn den gamle nøkkelen som tilsvarer den nye nøkkelen
            const oldKey = Object.keys(keyMapping).find(key => keyMapping[key] === newKey);
    
            // Hvis den gamle nøkkelen finnes i objektet og ikke skal fjernes
            if (oldKey && item.hasOwnProperty(oldKey) && !keysToRemove.includes(oldKey)) {
                // Legg til det nye nøkkelnavnet og verdien i det nye objektet
                newItem[newKey] = item[oldKey];
            }
        });
    
        return newItem;
    });
    
    
    return reorderedData;
}

function findKeysforExportonKlient(data){

     let kjontrollnr = klientid.slice(-4);

    if(kjontrollnr == "69ea"){
    //os

    //dob skal inn i eksport
    mergeDobInTimeList(data,totalusers);

    return ["Nr","Dato","Navn","Kommentar", "Gruppe", "Prosjekt", "Timer","Antall enheter","Alder","F.dato","Kontonr","E-post", "Godkjent", "Fakturert", "Person ID"];
    }else if(kjontrollnr == "b7fc"){
    //BPS
    //dob skal inn i eksport
    mergeDobInTimeList(data,totalusers);

    return ["Nr","Dato","Navn","Kommentar","Prosjekt", "Timer","Antall enheter","Alder","F.dato", "Godkjent", "Fakturert", "E-post", "Person ID"];
    }else if(kjontrollnr == "cfbb"){
    //Måløy
    return ["Nr","Dato","Navn","Kommentar","Prosjekt", "Timer","Beløp","Alder", "Godkjent", "Fakturert", "E-post", "Person ID"];
    }else{
    //rest
    return ["Nr","Dato","Navn","Kommentar","Prosjekt", "Timer","Alder", "Godkjent", "Fakturert", "Person ID"];    
    }
}
function mergeDobInTimeList(timearray,userarray){
    for(var i = 0;i<timearray.length;i++){
        let user = userarray.find(u => u.airtable === timearray[i].userairtable);
        if(user){

            //gjøre om dato 1981-02-16T00:00:00.000Z til type 01.08 2024
            let dateObj = new Date(user.dob);
            let day = String(dateObj.getDate()).padStart(2, '0');
            let month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Måneder er null-indeksert
            let year = dateObj.getFullYear();
            timearray[i].dob = `${day}.${month}.${year}`||"";
        }else{
            timearray[i].dob = "";
        }
    }
}

async function exportXLS(rows, name) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(name);

    // Hent nøklene fra det første objektet for å bruke som headers
    const headers = Object.keys(rows[0]);

    // Legg til header-raden
    worksheet.addRow(headers);

    // Legg til alle dataene, erstatt NaN eller specialValue NaN med tom string
    rows.forEach(row => {
        const rowData = headers.map(header => {
            const value = row[header];

            // Hvis verdien er NaN eller inneholder specialValue: "NaN", erstatt med tom string
            if (typeof value === 'object' && value?.specialValue === 'NaN') {
                return '';
            }

            return isNaN(value) && typeof value === 'number' ? '' : value; 
        });
        worksheet.addRow(rowData);
    });

    // Style header-raden (rad 1)
    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true }; // Fet skrift
    headerRow.eachCell((cell) => {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'D3D3D3' }, // Lys grå bakgrunn
        };
    });

    // Juster kolonnebredder automatisk basert på innhold med maks bredde på 30 tegn og minimum som header-lengde
    worksheet.columns.forEach((column, colIndex) => {
        let maxLength = headers[colIndex].length; // Sett minimum bredde som lengden på header
        column.eachCell({ includeEmpty: true }, (cell) => {
            const cellLength = cell.value ? cell.value.toString().length : 10; // Sett en minimum bredde for tomme celler
            if (cellLength > maxLength) {
                maxLength = cellLength;
            }
        });
        column.width = Math.min(maxLength + 2, 30); // Legg til 2 ekstra tegn og sett maks bredde til 30 tegn
    });

    // Fryse første rad
    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    // Lagre filen
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "Klinketil-" + name + ".xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportMyshare(data){
   
    // Definer et mapping-objekt som knytter gamle nøkler til nye nøkler
    const keyMapping = {
        "lock": "Fakturert",
        "projectname": "Prosjekt",
        "airtable": "airtableId",
        "projectid": "projectId",
        "dato": "ClubTransactionDate",
        "name": "Name",
        "kommentar": "Description",
        "timeverdi": "Timer",
        "valuenumber": "valueNumber",
        "approval": "Godkjent",
        "statusintern": "internalStatus",
        "userage":"Age",
        "userexportid":"UserId",
        "userkontonr":"Kontonr",
        "timenr":"Nr",
        "useremail":"E-post",
        "groupname":"Gruppe"

    };
    
    // Spesifiser nøkler du vil fjerne fra objektene
    const keysToRemove = ["statusintern", "projectid","airtable","valuenumber"];
    
    // Definer ønsket rekkefølge for de nye nøklene
    //UserId	Age	Name	LastName	ClubId	ClubName ClubTransactionDate	Description
    const newOrder = ["Nr","UserId","Age","Name","ClubTransactionDate","Description","Timer"];
    
    // Omdøpe alle nøklene, fjerne spesifiserte nøkler, og endre rekkefølgen
    const reorderedData = data.map(item => {
        let newItem = {};
    
        // Iterer over alle nøklene i 'newOrder' for å følge ønsket rekkefølge
        newOrder.forEach(newKey => {
            // Finn den gamle nøkkelen som tilsvarer den nye nøkkelen
            const oldKey = Object.keys(keyMapping).find(key => keyMapping[key] === newKey);
    
            // Hvis den gamle nøkkelen finnes i objektet og ikke skal fjernes
            if (oldKey && item.hasOwnProperty(oldKey) && !keysToRemove.includes(oldKey)) {
                // Legg til det nye nøkkelnavnet og verdien i det nye objektet
                newItem[newKey] = item[oldKey];
            }
        });
    
        return newItem;
    });
    
    
    return calcMysharArray(reorderedData);
}
function calcMysharArray(dataArray) {
    return dataArray.map(item => {
        // Finne id og navn basert på klientid
        var Club = findClubbId();
        item.ClubId = Club.ClubId;  // Fast verdi for ClubId
        item.ClubName = Club.ClubName;  // Fast verdi for ClubName

        if(item.ClubId == "4023"){
            //BPS
            if (item.Age >= 18) {
                item.Amount = item.Timer * 150;
            } else {
                item.Amount = item.Timer * 100;
            }
        }else if(item.ClubId == "3983"){
           // Horten
            if (item.Age < 16) {
                item.Amount = item.Timer * 100; // U16 - 100kr
            } else if (item.Age >= 16 && item.Age < 18) {
                item.Amount = item.Timer * 150; // 16-18 - 150kr
            } else if (item.Age >= 18) {
                item.Amount = item.Timer * 200; // O18 - 200kr
            }
        }else{
            //standard
            if (item.Age >= 18) {
                item.Amount = item.Timer * 150;
            } else {
                item.Amount = item.Timer * 100;
            }
        }

        item.Amount = Number(parseFloat(item.Amount).toFixed(1));
        item.Timer = Number(parseFloat(item.Timer).toFixed(1));

        // Oppdater 'Description' ved å legge til 'Nr' først, deretter verdien fra 'Timer' og teksten "Timer"
        item.Description = `${item.Nr} ${item.Description} ${item.Timer} Timer`;

        // Fjern 'Timer'-feltet
        delete item.Timer;

        // Fjern 'Nr'-feltet
        delete item.Nr;

        // Del 'Name' i fornavn og etternavn (etternavnet er det siste ordet)
        const nameParts = item.Name.split(' ');

        if (nameParts.length > 1) {
            // Hvis det er flere enn ett navn, håndter fornavn og etternavn separat
            const firstNameAndMiddleNames = nameParts.slice(0, -1).join(' '); // Alt unntatt siste del
            const lastName = nameParts.slice(-1).join(''); // Siste del (etternavn)

            item.Name = firstNameAndMiddleNames;
            item.LastName = lastName;
        } else {
            // Hvis det bare er ett navn, behold det i 'Name' og sett 'LastName' til en tom streng
            item.LastName = '';
        }

        // Konverter datoformat fra "2024-10-03" til "03.10.2024"
        const [year, month, day] = item.ClubTransactionDate.split('-');
        item.ClubTransactionDate = `${day}.${month}.${year}`;

        



        // Returner et nytt objekt med nøklene i ønsket rekkefølge
        if(item.ClubId == "3983"){
            //hvis det er horten
        return {
            UserId: item.UserId,
            Age: item.Age,
            FirstName: item.Name,
            LastName: item.LastName,
            ClubId: item.ClubId,
            ClubName: item.ClubName,
            Amount: item.Amount,
            TransactionDate: item.ClubTransactionDate,
            Description: item.Description
        };
        }else{
        return {
            UserId: item.UserId,
            Age: item.Age,
            Name: item.Name,
            LastName: item.LastName,
            ClubId: item.ClubId,
            ClubName: item.ClubName,
            Amount: item.Amount,
            ClubTransactionDate: item.ClubTransactionDate,
            Description: item.Description
        };
    }
        



    });
}


function findClubbId(){
    let kjontrollnr = klientid.slice(-4);
    if(kjontrollnr == "69ea"){
    //os
    return {ClubName:"",ClubId:""};
    }else if(kjontrollnr == "b7fc"){
    //BPS
    return {ClubName:"BUK Bergen",ClubId:"4023"};
    }else if(kjontrollnr == "71bb"){
    //Horten
    return {ClubName:"BUK Horten",ClubId:"3983"};
    }else{
    //rest
    return {ClubName:"",ClubId:""};   
    }
}


