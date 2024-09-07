const sortTranslatesTable = (translatesTable, availableLangs) => {
    let sortedTranslatesTable = {}

    if (!translatesTable.length) return

    Object.keys(availableLangs).forEach((key) => {
        sortedTranslatesTable[key] = []
    })

    translatesTable.forEach((row) => {
        row.forEach((elem, j) => {
            // if (elem === "" || elem === null) return
            if (!sortedTranslatesTable[Object.keys(availableLangs)[j]])
                sortedTranslatesTable[Object.keys(availableLangs)[j]] = []

            sortedTranslatesTable[Object.keys(availableLangs)[j]].push(elem)
        })
    })

    return sortedTranslatesTable
}

const translateBlocks = (sortedTranslatesTable, availableLangs, originalLang, textBlocks) => {
    let translatedTextBlocks = {}
    let isTranslatedIndexes = []

    translatedTextBlocks[originalLang] = textBlocks

    Object.keys(availableLangs).forEach(lang => {
        isTranslatedIndexes = []
        if (!translatedTextBlocks[lang]) translatedTextBlocks[lang] = []

        if (lang === originalLang) return

        translatedTextBlocks[originalLang].forEach((block) => {
            let translatedBlockIndex = null
            let splittedBlockIndex = null
            let isSplitted = false

            sortedTranslatesTable[originalLang].map((elem, index) => {
                if (stringsIsEqual(block, elem)) translatedBlockIndex = index

                if (!translatedBlockIndex && translatedBlockIndex !== 0) {
                    `${elem}`.split(":").forEach((str, splitIndex) => {
                        if (`${elem}`.split(":").length === 1) return


                        if (splitIndex === 0) str = `${str}:`

                        if (stringsIsEqual(block, str)) {
                            translatedBlockIndex = index
                            splittedBlockIndex = splitIndex

                            let translatedBlock = sortedTranslatesTable[lang][translatedBlockIndex]

                            if (translatedBlock) {
                                isTranslatedIndexes.push(1)
                                translatedBlock = `${translatedBlock}`.split(":")[splittedBlockIndex] + (splittedBlockIndex === 0 ? ":" : "")
                                translatedTextBlocks[lang].push(translatedBlock)

                                isSplitted = true
                            }

                        }
                    })

                }
            })

            if (isSplitted) return


            let translatedBlock = sortedTranslatesTable[lang][translatedBlockIndex]

            // if ((BlockIndex === 11) && (translatedBlockIndex) && (lang === "ES")) console.log(block, translatedBlock);

            if (!translatedBlock) {
                isTranslatedIndexes.push(0)
                translatedTextBlocks[lang].push(block)
            } else {
                isTranslatedIndexes.push(1)
                translatedTextBlocks[lang].push(translatedBlock)
            }

        })
    })
    return [translatedTextBlocks, isTranslatedIndexes]

}

const stringsIsEqual = (str1, str2) => {
    return `${str1}`
            .toLowerCase()
            .trim()
            .replaceAll(" ", "")
            .replaceAll("\n", "") ===
        `${str2}`
            .toLowerCase()
            .trim()
            .replaceAll(" ", "")
            .replaceAll("\n", "")
}


const setIsTranslatedBlocks = (isTranslatedIndexes) => {
    isTranslatedIndexes.forEach((isTranslated, index) => {
        const textBlock = document.querySelector(`[data-text="${index}"]`)

        if (!textBlock) return

        textBlock.classList.add(`${isTranslated ? "" : "not-"}translated`)
    })

}

