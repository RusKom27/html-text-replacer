import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";
import {Box, Button, Grid} from "@mui/material";
import {addTextBlock, clearTextBlocks} from "../files-input-panel/filesInputSlice.js";

function HtmlPanel() {
    const dispatch = useDispatch()
    const rawHtml = useSelector((state) => state.filesInput.rawHtml)


    useEffect(() => {

        dispatch(clearTextBlocks())
        const doc = new DOMParser()
            .parseFromString(rawHtml, "text/html");

        doc.getElementsByTagName("html")[0]
            .querySelectorAll("a, button, p, h1, h2, h3, h4, h5, h6, table, tr, td, th")
            .forEach((elem, index) => {
                const textBlock = elem.innerHTML
                    .replaceAll("\n", " ")
                    .replaceAll(" <span class=\"currency\">$</span>", "$")

                if (textBlock) dispatch(addTextBlock(textBlock.trim()))

                elem.innerText = `~~~span class='selected' data-text='${index}' /~~ ${textBlock} ~~~/span/~~`;
            });

        let rawHtmlContainer = document.querySelector(".rawHtml")

        rawHtmlContainer.innerHTML = ""
        document.querySelector(".htmlNumbers").innerHTML = ""

        doc.documentElement.outerHTML.split("\n").forEach((line, index) => {

            let htmlBlock = document.createElement("div")
            let tabs = countTabs(line)

            // htmlBlock.innerHTML += `<div class="number">${index}</div>`

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

            document.querySelector(".htmlNumbers").innerHTML += `<div class="number">${index}</div>`

            rawHtmlContainer.appendChild(htmlBlock)


        })

    }, [rawHtml])

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


    // const selectHTML = () => {
    //     let firstBlock = document.querySelector(".rawHtml > div:first-child")
    //     let lastBlock = document.querySelector(".rawHtml > div:last-child")
    //
    //     let range = document.body.createRange()
    //
    //     range.setStart(firstBlock, 0)
    //     range.setEnd(lastBlock, 0)
    //     range.select()
    // }

    return (
        <Box>
            <Button
                variant="contained"
                color="success"
                onClick={() => selectElementText(document.querySelector(".rawHtml"))}
            >
                Copy HTML
            </Button>
            <Grid container direction={"row"} flexWrap={"nowrap"} maxHeight={"700px"} marginY={"24px"}
                  overflow={"scroll"}
                  backgroundColor={"#282e33"} paddingX={"16px"}>

                <Grid item>
                    <Typography
                        className={"htmlNumbers"}
                        variant={"body1"}
                        fontFamily={"monospace"}
                        component={"div"}
                    ></Typography>

                </Grid>

                <Grid item width={"100%"}>
                    <Typography
                        className={"rawHtml"}
                        color={"#e7c993"}
                        variant={"body1"}
                        fontFamily={"monospace"}
                        component={"div"}
                    ></Typography>
                </Grid>
            </Grid>
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
