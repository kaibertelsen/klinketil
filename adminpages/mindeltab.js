
document.getElementById("mindeltabbutton").style.display = "none";
document.getElementById("mindeltabcontent").style.display = "none";

function mindelControll(){
    let userair = userairtable
    let body = airtablebodylistAND({userairtable: userair});
    Getlistairtable("apphvNDlBgA5T08CM","tbl5mpWgP9jlHKpa7",body,"mindelControllResponse")
}

function mindelControllResponse(data){

    if(data.fields?.projectairtable){
        //har tilgang på et prosjekt
        let proid = data.fields.projectairtable[0];
        GETairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",proid,"mindelProresponse")

        document.getElementById("mindeltabbutton").style.display = "inline-block";
        document.getElementById("mindeltabcontent").style.display = "block";

    }
    
}

function mindelProresponse(data){

console.log(data);

}