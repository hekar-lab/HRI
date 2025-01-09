var sun = document.getElementById("sun-coords");

setInterval(updateSun, 1000);

window.addEventListener("load", updateSun);

function updateSun() {
    let coords = subsolarPoint(new Date());
    sun.innerText = prettyCoords(coords);
}

function prettyCoords(coords) {
    let lat_dir = coords[0] >= 0 ? "N" : "S";
    let lon_dir = coords[1] >= 0 ? "E" : "W";

    return prettyDegrees(Math.abs(coords[0])) + lat_dir + ",\n" + prettyDegrees(Math.abs(coords[1])) + lon_dir;
}

function prettyDegrees(deg) {
    let arc = Math.trunc(deg);
    let min = Math.trunc((deg - arc) * 60);
    let sec = Math.trunc((deg - arc - min / 60) * 3600);
    return `${arc}° ${min}' ${sec}"`;
}

function subsolarPoint(date) {
    let latitude = sunDeclination(date);
    let longitude = -15 * (decimalHour(date) - 12 + equationOfTime(date) / 60);
    longitude = ((longitude + 180) % 360) - 180;

    return [latitude, longitude];
}

function sunDeclination(date) {
    return -23.44 * Math.cos(2*Math.PI / 365 * (getDayOfYear(date) + 10));
}

function getDayOfYear(date) {
    let yearStart = Date.UTC(date.getUTCFullYear(), 0, 0);
    let delta = date - yearStart;

    return delta / 24 / 60 / 60 / 1000;
}

function decimalHour(date) {
    return date.getUTCHours() 
        + date.getUTCMinutes() / 60
        + date.getUTCSeconds() / 3600;
}

function equationOfTime(date) {
    let D = 6.24004077 + 0.01720197 * (365.25 * (date.getUTCFullYear() - 2000) + getDayOfYear(date));
    return -7.659 * Math.sin(D) + 9.863 * Math.sin(2 * D + 3.5932);
}