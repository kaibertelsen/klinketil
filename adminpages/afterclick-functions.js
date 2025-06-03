
function canclerowEdit(editrow){
  
    //finne orginallelement
    let elementid = editrow.dataset.rowelementid;
    document.getElementById(elementid).style.display = "grid";
    
    //fjerne edit row
    editrow.remove();
   
}
  
function canclerowAdd(row){
      document.getElementById("row-new").style.display = "none";
      document.getElementById("add-new").style.display = "inline-block";
}
  
function rowSort(sortname,elementid){
    
    const element = document.getElementById(elementid);
    const classesToCheck = ['up', 'down'];
    const headerrow = element.parentElement;
    
    var data = listarray;
        if (hasNoneOfClasses(element, classesToCheck)) {
            //sorter ABC
           data = sortarrayrows(sortname,false,data).array;
          //fjerna alle up en downs
          removeClassname(headerrow,"up down")
          //legge til en up på dette elementet
          element.classList.add("up");
        }else if (element.classList.contains('down')) {
           //sorter ABC
           //fjerna alle up en downs
          removeClassname(headerrow,"up down")
          //legge til en up på dette elementet
          element.classList.add("up");
          data = sortarrayrows(sortname,false,data).array;
        }else{
             //sorter CBA
             //fjerna alle up en downs
          removeClassname(headerrow,"up down")
            //legge til en up på dette elementet
             element.classList.add("down");
             data = sortarrayrows(sortname,true,data).array;
        }
    
    sortrowElements(headerrow,data);
  
      //legg sumering på bunn
      var listfotterrowElement = headerrow.parentElement.getElementsByClassName("footerrow");
      for(var i = 0;i<listfotterrowElement.length;i++){
          headerrow.parentElement.appendChild(listfotterrowElement[i]);
      }
      var listchoiserowElement = headerrow.parentElement.getElementsByClassName("choiserow");
      for(var i = 0;i<listchoiserowElement.length;i++){
          headerrow.parentElement.appendChild(listchoiserowElement[i]);
      }
  
  
}

function rowdirectClick(rowid,item){
      //
      const rowelement = document.getElementById(rowid);
      let dataitemid = rowelement.dataset.id;
      if(propertylist.tableid == "tblBFI0kCc5dfSac2"){
          //dette er prosjekttabellen og skal åpnes på en annen måte
          const project = findObjectProperty("airtable",dataitemid,totalprosject);
          creatNewWrapper(rowelement.parentElement,rowelement,project);
      }else{
      rowClick(rowelement,item);
      }
}
  
function markallcheckboxinlist(checkbox,classname,checked,property){
      const list = checkbox.parentElement.parentElement;
      markcheckboxinList(list,classname,checked);
      sumcheckboxElements(checkbox,property);
}

function markcheckboxinList(list,classname,checked){
      const listcheckboxes = list.getElementsByClassName(classname);
      for (var i = 0;i<listcheckboxes.length;i++){
          if(isListElementVisible(listcheckboxes[i].parentElement)){
              if(!listcheckboxes[i].disabled){
              listcheckboxes[i].checked = checked;
              }
          }
      }
}
  
function onecheckboxIsclicked(checkbox,property){
  
      sumcheckboxElements(checkbox,property);
  
}

function runSelectingAction(list,id,property){
  const actionbuttonObject = property.actionbuttons[id];
  //lage array med airtable og approvalstatus
  var records = makeSaveApprovalList(list,actionbuttonObject,property);
  //oppdater intern liste
  multiUpdatinternListApproval(records,property);
  //opdatervisuel liste
  if(property.tableid == "tbl7xtS00BVviO8kk"){
      //timeliste
      startprojectlist(listarray,list.id,false,"dato",true);
  }else if(property.tableid == "tblBFI0kCc5dfSac2"){
      //prosjektliste
      startPROlist(listarray,list.id,false,"name",false);
  }
  
  //sende til server
  updateRecordsInBatches("apphvNDlBgA5T08CM",property.tableid,records);
}
  
function makeSaveApprovalList(list,actionbuttonObject,property){
      var savelist = [];
      const listcheckboxes = list.getElementsByClassName("rowcheck");
     
     let fieldname = actionbuttonObject.fieldname;
     let usernamefield = actionbuttonObject.userfieldname;
     let value = actionbuttonObject.value;
     
      for (var i = 0;i<listcheckboxes.length;i++){
          if(isListElementVisible(listcheckboxes[i].parentElement)){
              if(!listcheckboxes[i].disabled){
                  if(listcheckboxes[i].checked){
                  let id = listcheckboxes[i].parentElement.dataset.id; 
                  var fields = {[fieldname]:value,[usernamefield]:[userairtable]};
                  savelist.push({id:id,fields:fields});
                  }
              }
          }
      }
  
      return savelist;
}
  
