
document.getElementById("mindeltabbutton").style.display = "none";

let mindellistG = [];
let activTargetlist = [];
function mindelControll(){
    let userair = userairtable
    let body = airtablebodylistAND({userairtable: userair});
    Getlistairtable("apphvNDlBgA5T08CM","tbl5mpWgP9jlHKpa7",body,"mindelControllResponse");

    loadTargetdateSelector();

}

function mindelControllResponse(data){
let returdataclean = rawdatacleaner(data);

    if(returdataclean[0]?.projectairtable){
        //har tilgang på et prosjekt
        let proid = returdataclean[0].projectairtable[0];
        GETairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",proid,"mindelProresponse")

        document.getElementById("mindeltabbutton").style.display = "inline-block";
    }
    
}

function mindelProresponse(data){

    if(data.fields.timersjson.length>0){
    //da er det føringer lag liste
    let targetlistvalue = data.fields.timersjson;
    mindellistG = convertJsonStringsToObjects(targetlistvalue);
    makeTargetValueList(mindellistG);
    }

}

document.getElementById("mindeldateselector").addEventListener("change", () => {
    makeTargetValueList(mindellistG); // Kjør funksjonen med dataene når perioden endres
});

document.getElementById("mindelsearchfield").addEventListener("input", () => {
    makeTargetValueList(mindellistG); // Oppdater listen ved endring i søkefeltet
});

function makeTargetValueList(data) {
    console.log(data);

    // Hent valgt dato-intervall fra selectoren
    const dateSelector = document.getElementById("mindeldateselector");
    const dateRange = dateSelector.value.split(","); 
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    // Hent søkeord fra søkefeltet
    const searchField = document.getElementById("mindelsearchfield");
    const searchQuery = searchField.value.trim().toLowerCase();

    // Filtrer data basert på dato-intervall
    let filteredData = data.filter(row => {
        let dateObj = new Date(row.date);
        return dateObj >= startDate && dateObj <= endDate;
    });

    // Filtrer videre basert på søkeord (navn eller verdi)
    filteredData = filteredData.filter(row => {
        const name = (row.name || "").toLowerCase();
        const value = row.value ? row.value.toString() : "";
        return name.includes(searchQuery) || value.includes(searchQuery);
    });

    
    // Sorter data basert på dato i synkende rekkefølge (nyeste først)
    filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const list = document.getElementById("mindellist");
    const elementLibrary = document.getElementById("mindelelementlibrary");
    const nodeElement = elementLibrary.querySelector('.mindelrow');

    // Tømmer listen før oppdatering
    list.replaceChildren();

    // Oppdaterer antall elementer i listen
    document.getElementById("countermindel").textContent = `${filteredData.length} stk.`;

    let gValue = 0;
    activTargetlist = filteredData;

    filteredData.forEach((row, index) => {
        const mindelElement = nodeElement.cloneNode(true);
    
        // Annenhver rad får klassen "odd"
        if (index % 2 === 0) {
            mindelElement.classList.add('odd');
        }
    
        // Formater og sett dato
        let date = mindelElement.querySelector('.date');
        let dateObj = new Date(row.date);
        date.textContent = isNaN(dateObj) ? "-" : dateObj.toLocaleDateString('no-NO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace('.', '');
    
        // Sett navn
        let name = mindelElement.querySelector('.name');
        name.textContent = row.name || "-";
    
        // Sett kommentar
        let komment = mindelElement.querySelector('.komment');
        komment.textContent = row.komment || "-";
    
        // Formater og sett verdi
        let value = mindelElement.querySelector('.value');
        let numericValue = Number(row.value) || 0;
        value.textContent = numericValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 });
    
        // Legg til i totalverdi
        gValue += numericValue;
    
        // Sletteknapp med bekreftelsesdialog
        const deletebutton = mindelElement.querySelector('.deletebutton');
        if (deletebutton) {
            deletebutton.addEventListener("click", () => {
                let confirmDelete = confirm("Vil du slette denne føringen?");
                if (confirmDelete) {
                   // mindelElement.remove(); // Fjerner elementet fra DOM
                   DELETEairtable("baseId","tableId",row.airtable,"responseDeleteMindelRow")
                    console.log("Element slettet:", row); // Kan erstattes med en faktisk slettefunksjon
                }
            });
        }
    
        // Legg elementet til i listen
        list.appendChild(mindelElement);
    });
    

    // Oppdater totalverdi
    document.getElementById("valuemindel").textContent = gValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 });

    console.log(`Totalverdi: ${gValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 })}`);
}
function responseDeleteMindelRow(data){
console.log(data);


}
function convertJsonStringsToObjects(jsonStrings) {
    return jsonStrings.map((jsonString, index) => {
        try {
           
           // Parse hoved JSON-streng til et objekt
           const data = JSON.parse(jsonString);
          
            return data;
        } catch (error) {
            console.error(`Feil ved parsing av JSON-streng på indeks ${index}:`, jsonString, error);
            return null; // Returner null hvis parsing feiler
        }
    });
}

function loadTargetdateSelector(){
    //hente datoer for 3 mnd tilbake i tid
    let startvalue = "2010-01-01,"+getTodayInISOFormat();
    var optionfromstart = {text:"Fra start",value:startvalue};
    var options = getMonthDates(3);
    options.push(optionfromstart);
    loadselector(document.getElementById("mindeldateselector"),options);
}


document.getElementById("xlstargetexport").addEventListener("click", () => {
    // Hent navnet på valgt dato fra selectoren
    const dateSelector = document.getElementById("mindeldateselector");
    const dateRangeName = dateSelector.options[dateSelector.selectedIndex].text;
   
    // Transformer data ved å endre nøklene, rekkefølgen og formatere datoen
    const exportData = activTargetlist.map(row => {
        // Formater datoen
        let dateObj = new Date(row.date);
        let formattedDate = isNaN(dateObj)
            ? "-"
            : dateObj.toLocaleDateString('no-NO', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

        // Returner det transformerte objektet
        return {
            Dato: formattedDate,
            Navn: row.name,
            Kommentar: row.komment,
            Beløp: row.value
        };
    });

    // Kall funksjonen for å eksportere dataene
    exportXLS(exportData, `Mindel-eksport-${dateRangeName}`);
});



