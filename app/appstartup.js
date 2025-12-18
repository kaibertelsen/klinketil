function startUp(){
//hente user object

// loade alle leverandører JSON på klient

//loade companyselector og velge startup selskap


if(masterklientid == "646f0b32f2471117a0c5b7fc"){
    //sjekke om det er bergen
    document.getElementById("targetbutton").style.display = "none";
}


}

function companyChange(companyId){
// filtrer ut alle leverandører som inneholder en av gruppene som selskapet er i

//list leverandørene

//sorter etter sortnr/ alfabetisk
//send med informasjon om hvilke som alt er knyttet til leverandøren

//sjekk om filter
// søkefelt
//evt. valgte kategorier


}


function changeLogoHeader() {
    const userJson = localStorage.getItem("UserObject");
    if (!userJson) return;

    let user;
    try {
        user = JSON.parse(userJson);
    } catch (e) {
        console.error("Kunne ikke parse UserObject fra localStorage:", e);
        return;
    }

    const logoImageElement = document.getElementById("logoimageelement");
    if (!logoImageElement) {
        console.warn("Fant ikke logoimageelement i DOM");
        return;
    }

    if (user.teamlogo) {
        logoImageElement.src = user.teamlogo;
    }
}
