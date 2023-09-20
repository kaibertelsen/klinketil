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


