function findlayoutid(sDate){
//funksjon for å finne riktif layout
return findlayoutitem(sDate)[2];
}


function findlayoutitem(sDate){
if (sDate==""){
//om ikke dato er satt returner siste layout
return layoutarray[layoutarray.length-1];
}else{
bDate = new Date(sDate);
var xlayoutarray =layoutarray;
var bornyear = bDate.getFullYear();
var xage = Math.floor(findage(bDate));
//funksjon for å finne riktif layout
for (var i = 0;i <xlayoutarray.length;i++){
	if (xage>=xlayoutarray[i][0]){
		//eldre en angitt minimums verdi
		if (xage<xlayoutarray[i][1]){
		//yngre enn angitt maks alder
          return xlayoutarray[i];
    }else if (xage===xlayoutarray[i][1]){
      // er lik som maksalder
      //kjør en kontroll på alders år og returner den henviste gruppen
      return agescontroll(xlayoutarray,i,bornyear);
    }
   
    		

			}
		
	}
  }
}







function agescontroll(marray,i,bornyear){
   if(marray[i][19]){
               //den er datostyrt overlapp
               if(limitagesthisyear(marray[i][1],bornyear)){
                  //bruker har fylt limitår dette året
                  //sjekke om vi er kommer forbi angitt mnd.
                  currentDate = new Date();
                  var currentmnd = currentDate.getMonth()+1;
                    if(currentmnd>=marray[i][20]){
                    //vi er i eller passert denne mnd
                    return marray[i+1];
                    }else{
                     //vi er ikke i eller har passert denne mnd
                    return marray[i];
                    }

              }else{
               //bruker maksår i fjor, hent neste layoutitem
               return marray[i+1];
              }
          

          }else{
            //den er ikke datostyrt
          return marray[i];


          }





}



function limitagesthisyear(maxyear,bornyear){
cDate = new Date();
var thisyear = cDate.getFullYear();
var yearofflimit = bornyear+maxyear;
    if (yearofflimit === thisyear){
    //ja fylte maksår dette året
    return true;
    }else{
    //ja fylte maksår i fjord
    return false;
    }
}

//regne ut diferansen i år 
function findage(date){
var d1 = new Date(date); 
var d2 = new Date(); 
var diff = d2.getTime() - d1.getTime(); 
  
var daydiff = diff / ((1000 * 60 * 60 * 24)*365.25); 
return daydiff;
}
