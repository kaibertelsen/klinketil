var listarray = [];
var propertylist = {};

function startprojectlist(data,listid,load,sortname,descending){
    sortnameproperty = sortname;
    if(load){
    listarray = [];
    }
    listarray = data;
    let newitembutton = false;
    let placenewitembutton = "topp";
    
    let tabelid = "tbl7xtS00BVviO8kk";
    let viewColums = ["dato","name","projectname","kommentar","statusintern","timeverdi"];
    let saveColums = [1,0,0,0,0,1];
    let labledColums = ["Dato","Navn","Prosjekt","Kommentar","S", "T"];
    let justifyColums = ["start","start","start","start","start","end","end"];
    let typeColums = ["text","text","text","text","status","t"];
    let typeEditelement = ["date","text","dropdown","text","text","input"];
    let cellClass = ["dateitem","cellitembold","cellitem","cellitem","cellstatus","cellitem"];
    //let headerColums = Object.keys(data[0]);
    let spaceColums = "50px "+"0.6fr "+"0.6fr "+"1fr "+"30px "+"30px";

    //calssname basert på status 1/0 på disse feltene
    let statusobject = {
        approval:"approval",
        lock:"lock"
    }
    //lable som brukes i summering
    let statuslableObject = {
        count:"stk.",
        sum:"t.",
        approval:"t. godkjent",
        lock:"t. fakturert",
    }
    //action knapper ved utvalg
    let actionbuttons = 
        [
            {
                nr:0,
                lable:"Godkjenn utvalg",
                color:"#448400",
                fieldname:"approval",
                userfieldname:"approvalfirstuser",
                value:1
            },
            {
                nr:1,
                lable:"Fjern godkjenning",
                color:"lightgray",
                fieldname:"approval",
                userfieldname:"approvalfirstuser",
                value:0
            },
            {
                nr:2,
                lable:"Merk fakturert",
                color:"#004b9e",
                fieldname:"lock",
                userfieldname:"lockuser",
                value:1
            },
            {
                nr:3,
                lable:"Fjern fakturert",
                color:"lightgray",
                fieldname:"lock",
                userfieldname:"lockuser",
                value:0
            }
        ];
     //sorterer som standard etter første kollonne
     var returnobject = sortarrayrows(sortname,descending,listarray);
      
      
    let property= {
    actionbuttons:actionbuttons,
    countfield:"timeverdi",
    statusobject:statusobject,
    statuslableObject:statuslableObject,
    approvalmodule:true,
    approvalkey:"lock",
    approvaldisable:2,
    approvalactiontext:"Merk som fakturert",
    approvalstatusoff:0,
    approvalstatuson:1,
    rowclick:true,
    idmarker:"supplier",
    newitembutton:newitembutton,
    placenewitembutton:placenewitembutton,
    saveColums:saveColums,
    tableid:tabelid,
    typeEditelement:typeEditelement,
    viewColums:viewColums,
    labledColums:labledColums,
    spaceColums:spaceColums,
    justifyColums:justifyColums,
    typeColums:typeColums,
    idflagg:"airtable",
    classrow:"row",
    classHeaderrow:"headerrow",
    cellClass:cellClass,
    sortname:returnobject.sortname,
    descending:returnobject.descending
    };
    propertylist = property;
    
    const list = document.getElementById(listid);
    rowGenerator(returnobject.array,list,property);
   // adjustColumnWidths(list)
}

