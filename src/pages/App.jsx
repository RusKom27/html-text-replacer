import './App.css'

import {Divider, Container} from "@mui/material";
import {Header} from "../widgets";
import {FilesInputPanel, HtmlPanel, TranslatesPanel} from "../features";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTranslatedTextBlocks} from "../features/files-input-panel/filesInputSlice.js";

function App() {
    const dispatch = useDispatch()
    const currentLang = useSelector((state) => state.filesInput.currentLang)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const textBlocks = useSelector((state) => state.filesInput.textBlocks)
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)


    useEffect(() => {
        // console.log(textBlocks);
        //
        // let translatedTextBlocks = [...textBlocks]
        //
        // textBlocks.forEach((textBlock, index) => {
        //
        //     const translatedTextBlock = translatesTable.filter((elem, index) => {
        //         if (index !== availableLangs[currentLang]) return
        //
        //         return elem[textBlock]
        //     })
        //
        //     translatedTextBlocks[index] = translatesTable[index][textBlock]
        //     dispatch(setTranslatedTextBlocks(translatedTextBlocks))
        // })

    }, [textBlocks])


    return (
        <>
            <Header/>
            <Container maxWidth={"lg"}>
                <FilesInputPanel/>
                <Divider/>
                <TranslatesPanel/>
                <HtmlPanel/>
            </Container>
        </>
    )
}

export default App