function multiUpdatinternListApproval(records,property){
      for (var i = 0;i<records.length;i++){
          let id = records[i].id;
          var object = findObjectProperty("airtable",id,listarray);
          //opdatere Approvalfield
          let keystosave = Object.keys(records[i].fields);
              for(var a = 0;a<keystosave.length;a++){
                  object[keystosave[a]] = records[i].fields[keystosave[a]];
              }
          if(property.tableid == "tbl7xtS00BVviO8kk"){
              //timeliste
          updateObjectProperty("airtable",id,object,totaltimerows);
          }else if(property.tableid == "tblBFI0kCc5dfSac2"){
              //prosjektliste
              updateObjectProperty("airtable",id,object,totalprosject);    
          }
      }
}

function rowClick(element,item){

    //kopiere row og legge til ny id
    const editrow = element.cloneNode(true);
    let id = element.dataset.id
    editrow.id = "edit"+id;
    editrow.dataset.rowelementid = element.id;
    editrow.classList.add("selected");
    editrow.style.margin = '5px 0';
    // Fjern alle child-elementene
    while (editrow.firstChild) {
    editrow.removeChild(editrow.firstChild);
    }
    element.parentNode.insertBefore(editrow, element);
    element.style.display = "none";
    

    var childNodes = element.childNodes;
    //list opp child elements
    for(var i = 0;i<childNodes.length;i++){
   
    if(childNodes[i].dataset.typeEditelement == "input"){
        const input = document.createElement("input");
        input.classList.add("inputcell");
        input.classList.add("edit");
        input.value = childNodes[i].textContent;
        input.placeholder = childNodes[i].dataset.labledColums;
        input.style.textAlign = childNodes[i].dataset.justify;
        editrow.appendChild(input);
    }else if(childNodes[i].dataset.typeEditelement == "date"){
       
        const input = document.createElement("input");
        input.setAttribute("type", "date");
        input.classList.add("inputcell");
        input.classList.add("edit");
        input.value = childNodes[i].dataset.date;
        input.placeholder = getTodayInISOFormat();
        input.style.textAlign = childNodes[i].dataset.justify;
        editrow.appendChild(input);

    }else if(childNodes[i].dataset.typeEditelement == "checkbox"){
        const checkbox = document.createElement("input");   
        // Sett typen til checkbox
        checkbox.type = 'checkbox';
            if(childNodes[i].dataset.status){
            checkbox.checked = true;
            }else{
            checkbox.checked = false;
            }
        checkbox.classList.add("checkboxcell");
        checkbox.classList.add("edit");
        checkbox.style.justifySelf = childNodes[i].dataset.justify;
        editrow.appendChild(checkbox);
    }else if(childNodes[i].dataset.typeEditelement == "dropdown"){

       
        console.log("dropdown",item,totalprosject);

        //lag en selector og last inn alle prosjekt
        let selector = makeSelectorElement(element,totalprosject,item.projectid);
        selector.classList.add("cellitem");
        selector.classList.add("edit");
        selector.style.justifySelf = childNodes[i].dataset.justify;
        editrow.appendChild(selector);



    }else{
        const text = document.createElement("text");   
        text.textContent = childNodes[i].textContent;
        text.classList.add("cellitem");
        text.classList.add("edit");
        text.style.justifySelf = childNodes[i].dataset.justify;
        editrow.appendChild(text);
    }

    }
    //legge til buttonwrapper
    var buttonwrapper = document.createElement("a");
    buttonwrapper.classList.add("editbuttonholder");
    const computedStyle = window.getComputedStyle(editrow);
    const columnCount = computedStyle.gridTemplateColumns.split(' ').length;
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
    editrow.appendChild(buttonwrapper);
    
    //legge til editbuttens
    var savebutton = document.createElement("button");
    savebutton.classList.add("editinfobutton");
    savebutton.classList.add("save");
    savebutton.textContent = "Lagre";
    savebutton.addEventListener('click', function() {
    saverowEdit(editrow);
    }); 
    buttonwrapper.appendChild(savebutton);


    var canclebutton = document.createElement("button");
    canclebutton.classList.add("editinfobutton");
    canclebutton.classList.add("cancle");
    canclebutton.addEventListener('click', function() {
    canclerowEdit(editrow);
    }); 
    buttonwrapper.appendChild(canclebutton);
    
    var deletebutton = document.createElement("button");
    deletebutton.classList.add("editinfobutton");
    deletebutton.classList.add("delete");
    deletebutton.classList.add("new");
    deletebutton.addEventListener('click', function() {
    deleterowEdit(editrow);
    }); 
    buttonwrapper.appendChild(deletebutton);

}

function makeSelectorElement(element,data,selectedvalue){
    //lage en ny div
    const selector = document.createElement("select");
   
    //sorter data etter data.name
    data = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });

    data.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.airtable;
        option.textContent = item.name;
        selector.appendChild(option);
    });

    //sett valgt verdi
    if(selectedvalue){
        selector.value = selectedvalue;
    }
    //legge til event
    selector.addEventListener('change', function() {
        // Handle the change event here
        console.log("Selected value:", selector.value);
    }
    );

   
    return selector;
}