function startPROlist(data,listid,load,sortname,descending){
    sortnameproperty = sortname;
    if(load){
    listarray = [];
    }
    listarray = data;
    
    let tabelid = "tblBFI0kCc5dfSac2";
    let viewColums = ["Nr","name","groupname","responsiblename","statusintern"];
    let saveColums = [0,0,0];
    let labledColums = ["Nr","Navn","Gruppe","Ansv.","Stat."];
    let justifyColums = ["start","start","start","end","end"];
    let typeColums = ["text","text","text","array","status"];
    let typeEditelement = ["text","text","text","text","text"];
    let cellClass = ["cellitem","cellitembold","cellitem","cellholder","cellstatus"];
    //let headerColums = Object.keys(data[0]);
    let spaceColums = "40px "+"1fr "+"1fr "+"0.5fr "+"30px";
    
    //calssname basert på status 1/0 på disse feltene
    let statusobject = {
        arcsystem:"notvisible"
    }
    //lable som brukes i summering
    let statuslableObject = {
    count:"stk."
}
 //action knapper ved utvalg
 let actionbuttons = 
 [
     {
         nr:0,
         lable:"Lukk prosjekter",
         color:"#448400",
         fieldname:"arcsystem",
         userfieldname:"arcsystemuser",
         value:1
     },
     {
         nr:1,
         lable:"Åpne prosjekter",
         color:"lightgray",
         fieldname:"arcsystem",
         userfieldname:"arcsystemuser",
         value:0
     }
 ];




     //sorterer som standard etter første kollonne
     var returnobject = sortarrayrows(sortname,descending,listarray);
      
    let property= {
    actionbuttons:actionbuttons,
    countfield:false,
    statusobject:statusobject,
    statuslableObject:statuslableObject,
    approvalmodule:true,
    approvalkey:false,
    approvaldisable:false,
    approvalactiontext:false,
    approvalstatusoff:false,
    approvalstatuson:false,
    rowclick:true,
    idmarker:false,
    listid:listid,
    newitembutton:true,
    placenewitembutton:"topp",
    newbuttontext:"Nytt prosjekt",
    saveColums:saveColums,
    tableid:tabelid,
    typeEditelement:typeEditelement,
    viewColums:viewColums,
    labledColums:labledColums,
    spaceColums:spaceColums,
    justifyColums:justifyColums,
    typeColums:typeColums,
    idflagg:"airtable",
    classrow:"row",
    classHeaderrow:"headerrow",
    cellClass:cellClass,
    sortname:returnobject.sortname,
    descending:returnobject.descending
    };
    propertylist = property;
    
    const list = document.getElementById(listid);
    rowGenerator(returnobject.array,list,property);
   // adjustColumnWidths(list)
}

function startUSERlist(data,load,sortname,descending){
    sortnameproperty = sortname;
    if(load){
    listarray = [];
    }
    listarray = data;
    
    let tabelid = "tblBYZlY51xR1UJzl";
    let viewColums = ["name","email","age","userexportid"];
    let saveColums = [1,0,0,1];
    let labledColums = ["Navn","E-post","Alder","Eksportid"];
    let justifyColums = ["start","start","end","end"];
    let typeColums = ["text","text","text","text"];
    let typeEditelement = ["input","text","text","input"];
    let cellClass = ["cellitembold","cellitem","cellitem","cellitem"];
    //let headerColums = Object.keys(data[0]);
    let spaceColums = "1fr "+"1fr "+"50px "+"100px";
    
    //calssname basert på status 1/0 på disse feltene
    let statusobject = {
        access:"notvisible"
    }
    //lable som brukes i summering
    let statuslableObject = {
    count:"stk."
}
 //action knapper ved utvalg
 let actionbuttons = 
 [
     {
         nr:0,
         lable:"Steng tilgang",
         color:"#448400",
         fieldname:"access",
         value:0
     },
     {
         nr:1,
         lable:"Åpne tilgang",
         color:"lightgray",
         fieldname:"access",
         value:1
     }
 ];




     //sorterer som standard etter første kollonne
     var returnobject = sortarrayrows(sortname,descending,listarray);
      
    let property= {
    actionbuttons:actionbuttons,
    countfield:false,
    statusobject:statusobject,
    statuslableObject:statuslableObject,
    approvalmodule:true,
    approvalkey:false,
    approvaldisable:false,
    approvalactiontext:false,
    approvalstatusoff:false,
    approvalstatuson:false,
    rowclick:true,
    idmarker:false,
    listid:"userlisttable",
    newitembutton:false,
    placenewitembutton:"topp",
    newbuttontext:"Nytt prosjekt",
    saveColums:saveColums,
    tableid:tabelid,
    typeEditelement:typeEditelement,
    viewColums:viewColums,
    labledColums:labledColums,
    spaceColums:spaceColums,
    justifyColums:justifyColums,
    typeColums:typeColums,
    idflagg:"airtable",
    classrow:"row",
    classHeaderrow:"headerrow",
    cellClass:cellClass,
    sortname:returnobject.sortname,
    descending:returnobject.descending
    };
    propertylist = property;
    
    const list = document.getElementById(property.listid);
    rowGenerator(returnobject.array,list,property);
   // adjustColumnWidths(list)
}

