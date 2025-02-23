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
                subdescription.style.display = "none";
                //verdi
                const subvalue = rowsub.querySelector(".subscriptionvalue");
                let subscriptionValue = 0;
                if(sub?.maxfamilyvalue){
                    //dette er er makspris sub må regnes ut seinere
                    let resultatobject = setSubscriptionValueControll(member,members,sub,globalsubscriptions)
                    if(resultatobject.isRegulert){
                        subvalue.style.color = "#8B0000"; // Sett tekstfargen til mørkerød
                        subdescription.style.color = "#8B0000"; // Sett tekstfargen til mørkerød
                        subdescription.textContent = "Makspris/ famillie "+sub.maxfamilyvalue+"kr/år";
                        subdescription.style.display = "block";
                    }
                    
                    membervalue += (resultatobject.resultat/12)*Number(periodselectorvalue);
                    subscriptionValue = (resultatobject.resultat/12)*Number(periodselectorvalue);

                }else{
                    membervalue += (sub.value/sub.intervall)*Number(periodselectorvalue)
                    subscriptionValue = (sub.value/sub.intervall)*Number(periodselectorvalue);
                }

                subvalue.textContent = bigvalutaLayout(subscriptionValue)+" kr/"+selectedText;
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

    const nodesumelement = elementlibrary.querySelector('.sumfooter');
    const sumelement = nodesumelement.cloneNode(true);

    const totalsumlable = sumelement.querySelector(".totalsumlable");
    totalsumlable.textContent = bigvalutaLayout(totalvalue)+" kr/"+selectedText;
     list.appendChild(sumelement);
}




function setSubscriptionValueControll(member, members, sub, familyObject) {
    // Filtrerer medlemmer som har et abonnement med samme sub.airtable-verdi
    // og enten alder < 18 eller er admin
    const sameSubscriptionCount = members.filter(m => 
        // Sjekker om noen abonnementer i m.subscription matcher sub.airtable
        m.subscription.some(subscriptionM => subscriptionM.airtable === sub.airtable) &&
        // Sjekker om medlemmet er under 18 eller er admin
        (m.memberage < 18 || familyObject.admin.includes(m.airtable))
    ).length;

    // Sjekker om controllsum er mindre enn sub.year og setter boolsk verdi deretter
    const controllsum = sub.maxfamilyvalue / sameSubscriptionCount;
    const isRegulert = controllsum < sub.year;

    let resultat = sub.year;
    if(isRegulert){
    // Beregner delverdien ved å dele sub.maxfamilyvalue på antall medlemmer med samme abonnement
    resultat = sub.maxfamilyvalue / sameSubscriptionCount;
    }


    // Returnerer resultat og boolean verdi
    return { resultat, isRegulert };
}











/*
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

    // Konverter det akkumulerte objektet til en array
    const resultArray = Object.values(combinedObjects);

    // Variabel for å holde total summen av de laveste verdiene
    let totalSum = 0;

    const periodselector = document.getElementById("periodeselector");
    const periodselectorvalue = periodselector.value;
    const selectedText = periodselector.options[periodselector.selectedIndex].text;

    // Iterate over combinedObjects for kontroll og beregning
    resultArray.forEach(obj => {
        // Finn den laveste verdien mellom value og maxvalue
        const minValue = Math.min(obj.value, obj.maxvalue);
        
        // Legg til den laveste verdien til totalSummen
        totalSum += minValue/12*periodselectorvalue;

        // Hvis value er større enn maxvalue, utfør oppdateringen av textelementene
        if (obj.value > obj.maxvalue) {
            const newValue = (obj.maxvalue / obj.textelement.length)/12*periodselector.value;
            
            // Oppdater textContent og sett fargen til mørkerød for hvert textelement
            obj.textelement.forEach(textelement => {
                textelement.textContent = bigvalutaLayout(newValue)+" kr/"+selectedText;
                textelement.style.color = "#8B0000"; // Sett tekstfargen til mørkerød
            });
        }
    });

    // Returner total summen av laveste verdier pluss totalvalue
    return totalSum + totalvalue;
}
*/


