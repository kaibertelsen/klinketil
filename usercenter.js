
function getUserObject(userid){

    if(memberIsapproval){
    GETairtable("apphvNDlBgA5T08CM","tblBYZlY51xR1UJzl",userid,"getUserObjectrespons")
    }
}




function getUserObjectrespons(data,id){

UserObject = data.fields;
localStorage.setItem('UserObject', JSON.stringify(UserObject));
var allert = false;

    //en spesifikk klient
    if(UserObject.klientid == "6509b23ab979c3e8b31069ea"){
        //oslo
        if(UserObject?.kontonr){
            document.getElementById("kontonrtext").textContent =  UserObject.kontonr;
            document.getElementById("kontonrbutton").style.display = "block";
        }else{
          //kontonummer er ikke lagt inn spørr etter det
          allert = true; 
        }
    
        if(!containsFirstAndLastName(UserObject.name)){
        allert = true;
        }
    
    }
    
  
  if(allert){
      makemessageAlert(UserObject); 
  }else{
    document.getElementById("userinfowrapper").style.display = "none";
    document.getElementById("wrapperinfo").style.display = "none";
  }
   
  //sjekke prosjektmodul 
   userProjectAdmin(UserObject);
   userFamily(UserObject);
  
}

function userFamily(UserObject){
    //kontroller om det er admin falily eller bare family
    
    const button = document.getElementById("familybutton");
    const text = document.getElementById("familyname");
    
        if(UserObject?.adminfamily){
        //dette er en admin family user legg til klikktag
        button.style.display = "block";
        text.textContent =  UserObject.familyname;

        button.onclick = function() {
            startfamilyAdmin(UserObject);
            }
        }else if(UserObject?.family){
        //dette er et familiemedlem
        button.style.display = "block";
        text.textContent =  UserObject.familyname;
        }else{
            //er ikke lagt til noe familie enda
        button.style.display = "none";
        text.textContent =  "#"
        }
}


function startfamilyAdmin(UserObject){
// Hent den nåværende nettadressen
const currentUrl = window.location.origin;
const newUrl = currentUrl + "/family";
console.log(newUrl);
window.location.href = newUrl;
}

function userProjectAdmin(User){
    if(User?.project){
      //bruker har prosjektadmin, synligjør knapp
      console.log("bruker har padmin");
      document.getElementById("prosjektadminbutton").style.display = "block";
   }
}


function containsFirstAndLastName(name) {
    // Regex for å sjekke om strengen inneholder minst to ord, adskilt av mellomrom
    const regex = /^[A-Za-zÆØÅæøå]+( [A-Za-zÆØÅæøå]+)+$/;

    // Returnerer true hvis regex matcher, ellers false
    return regex.test(name.trim());
}

function makemessageAlert(data){
    

       const list = document.getElementById("userinfomakebox");
         
          while (list.firstChild){
            list.removeChild(list.firstChild);
            }
        
        var idinputtArray = [];
        
        const text = document.createElement("text");   
        text.textContent = "Vi trenger litt mer informasjon.";
        text.classList.add("messagetext");
        text.classList.add("headerl");
        list.appendChild(text);
        
        if(!containsFirstAndLastName(data.name)){
        //fornavn og etternavn
        let idinput = makemessageFullname(data,list);
        idinputtArray.push(idinput);
        }
        
        if(!data?.kontonr){
        //kontonummer
        let idinput= makemessageKontonummer(data,list);
        idinputtArray.push(idinput);
        }
        
        //
        const button = document.createElement("button");
        button.classList.add("button47");
        button.textContent = "Lagre "
     
        button.addEventListener('click', function() {
                        saveInfoObject(idinputtArray);
                        }); 
        list.appendChild(button);
  
        document.getElementById("userinfowrapper").style.display = "block";
        document.getElementById("wrapperinfo").style.display = "block";

        
}
function makemessageFullname(data,list){
    
        const text = document.createElement("text");   
        text.textContent = "Det kan se ut som du kun er registrert med et navn. Skriv inn fornavn og etternavn i feltet under.";
        text.classList.add("messagetext");
        list.appendChild(text);
         
        const input = document.createElement("input");
        input.classList.add("infoinputfield");
        input.setAttribute("type", "text");
        input.id = "inputfullName";
        input.value = data.name;
        list.appendChild(input);
        return input.id;
    }

function makemessageKontonummer(data,list){

        //kontonummer
        const text = document.createElement("text");   
        text.textContent = "Vi trenger ditt kontonummer i forbindelse med utbetaling av lønn.";
        text.classList.add("messagetext");
        list.appendChild(text);
         
        const input = document.createElement("input");
        input.classList.add("infoinputfield");
        input.setAttribute("type", "text");
        input.id = "inputkontonummer";
        input.placeholder = "Kontonummer";
        list.appendChild(input);
        return input.id;
        
}
function saveInfoObject(inputidarray){

var saveOk = true;
let body = {};
for(var i = 0;i<inputidarray.length;i++){
    
    if(inputidarray[i] == "inputfullName"){
        //sjekke om det er fylt inn to navn
        let value = document.getElementById(inputidarray[i]).value;
        body.name = value;
         if(!containsFirstAndLastName(value)){
            saveOk = false; 
         }
    }else if(inputidarray[i] == "inputkontonummer"){
        //sjekke om kontonummer er fylt ut
        
         let value = document.getElementById(inputidarray[i]).value;
        body.kontonr = value;
        if(value == ""){
            saveOk = false; 
         }
        
        
        
    }
    
    
}
   if(saveOk){
       //lagre
       PATCHairtable("apphvNDlBgA5T08CM","tblBYZlY51xR1UJzl",UserObject.airtable,JSON.stringify(body),"saveInfoObjectresponse"); 
        const list = document.getElementById("userinfomakebox");
         while (list.firstChild){
            list.removeChild(list.firstChild);
            }

        const text = document.createElement("text");   
        text.textContent = "Takk 👍";
        text.classList.add("messagetext");
        text.classList.add("headerl");
        list.appendChild(text);
       }else{
       alert("Vennligst tast inn kontonr.");
       }

}
function saveInfoObjectresponse(data,id){

console.log(data);

getUserObjectrespons(data,"loop")
   
}
    
function changeYourkontonummer(data){

     const list = document.getElementById("userinfomakebox");
         
          while (list.firstChild){
            list.removeChild(list.firstChild);
            }

          //kontonummer
        const text = document.createElement("text");   
        text.textContent = "Dette kontonr. er registrert på deg."
        text.classList.add("messagetext");
        list.appendChild(text);
         
        const input = document.createElement("input");
        input.classList.add("infoinputfield");
        input.setAttribute("type", "text");
        input.id = "inputkontonummer";
        input.value = data.kontonr;
        list.appendChild(input);

        var idinputtArray = ["inputkontonummer"];
        //
        const button = document.createElement("button");
        button.classList.add("button47");
        button.textContent = "Lagre "
     
        button.addEventListener('click', function() {
                        saveInfoObject(idinputtArray);
                        }); 
        list.appendChild(button);
  

        document.getElementById("userinfowrapper").style.display = "block";
        document.getElementById("wrapperinfo").style.display = "block";
    
}