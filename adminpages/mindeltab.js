
document.getElementById("mindeltabbutton").style.display = "none";

let mindellistG = [];
let activTargetlist = [];
var proIdg = "";
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
        proIdg = proid;
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

document.getElementById("addnewregistration").addEventListener("click", function() {
    const wrapper = document.getElementById("newregistrationwrapper");

    if (wrapper.style.display === "none" || wrapper.style.display === "") {
        wrapper.style.display = "block"; // Viser elementet
    } else {
        wrapper.style.display = "none"; // Skjuler elementet
    }
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
                   
                    // Slett fra Airtable
                    DELETEairtable("apphvNDlBgA5T08CM", "tbl7xtS00BVviO8kk", row.airtable, "responseDeleteMindelRow");
    
                    // Finn og fjern objektet fra mindellistG basert på airtable-nøkkel
                    const indexToRemove = mindellistG.findIndex(item => item.airtable === row.airtable);
                    if (indexToRemove !== -1) {
                        mindellistG.splice(indexToRemove, 1);
                        console.log("Element fjernet fra mindellistG:", row);
                    }
                    //bygg listen på nytt
                    makeTargetValueList(mindellistG);
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

const searchInput = document.getElementById("mindelnewuserSearch");
const resultContainer = document.createElement("div");
resultContainer.classList.add("search-results");
searchInput.parentNode.appendChild(resultContainer); // Legger dropdown under inputfeltet

const hiddenAirtableInput = document.getElementById("mindelselectedUserAirtable"); // Skjult felt for Airtable ID
const hiddenMemberInput = document.getElementById("mindelselectedMemberid");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase().trim();
    resultContainer.innerHTML = ""; // Tøm søkeresultatene

    if (searchTerm.length === 0) {
        resultContainer.style.display = "none"; // Skjul hvis ingen input
        return;
    }

    // Filtrer treff basert på `name`
    const results = totalusers.filter(user =>
        user.name.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        resultContainer.innerHTML = "<p class='no-result'>Ingen treff</p>";
        resultContainer.style.display = "block";
        return;
    }

    resultContainer.style.display = "block";

    // Vis søkeresultatene som klikkbare lenker
    results.forEach(user => {
        const userItem = document.createElement("a");
        userItem.classList.add("search-item");
        userItem.textContent = user.name;
        userItem.href = "#";
        userItem.addEventListener("click", function (e) {
            e.preventDefault();
            searchInput.value = user.name; // Sett valgt navn i input-feltet
            hiddenAirtableInput.value = user.airtable; // Lagre Airtable ID i skjult inputfelt
            hiddenMemberInput.value = user.memberid;
            resultContainer.innerHTML = ""; // Skjul søkeresultatene
            resultContainer.style.display = "none";
        });
        resultContainer.appendChild(userItem);
    });
});

// Skjul søkeresultatene og tøm inputfeltet hvis ingen treff velges
document.addEventListener("click", function (e) {
    if (!searchInput.contains(e.target) && !resultContainer.contains(e.target)) {
        resultContainer.innerHTML = "";
        resultContainer.style.display = "none"; // Skjul dropdown
    }
});



document.getElementById("savemindelbutton").addEventListener("click", function (event) {
    event.preventDefault(); // Hindrer standard linkadferd

    // Hent verdier fra inputfeltene
    const dateValue = document.getElementById("mindelnewdateinput").value;
    const userSearchValue = document.getElementById("mindelnewuserSearch").value;
    const airtableValue = document.getElementById("mindelselectedUserAirtable").value;
    const memberInputValue = document.getElementById("mindelselectedMemberid").value;
    const commentValue = document.getElementById("mindelkomment").value;
    const amountValue = document.getElementById("mindelnewvalue").value;

    // Liste over manglende felter
    let missingFields = [];

    if (!dateValue) missingFields.push("Dato");
    if (!userSearchValue || !airtableValue) missingFields.push("Bruker");
    if (!commentValue) missingFields.push("Kommentar");
    if (!amountValue || isNaN(amountValue) || Number(amountValue) <= 0) missingFields.push("Beløp");

    // Sjekk om det mangler data
    if (missingFields.length > 0) {
        alert("Følgende felt mangler:\n- " + missingFields.join("\n- "));
        return;
    }

    // Hvis alle feltene er fylt ut, lagre data
    saveRegistration({
        date: dateValue,
        name: userSearchValue,
        userairtable: airtableValue,
        memberid:memberInputValue,
        komment: commentValue,
        value: Number(amountValue)
    });


});

// Funksjon for å lagre registrering
function saveRegistration(data) {
    if (!data || typeof data !== "object") {
        console.error("Ugyldig dataformat!");
        alert("Noe gikk galt, prøv igjen.");
        return;
    }

    // Sikre at data er riktig formatert
    const formattedEntry = {
        date: data.date || new Date().toISOString().split("T")[0], // Standard til dagens dato (YYYY-MM-DD)
        komment: data.komment || "Ingen kommentar",
        value: data.value ? Number(data.value) : 0, // Konverter til tall
        user: data.userairtable,
        name: data.name,
        memberid:data.memberid,
        project: proIdg
    };

    // Lagre på server
   saveToServerRegistration(formattedEntry);

    // Nullstill inputfeltene
    resetFields();

}

function saveToServerRegistration(data){

    let body = {
        dato:data.date,
        kommentar:data.komment,
        value:String(data.value),
        project:[data.project],
        prosjekt:data.project,
        aklient:[klientairtable],
        klient:klientid,
        name:data.name,
        memberid:data.memberid,
        user:[data.user]
    };

    POSTairtable("apphvNDlBgA5T08CM","tbl7xtS00BVviO8kk",JSON.stringify(body),"responseNewRawMindel");

    //hvis animasjon
    document.getElementById("postrowanimation").style.display = "block";
    
   
}
function responseNewRawMindel(data){
    console.log(data);
    if(data.fields?.json){
    // Legg til i mindellistG
    mindellistG.push(JSON.parse(data.fields.json));
    makeTargetValueList(mindellistG);
    }    
    document.getElementById("postrowanimation").style.display = "none";
}

function resetFields() {
    document.getElementById("mindelnewdateinput").value = ""; // Nullstill dato
    document.getElementById("mindelnewuserSearch").value = ""; // Nullstill bruker søk
    document.getElementById("mindelselectedUserAirtable").value = ""; // Nullstill skjult felt
    document.getElementById("mindelkomment").value = ""; // Nullstill kommentar
    document.getElementById("mindelnewvalue").value = ""; // Nullstill beløp
}

