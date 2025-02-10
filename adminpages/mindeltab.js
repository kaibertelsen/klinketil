
document.getElementById("mindeltabbutton").style.display = "none";
document.getElementById("mindeltabcontent").style.display = "none";

function mindelControll(){
    let userair = userairtable
    let body = airtablebodylistAND({userairtable: userair});
    Getlistairtable("apphvNDlBgA5T08CM","tbl5mpWgP9jlHKpa7",body,"mindelControllResponse")
}

function mindelControllResponse(data){
let returdataclean = rawdatacleaner(data);

    if(returdataclean[0]?.projectairtable){
        //har tilgang på et prosjekt
        let proid = returdataclean[0].projectairtable[0];
        GETairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",proid,"mindelProresponse")

        document.getElementById("mindeltabbutton").style.display = "inline-block";
        document.getElementById("mindeltabcontent").style.display = "block";
    }
    
}

function mindelProresponse(data){


    if(data.fields.timersjson.length>0){
    //da er det føringer lag liste
    let targetlistvalue = data.fields.timersjson;
    makeTargetValueList(convertJsonStringsToObjects(targetlistvalue));
    }

}

function makeTargetValueList(data) {
    console.log(data);
      // Sorter data basert på dato i stigende rekkefølge
      let filteredData = data.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB; // Sorter stigende
    });

    const list = document.getElementById("mindellist");
    const elementLibrary = document.getElementById("mindelelementlibrary");
    const nodeElement = elementLibrary.querySelector('.mindelrow');

    // Tømmer listen før oppdatering
    list.replaceChildren();

    // Oppdaterer antall elementer i listen
    document.getElementById("countermindel").textContent = `${filteredData.length} stk.`;

    let gValue = 0;

    filteredData.forEach((row, index) => {
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
        name.textContent = row.navn || "-";

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
