const createBlockFromLine = (line) => {
    let htmlBlock = document.createElement("div")

    addTabs(htmlBlock, line)

    line = reformatLine(line)

    htmlBlock.innerHTML += `<span>${line}</span>`

    return htmlBlock
}

const createBlocks = (reformattedHtml, currentLang, translatedTextBlocks) => {

    const root = document.getElementById("htmlRoot")

    if (!reformattedHtml) return

    root.innerHTML = ""

    reformattedHtml.split("\n").forEach((line) => {
        root.appendChild(createBlockFromLine(line))
    })


    document.querySelectorAll("[data-text]").forEach((elem) => {
        elem.innerText = reformatTextBlock(` ${translatedTextBlocks[currentLang][elem.dataset.text]} `)
    })
}


const reformatTextBlock = (textBlock) => {
    let newTextBlock = textBlock;

    ["$", "€"].forEach((currency) => {
        newTextBlock = newTextBlock.replaceAll(currency, `<span class="currency">${currency}</span>`)
    });

    ["undefined"].forEach((removeBlock) => newTextBlock = newTextBlock.replaceAll(removeBlock, ""))

    return newTextBlock
}


const reformatLine = (line) => {
    line = line
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("~~~", "<")
        .replaceAll("/~~", ">");

    ["p", "h1", "h2", "h3", "h4", "h5", "h6"].forEach((tag) => {
        line = line.replaceAll(`&lt;${tag}`, `&lt;<span class='tag'>${tag}</span>`)
        line = line.replaceAll(`&lt;/${tag}`, `&lt;/<span class='tag'>${tag}</span>`)
    })
    return line
}

const addTabs = (htmlBlock, line) => {
    htmlBlock.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;".repeat(countTabs(line))
}

function selectElementText(el, win) {

    win = win || window;
    var doc = win.document, sel, range;
    if (win.getSelection && doc.createRange) {
        sel = win.getSelection();
        range = doc.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (doc.body.createTextRange) {
        range = doc.body.createTextRange();
        range.moveToElementText(el);
        range.select();
    }
    document.execCommand('copy')
}

function countTabs(line) {
    let countSpaces = 0
    let countTabs = 0

    for (let i = 0; i < line.length; i++) {

        if (countTabs > 0 && line[i] !== " ") {
            return countTabs
        }

        if (line[i] === " ") {
            countSpaces++
        }

        if (countSpaces === 3) {
            countTabs++
            countSpaces = 0
        }
    }

    return countTabs
}


export {
    createBlocks,
    selectElementText

}