var globalsubscriptions;
var globalmembers;


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
  globalmembers =  makeMemberArray(data.fields);
  //hente abonnement på klient
  getSubscription(getUserObject().aklient[0]);
}

function makeMemberArray(familyObject){
    let member = familyObject.member;
    let membername = familyObject.membername;
    let memberage = familyObject.memberage;
    let memberemail = familyObject.memberemail;

    let members = [];

    for (var i = 0;i<member.length;i++){
        members.push({
            airtable:member[i],
            membername:membername[i],
            memberage:memberage[i],
            memberemail:memberemail[i],
        });
    }
    return members;
}

function getSubscription(klientid){
//
    let body = airtablebodylistAND(
    {
        klientid:klientid
    }
    );

    Getlistairtable("apphvNDlBgA5T08CM","tblNE0cBMkVKMw0GZ",body,"responssubscription");
}

function responssubscription(data){
globalsubscriptions = rawdatacleaner(data);
// lag array med medlemmene og abonnement
makeFamilyList(mergMembersAndSubscriptions(globalmembers,globalsubscriptions));
}

function mergMembersAndSubscriptions(members,subscription){
    for(let member of members){
                   member.subscription = findSubscriptionforThisMember(member,subscription)
    }
    return members;
}
function findSubscriptionforThisMember(member,subscription){
    var memberssubscription = [];
    for(let item of subscription){
        if(item?.user){
            if (item.user.includes(member.airtable)){
                memberssubscription.push(item);
            }
        }

    }
return memberssubscription;
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
    }else if(id == "responssubscription"){
        responssubscription(data);
    }
}