// generering av liste
listarray = [];
function rowGenerator(data,list,property){
    //tømme listen
    removeChildElements(list);

    if(property.approvalmodule){
        //legg til grid for checkbox for godkjenning
        property.spaceColums = property.spaceColums+" 30px"
    }
    generateHeaderRow(data,list,property);

    //generer contentrow
    var counter = 0;
    var totalsumObject = {};
    for(var i = 0; i < data.length; i++){
        const row = generateRowObject(data[i],list,property,totalsumObject);
        if(erPartall(i)){
            row.classList.add("pair");   
        }
        list.appendChild(row);
        counter++;
    }
    
    if(property.newitembutton){
        //legg til knapp
        makeAddNewButton(list,property);
    }
    
    //oppdater counter
    updatelistcounter(list,totalsumObject,property,);

    //summer felt som er nummbers og lag en egen row for de
    generateFooterRow(data,list,property);
}

function generateRowObject(data,list,property,totalsumObject){
        // Genererer row
        const id = data[property.idflagg];
        var row = document.createElement("row");
        row.dataset.idproperty = property.idflagg;
        row.dataset.tableid = property.tableid;
        row.dataset.searchfield = property.searchfield;
        row.id = "row" + list.id + id;
        row.dataset.id = id;
        row.style.display = "grid";
        row.style.gridTemplateColumns = property.spaceColums;
        row.classList.add(property.classrow);
        row.style.padding = '5px'; 
       
        row.style.alignItems = 'center';
        //generer celler og returner summeringsverdier
        const rowObject = cellGenerator(data, row, property, "row");
       // if(Object.keys(totalsumObject).length !== 0){
        totalsumObject = sumRowObject(rowObject,totalsumObject);
      //  }
        if(property.rowclick){
            // Om row skal kunne trykkes på lag et element
            var clickelement = document.createElement("a");
            let lastcellnr = 0;
            if(property.approvalmodule){ lastcellnr = 1 };
            const columnCount = property.spaceColums.split(' ').length - lastcellnr;
            // Sett elementets posisjon
            clickelement.style.gridColumn = `1 / span ${columnCount}`; // kolonne
            clickelement.style.gridRow = 1; // rad
            clickelement.style.position = 'relative';
            clickelement.style.zIndex = '5';
            clickelement.style.width = '100%';
            clickelement.style.height = '100%';
    
            const rowidclick = "row" + list.id + id;
    
            // Definer handleClick-funksjonen for å ha referanse
            function handleClick() {
                rowdirectClick(rowidclick,data);
            }
    
            // Legg til event listener for klikk
            clickelement.addEventListener('click', handleClick);
            row.appendChild(clickelement);
        }
        if(property.approvalmodule){
            // Legg til en checkbox for godkjenning
            const checkbox = document.createElement("input");
            checkbox.classList.add("checkboxcell");  
            checkbox.type = 'checkbox';
            checkbox.classList.add("rowcheck");
    
           if(data[property.approvalkey] == property.approvaldisable){
                // Hvis status er det som er satt for disable
                checkbox.checked = true;
                checkbox.disabled = true;
                clickelement.removeEventListener('click', handleClick);
            } 
    
            checkbox.style.justifySelf = "end";
            checkbox.addEventListener('change', function() {
                onecheckboxIsclicked(checkbox, property);
            });
            row.appendChild(checkbox);
        }
return row;
}

