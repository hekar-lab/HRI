window.addEventListener("resize", createTitle)
document.addEventListener("DOMContentLoaded", createTitle)

function createTitle(_evt) {
    let boxChars = ["─", "│", "╔", "╗", "╚", "╝"]
    let width = parseInt(getComputedStyle(document.body).getPropertyValue("--char-per-line"));

    let titles = document.getElementsByTagName("h1");
    for (let title of titles) {
        titleText = title.getAttribute("value").trim();
        padding = (width - titleText.length - 2) / 2;
        paddedTitle =  " ".repeat(Math.floor(padding)) + titleText + " ".repeat(Math.ceil(padding));
        let txt = boxChars[2] + boxChars[0].repeat(width - 2) + boxChars[3] + "\n"
            + boxChars[1] + paddedTitle  +  boxChars[1] + "\n"
            + boxChars[4] + boxChars[0].repeat(width - 2) + boxChars[5];

        let titleProject = title.getAttribute("project");
        if (titleProject) {
            titleProject = titleProject.trim().substring(0, width - 6);
            txt = txt.substring(0, 3) + titleProject + txt.substring(3 + titleProject.length);
        }

        title.innerText = txt;
    }
}
