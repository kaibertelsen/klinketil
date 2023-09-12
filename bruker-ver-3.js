  loadprosjektselect(prosjektlist);
  function loadprosjektselect(options){
  var select = document.getElementById("prosjektlist-select");
	for(var i = 0; i < options.length; i++) {
    var tekst = options[i][2]+options[i][0];
    var value = options[i][1];
    var el = document.createElement("option");
    el.textContent = tekst;
    el.value = value;
    select.appendChild(el);
    }
}

function layout(larray){
var layoutitem = findlayoutitem(bdate);

		//visning
   let showclasses = layoutitem[3];
   const showarray = showclasses.split(",");
	 for (var i=0;i<showarray.length;i++){
	//show calssname
  showhidebyclassname(showarray[i],"inline-block");
	}

   let hideclasses = layoutitem[4];
   const hidearray = hideclasses.split(",");
	 for (var i=0;i<hidearray.length;i++){
	//hide calssname
	showhidebyclassname(hidearray[i],"none");
	}
  
document.getElementById("speed-1").srcset="";
document.getElementById("speed-1").src=layoutitem[5];

document.getElementById("speed-2").srcset= "";
document.getElementById("speed-2").src=layoutitem[6];

document.getElementById("topp-bg").srcset= "";
document.getElementById("topp-bg").src=layoutitem[13];

}

document.getElementById("prosjektlist-select").addEventListener("change", (e) => {

    var prosjekt = finditeminarray(prosjektlist,1,document.getElementById("prosjektlist-select").value);
    var minuttinput = document.getElementById("minutter");
    var timerinput =document.getElementById("timer");
    var kommentarinput = document.getElementById("kommentar");
    var infotekst = "";
    var timer= "";
    var minutter = "";
      //sjekke verdien på index 3
   if (prosjekt[3]=="vipps"){ 
      infotekst = "Tast inn ønsket beløp.";
		
   document.getElementById("regheadertext").innerHTML = "Registrer beløp";
   document.getElementById("vippstext").innerHTML =  infotekst;
   //kommentarinput.value =  prosjekt[4];
   kommentarinput.style.display = "none"
   document.getElementById("prevalue").style.display = "Block";
   document.getElementById("pretimer").style.display = "none";
   //timerinput.value = timer;
   timerinput.style.display = "none";
   //minuttinput.value = minutter;
   minuttinput.style.display = "none";
   }else{
   document.getElementById("regheadertext").innerHTML = "Registrer timer";
   document.getElementById("prevalue").style.display = "none";
   document.getElementById("pretimer").style.display = "Block";
   kommentarinput.value =  "";
   kommentarinput.style.display = "Block"
   document.getElementById("valuta").value = "";
   //timerinput.value = "";
   timerinput.style.display = "Block";
   //minuttinput.value = "";
   minuttinput.style.display = "Block";
   }
});