function makeAddNewButton(list,property){

        //legge til Add button
        var addbutton = document.createElement("button");
        addbutton.classList.add("editinfobutton");
        addbutton.classList.add("add");
        addbutton.textContent = property.newbuttontext;
        addbutton.id = "add-new";
        addbutton.style.display = "inline-block";
        addbutton.addEventListener('click', function() {
            creatNewWrapper(list,addbutton);    
            addbutton.style.display = "none";
        }); 
 
        //plassering av ny knapp
        if(property.placenewitembutton == "topp"){
            // Velg det elementet som for øyeblikket er nummer to
            const secondChild = list.children[1];
            // Sett det nye elementet som nummer to
            if (secondChild) {
            list.insertBefore(addbutton, secondChild);
            } else {
            // Hvis det ikke finnes et andre element, legg det til på slutten
            list.appendChild(addbutton);
            }
        }else if (property.placenewitembutton == "botton"){
            list.appendChild(addbutton);
        }

}

function cellGenerator(data,row,property,typerow){
     //
     var sumObject = {count:1};
   
     if (typerow == "header"){
        //generer header cell 
         for(var i = 0;i<property.labledColums.length;i++){
         var cell = document.createElement("button");   
         cell.textContent = property.labledColums[i];
         cell.style.fontWeight = 'bold';
         cell.style.justifySelf = property.justifyColums[i];
         cell.dataset.fieldname = property.viewColums[i];
         cell.classList.add("headerbutton");

         if(property.sortname == property.viewColums[i]){
             //denne headeren er listen sortert etter
             if(property.descending){
                //sortert CBA
                 cell.classList.add("down");
             }else{
                 //sortert ABC
                  cell.classList.add("up");
             }
         }
         
         const cellid = String("header"+i+property.tableid);
         cell.id = cellid;
         //sorteringsfunksjon
         const name = String(property.viewColums[i]);
            cell.addEventListener('click', function() {
                        rowSort(name,cellid);
                        }); 
                        
            row.appendChild(cell);
            };
    }else{
        //generer cell
        sumObject.sum = data[property.countfield];
         let cellskey = property.viewColums;
        for(var i = 0;i<cellskey.length;i++){
             var cell = document.createElement("cell");
             cell.dataset.typeEditelement = property.typeEditelement[i];
             let value = "";
             cell.classList.add(property.cellClass[i]);
             cell.dataset.typeColums = property.typeColums[i];
             if(data[cellskey[i]]){
                 value = data[cellskey[i]];
                 if(property.typeColums[i] == "%"){
                   value = round((value*100),2)+" %";
                 }else if(property.typeColums[i] == "Kr"){
                   value =  valutalook(round((value),0))+" Kr";  
                 }else if(property.typeColums[i] == "K"){
                   value =  valutalook(round((value/1000),0))+" K";  
                 }else if(property.typeColums[i] == "t"){
                    value =  round((value),2)+"t";  
                  }
             }
             
             if(property.typeColums[i] == "button"){
                 //hvis det er en knapp
                     cell.addEventListener('click', function() {
                        rowClick(cell.parentElement);
                        }); 
               }else if(property.typeColums[i] == "bool"){
                 cell.dataset.status = value;
                 if(value){
                     cell.classList.add("true");
                 }else{
                     cell.classList.add("false");
                 }
                }else if(property.typeColums[i] == "status"){
                    //da skal den vise status med farger
                    const keysArray = Object.keys(property.statusobject);
                    let classname = 0;
                    data.statusintern = 0;
                    for (var a = 0; a < keysArray.length; a++) {
                        // Gå gjennom hver nøkkel
                        let key = keysArray[a];
                        // Sjekk om 'data' inneholder en verdi for den nåværende nøkkelen og om denne verdien er 1
                        if (data[key] == 1) {
                            // Hent fargen fra 'property.statusobject' basert på den nåværende nøkkelen
                            classname = property.statusobject[key];
                            data.statusintern = a+1;
                            sumObject[key] = data[property.countfield];
                        }
                    }
                    if(classname){
                    cell.classList.add(classname);
                    }
                }else if(property.typeColums[i] == "array"){
                cell = makeArrayCell(data,cell,property.viewColums[i]);
                }else{
                 cell.textContent = value;
                }

             if(property.typeEditelement[i] == "date"){
                    //date iso dato i dataset
                    cell.dataset.date = value;
                    cell.textContent = formatISODateToMiniFormat(value);
             }
                
             
             cell.style.alignItems = property.justifyColums[i];
             cell.style.justifySelf = property.justifyColums[i];
             cell.style.gridColumn = i+1; //kolonne
             cell.style.gridRow = 1; //  rad

             cell.dataset.justify = property.justifyColums[i];
             cell.dataset.save = property.saveColums[i];
             cell.dataset.dbproperty = cellskey[i];
             cell.dataset.labledColums = property.labledColums[i];
             row.appendChild(cell);
             
            // Sjekk om elementet er av typen 'number' og legg til en klasse
            if (typeof data[cellskey[i]] === 'number' && property.typeColums[i] !== "status" && property.viewColums[i] !== "Nr" && property.viewColums[i] !== "age") {
                var valueElement = document.createElement("value");
                valueElement.classList.add('value-input');
                valueElement.dataset.gridColumn = i+1;
                valueElement.dataset.value = data[cellskey[i]];
                valueElement.style.display = "none";
                row.appendChild(valueElement);
            }




         }
    }
    return sumObject;
}

