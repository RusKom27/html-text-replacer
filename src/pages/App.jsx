import './App.css'

import {Divider, Container} from "@mui/material";
import {Header} from "../widgets";
import {FilesInputPanel} from "../features";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import Typography from "@mui/material/Typography";

function App() {

    const rawHtml = useSelector((state) => state.filesInput.rawHtml)

    useEffect(() => {


        let rawHtmlContainer = document.querySelector(".rawHtml")

        rawHtmlContainer.innerHTML = ""

        rawHtml.split("\n").forEach(line => {

            let tabs = countTabs(line)

            for (let i = 0; i < tabs; i++) {
                rawHtmlContainer.innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;"
            }


            rawHtmlContainer.innerText += line
            rawHtmlContainer.innerHTML += "<br>"
        })

    }, [rawHtml])

    return (
        <>
            <Header/>
            <Container maxWidth={"lg"}>
                <FilesInputPanel/>
                <Divider/>
                <Typography backgroundColor={"#282e33"} className={"rawHtml"} color={"#e7c993"} variant={"body1"}
                            fontFamily={"monospace"}></Typography>

            </Container>
        </>
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

export default App
