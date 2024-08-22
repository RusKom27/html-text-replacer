import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";
import {Box} from "@mui/material";
import {addTextBlock, clearTextBlocks} from "../files-input-panel/filesInputSlice.js";

function HtmlPanel() {
    const dispatch = useDispatch()
    const rawHtml = useSelector((state) => state.filesInput.rawHtml)


    useEffect(() => {

        dispatch(clearTextBlocks())
        const doc = new DOMParser()
            .parseFromString(rawHtml, "text/html");

        doc.documentElement
            .querySelectorAll("p, h1, h2, h3, h4, h5, h6, table, tr, td, th")
            .forEach((elem, index) => {
                const textBlock = elem.innerText.replaceAll("\n", " ")

                if (textBlock) dispatch(addTextBlock(textBlock.trim()))

                elem.innerText = `~~~span class='selected' data-text='${index}' /~~ ${textBlock} ~~~/span/~~`;
            });

        let rawHtmlContainer = document.querySelector(".rawHtml")

        rawHtmlContainer.innerHTML = ""

        doc.documentElement.innerHTML.split("\n").forEach((line, index) => {

            let htmlBlock = document.createElement("div")
            let tabs = countTabs(line)

            htmlBlock.innerHTML += `<div class="number">${index}</div>`

            for (let i = 0; i < tabs; i++) {
                htmlBlock.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"
            }

            line = line
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("~~~", "<")
                .replaceAll("/~~", ">")

            line = line.replaceAll("&lt;p", "&lt;<span class='tag'>p</span>")
            line = line.replaceAll("&lt;/p", "&lt;/<span class='tag'>p</span>")

            line = line.replaceAll("&lt;h1", "&lt;<span class='tag'>h1</span>")
            line = line.replaceAll("&lt;/h1", "&lt;/<span class='tag'>h1</span>")

            line = line.replaceAll("&lt;h2", "&lt;<span class='tag'>h2</span>")
            line = line.replaceAll("&lt;/h2", "&lt;/<span class='tag'>h2</span>")

            line = line.replaceAll("&lt;h3", "&lt;<span class='tag'>h3</span>")
            line = line.replaceAll("&lt;/h3", "&lt;/<span class='tag'>h3</span>")

            line = line.replaceAll("&lt;h4", "&lt;<span class='tag'>h4</span>")
            line = line.replaceAll("&lt;/h4", "&lt;/<span class='tag'>h4</span>")

            line = line.replaceAll("&lt;a", "&lt;<span class='tag'>a</span>")
            line = line.replaceAll("&lt;/a", "&lt;/<span class='tag'>a</span>")

            line = line.replaceAll("&lt;div", "&lt;<span class='div-tag'>div</span>")
            line = line.replaceAll("&lt;/div", "&lt;/<span class='div-tag'>div</span>")


            htmlBlock.innerHTML += `<span>${line}</span>`

            rawHtmlContainer.appendChild(htmlBlock)


        })

    }, [rawHtml])

    return (
        <Box maxHeight={"700px"} marginY={"24px"} overflow={"scroll"} backgroundColor={"#282e33"} paddingX={"16px"}>
            <Typography
                className={"rawHtml"}
                color={"#e7c993"}
                variant={"body1"}
                fontFamily={"monospace"}
                component={"div"}
            >

            </Typography>

        </Box>
    )
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

export default HtmlPanel
