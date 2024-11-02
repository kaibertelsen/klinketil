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

    totalvalue = controllFalilyMaxLimit(familymaxvaluelimit,totalvalue);
    const nodesumelement = elementlibrary.querySelector('.sumfooter');
    const sumelement = nodesumelement.cloneNode(true);

    const totalsumlable = sumelement.querySelector(".totalsumlable");
    totalsumlable.textContent = bigvalutaLayout(totalvalue)+" kr/"+selectedText;
     list.appendChild(sumelement);
}

function controllFalilyMaxLimit(familymaxvaluelimit,totalvalue){

    let summArray = [];

    if(familymaxvaluelimit.length>0){


    }
    return totalvalue
}