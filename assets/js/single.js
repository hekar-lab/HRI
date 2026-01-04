window.addEventListener("resize", createTitle)
document.addEventListener("DOMContentLoaded", createTitle)
document.addEventListener("DOMContentLoaded", replaceFootnoteRef)

function createTitle(_evt) {
    let boxChars = ["─", "│", "╔", "╗", "╚", "╝"]
    let width = parseInt(getComputedStyle(document.body).getPropertyValue("--char-per-line"));

    let titles = document.getElementsByTagName("h1");
    for (let title of titles) {
        titleText = title.getAttribute("value");
        if (!titleText) { continue; }

        let txt = ""
        let titleProject = title.getAttribute("project");
        if (titleProject) {
            titleProject = titleProject.trim().substring(0, width - 6);
            txt += boxChars[2] + boxChars[0].repeat(2) + titleProject +  boxChars[0].repeat(width - 13) + boxChars[3] + "\n";
        } else {
            txt += boxChars[2] + boxChars[0].repeat(width - 2) + boxChars[3] + "\n";
        }

        titleText = titleText.trim();
        if (titleText.length > 38) {
            titleText = titleText.substring(0, 37) + "…";
        }
        padding = (width - titleText.length - 2) / 2;
        paddedTitle =  " ".repeat(Math.floor(padding)) + titleText + " ".repeat(Math.ceil(padding));
        txt += boxChars[1] + paddedTitle  +  boxChars[1] + "\n";

        subtitleText = title.getAttribute("subtitle");
        if (subtitleText) {
            subtitleText = subtitleText.trim();
            if (subtitleText.length > 36) {
                subtitleText = subtitleText.substring(0, 35) + "…";
            }
            padding = (width - subtitleText.length - 2) / 2;
            paddedSubtitle =  boxChars[0].repeat(Math.floor(padding)) + subtitleText + boxChars[0].repeat(Math.ceil(padding));
            txt += boxChars[4] + paddedSubtitle  +  boxChars[5] + "\n";
        } else {
            txt += boxChars[4] + boxChars[0].repeat(width - 2) + boxChars[5];
        }

        title.innerText = txt;
    }
}

function replaceFootnoteRef(_evt) {
  const superscriptMap = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };

  // Replace footnote reference superscripts
  document.querySelectorAll('sup > .footnote-ref').forEach(sup => {
    const text = sup.textContent;
    let unicodeText = '';
    
    for (let char of text) {
      unicodeText += superscriptMap[char] || char;
    }
    
    sup.innerText = unicodeText;
  });

//   // Replace footnote backref superscripts if needed
//   document.querySelectorAll('.footnote-backref sup').forEach(sup => {
//     const text = sup.textContent;
//     let unicodeText = '';
    
//     for (let char of text) {
//       unicodeText += superscriptMap[char] || char;
//     }
    
//     sup.replaceWith(unicodeText);
//   });
}