function createNewItem(list,property){
    
          //genererer row
        var row = document.createElement("row");
        row.dataset.tableid = property.tableid;
        row.id = "row-new";
        row.style.display = "none";
        row.style.gridTemplateColumns = property.spaceColums;
        row.classList.add(property.classrow);
        row.style.alignItems = 'center';
        row.classList.add("selected");
        

     let cellskey = property.viewColums;
    for(var i = 0;i<cellskey.length;i++){
 
        if(property.typeEditelement[i] == "input"){
            const input = document.createElement("input");
            input.classList.add("inputcell");
            input.classList.add("edit");
            input.style.textAlign = property.justifyColums[i];
            input.placeholder = property.labledColums[i];
            input.dataset.typeEditelement = property.typeEditelement[i];
            input.dataset.dbproperty = property.viewColums[i];
            input.dataset.typeColums = property.typeColums[i];
            input.dataset.save = property.saveColums[i];
            row.appendChild(input);
        }else if(property.typeEditelement[i] == "date"){
            const input = document.createElement("input");
            input.setAttribute("type", "date");
            input.classList.add("inputcell");
            input.classList.add("edit");
            input.style.textAlign = property.justifyColums[i];
            input.value = getTodayInISOFormat();
            input.dataset.typeEditelement = property.typeEditelement[i];
            input.dataset.dbproperty = property.viewColums[i];
            input.dataset.typeColums = property.typeColums[i];
            input.dataset.save = property.saveColums[i];
            row.appendChild(input);
    
        }else if(property.typeEditelement[i] == "checkbox"){
            const checkbox = document.createElement("input");   
            // Sett typen til checkbox
            checkbox.type = 'checkbox';
            checkbox.checked = false;
            checkbox.classList.add("checkboxcell");
            checkbox.classList.add("edit");
            checkbox.style.justifySelf = property.justifyColums[i];
            checkbox.dataset.typeEditelement = property.typeEditelement[i];
            checkbox.dataset.dbproperty = property.viewColums[i];
            checkbox.dataset.typeColums = property.typeColums[i];
            checkbox.dataset.save = property.saveColums[i];
            row.appendChild(checkbox);
        }else{
            const text = document.createElement("text");   
            text.textContent = "";
            text.classList.add("cellitem");
            text.classList.add("edit");
            text.style.justifySelf = property.justifyColums[i];
            text.dataset.typeEditelement = property.typeEditelement[i];
            text.dataset.dbproperty = property.viewColums[i];
            text.dataset.typeColums = property.typeColums[i];
            text.dataset.save = property.saveColums[i];
            row.appendChild(text);
        }

    }
    
    //legge til buttonwrapper
    var buttonwrapper = document.createElement("a");
    buttonwrapper.classList.add("editbuttonholder");
    const columnCount = property.spaceColums.split(' ').length;
    // Sett elementets posisjon
    buttonwrapper.style.gridColumn = `1 / span ${columnCount}`; // Fra første til siste kolonne
    buttonwrapper.style.gridRow = 2; // Andre rad
    // Legg til padding på 5px i alle retninger
    buttonwrapper.style.padding = '5px';    
    // Bruk flexbox for å høyrestille innholdet i buttonwrapper
    buttonwrapper.style.display = 'flex';
    buttonwrapper.style.justifyContent = 'flex-end';
    // Legg til en grå toppkantlinje på 0,5px
    buttonwrapper.style.borderTop = '0.5px solid gray';
    row.appendChild(buttonwrapper);


    //legge til editbuttens
    var savebutton = document.createElement("button");
    savebutton.classList.add("editinfobutton");
    savebutton.classList.add("save");
    savebutton.textContent = "Opprett";
    savebutton.addEventListener('click', function() {
    addrowNew(row);
    }); 
    buttonwrapper.appendChild(savebutton);


    var canclebutton = document.createElement("button");
    canclebutton.classList.add("editinfobutton");
    canclebutton.classList.add("cancle");
    canclebutton.addEventListener('click', function() {
    canclerowAdd(row);
    }); 
    buttonwrapper.appendChild(canclebutton);

 
 //legge til Add button
    var addbutton = document.createElement("button");
    addbutton.classList.add("editinfobutton");
    addbutton.classList.add("add");
    addbutton.textContent = "Ny rad";
    addbutton.id = "add-new";
    addbutton.style.display = "inline-block";
    addbutton.addEventListener('click', function() {
    document.getElementById("row-new").style.display = "grid";
    addbutton.style.display = "none";
    }); 
    
    if(property.placenewitembutton == "topp"){
        // Velg det elementet som for øyeblikket er nummer to
        const secondChild = list.children[1];
        // Sett det nye elementet som nummer to
        if (secondChild) {
        list.insertBefore(addbutton, secondChild);
        } else {
        // Hvis det ikke finnes et andre element, legg det til på slutten
        list.appendChild(addbutton);
        }
        list.insertBefore(row, addbutton);
    }else if (property.placenewitembutton == "botton"){
        list.appendChild(addbutton);
        list.appendChild(row);
    }
}

