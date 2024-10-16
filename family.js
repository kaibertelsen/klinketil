document.addEventListener('DOMContentLoaded', function() {
    // Funksjonen som skal kjøre etter at siden er ferdig lastet
    console.log('Siden er ferdig lastet!');
    startFamily();
});

function startFamily(){
    let UserObject = getUserObject();
    if(UserObject){
    //finne familieid
    //hente Familie fra server
        let familyId = UserObject.adminfamily[0];
        GETairtable("apphvNDlBgA5T08CM","tblHWNnQmkLb1xpZt",familyId,"responsfamily")
    }
}

function responsfamily(data){
  let members =  makeMemberArray(data.fields);
  console.log(members);
}

function makeMemberArray(familyObject){
    let member = familyObject.member;
    let membername = familyObject.membername;
    let memberage = familyObject.memberage;
    let memberemail = familyObject.memberemail;

    let members = [];

    for (var i = 0;i<member.length;i++){
        members.push({
            member:member[i],
            membername:membername[i],
            memberage:memberage[i],
            memberemail:memberemail[i],
        });
    }
    return members;
}








function getUserObject(){
    // Hente arrayen fra localStorage
    const stringUserObject = localStorage.getItem('UserObject');
    // Sjekke om det finnes en lagret array i localStorage
    if (stringUserObject) {
        // Konverter strengen tilbake til en array
        const UserObject = JSON.parse(stringUserObject);
    return UserObject;
    }else{
    return false;   
    }
}

function ruteresponse(data,id){
    if(id == "responsfamily"){

        responsfamily(data);
    }


}