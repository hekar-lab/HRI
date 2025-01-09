import { MiniGent } from './minigent.js'
import * as Tokenizer from './tokenizer.js'
import * as Parser from './parser.js'
import * as Rasterizer from './rasterizer.js'
import * as Renderer from './renderer.js'

window.addEventListener("resize", updateCanvas);
window.addEventListener("load", updateCanvas);


function renderTex(canvas) {
    let canvasWidth = canvas.clientWidth;
    let canvasHeight = canvas.clientHeight;

    let ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = "#ecece7";
    ctx.fillRect( 0, 0, canvasWidth, canvasHeight );

    let input = canvas.innerHTML;

    const tokens = Tokenizer.tokenize( input );
    const ast = Parser.parse( tokens );
    const fb = Rasterizer.rasterize( ast );
    Renderer.render( fb, ctx );
}

function updateCanvas() {
    let texCanvas = document.getElementsByClassName("pixeltex");
    let maxImgWidth = window.getComputedStyle(document.body).getPropertyValue("--img-max-width");

    for (let i = 0; i < texCanvas.length; i++) {
        let lines  = texCanvas[i].getAttribute("lines");

        let height = "200px";
        if (lines) {
            height = (parseInt(lines) * 2 * parseInt(window.getComputedStyle(document.body).getPropertyValue("--font-width"))) + "px"
        } else {
            height = Math.floor(parseInt(maxImgWidth) / 2) + "px";
        }

        texCanvas[i].setAttribute("width", maxImgWidth);
        texCanvas[i].setAttribute("height", height);
        renderTex(texCanvas[i]);
    }
}