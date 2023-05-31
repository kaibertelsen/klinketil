function sumtimerdelay(delay){
setTimeout(doSomething, delay);
		function doSomething() {
   //do whatever you want here
   sumerlist();
		}
}

//summerer listen ved oppstart
sumerlist();


function sumerlist(){
//summer minutter
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
document.getElementById("sumtimer").innerHTML = timer;
document.getElementById("summinutter").innerHTML = minutter;
}

function sumvalueclass(classname){
var elements = document.getElementsByClassName(classname);
var value = 0;
for (var i = 0; i < elements.length; i++) {
   value = value+Number(elements[i].innerHTML);
}
return value;
}