const reformatRawHtml = (rawHtml) => {
    const doc = new DOMParser().parseFromString(rawHtml, "text/html");
    let textBlocks = []
    let index = 0

    index = addTextBlocksFromHtmlHead(textBlocks, doc.head, index)

    index = addTextBlocksFromHtmlInputs(textBlocks, doc.body, index)

    doc.getElementsByTagName("html")[0]
        .querySelectorAll("a, button, p, h1, h2, h3, h4, h5, h6, table, tr, td, th")
        .forEach((elem) => {

            elem.innerHTML = elem.innerHTML
                .replaceAll("\n", " ")
                .replaceAll(" <span class=\"currency\">$</span>", "$")

            let child = elem.firstChild

            index = addTextBlocksFromHtmlTag(textBlocks, child, index)

        });

    return [textBlocks, doc.documentElement.outerHTML]
}


const addTextBlocksFromHtmlInputs = (textBlocks, child, index) => {
    child.querySelectorAll("input[placeholder]").forEach((elem) => {

        if (!elem.getAttribute("placeholder")) return

        textBlocks.push(elem.getAttribute("placeholder"))
        elem.setAttribute("placeholder", `~~~span class='selected' data-text='${index}' /~~ ${elem.getAttribute("placeholder")} ~~~/span/~~`)
        index++
    })

    return index
}

const addTextBlocksFromHtmlHead = (textBlocks, head, index) => {
    textBlocks.push(head.querySelector("title").innerText)
    head.querySelector("title").innerText = `~~~span class='selected' data-text='${index}' /~~ ${head.querySelector("title").innerText} ~~~/span/~~`
    index++

    head.querySelectorAll("meta[content]").forEach((elem) => {
        textBlocks.push(elem.getAttribute("content"))
        elem.setAttribute("content", `~~~span class='selected' data-text='${index}' /~~ ${elem.getAttribute("content")} ~~~/span/~~`)
        index++
    })

    head.querySelectorAll("script").forEach(elem => {
        const nameRegex = /"name": "(.*?)",/g;

        for (const match of elem.innerText.matchAll(nameRegex)) {
            const name = match[1];
            textBlocks.push(name)
            elem.innerText = elem.innerText.replaceAll(
                `"name": "${name}",`,
                `"name": "~~~span class='selected' data-text='${index}' /~~ ${name} ~~~/span/~~",`
            )

            index++
        }

        const textRegex = /"<p>(.*?)<\/p>"/g;

        for (const match of elem.innerText.matchAll(textRegex)) {

            console.log(match)

            const name = match[1];
            textBlocks.push(name)
            elem.innerText = elem.innerText.replaceAll(
                `"<p>${name}</p>"`,
                `"<p>~~~span class='selected' data-text='${index}' /~~ ${name} ~~~/span/~~</p>"`
            )

            index++
        }
    })

    return index
}

const addTextBlocksFromHtmlTag = (textBlocks, child, index) => {
    while (child) {
        if ((child.nodeType === 3) && (child.nodeName !== "SCRIPT")) {
            const textBlock = child.data
            if (isNaN(+`${textBlock}`)) {

                if (textBlock) textBlocks.push(textBlock.trim())

                child.data = `~~~span class='selected' data-text='${index}' /~~ ${textBlock} ~~~/span/~~`;

                index++
            }
        } else if ((child.nodeType === 1) && (child.nodeName !== "SCRIPT")) {

            let innerChild = child.firstChild

            while (innerChild) {
                if (innerChild.nodeType === 3) {
                    const textBlock = innerChild.data
                    if (isNaN(+`${textBlock.replaceAll(" ", "")}`)) {
                        if (textBlock) textBlocks.push(textBlock.trim())

                        innerChild.data = `~~~span class='selected' data-text='${index}' /~~ ${textBlock} ~~~/span/~~`;

                        index++
                    }

                }
                innerChild = innerChild.nextSibling;
            }
        }


        child = child.nextSibling;
    }

    return index
}

const getAvailableLangs = (translatesTable) => {
    if (translatesTable.length === 0) return

    let availableLangs = {}

    translatesTable[0].forEach((key, index) => {
        availableLangs[key] = index
    })

    return availableLangs
}


export {
    translateBlocks,
    sortTranslatesTable,
    reformatRawHtml,
    getAvailableLangs,
    setIsTranslatedBlocks
}