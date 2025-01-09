window.addEventListener("resize", createLine)
document.addEventListener("DOMContentLoaded", createLine)

// function createHeadings(_evt) {
//     let light_shade = "░";
//     let medium_shade = "▒";
//     let dark_shade = "▓";

//     let width = parseInt(getComputedStyle(document.body).getPropertyValue("--char-per-line"));

//     let rep_div = Math.floor(width / 5);
//     let rep_rem = width % 5;
//     let txt = light_shade.repeat(rep_div) 
//         + medium_shade.repeat(rep_div)
//         + dark_shade.repeat(rep_div + rep_rem)
//         + medium_shade.repeat(rep_div)
//         + light_shade.repeat(rep_div);

//     let headings = document.getElementsByClassName("heading");
//     for (let head of headings) {
//         head.innerText = txt;
//     }
// }

function createLine(_evt) {
    let coolS = "├─⟨Ξ⌥Ξ⟩─┤";

    let width = parseInt(getComputedStyle(document.body).getPropertyValue("--char-per-line")) / 2;

    let txt = "├" + "─".repeat((width - 8) / 2) + "⟨Ξ⌥⌥Ξ⟩" + "─".repeat((width - 8) / 2) + "┤";

    let lines = document.getElementsByClassName("line");
    for (let line of lines) {
        line.innerText = txt;
    }
}