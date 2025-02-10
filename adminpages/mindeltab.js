
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

function makeTargetValueList(data){

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
