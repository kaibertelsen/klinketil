function creatNewWrapper(list,addbutton,data){

    var exist = false;

    if(data?.airtable){
        exist=true;
    }

    if(document.getElementById("row-new")){
        if(document.getElementById("row-new").dataset.hideid){
        document.getElementById(document.getElementById("row-new").dataset.hideid).style.display = "grid";
        }
        document.getElementById("row-new").remove();
    }

    const property = propertylist;
    //lage wrapper
    const newWrapper = document.createElement("newWrapper");
        newWrapper.id = "row-new";
        if(exist){
            newWrapper.dataset.airtable = data.airtable
            //skul opprinnelig row
            addbutton.style.display = "none";
            newWrapper.dataset.hideid = addbutton.id;
        };
        newWrapper.classList.add("projectrow");
        addbutton.insertAdjacentElement('afterend', newWrapper);

    //Lage beskrivende tekst
    const   text = document.createElement("text");  
        if(data?.Nr){
            text.textContent = data.Nr+" Oppdater prosjekt";
        }else{
            text.textContent = "Opprett nytt prosjekt";
        } 
        
        text.style.gridColumn = '1';
        text.style.gridRow = '1'; 
        newWrapper.appendChild(text);
    
    //Lage gruppe selector
    const selectElement = document.createElement('select');
        //load group
        const options =  makegroupOptins(totalgroup);
        options.unshift({text:"Ingen gruppe",value:""});
        loadselector(selectElement,options);
        if(data?.group){
            selectElement.value = data.group[0];
        };
        selectElement.classList.add("tidselector");
        selectElement.classList.add("w-select");
        selectElement.classList.add("saveelement");
        selectElement.style.gridColumn = '1';
        selectElement.style.gridRow = '3'; 
        selectElement.dataset.key = "group";
        selectElement.id = "groupupdateselector";
        selectElement.dataset.id = selectElement.id;
        selectElement.dataset.type = "value";
        newWrapper.appendChild(selectElement);
   
    //Lage input for Prosjektnavn
    const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.classList.add("inputtext");
        inputField.classList.add("saveelement");
        if(data?.name){inputField.value = data.name};
        inputField.placeholder = "Prosjektnavn";
        inputField.style.gridColumn = '1';
        inputField.style.gridRow = '2';
        inputField.dataset.key = "name";
        inputField.dataset.obligatorisk = "true";
        inputField.dataset.name = "Prosjekt";
        inputField.id = "imputprojectname";
        inputField.dataset.id = inputField.id;
        inputField.dataset.type = "value";
        newWrapper.appendChild(inputField);    
    
    //Lage input for søk etteransvarlige
    const dropdowndiv = document.createElement('div');
    dropdowndiv.style.gridColumn = '1';
    dropdowndiv.style.gridRow = '5'; 
    dropdowndiv.style.position = 'relative';
    newWrapper.appendChild(dropdowndiv);

        const sokinputField = document.createElement('input');
        sokinputField.type = 'text';
        sokinputField.id = "sokinputField";
        sokinputField.classList.add("inputtext");
        sokinputField.placeholder = "Legg til ansvarlige";
        sokinputField.onkeyup = function() {
            filterFunctionuser("responsibledropdown","sokinputField");
        };
        dropdowndiv.appendChild(sokinputField);
        
        const dropdowncontent = document.createElement('div');
        dropdowncontent.id = "responsibledropdown";
        dropdowncontent.classList.add("dropdownwrapper");
        dropdowncontent.style.display = "none";
         //
    const userwraper = document.createElement('div');
    userwraper.style.gridColumn = '1';
    userwraper.style.gridRow = '4'; 
    userwraper.style.justifySelf = "start";
    newWrapper.appendChild(userwraper);
    //last inn brukere på prosjektet
    if(data?.responsible){
            //prosjektet har ansvarlige last inn
            for(var i = 0;i<data.responsible.length;i++){
                var object = {airtable:data.responsible[i],name:data.responsiblename[i]};
                projectUserloading(userwraper,object);
            }
    }

    //laste inn alle brukerne med id og navn
    const responsibleoptions =  makeresponseOptins(prosjectuser);
    loadDropdownresponsible(responsibleoptions,dropdowncontent,userwraper,sokinputField);
    dropdowndiv.appendChild(dropdowncontent);

   

    //lage textarea
    const textArea = document.createElement('textarea');
    textArea.placeholder = 'Beskrivelse';
    textArea.classList.add("inputtext");
    textArea.classList.add("saveelement");
    textArea.style.gridColumn = '1';
    textArea.style.gridRow = '6';
    textArea.dataset.key = "note";
    if(data?.note){textArea.value = data.note;};
    textArea.id = "noteprojectname";
    textArea.dataset.id = textArea.id;
    textArea.dataset.type = "value";
    newWrapper.appendChild(textArea);

    let editwrapperRow = '7';
    
    if(klientObject?.targetproinadmin){
        editwrapperRow = '8'
        // klient har target project rettigheter
        //Lage felt for checkbox og labletekst, samt timeprisfelt
        const targetwraper = document.createElement('div');
        targetwraper.style.gridColumn = '1';
        targetwraper.style.gridRow = '7'; 
        targetwraper.classList.add("checkboxholder");
        newWrapper.appendChild(targetwraper);
        //
        const checkbox = document.createElement("input");   
        checkbox.type = 'checkbox';
            if(data?.target){
                if(data.target){
                    checkbox.checked = true;
                } 
            };
        checkbox.classList.add("checkboxcell");
        checkbox.classList.add("saveelement");
        checkbox.dataset.key = "target";
        checkbox.dataset.type = "checkbox";
        targetwraper.appendChild(checkbox);
        //
        const   lable = document.createElement("text");
        lable.textContent = "Mindel prosjekt";
        lable.classList.add("lablecheckbox");
        targetwraper.appendChild(lable);
        //
        const timevaluefield = document.createElement('input');
        timevaluefield.type = 'number';
        if(data?.valuetimepris){timevaluefield.value = data.valuetimepris};
        timevaluefield.classList.add("inputtext");
        timevaluefield.classList.add("saveelement");
        timevaluefield.dataset.key = "valuetimepris";
        timevaluefield.dataset.type = "number";
        timevaluefield.placeholder = "Sett timepris";
        if(checkbox.checked){timevaluefield.style.display = "block"}else{
        timevaluefield.style.display = "none";
        }
        targetwraper.appendChild(timevaluefield);

        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                // Kjør denne funksjonen når checkboxen er valgt
                timevaluefield.style.display = "block";
            } else {
                // Kjør denne funksjonen når checkboxen ikke er valgt
                timevaluefield.style.display = "none";
            }
        });
    }

    //legge til editorbuttons
    const editwraper = document.createElement('div');
    editwraper.style.gridColumn = '1';
    editwraper.style.gridRow = editwrapperRow; 
    editwraper.classList.add("editbuttonholder");
    newWrapper.appendChild(editwraper);

        var savebutton = document.createElement("button");
        savebutton.classList.add("editinfobutton");
        savebutton.classList.add("save");
        savebutton.textContent = "Lagre";
        savebutton.style.display = "inline-block";
        savebutton.addEventListener('click', function() {
            updateProject(newWrapper);    
        }); 
        editwraper.appendChild(savebutton);

        var canclebutton = document.createElement("button");
        canclebutton.classList.add("editinfobutton");
        canclebutton.classList.add("cancle");
        canclebutton.style.display = "inline-block";
        canclebutton.addEventListener('click', function() {
            cancleProject(newWrapper);    
        }); 
        editwraper.appendChild(canclebutton);

        if(exist){
        //hvis dette er et opprettet prosjekt
        var deletebutton = document.createElement("button");
        deletebutton.classList.add("editinfobutton");
        deletebutton.classList.add("delete");
        deletebutton.style.display = "inline-block";
        deletebutton.addEventListener('click', function() {
            deleteProject(newWrapper);    
        }); 
        editwraper.appendChild(deletebutton);
        }
}   

