if(userairtable == "recnhdhuJsiUYqFkK"){
    const button = document.getElementById("generateMergeButton");
    button.style.display = "inline-block";
    button.addEventListener("click", function() {
        //getTestResponse()
        getRecordWithShareKey();
     });
}

function generatePublickMergeLink() {
    
    // Generer en sharelink
    let baseId = "apphvNDlBgA5T08CM";
    let tableId = "tblD6CoZLkVn3aw15";
    let rowId = "recUWbJ9xwFTC0Nvs";
    let text = "Tilkobling til Klinketil";

    // Beregn utløpsdatoen 6 måneder frem i tid
    let expirationdate = new Date();
    expirationdate.setMonth(expirationdate.getMonth() + 6);

    // Formatér datoen til "YYYY-MM-DD"
    let expirationdateFormatted = expirationdate.toISOString().split('T')[0];

    // Generer offentlig lenke
    generatePublicLink({ baseId, tableId, rowId, text, expirationdate: expirationdateFormatted },"responPostpublicLink");
}

function generatePublicLink(data,response) {
    // Sjekk om nødvendig data finnes
    if (!data.baseId || !data.tableId || !data.rowId || !data.text || !data.expirationdate) {
        console.error("Manglende data for å generere offentlig link.");
        return;
    }

    // Generer body for POST-forespørselen
    let body = {
        query: `baseId=${data.baseId}&tableId=${data.tableId}&rowId=${data.rowId}`,
        note: data.text,
        expirationDate: data.expirationdate
    };

    // Send POST-forespørsel
    POSTairtablepublicLink(JSON.stringify(body), response);
}

async function POSTairtablepublicLink(body,id) {
    let token = MemberStack.getToken();
     let response = await fetch(`https://expoapi-zeta.vercel.app/api/share?token=${token}`, {
      method: "POST",
      body: body,
      headers: {
   'Content-Type': 'application/json'
    }
    });
    
    if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
    }else{
      let data = await response.json();
          apireturn(data, id);
        //eldre variant
    }
  
}

function responPostpublicLink(data){
 
    // Sett href-attributtet til ønsket URL
    console.log(data);
    //send denne linken på mail via zapier

}

// Test response
function getTestResponse(){

    let shareId = ""; // Eksempel shareId
    let shareKey = ""; // Eksempel shareKey
    getRecordWithShareKey(shareId, shareKey);

}


async function getRecordWithShareKey(shareId, shareKey) {

shareId = "recFIOXuyxbyKDjA0"; // Standard shareId hvis ikke gitt
shareKey = "05569c20aad85f6bb965473b7b11683ebbc5c7e2e5c0ac33fc0f3b1ed971a04ebeb28160b2bc311d04f18b986b185e1ca6a13063fe94d4e61ded9f4e146a986eda969100c180e190cfd8033820d065a2ae23d4c2d968099129ada4da1b0a67cdb7869d2fc4b0583722df070b5934a19e4fabaeec8cf63f677565318ac1c91977f5078ff47a025ba8ce635050fcc76aec906b51aa8cd7109a204e0d1416b79820be32952a432a1ee1e9f3106c0b694b4f43e2cc6e63d2f6e3fd4cfbd470c9ed98b93adf924366ee32e5dd9b6fa57c796c224a5a66625ea328341e2b479e88cd1b47741c10d13bc933dfa744a71e396ce47cbabcd57677e8082829228841ed9a4e"; // Standard shareKey hvis ikke gitt


    try {
      const response = await fetch(`https://expoapi-zeta.vercel.app/api/row?shareId=${shareId}&shareKey=${shareKey}`);
  
      if (!response.ok) {
        if (response.status === 401) {
          alert("Linken har utløpt. \nKontakt Kundesenter for å få ny link.");
        } else {
          console.error(`Feil ved henting av data: ${response.status} ${response.statusText}`);
        }
        return;
      }
  
      const { fields } = await response.json();
      handleResponse(fields?.jsontime || []);
      
    } catch (error) {
      console.error("Nettverksfeil eller ugyldig svar:", error);
    }
  }
  
  function handleResponse(jsonTimeArray) {
    try {
      const parsedData = jsonTimeArray.map(item => JSON.parse(item));
      console.log(parsedData);
      // Her kan du bruke parsedData videre
    } catch (error) {
      console.error("Feil ved parsing av jsonTimeArray:", error);
    }
  }
  