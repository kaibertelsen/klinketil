function maketimearrayFromProject(data){
    if(data?.timer){
        const idarray = data.timer;
        const datearray = data.datotimer;
        const namearray = data.nametimer;
        const kommentararray = data.kommentartimer;
        const timeverdiarray = data.timeverditimer;
        const timeunitvalue = data.timeunitvalue;
        const valuenumberarray = data.valuenumbertimer;
        const approvalrarray = data.approvaltimer;
        const projectid = data.airtable;
        const projectname = data.name;
        const lock = data.locktimer;
        const userage = data.userage;
        const userexportid = data.userexportid;
        const userkontonr = data.userkontonr;
        const timenr = data.timenr;
        const useremail = data.useremail;
        const userairtable = data.userairtable;
        const teamname = data.teamname;
        
        // Eksempel på kall til funksjonen
            let controll = checkArrayLengths(data);
        if(!controll){
        return [];
        }
    
    
        var groupname = "";
        var group = "";
        var target = false;
        var valuetimepris = 0;
        var unitlabel = data.unitlabel || "";
        
        if(data?.valuetimepris){
        valuetimepris = data.valuetimepris;
        }

        if(data?.target){
            target = true;  
        }



        if(data?.group){
            groupname = data.groupname[0];
            group = data.group[0];
        }
            
            var array = [];
        for(var i = 0;i<idarray.length;i++){
        
            var komment = kommentararray[i];
            if(timeunitvalue[i]>0){
                    komment = "("+timeunitvalue[i]+" "+unitlabel+") "+kommentararray[i];
            }
                    array.push({
                        valuetimepris:valuetimepris,
                        timeunitvalue:timeunitvalue[i],
                        unitlabel:unitlabel,
                        target:target,
                        group:group,
                        groupname:groupname,
                        useremail:useremail[i],
                        userkontonr:userkontonr[i],
                        timenr:timenr[i],
                        userexportid:userexportid[i],
                        userage:userage[i],
                        lock:lock[i],
                        projectname:projectname,
                        airtable:idarray[i],
                        projectid:projectid,
                        dato:datearray[i],
                        name:namearray[i],
                        kommentar:komment,
                        timeverdi:timeverdiarray[i],
                        valuenumber:valuenumberarray[i],
                        approval:approvalrarray[i],
                        userairtable:userairtable[i],
                        teamname:teamname[i]
                    });  
        } 
                return array;
    }else{
            return [];
    }

}

function prosjektretur(data,id){
    //loade en selector (prosjekter)
    totalprosject = rawdatacleaner(data);

    klientairtable = getAirtableKlientFromProject(totalprosject);
    const sortlist = sortArrayABC("name",totalprosject);
    var prosjektgroup = loadProjectgroup(sortlist);

    if(prosjektgroup.length>0){
        document.getElementById("groupselector").style.display = "block";
        prosjektgroup.unshift({text:"Alle grupper",value:""});
        loadselector(document.getElementById("groupselector"),prosjektgroup)
    }else{
        document.getElementById("groupselector").style.display = "none";
    }

    var options = makeOptionsFromProjectlist(sortlist);
    options.unshift({text:"Alle prosjekter",value:""});
    loadselector(document.getElementById("projectselector"),options);


    //lage total timeliste
    totaltimerows = makeTotaltimeList(sortlist);
    
    //om det er en klient som skal ha team selector last denne
    loadTeamselectorIfKlient(totaltimerows);
       
    //datovelger
    const selector = document.getElementById("dashboarddateselector");
    var data =  periodArrayCleaner("dato","dato",selector,totaltimerows);

    //starte listevisning
    startprojectlist(data,"projectlisttable",true,"dato",true);
    
    //hente klientdata
    getklientData();

    
    
}

function loadTeamselectorIfKlient(data){
    
    let teamlist = getUniqueTeamNames(data)
    //sorter alfabetisk
    teamlist.sort((a, b) => a.localeCompare(b));
    console.log(teamlist);
    loadTeamnameinSelector(teamlist);

}

function getUniqueTeamNames(data) {
    return [...new Set(data.map(item => item.teamname))];
  }

  function loadTeamnameinSelector(data) {
    const selector = document.getElementById("dashboardteamselector");
    if (!selector) return;
  
    // Sjekk om data er tom eller bare består av "0"
    const onlyZero = data.length === 0 || (data.length === 1 && data[0] === "0");
    if (onlyZero) {
      selector.style.display = "none";
      return;
    }
  
    // Fjern tidligere options
    selector.innerHTML = "";
  
    // Legg til en standard option
    const defaultOption = document.createElement("option");
    defaultOption.text = "-- Velg team --";
    defaultOption.value = "";
    selector.appendChild(defaultOption);
  
    // Legg til alle team
    data.forEach(team => {
      const option = document.createElement("option");
      option.value = team;
  
      // Hvis teamnavn er "0", vis "Team ikke tildelt"
      option.text = (team === "0") ? "Team ikke tildelt" : team;
  
      selector.appendChild(option);
    });
  }
  
  function selectorTimelist(){
   
    //datovelger
    var displaylist =  periodArrayCleaner("dato","dato",document.getElementById("dashboarddateselector"),totaltimerows);
    
    //gruppevelger
    if(document.getElementById("groupselector").value == ""){
        //gruppe er ikke valgt
    }else{
        //gruppe er valgt begrens til gruppe
    displaylist = findAllTimeronGroup(document.getElementById("groupselector").value,displaylist);
    }
    
    //prosjektvelger
    if(document.getElementById("projectselector").value == ""){

    }else{
        displaylist = projectArrayCleaner(displaylist,projectselector.value);
    }

    //teamvelger
    if(document.getElementById("dashboardteamselector").value == ""){
        //team er ikke valgt
    }else{
        //team er valgt begrens til team
        displaylist = findAllTimeronTeamname(document.getElementById("dashboardteamselector").value,displaylist);
    }
    startprojectlist(displaylist,"projectlisttable",true,"dato",true);
}

function findAllTimeronTeamname(teamname,array){
    var newarray = array.filter(item => item.teamname === teamname);
    return newarray;
}

document.getElementById("dashboardteamselector").addEventListener("change", (e) => {
    selectorTimelist();
});