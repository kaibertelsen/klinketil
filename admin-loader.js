//admin-loader.js - Laster inn nødvendige skript for klientadmin-siden
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(`Failed to load script: ${url}`);
        document.head.appendChild(script);
    });
}

// Liste over CDN-URL-er som skal lastes inn
const cdnScripts = [
    "https://kaibertelsen.github.io/klinketil/adminpages/afterclick-functions.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/createlements.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/mindeltab.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/export.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/listfunction.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/mergecontroll.js",
    "https://kaibertelsen.github.io/klinketil/adminpages/startupklientadmin.js"
    
];

// Hardkodede bruker-IDer med begrenset tilgang (kun Timeføring-fanen)
const limitedAccessUsers = [
    "647725ae6db4c30002fb5ed1",   // Navn/beskrivelse
    "64ad93e366648b00023aedf2"  // Navn/beskrivelse
];

// Kalles fra Webflow-scriptet med member.id etter innlogging
function applyLimitedAccess(memberId) {
    if (!limitedAccessUsers.includes(memberId)) return;

    ["tabprojecterbutton", "tabuserbutton", "tabeksportbutton", "mindeltabbutton"]
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = "none";
        });
}

// Laste inn alle skriptene sekvensielt
cdnScripts.reduce((promise, script) => {
    return promise.then(() => loadScript(script));
}, Promise.resolve()).then(() => {
    console.log("All scripts loaded");
    mindelControll();
}).catch(error => {
    console.error(error);
});
