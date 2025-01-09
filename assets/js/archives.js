window.addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight));
}, false);

acid.addEventListener("acid_search", buildArchives);
acid.addEventListener("acid_search", resetScroll);
window.addEventListener("resize", buildArchives);

resContainer = document.getElementById("res-container");
results = document.getElementById("results");
let articles;

window.onload = function () {
    document.body.style.setProperty('--scroll', 0);
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                articles = JSON.parse(xhr.responseText);
                acid.dispatchEvent(searchEvent);
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "index.json");
    xhr.send();
}

function resetScroll(_evt) {
    window.scrollTo(0, 0);
    document.body.style.setProperty('--scroll', 0);
}

function buildArchives(_evt) {
    buildBox();
    buildArticles();
}

function buildBox() {
    let boxBack = document.getElementById("archive-box-back");
    let boxFront = document.getElementById("archive-box-front");
    let width = getWidth();
    let animWidth = getAnimWidth() * 1.2;
    let height = getHeight();
    let animHeight = getAnimHeight();

    let fontHeight = parseFloat(getComputedStyle(document.body).getPropertyValue('--font-width')) * 2;
    let holeWidth = Math.floor(width / 4);
    let holeHeight = fontHeight * 3;
    let holeLeftPadding = (width - holeWidth) / 2;
    let holeTopPadding = fontHeight * 4;

    // Box front SVG
    boxFront.innerHTML = "";

    let frontSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let frontPathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let rightPolySvg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    frontSvg.setAttribute("width", `${width + animWidth}px`);
    frontSvg.setAttribute("height", `${height + animHeight}px`);
    frontSvg.setAttribute("viewBox", `0 ${-animHeight} ${width + animWidth} ${height + animHeight}`)
    frontSvg.setAttribute("overflow", "visible");
    frontSvg.classList.add("box-front-svg");

    rightPolySvg.setAttribute(
        "points", 
        `${width}, ${height} ${width + animWidth}, ${height - animHeight} ${width + animWidth}, ${-animHeight} ${width}, 0`
    );

    frontPathSvg.setAttribute(
        "d",
        `M 0 0\
          v ${height} h ${width} v -${height} z
        M ${holeLeftPadding} ${holeTopPadding}\
          h ${holeWidth}\
          a ${holeHeight / 2} ${holeHeight / 2} 0 0 1 0 ${holeHeight}\
          h -${holeWidth}\
          a ${holeHeight / 2} ${holeHeight / 2} 0 0 1 0 -${holeHeight}  z\
        `
    );

    frontSvg.appendChild(rightPolySvg);
    frontSvg.appendChild(frontPathSvg);

    boxFront.appendChild(frontSvg);

    // Box back SVG
    boxBack.innerHTML = "";

    let backSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    let backPathSvg = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    let leftPolySvg = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    backSvg.setAttribute("width", `${width + animWidth}px`);
    backSvg.setAttribute("height", `${height + animHeight}px`);
    backSvg.setAttribute("viewBox", `-${animWidth} 0 ${width + animWidth} ${height + animHeight}`)
    backSvg.setAttribute("overflow", "visible");
    backSvg.classList.add("box-back-svg");

    leftPolySvg.setAttribute(
        "points", 
        `-${animWidth}, ${height + animHeight} 0, ${height} 0, 0 -${animWidth}, ${animHeight}`
    );

    backPathSvg.setAttribute(
        "d",
        `M 0 0\
          v ${height} h ${width} v -${height} z
        M ${holeLeftPadding} ${holeTopPadding}\
          h ${holeWidth}\
          a ${holeHeight / 2} ${holeHeight / 2} 0 0 1 0 ${holeHeight}\
          h -${holeWidth}\
          a ${holeHeight / 2} ${holeHeight / 2} 0 0 1 0 -${holeHeight}  z\
        `
    );

    backSvg.appendChild(leftPolySvg);
    backSvg.appendChild(backPathSvg);

    boxBack.appendChild(backSvg);
}

function getWidth() {
    let chrPerLine = parseInt(getComputedStyle(document.body).getPropertyValue('--char-per-line'));
    let fontWidth = parseFloat(getComputedStyle(document.body).getPropertyValue('--font-width'));
    return chrPerLine * fontWidth;
}

function getAnimWidth() {
    let fontWidth = parseFloat(getComputedStyle(document.body).getPropertyValue('--font-width'));
    let margin = parseFloat(getComputedStyle(document.body).getPropertyValue('--main-margin'));
    return Math.max(Math.min(window.innerWidth - getWidth() - margin * 2, 8 * fontWidth), 8);
}

function getHeight() {
    let fontHeight = parseFloat(getComputedStyle(document.body).getPropertyValue('--font-width')) * 2;
    return fontHeight * 20;
}

function getAnimHeight() {
    let fontHeight = parseFloat(getComputedStyle(document.body).getPropertyValue('--font-width')) * 2;
    return fontHeight * 4;
}

