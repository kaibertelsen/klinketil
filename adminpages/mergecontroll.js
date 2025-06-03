if(userairtable == "recnhdhuJsiUYqFkK"){
    const button = document.getElementById("generateMergeButton");
    button.style.display = "inline-block";
    button.addEventListener("click", function() {
        getTestResponse()
        //generatePublickMergeLink();
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

    //etter 2 sekunder kjør getTestResponse()
    setTimeout(() => {
        getTestResponse();
    }, 2000);
}

// Test response
function getTestResponse(){

    let shareId = "recK0xxQwi20o4vOk"; // Eksempel shareId
    let shareKey = "78ddb096388a1fb6bf068e9e8e82dc9434692ccf4d15bb6c65c8b64af113b0ab200a0940c8e53f8eb3184bcaec69f92ba16cc894a9c829bf39df5cba214a96401897f2ffc4a9f595d5aa5776f486159b8cfd93178a4eb0bdacf7223624652f294fc305dd65afd963afa313764edb9444156a28e9ebb409be7dd8e4f3f32d76da25cdf09b4af37c3c64e77d61dcf03332da4e9db6e555b23595f8e232d14b091a8aa98ec929ddd6db3c33c2b27e37d91f7ba7288776b17d08dc2d75eeba73088e01d67abcd83895bd808c29e5d08404e7fa5e2fcd6e14ac8f23a1986bf7cbb7d9b05718e9649c1308d8662d99328a8fc82eb49a2f594d381842bd320ea47a4e03"; // Eksempel shareKey
    getRecordWithShareKey(shareId, shareKey);

}


async function getRecordWithShareKey(shareId,shareKey){

    let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?shareId=${shareId}&shareKey=${shareKey}`);
    
        if (!response.ok) {
           if(response.status == 401){
           alert("Linken har utløpt. \nKontakt Kundesenter for å få ny link.")
           }
        }else{
          let data = await response.json();
          responseKlinketil(data)
        }
  }

function responseKlinketil(data) {
 
   let dataArray = data.fields.jsontime;
   let dataToUse = [];
    for (let i = 0; i < dataArray.length; i++) {
       //parser data
         let item = JSON.parse(dataArray[i]);
         dataToUse.push(item);
    }
    console.log(dataToUse);

}