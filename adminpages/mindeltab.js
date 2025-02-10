
document.getElementById("mindeltabbutton").style.display = "none";

let mindellistG = [];
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

function makeTargetValueList(data) {
    console.log(data);

    // Hent valgt dato-intervall fra selectoren
    const dateSelector = document.getElementById("mindeldateselector");
    const dateRange = dateSelector.value.split(","); // F.eks. "2025-02-01,2025-02-28"
    const startDate = new Date(dateRange[0]);
    const endDate = new Date(dateRange[1]);

    // Filtrer data basert på dato-intervall
    let filteredData = data.filter(row => {
        let dateObj = new Date(row.date);
        return dateObj >= startDate && dateObj <= endDate;
    });

    // Sorter data basert på dato i stigende rekkefølge
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const list = document.getElementById("mindellist");
    const elementLibrary = document.getElementById("mindelelementlibrary");
    const nodeElement = elementLibrary.querySelector('.mindelrow');

    // Tømmer listen før oppdatering
    list.replaceChildren();

    // Oppdaterer antall elementer i listen
    document.getElementById("countermindel").textContent = `${filteredData.length} stk.`;

    let gValue = 0;

    filteredData.forEach((row) => {
        const mindelElement = nodeElement.cloneNode(true);

        // Formater og sett dato
        let date = mindelElement.querySelector('.date');
        let dateObj = new Date(row.date);
        date.textContent = isNaN(dateObj) ? "-" : dateObj.toLocaleDateString('no-NO', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace('.', ''); // Fjerner ekstra punktum i månedsformatet

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

        // Legg elementet til i listen
        list.appendChild(mindelElement);
    });

    // Oppdater totalverdi
    document.getElementById("valuemindel").textContent = gValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 });

    console.log(`Totalverdi: ${gValue.toLocaleString('no-NO', { style: 'currency', currency: 'NOK', minimumFractionDigits: 0 })}`);
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
