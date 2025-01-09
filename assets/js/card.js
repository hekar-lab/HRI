var scene = document.getElementById("scene");
var card = document.getElementById("card");
var button = document.getElementById("rotate-button");

var cardRot = 0;

scene.addEventListener("touchmove", rotateCard);
scene.addEventListener("mousemove", rotateCard);

scene.addEventListener("touchend", endRotation);
scene.addEventListener("mouseleave", endRotation);

function endRotation(end_evt) {
    switch (end_evt.type) {
        case "touchend":
            card.style.transition = "transform 1s";
            card.style.transform = `rotateX(0deg) rotateY(${cardRot}deg)`;
            break;

        case "mouseleave":
            card.style.transition = "transform 1s";
            card.style.transform = `rotateX(0deg) rotateY(${cardRot}deg)`;
            break;
    
        default:
            break;
    }
}

function rotateCard(move_evt) {
    let rect = scene.getBoundingClientRect();
    let relX = (move_evt.clientX - rect.left) / rect.width;
    let relY = (move_evt.clientY - rect.top) / rect.height;

    let rotDeltaX = relX * 60 - 30;
    let rotDeltaY = relY * 60 - 30;
    switch (move_evt.type) {
        case "touchmove":
            card.style.transition = `transform 0s`;
            card.style.transform = `rotateX(${rotDeltaY}deg) rotateY(${rotDeltaX + cardRot}deg)`;
            break;

        case "mousemove":

            let speed = Math.abs(Math.pow((relX - 0.5) * 2, 3) * Math.pow((relY - 0.5) * 2, 3)) + 0.1;
            card.style.transition = `transform ${speed}s`;
            card.style.transform = `rotateX(${rotDeltaY}deg) rotateY(${rotDeltaX + cardRot}deg)`;
            break;
    
        default:
            break;
    }
}

function turnCard() {
    cardRot = cardRot == 0 ? 180 : 0;
    card.style.transition = "transform 1s";
    card.style.transform = `rotateX(0deg) rotateY(${cardRot}deg)`;
}

button.addEventListener("click", turnCard);