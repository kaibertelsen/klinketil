document.addEventListener('DOMContentLoaded', function() {
    // Funksjonen som skal kjøre etter at siden er ferdig lastet
    console.log('Siden er ferdig lastet!');
});

function startFamily(){

   
    let UserObject = getUserObject();
    if(UserObject){
    //finne familieid
    //hente Familie fra server
        let familyId = UserObject.adminfamily[0];

    }

}


function getUserObject(){
    // Hente arrayen fra localStorage
    const stringUserObject = localStorage.getItem('UserObject');
    // Sjekke om det finnes en lagret array i localStorage
    if (stringUserObject) {
        // Konverter strengen tilbake til en array
        const UserObject = JSON.parse(stringUserObject);
        console.log(UserObject); // Logger arrayen til konsollen
    return UserObject;
    }else{
    return false;   
    }
}