/*
var Webflow = Webflow || [];
Webflow.push(function () {
	document.getElementsByClassName('date').flatpickr({
  	enableTime: false,
    dateFormat: 'Y-m-d'
  });
});
*/



function sumtimerdelay(delay){
setTimeout(doSomething, delay);
		function doSomething() {
   //do whatever you want here
   sumerlist();
		}
}


function sumerlist(){
//summer minutter
var mvalue = sumvalueclass("valuex");
var minutter = sumvalueclass("minutter");
var mtimer = 0;


if(minutter>59){
//regne om til timer
mtimer = minutter/60;
mtimer = Math.trunc(mtimer);
minutter = minutter-(mtimer*60);
}
//summer timer
var timer = sumvalueclass("timer");
//legge til minutt timene
timer = timer+mtimer;

//skrive til summering
document.getElementById("sumvalue").innerHTML = mvalue;
document.getElementById("sumtimer").innerHTML = timer;
document.getElementById("summinutter").innerHTML = minutter;

	if(mvalue ==0){
	//skjul verdiboxsen 
	document.getElementById("valuebox").style.display="none";
	}else{
	document.getElementById("valuebox").style.display="Block";
	}

	
}

function sumvalueclass(classname){
var elements = document.getElementsByClassName(classname);
var value = 0;
for (var i = 0; i < elements.length; i++) {
   value = value+Number(elements[i].innerHTML);
}
return value;
}

const thisday = new Date();
var daynr = thisday.getDate();
var montnr= thisday.getMonth()+1;
var yearnr = thisday.getFullYear();

//sett timer til i dag
document.getElementById("dato").value = yearnr+"-"+montnr+"-"+daynr;
thisDate = new Date();
document.getElementById("statusdennemnd").innerHTML = findmontnameshort(thisDate.getMonth());

function visregistrering(){
document.getElementById("waitingdiv").style.display = "Block"
document.getElementById("registreringsview").style.display = "none"
}

function setgoalmessage(){
//sjekke om denne layouten skal ha denne meldingen
var layoutitem = findlayoutitem(bdate);
	if (layoutitem[14]){
	//denne bruker skal ha goal lable
	var timertotalmnd=sumhourminutt(timermnd,minuttermnd);
	var xgoal1 = Number(layoutitem[7]);

		if (timertotalmnd>=xgoal1){
    //over 100% sett på lable
		document.getElementById("wrappergoalmessage").style.display = "flex";
    var confetti =document.getElementById("confetti");
    showelementdelay(confetti,1500,"Block")
    hideelementdelay(confetti,3500);
 document.getElementById("goalheaderdiv").style.backgroundColor=layoutitem[9];
    document.getElementById("strek1").style.borderColor=layoutitem[9];
     document.getElementById("strek2").style.borderColor=layoutitem[9];
    
    
   //sette goal1
    let goalnr = "1x";
    let goalheaderlable = layoutitem[15];
    let goalmassagelable = layoutitem[16];
    
    		if (timertotalmnd>=xgoal1*2){
    		//Det er 200% over første goal
    		  goalnr = "2x";
   		  goalheaderlable = layoutitem[17];
    		  goalmassagelable = layoutitem[18];
    		}

		if (timertotalmnd>=xgoal1*3){
    		//Det er 300% over første goal
    		  goalnr = "3x";
   		  goalheaderlable = layoutitem[17];
    		  goalmassagelable = layoutitem[18];
    		}
			

		document.getElementById("goalnr").innerHTML = goalnr;
		document.getElementById("goalheaderlable").innerHTML = goalheaderlable;
    document.getElementById("goalmassagelable").innerHTML = goalmassagelable;
		}else{
    //skal ikke ha goal massage

    
    }
	}



}


function hideelementdelay(element,delay){
setTimeout(doSomething, delay);
		function doSomething() {
    element.style.display = "none";
		}
} 

function showelementdelay(element,delay,type){
setTimeout(doSomething, delay);
		function doSomething() {
   element.style.display = type;
		}
}