function addrowNew(editrow){
  

    var childEdit = editrow.childNodes;
    let body = {};
    for(var i = 0;i<childEdit.length;i++){
        
      if(childEdit[i].dataset.typeEditelement == "input"){
          let cellvalue = valueTypeConverter(childEdit[i].dataset.typeColums,childEdit[i].value);
   
          if(childEdit[i].dataset.save == "1"){
         body[childEdit[i].dataset.dbproperty] = cellvalue.save;
          }
  
      }else if(childEdit[i].dataset.typeEditelement == "checkbox"){
  
          if(childEdit[i].dataset.save == "1"){
         //sette vedi i body
         body[childEdit[i].dataset.dbproperty] = childEdit[i].checked;
          }
          
      }else if (childEdit[i].dataset.typeEditelement == "button"){
         // ikke gjør noe
      }else{
           let cellvalue = valueTypeConverter(childEdit[i].dataset.typeColums,childEdit[i].textContent);
           if(childEdit[i].dataset.save == "1"){
           body[childEdit[i].dataset.dbproperty] = cellvalue.save;
            }
      }
  
    }  
    
    //
    POSTairtable(baseid,editrow.dataset.tableid,JSON.stringify(body),"responsaddnewrow"); 
    
     //sette på animationbar
   const animationelement = document.createElement("element");
   animationelement.classList.add("animationsaver");
   animationelement.classList.add("opprett");
   animationelement.id = "ani-new";
   editrow.appendChild(animationelement);
   //oppdatere dachboard
  
    
}
  
