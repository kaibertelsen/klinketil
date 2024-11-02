var globalsubscriptions;
var globalmembers;
var globallist;
var familyObject;


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

  document.getElementById("familynamelable").textContent = data.fields.name;

  familyObject = data.fields;
  globalefamlily =  makeMemberArray(familyObject);
  // Sorter arrayen etter 'memberage', størst først
  globalefamlily.sort((a, b) => b.memberage - a.memberage);

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
globallist = mergMembersAndSubscriptions(globalefamlily,globalsubscriptions);
makeFamilyList(globallist);
}

function onPeriodeChange(){
    makeFamilyList(globallist);
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
                let subitem = memberControllSubscription(member,item);
                memberssubscription.push(subitem);
            }
        }

    }

return memberssubscription;
}

function memberControllSubscription(member,subscription){

    if(subscription?.agefrom || subscription?.ageto ){
        // Abonnementet har aldersbegrensning
        if (member.memberage>subscription.agefrom && member.memberage<subscription.ageto){
            //medlemet er innafor aldersbegrensningen
            return subscription;
        }else{
            //medlemmer er ikke innafor aldersbegrensningen
            console.log("Er utafor");
            if(subscription?.linksubscription){
               return findLinkedSubscriptionForMember(ubscription.linksubscription);
            }
        }
    }else{
    return subscription
    }
}

function findLinkedSubscriptionForMember(linkedsubscriptionId){
    for(var i = 0;i<linkedsubscriptionId.length;i++){
      //finne subscription  linkedsubscriptionId
    return  globalsubscriptions.find(obj => obj.airtable === linkedsubscriptionId[i]);
    }
    return false;
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

function valutalook(value){
    //gjøre verdien visuel persentabel
           value = value.toLocaleString('en-US');
           value=value.replace(",", " ");
           value=value.replace(",", " ");
           return value;   
}

function round(value, precision){
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

function bigvalutaLayout(value){
return  valutalook(round(value, 0));
}