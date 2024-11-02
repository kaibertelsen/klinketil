function makeFamilyList(members){

    const list = document.getElementById("familylistholder");
    //tømme listen 
    list.innerHTML = "";

    const elementlibrary = document.getElementById("elementholderfamily");
    const nodeelement = elementlibrary.querySelector('.rowmember');

    const periodselector = document.getElementById("periodeselector");
    const periodselectorvalue = periodselector.value;
    const selectedText = periodselector.options[periodselector.selectedIndex].text;

    let totalvalue = 0;
    let familymaxvaluelimit = [];
    for (let member of members) {
        // Lag en kopi av elementet
        const rowelement = nodeelement.cloneNode(true);
        rowelement.id = "member"+member.airtable;

        const membername = rowelement.querySelector(".membername");
        membername.textContent = member.membername;

        const memberage = rowelement.querySelector(".agelable");
        memberage.textContent = member.memberage+" år";

        const infotextmember = rowelement.querySelector(".infotextmember");

        let calcCost = true;
        //sjekke om dette er admin users
        if (familyObject.admin.includes(member.airtable)){
            //da er dette medlemmet admin i familien
            if(getUserObject().airtable == member.airtable){
                infotextmember.textContent = "Admin (Dette er deg)";
            }else{
                infotextmember.textContent = "Admin";
            }
        }else if(member.memberage>17){
            //medlemmet er over 18 og kostnadene skal ikke listes
            infotextmember.textContent = "Ansvar for egen kostnad";
            calcCost = false;
        }else{
            infotextmember.style.display = "none";
        }

        list.appendChild(rowelement);

        //lage subscription
       
        const subscriptionlist = rowelement.querySelector(".subscriptionlist");
        const subsctiptionrownode = subscriptionlist.querySelector(".subsctiptionrow");
        let membervalue = 0;
        const membervaluelable = rowelement.querySelector(".membervaluelable");
        if(calcCost){
            for(let sub of member.subscription){
                const rowsub = subsctiptionrownode.cloneNode(true); 

                const subname = rowsub.querySelector(".subscriptionname");
                subname.textContent = sub.name;

                const subdescription = rowsub.querySelector(".subscriptiondescription");
                if(sub?.description){
                    subdescription.textContent = sub.description;
                }else{
                    subdescription.textContent = "-";;
                }
                //verdi
                const subvalue = rowsub.querySelector(".subscriptionvalue");
                let subscriptionValue = (sub.value/sub.intervall)*Number(periodselectorvalue);
                subvalue.textContent = bigvalutaLayout(subscriptionValue)+" kr/"+selectedText;
                

                if(sub?.maxfamilyvalue){
                    //dette er er makspris sub må regnes ut seinere
                    familymaxvaluelimit.push({subId:sub.airtable,value:sub.year,maxvalue:sub.maxfamilyvalue,textelement:subvalue});
                }else{
                    membervalue = membervalue+subscriptionValue;
                }
                subscriptionlist.appendChild(rowsub);
            }
            subsctiptionrownode.remove();
            membervaluelable.textContent = bigvalutaLayout(membervalue)+" kr/"+selectedText;
        }else{
            membervaluelable.style.display = "none";
            subsctiptionrownode.remove();
        }
        totalvalue = totalvalue+membervalue;
            
    }
    if(familymaxvaluelimit.length>0){totalvalue = controllFamilyMaxLimit(familymaxvaluelimit,totalvalue);}    
    const nodesumelement = elementlibrary.querySelector('.sumfooter');
    const sumelement = nodesumelement.cloneNode(true);

    const totalsumlable = sumelement.querySelector(".totalsumlable");
    totalsumlable.textContent = bigvalutaLayout(totalvalue)+" kr/"+selectedText;
     list.appendChild(sumelement);
}

function controllFamilyMaxLimit(objectsArray, totalvalue) {

    // Bruke reduce for å summere og slå sammen objekter med samme subId
    const combinedObjects = objectsArray.reduce((acc, current) => {
        const { subId, value, maxvalue, textelement } = current;
        
        if (!acc[subId]) {
            // Hvis subId ikke eksisterer i acc, initialiser den
            acc[subId] = {
                subId,
                value: 0,
                maxvalue,
                textelement: []
            };
        }

        // Legg til verdien til eksisterende sum for dette subId
        acc[subId].value += value;

        // Legg til textelement til textelement-arrayen
        acc[subId].textelement.push(textelement);

        return acc;
    }, {});

    // Konverter det akkumulerte objektet til en array hvis ønskelig
    const resultArray = Object.values(combinedObjects);

    // Variabel for å holde total summen av de laveste verdiene
    let totalSum = 0;

    // Iterate over combinedObjects for kontroll og beregning
    resultArray.forEach(obj => {
        // Finn den laveste verdien mellom value og maxvalue
        const minValue = Math.min(obj.value, obj.maxvalue);
        
        // Legg til den laveste verdien til totalSummen
        totalSum += minValue;

        // Hvis value er større enn maxvalue, utfør oppdateringen av textelementene
        if (obj.value > obj.maxvalue) {
            const newValue = obj.maxvalue / obj.textelement.length;
            
            // Oppdater textContent og sett fargen til mørkerød for hvert textelement
            obj.textelement.forEach(textelement => {
                textelement.textContent = newValue;
                textelement.style.color = "#8B0000"; // Sett tekstfargen til mørkerød
            });
        }
    });

    // Returner total summen av laveste verdier pluss totalvalue
    return totalSum + totalvalue;
}







    