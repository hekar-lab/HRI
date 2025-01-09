window.addEventListener("load", updatePhone);
setInterval(updatePhone, 100);

var phone = document.getElementById("phone-num");
var sigma = parseFloat(phone.getAttribute("sigma"));
var rho = parseFloat(phone.getAttribute("rho"));
var beta = parseFloat(phone.getAttribute("beta"));

var digits = "0123456789"
    + "0123456789"
    + "⁰¹²³⁴⁵⁶⁷⁸⁹"
    + "₀₁₂₃₄₅₆₇₈₉";

var coords = [89, 90, 91];

function lorenz(xyz, sigma, rho, beta, delta) {
    let [x, y, z] = xyz;

    dx = sigma * (y - x);
    dy = rho * x - y - x * z;
    dz = x * y - beta * z;

    return [dx * delta, dy * delta, dz * delta];
}

function updatePhone() {
    phone.innerHTML = "";

    let dt = lorenz(coords, sigma, rho, beta, 0.001);
    
    for (let i = 0; i < 3; i++) {
        coords[i] = coords[i] + dt[i];
    }

    phone.innerText = makePhoneNumber(coords);
}

function to3Digits(x) {
    return Math.abs(Math.round(x + 250)) % 1000;
}

function toPhoneDigits(n) {
    let d0 = n % 10;
    let d1 = Math.trunc(n / 10) % 10;
    let d2 = Math.trunc(n / 100) % 10;

    let phoneDigits = "";
    phoneDigits += getDigit(d2, Math.trunc(Math.random() * 4));
    phoneDigits += getDigit(d1, Math.trunc(Math.random() * 4));
    phoneDigits += getDigit(d0, Math.trunc(Math.random() * 4));

    return phoneDigits;
}

function makePhoneNumber(xyz) {
    let [x, y, z] = xyz;

    return toPhoneDigits(to3Digits(x)) + "•" + toPhoneDigits(to3Digits(y)) +  "•" + toPhoneDigits(to3Digits(z));
}

function getDigit(d, version) {
    return digits[d + 10 * version];
}

// Use Lorenz System sigma=81 rho=279 beta=18, init=(x, x, x) 1 <= x <= 99