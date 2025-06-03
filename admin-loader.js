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
    "https://kaibertelsen.github.io/klinketil/adminpages/mergecontroll.js"
];

// Laste inn alle skriptene sekvensielt
cdnScripts.reduce((promise, script) => {
    return promise.then(() => loadScript(script));
}, Promise.resolve()).then(() => {
    console.log("All scripts loaded");
    mindelControll();
}).catch(error => {
    console.error(error);
});
