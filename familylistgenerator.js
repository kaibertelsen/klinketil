function makeFamilyList(members){

    const list = document.getElementById("familylistholder");
    const elementlibrary = document.getElementById("elementholderfamily");
    const nodeelement = elementlibrary.querySelector('.rowmember');
    for (let member of members) {
        // Lag en kopi av elementet
        const rowelement = nodeelement.cloneNode(true);
        rowelement.id = "member"+item.airtable;

        const membername = rowelement.querySelector(".membername");
        membername.textContent = item.membername;

        const memberage = rowelement.querySelector(".agelable");
        memberage.textContent = item.memberage;


        //lage subscription

        list.appendChild(rowelement);
    }
}
