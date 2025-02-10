
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

  function rowdirectClick(rowid){
      //
      const rowelement = document.getElementById(rowid);
      let dataitemid = rowelement.dataset.id;
      if(propertylist.tableid == "tblBFI0kCc5dfSac2"){
          //dette er prosjekttabellen og skal åpnes på en annen måte
          const project = findObjectProperty("airtable",dataitemid,totalprosject);
          creatNewWrapper(rowelement.parentElement,rowelement,project);
      }else{
      rowClick(rowelement);
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