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
   var timertotalmnd=sumhourminutt(timermnd,minuttermnd)
		  //hvis en infotekts
		   var sumbx = 0;
 			 var value = 0;
  		if (goal1>timertotalmnd){
 		  sumbx = goal1-timertotalmnd;
		  value = sumbx*200;
      value = round(value, 2);
      gotogoal = value;
      sumbx = round(sumbx, 2);
      var timearray = extracthourminutt(sumbx);
      timer= timearray[0];
      minutter = round(timearray[1], 1);
      infotekst = "Du er "+timer+"t og "+minutter+"m fra å være 100% denne mnd. ("+goal1+"t). Om du ønsker å komme i 100% så kan du skrive inn "+value+"kr i beløpsfeltet. "+prosjekt[4];
		  }else{
		  infotekst = "Du er alt i 100%, men om du ønsker kan du legge inn et         beløp."
      document.getElementById("gotobutton").style.display = "none";
		  }
   
   document.getElementById("vippstext").innerHTML =  infotekst;
   kommentarinput.value =  prosjekt[4];
   kommentarinput.style.display = "none"
   document.getElementById("prevalue").style.display = "Block";
   document.getElementById("pretimer").style.display = "none";
   timerinput.value = timer;
   timerinput.style.display = "none";
   minuttinput.value = minutter;
   minuttinput.style.display = "none";
   }else{
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