function saverowEdit(editrow){
      
      //finne orginallelement
      let elementid = editrow.dataset.rowelementid;
      const element = document.getElementById(elementid);
      element.style.display = "grid";
    
      let rowdataid = element.dataset.id;
      let idproperty = element.dataset.idproperty;
      var object = findObjectProperty(idproperty,rowdataid,listarray);
     
     //sette inn verdier til orginal row
     let body = mergeinputtoRow(editrow,element);
  
     //spesialfunksjon for en tabell
     if(element.dataset.tableid == "tbl7xtS00BVviO8kk"){
      //her skal timeverdi omgjøres til timer og minutter for å legge dette inn i riktig felt
      body = spesialTimerBody(body);
     };
    
     //lagre på server
     PATCHairtable(baseid,element.dataset.tableid,element.dataset.id,JSON.stringify(body),"updaterowresponse");
     
     //sette på animationbar
     const animationelement = document.createElement("element");
     animationelement.classList.add("animationsaver");
     animationelement.classList.add("edit");
     animationelement.id = "ani"+element.dataset.id;
     element.appendChild(animationelement);
  
      //fjerne edit row
      editrow.remove();
  
}

function spesialTimerBody(body){
  
      if(body?.timeverdi){
      let timeValue = body.timeverdi;
  
      // Hent antall hele timer
      let hours = Math.floor(timeValue);
      
      // Beregn antall minutter (ved å trekke fra hele timer og multiplisere med 60)
      let minutes = Math.round((timeValue - hours) * 60);
      
      body.timer = String(hours);
      body.minutter = String(minutes);
  
      // Fjern 'timeverdi'-keyen fra objektet
      delete body.timeverdi;
      }
      return body;
}
  
function deleterowEdit(editrow){
      
      //finne orginallelement
      let elementid = editrow.dataset.rowelementid;
      const element = document.getElementById(elementid);
     
    
    const userChoice = confirm("Er du sikker på at du vil slette?");
    
    // Sjekk om brukeren valgte "Ja" eller "Nei"
    if (userChoice) {
  
      //Slette object i array
        let rowdataid = element.dataset.id;
        DELETEairtable(baseid,editrow.dataset.tableid,rowdataid,"responsdeleterow");
      
      //sette på animationbar
        const animationelement = document.createElement("element");
        animationelement.classList.add("animationsaver");
        animationelement.classList.add("delete");
        animationelement.id = "ani"+element.dataset.id;
        animationelement.dataset.rowid = element.id;
        element.appendChild(animationelement);
        element.style.display = "grid";
         //fjerne edit row
        editrow.remove();
        
    } else {
        // Brukeren trykket "Nei"
       
    }
    
}
  
function responsdeleterow(data,id){

    //slå av riktig saver
    const animationelement = document.getElementById("ani"+data.id);
    let rowid = animationelement.dataset.rowid;
    animationelement.remove();
    const rowelement = document.getElementById(rowid);
    const list = rowelement.parentElement;
    rowelement.remove();
    //finne elemente i array og slette det
    deletObjectProperty(rowelement.dataset.idproperty,data.id,listarray);
    generateFooterRow([],list,propertylist);

   
}

function responsaddnewrow(data,id){
  //const newrownelement = document.getElementById("row-new");
  //newrownelement.remove();

const newarray = listarray.slice();
newarray.push(data.fields);

  startlist(newarray);

}

function updaterowresponse(data,id){
      //slå av riktig saver
      const animationelement = document.getElementById("ani"+data.id);
      animationelement.remove();
}

function doafterserverandUpdate(id){
    //her kan en velge hva som skal skje

   //oppdater dachboard
   GETairtable(baseid,"tblkNYRENn5QFG0CD","recfJZ0PCPOrWcBLq","responddaschboard");
}

