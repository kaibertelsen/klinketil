function makeFamilyList(members){

    const list = document.getElementById("familylistholder");
    const elementlibrary = document.getElementById("elementholderfamily");
    const nodeelement = elementlibrary.querySelector('.rowmember');

    let totalvalue = 0;
    for (let member of members) {
        // Lag en kopi av elementet
        const rowelement = nodeelement.cloneNode(true);
        rowelement.id = "member"+member.airtable;

        const membername = rowelement.querySelector(".membername");
        membername.textContent = member.membername;

        const memberage = rowelement.querySelector(".agelable");
        memberage.textContent = "("+member.memberage+")";

        list.appendChild(rowelement);

        //lage subscription
       
        const subscriptionlist = rowelement.querySelector(".subscriptionlist");
        const subsctiptionrownode = subscriptionlist.querySelector(".subsctiptionrow");
        let membervalue = 0;
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
                
                const subvalue = rowsub.querySelector(".subscriptionvalue");
                subvalue.textContent = bigvalutaLayout(sub.value)+" kr/år";
                membervalue = membervalue+sub.value;

                subscriptionlist.appendChild(rowsub);
            }
            subsctiptionrownode.remove();

        const membervaluelable = rowelement.querySelector(".membervaluelable");
        membervaluelable.textContent = membervalue+" kr/år";
        totalvalue = totalvalue+membervalue;
            
    }

    const nodesumelement = elementlibrary.querySelector('.sumfooter');
    const sumelement = nodesumelement.cloneNode(true);

    const totalsumlable = sumelement.querySelector(".totalsumlable");
    totalsumlable.textContent = bigvalutaLayout(totalvalue)+" kr/år";
     list.appendChild(sumelement);
}
