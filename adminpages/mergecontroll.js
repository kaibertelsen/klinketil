if(userairtable == "recnhdhuJsiUYqFkK"){
    const button = document.getElementById("generateMergeButton");
    button.style.display = "inline-block";
    button.addEventListener("click", function() {

        generatePublickMergeLink();
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

async function getRecordWithShareKey(shareId,shareKey){

    let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?shareId=${shareId}&shareKey=${shareKey}`);
    
        if (!response.ok) {
           if(response.status == 401){
           alert("Linken har utløpt. \nKontakt Kundesenter for å få ny link.")
           }
        }else{
          let data = await response.json();
          console.log(data);
        }
  }