function makegroupOptins(data){
    var array = [];
        for(var i=0;i<data.length;i++){
        array.push({text:data[i].name,value:data[i].airtable});
        }
    return array;
}
function filterFunctionuser(dropdownid,inputid) {
    var input, filter, div, a, i;
    input = document.getElementById(inputid);
    filter = input.value.toUpperCase();
    div = document.getElementById(dropdownid);
    a = div.getElementsByTagName("a");
    //resette supplierid
    input.dataset.airtable = "";
    // Show the dropdown menu
    if(input.value == ""){
    div.style.display = "none";
    }else{
    div.style.display = "block";
    }
    const referenceWidth = input.offsetWidth;
    div.style.width = referenceWidth + 'px';
    div.style.backgroundColor = 'white';
    let listlenght = 0;
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "block";
        } else {
            a[i].style.display = "none";
        }
    }

    div.style.bottom = '-'+div.offsetHeight+'px';

}
function makeresponseOptins(data){
    var array = [];
        for(var i=0;i<data.length;i++){
        array.push({text:data[i].name,value:data[i].airtable});
        }
    return array;
}
function loadDropdownresponsible(data,dropdownMenu,userwrapper,inputfield) {
    dropdownMenu.innerHTML = '';
    data.forEach(item => {
        var a = document.createElement("a");
        a.href = "#";
        a.textContent = item.text;
        a.dataset.id = item.value; // Store id in a data attribute
        a.style.display = "block";
        a.classList.add("dropdownitem");
        a.onclick = function() {
            projectUserSelected(a,dropdownMenu,userwrapper,inputfield);
        };
        dropdownMenu.appendChild(a);
    });
}
function projectUserSelected(element,dropdownMenu,userwrapper,inputfield){
dropdownMenu.style.display = "none";
inputfield.value = "";

//legge til bruker
const textwrapper = document.createElement('div');
textwrapper.classList.add("puseruserwrapper");
userwrapper.appendChild(textwrapper);

const text = document.createElement('text');
text.textContent = element.textContent;
text.dataset.id = element.dataset.id;
text.dataset.key = "responsible";
text.classList.add("usertext");
text.classList.add("puser");
textwrapper.appendChild(text);

const removebutton = document.createElement('button');
removebutton.classList.add("removeuser");
removebutton.onclick = function() {
    removeprojectUser(textwrapper);
};
textwrapper.appendChild(removebutton);
}
function projectUserloading(userwrapper,data){
    //legge til bruker
    const textwrapper = document.createElement('div');
    textwrapper.classList.add("puseruserwrapper");
    userwrapper.appendChild(textwrapper);
    
    const text = document.createElement('text');
    text.textContent = data.name;
    text.dataset.id = data.airtable;
    text.dataset.key = "responsible";
    text.classList.add("usertext");
    text.classList.add("puser");
    textwrapper.appendChild(text);
    
    const removebutton = document.createElement('button');
    removebutton.classList.add("removeuser");
    removebutton.onclick = function() {
        removeprojectUser(textwrapper);
    };
    textwrapper.appendChild(removebutton);
}
function removeprojectUser(textwrapper){
    textwrapper.remove();
}
function deleteProject(newWrapper){
    let deleteid = newWrapper.dataset.airtable;
    const userChoice = confirm("Er du sikker på at du vil slette?");
    // Sjekk om brukeren valgte "Ja" eller "Nei"
    if (userChoice) {
        //Slette object i array
        DELETEairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",deleteid,"responsdeleteproject");
        document.getElementById(newWrapper.dataset.hideid).remove();
        newWrapper.remove();
       //fjerne object fra array
       totalprosject = totalprosject.filter(item => item.airtable !== deleteid);
       listarray = listarray.filter(item => item.airtable !== deleteid);
    } else {
        // Brukeren trykket "Nei"
    }


}
function responsdeleteproject(data,id){
//
console.log(data);
}
function cancleProject(newWrapper){
    newWrapper.remove();
     // show addknappen
     document.getElementById("add-new").style.display = "inline-block";

     //eventuelt se orginalrow
    if(newWrapper.dataset.hideid){
        document.getElementById(newWrapper.dataset.hideid).style.display = "grid";
    }


}
function updateProject(newWrapper){

    const elementsWithSave = newWrapper.querySelectorAll('.saveelement');
    var stop = false;
    var saveobject = {};
    elementsWithSave.forEach(element => {
      if(element.dataset.key){
        //dette er et save element
        let content = "";
        if(element.dataset.type == "value"){
            if(element.dataset.key == "group"){
                if(element.value == ""){
                    content = "";
                }else{
                    //finne gruppenavnet
                   saveobject.groupname =  [element.options[element.selectedIndex].text];
                content = [element.value];
                }
            
            }else{
            content = element.value;
        }
        }else if(element.dataset.type == "number"){
            content = parseInt(element.value.match(/\d+/), 10);
        }else if(element.dataset.type == "text"){
            content = element.textContent;
        }else if(element.dataset.type == "checkbox"){
          if(element.checked){
            content = true;
          }else{
            content = false;
          }
        }
       /*
        if(content !== ""){
        saveobject[element.dataset.key] = content;
        }
        */
        saveobject[element.dataset.key] = content;
        //sjekke om det er obligatorisk
        if(element.dataset.obligatorisk && content == ""){
            alert(element.dataset.name+" feltet er ikke fylt ut!");
            stop = true;
        }
    }

    });
    const prosjectusers = newWrapper.querySelectorAll('.puser');
    var puserarray = [];
    var puserarrayname = [];
    let key;
    var isusers = false;
    prosjectusers.forEach(element => { 
        puserarray.push(element.dataset.id);
        puserarrayname.push(element.textContent);
        key = element.dataset.key;
        isusers = true;
    });

    if(isusers){
        saveobject.responsible = puserarray;
        saveobject.responsiblename = puserarrayname;
    }else{
        saveobject.responsible = [];
        saveobject.responsiblename = [];
    }

    //om det er et nytt target element så skal det gule hjertet legges på 
    if(saveobject.target){
        if (saveobject.name.endsWith("💛")) {
        // ok
        }else{
            saveobject.name = saveobject.name+" 💛";
        }
    }
    //legge til klient id
    saveobject.aklient = [klientairtable];
    saveobject.klient = klientid;

    if(!stop){
    // save/ oppdater objectet
    if(newWrapper.dataset.airtable){
        saveobject.airtable = newWrapper.dataset.airtable;
    }
    projectToRow(newWrapper,saveobject);
    prosjectToServer(saveobject);
    
    // show addknappen
    document.getElementById("add-new").style.display = "inline-block";
    }

}
function projectToRow(newWrapper,saveobject){
    if(document.getElementById(newWrapper.dataset.hideid)){
        //det er et eksisterende element
        const row = document.getElementById(newWrapper.dataset.hideid);
        const orginal = findObjectProperty("airtable",newWrapper.dataset.airtable,listarray);
        const newobject = mergeObjects(saveobject, orginal);
        const newrow = generateRowObject(newobject,row.parentElement,propertylist,{});
        if (row.classList.contains('pair')) {
            newrow.classList.add("pair"); 
        }
        row.parentElement.insertBefore(newrow, row);
        row.remove();
        //oppdater listen internt
        updateObjectProperty("airtable",newWrapper.dataset.airtable,newobject,listarray);
        updateObjectProperty("airtable",newWrapper.dataset.airtable,newobject,totalprosject);
        saveobject.update = true;
    }else{
        const list = document.getElementById(propertylist.listid);
        const newrow = generateRowObject(saveobject,list,propertylist,{});
        if (!newWrapper.nextElementSibling.classList.contains('pair')) {
            newrow.classList.add("pair"); 
        }
        newWrapper.insertAdjacentElement('afterend', newrow);
        newrow.id = "newProjectrow";
        saveobject.update = false;
    }

    newWrapper.remove();
    
}
function prosjectToServer(saveobject){
    let id = saveobject.airtable
    delete saveobject.airtable;
    saveobject.creatoruser = [userairtable];
    delete saveobject.responsiblename;
    delete saveobject.statusintern;
    delete saveobject.groupname;

  if(saveobject.update){
    delete saveobject.update;
    PATCHairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",id,JSON.stringify(saveobject),"saveProjectretur");
    }else{
    delete saveobject.update;
    //save nytt
    POSTairtable("apphvNDlBgA5T08CM","tblBFI0kCc5dfSac2",JSON.stringify(saveobject),"newProjectretur");
    }
}
function saveProjectretur(data,id){
    if(findObjectProperty("airtable",data.id,totalprosject)){
    //oppdater listen internt
    updateObjectProperty("airtable",data.id,data.fields,totalprosject);
    }else{
    totalprosject.push(data.fields);
    }
console.log(data);
}
function newProjectretur(data,id){
    
    //det er et nytt prosjekt
    totalprosject.push(data.fields);
    const row = document.getElementById("newProjectrow");
    const list = row.parentElement;
    const newrow = generateRowObject(data.fields,list,propertylist,{});
    if (row.classList.contains('pair')) {
        newrow.classList.add("pair"); 
    }
    row.insertAdjacentElement('afterend', newrow);
    row.remove();
    
console.log(data);
}