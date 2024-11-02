window.onload = function() {
    initTimeViewer();
};

function initTimeViewer() {
    // Hent verdiene for timer og minutter fra HTML-elementene
    const hourText = document.getElementById("hourviewer").innerText;
    const minuteText = document.getElementById("minutsviewer").innerText;

    // Konverter tekstverdiene til tall
    const hours = parseInt(hourText, 10);
    const minutes = parseInt(minuteText, 10);

    // Beregn den totale verdien i timer (inkludert minuttene konvertert til timer)
    const totalHoursValue = hours + minutes / 60;

    // Kall `startTimeViewer` med den beregnede verdien
    startTimeViewer(totalHoursValue);
}

function startTimeViewer(hoursvalue) {
    let timeviewerwrapper = document.getElementById("timeviewerwrapper");
    let hourviewer = document.getElementById("hourviewer");
    let minutsviewer = document.getElementById("minutsviewer");
    let monthviewer = document.getElementById("monthviewer");

    // Konverter timeverdi til antall timer og minutter
    let totalMinutes = hoursvalue * 60;
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    // Få nåværende måned på norsk
    const currentDate = new Date();
    const monthNames = [
        "Januar", "Februar", "Mars", "April", "Mai", "Juni",
        "Juli", "August", "September", "Oktober", "November", "Desember"
    ];
    monthviewer.innerText = monthNames[currentDate.getMonth()];

    // Animasjon for å telle opp timene raskt
    let currentHour = 0;
    let currentMinute = 0;

    // Beregn intervallene for å nå 2 sekunder totalt
    const hourIntervalTime = 1000 / hours; // For å nå toppen på omtrent 1 sekund
    const minuteIntervalTime = 1000 / minutes; // For å nå toppen på omtrent 1 sekund

    // Funksjon for å lage "dunk"-effekten
    function bounceEffect(element) {
        element.style.transition = "transform 200ms ease";
        element.style.transform = "scale(1.2)";
        setTimeout(() => {
            element.style.transform = "scale(1)";
        }, 200);
    }

    // Start tellingen for hourviewer
    const hourInterval = setInterval(() => {
        if (currentHour < hours) {
            currentHour++;
            hourviewer.innerText = String(currentHour).padStart(2, '0');
        } else {
            clearInterval(hourInterval);
            hourviewer.innerText = String(hours).padStart(2, '0'); // Sikre at sluttverdi også har to sifre
            bounceEffect(hourviewer); // Legg til "dunk"-effekt når tellingen er ferdig
        }
    }, hourIntervalTime);

    // Start tellingen for minutsviewer med et delay på 500ms
    setTimeout(() => {
        const minuteInterval = setInterval(() => {
            if (currentMinute < minutes) {
                currentMinute++;
                minutsviewer.innerText = String(currentMinute).padStart(2, '0');
            } else {
                clearInterval(minuteInterval);
                minutsviewer.innerText = String(minutes).padStart(2, '0'); // Sikre at sluttverdi også har to sifre
                bounceEffect(minutsviewer); // Legg til "dunk"-effekt når tellingen er ferdig
            }
        }, minuteIntervalTime);
    }, 500); // 500ms forsinkelse for minutttelleren
}

