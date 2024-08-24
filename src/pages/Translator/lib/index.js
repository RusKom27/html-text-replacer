const sortTranslatesTable = (translatesTable, availableLangs) => {
    let sortedTranslatesTable = {}

    if (!translatesTable.length) return

    Object.keys(availableLangs).forEach((key) => {
        sortedTranslatesTable[key] = []
    })

    translatesTable.forEach((row) => {
        row.forEach((elem, j) => {
            if (elem === "" || elem === null) return
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

            sortedTranslatesTable[originalLang].map((elem, index) => {
                if (stringsIsEqual(block, elem)) translatedBlockIndex = index
            })

            const translatedBlock = sortedTranslatesTable[lang][translatedBlockIndex]

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
    return `${str1}`.toLowerCase().trim().replaceAll(" ", "") ===
        `${str2}`.toLowerCase().trim().replaceAll(" ", "")
}


const setIsTranslatedBlocks = (isTranslatedIndexes) => {
    isTranslatedIndexes.forEach((isTranslated, index) => {
        const textBlock = document.querySelector(`[data-text="${index}"]`)

        if (!textBlock) return

        textBlock.classList.add(`${isTranslated ? "" : "not-"}translated`)
    })

}

const reformatRawHtml = (rawHtml, translates) => {
    const doc = new DOMParser().parseFromString(rawHtml, "text/html");
    let textBlocks = []

    doc.getElementsByTagName("html")[0]
        .querySelectorAll("a, button, p, h1, h2, h3, h4, h5, h6, table, tr, td, th")
        .forEach((elem, index) => {

            // translates.forEach((elem) => {
            //     console.log(elem);
            // })

            elem.innerHTML = elem.innerHTML
                .replaceAll("\n", " ")
                .replaceAll(" <span class=\"currency\">$</span>", "$")

            const textBlock = elem.innerHTML

            if (textBlock) textBlocks.push(textBlock.trim())

            elem.innerText = `~~~span class='selected' data-text='${index}' /~~ ${textBlock} ~~~/span/~~`;
        });

    return [textBlocks, doc.documentElement.outerHTML]
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