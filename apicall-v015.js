function createbodystring(fieldnames,fieldvalues){
  // lag bodystrin for apicall
  let bodystring="{";
  for (let i = 0; i < fieldnames.length; i++) {
    //for hver enhet i fieldnames
    if(Array.isArray(fieldvalues[i])){
       //om det er et arrayfelt
       let subitem = "";
       var subitemarray = fieldvalues[i];
       for (let i = 0; i < subitemarray.length; i++) {
           //loope gjennom alle subitem
           subitem = subitem+'"'+subitemarray[i]+'"'+',';
       }
       subitem = subitem.slice(0, -1)
  
     bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+"["+subitem+"]"+",";
     }else if(fieldvalues[i]=="true"){
    //om det er et booleanfelt
          bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+true+",";
     }else if (fieldvalues[i]=="false"){
    //om det er et booleanfelt
    bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+false+",";
     }else{
     // vanlig tekstfelt
    bodystring = bodystring+'"'+fieldnames[i]+'"'+":"+'"'+fieldvalues[i]+'"'+",";
     }
         }
    //fjerner siste ","	   
  bodystring = bodystring.slice(0, -1)
  bodystring = bodystring+"}";
  return (bodystring);
  }

function makeupdatebodystring(data){
  // lag bodystrin for å oppdatere webflowid
  let bodystring="{"+'"name"'+":"+'"'+data.name+'"'+","+'"webflow"'+":"+'"'+data._id+'"'+"}";
  return (bodystring);
  }


function apireturnnew (data,fid){
  //retur fra opprettelsen av webflow item
  let bodystring = makeupdatebodystring(data);
  callapi("",collectionId,data._id,bodystring,"PATCH","webflow",fid);
}

async function callapi(baseId,collectionId,itemId,bodystring,type,db,fid){
// fra memberstack
let token = MemberStack.getToken();
//PATCH
if(type == "PATCH"){
    if(db=="webflow"){
    //webflow
    let response2 = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`, {
     method: "PATCH",
     body: bodystring,
     headers: {
    'Content-Type': 'application/json'
    }
    });
    let data2 = await response2.json();
    apireturn (data2,fid);
    }else if(db=="airtable"){
    //airtable
    let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?baseId=${baseId}&tableId=${collectionId}&rowId=${itemId}&token=${token}`, {
      method: "PATCH",
      body:bodystring,
        headers: {
         'Content-Type': 'application/json'
        }
        
    });
    let data = await response.json();
    apireturn (data,fid);
   }
//POST
}else if (type=="POST"){
   if(db=="webflow"){
   //webflow
   let response = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&token=${token}`, {
      method: "POST",
      body: bodystring,
      headers: {
         "content-type": "application/json"
      }
    });
    
    let data = await response.json();
    apireturnnew (data,fid);
    
   }else if(db=="airtable"){
   //airtable
   let response = await fetch(`https://expoapi-zeta.vercel.app/api/row?baseId=${baseId}&tableId=${collectionId}&token=${token}`, {
   method: "POST",
   body:bodystring,
   headers: {
   'Content-Type': 'application/json'
    }
   });
   let data = await response.json();
   apireturn (data,fid);
     }
   }else if (type=="DELETE"){
       if(db=="webflow"){
       //webflow
     let response = await fetch(`https://webflow-woad.vercel.app/api/item?collectionId=${collectionId}&itemId=${itemId}&token=${token}`, {
      method: "DELETE"
    });

    let data = await response.json();
    apireturnnew (data,fid);
       }
   }

}