function buildArticles() {
    if (articles) {
        let acidSearch = document.getElementById("ACId");
        let pattern = new RegExp(getInputData(acidSearch).replaceAll("*", "."));

        let articleFound = articles.filter(art => pattern.test(art["id"]));
        
        results.innerHTML = "";
        let artCount = articleFound.length;
        let acidPos = 1;
        let count = 0;
        resContainer.style.height = "calc(320px * " + artCount + ")";
        
        articleFound.forEach(art => {
            let entry = document.createElement('li');
            entry.classList.add("entry");

            let offset = 13 * 0.03125;   // start offset
            let pickTime = 3 * 0.03125; // time spent picking article
            let duration = artCount * pickTime + 0.03125; // whole anim duration
            entry.style.animationDelay = "calc(var(--scroll) * -" + duration + "s + " + pickTime * count + "s - " + offset + "s)";

            count += 1;

            let svgLink = document.createElement('a');
            svgLink.classList.add("article-acid-" + acidPos);
            svgLink.classList.add("article-acid");
            let archiveBody = document.createElement('a');
            archiveBody.classList.add("article-archive");

            svgLink.href = art["permalink"];
            archiveBody.href = art["permalink"];

            let descDiv = document.createElement('div');
            descDiv.classList.add("article-desc");

            let sections = ["project", "author", "date"];

            for (let i = 0; i < sections.length; i++) {
                let sectionTitle = document.createElement('div');
                let sectionContent = document.createElement('div');
                let sectionSep = document.createElement('div');

                sectionTitle.classList.add('desc-section');
                sectionContent.classList.add('desc-content');
                sectionSep.classList.add('desc-sep');

                sectionTitle.innerText = sections[i].toUpperCase() + ":"

                switch (sections[i]) {
                    case "project":
                        sectionContent.innerText = art["title"];
                        break;

                    case "author":
                        sectionContent.innerText = art["author"];
                        break;

                    case "date":
                        sectionContent.innerText = art["date"];
                
                    default:
                        break;
                }

                descDiv.appendChild(sectionTitle);
                descDiv.appendChild(sectionContent);
                if (i < sections.length - 1){
                    descDiv.appendChild(sectionSep);
                }
            }

            archiveBody.appendChild(descDiv);

            let propertyDiv = document.createElement('div');
            propertyDiv.classList.add('article-property-of');

            propertyDiv.innerText = "Property of the H.R.I";

            archiveBody.appendChild(propertyDiv);

            let acidSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            let acidText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            let acidBg = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
            let acidLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

            acidSvg.setAttribute("width", "100%");
            acidSvg.setAttribute("height", "100%");
            acidSvg.setAttribute("overflow", "visible");
            acidSvg.classList.add("acid-svg");

            acidText.textContent = art['id'];
            acidText.setAttribute("x", "50%");
            acidText.setAttribute("y", "50%");
            acidText.setAttribute("text-anchor", "middle");
            acidText.setAttribute("dominant-baseline", "middle");

            acidSvg.appendChild(acidLine);
            acidSvg.appendChild(acidBg);
            acidSvg.appendChild(acidText);
            svgLink.appendChild(acidSvg);
            entry.appendChild(svgLink);
            entry.appendChild(archiveBody);
            results.appendChild(entry);

            let width  = acidSvg.width.baseVal.value;
            let height = acidSvg.height.baseVal.value;

            let strokeWidth = 2;
            acidBg.setAttribute("stroke-width", strokeWidth);
            acidLine.setAttribute("stroke-width", 4);

            let leftX = (strokeWidth / 2);
            let rightX = (width - strokeWidth / 2);
            let topLeft = [width * 0.1, 0];
            let topRight = [width * 0.9, 0];
            let bottomLeft = [width * -0.05, (height + 1)];
            let bottomRight = [(width * 1.05), (height + 1)];

            switch (acidPos) {
                case 1:
                    acidBg.setAttribute(
                        "points", 
                        rightX + "," + bottomRight[1] + " " 
                        + [rightX, 0] + " " 
                        + topLeft + " " 
                        + bottomLeft
                    );
        
                    acidLine.setAttribute("x1", bottomLeft[0]);
                    acidLine.setAttribute("y1", bottomLeft[1] + 1);
                    acidLine.setAttribute("x2", rightX - 1);
                    acidLine.setAttribute("y2", bottomRight[1] + 1);
                    break;

                case 2:
                case 3:
                    acidBg.setAttribute(
                        "points", 
                        bottomRight + " " 
                        + topRight + " " 
                        + topLeft + " " 
                        + bottomLeft
                    );
        
                    acidLine.setAttribute("x1", bottomLeft[0]);
                    acidLine.setAttribute("y1", bottomLeft[1] + 1);
                    acidLine.setAttribute("x2", bottomRight[0]);
                    acidLine.setAttribute("y2", bottomRight[1] + 1);
                    break;

                case 4:
                    acidBg.setAttribute(
                        "points", 
                        bottomRight + " " 
                        + topRight + " " 
                        + [leftX, 0] + " " 
                        + leftX + "," + bottomLeft[1]
                    );
        
                    acidLine.setAttribute("x1", leftX + 1);
                    acidLine.setAttribute("y1", bottomLeft[1] + 1);
                    acidLine.setAttribute("x2", bottomRight[0]);
                    acidLine.setAttribute("y2", bottomRight[1] + 1);
                    break;
    
                default:
                    break;
            }

            acidPos = (acidPos) % 4 + 1;
        });
    }
}