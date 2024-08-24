import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import {Sidebar, TranslatesProgress} from "../../widgets/index.js";
import {FilesInputPanel, HtmlPanel, TranslatesPanel} from "../../features/index.js";
import {ArrowDropDown} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {useEffect} from "react";
import {getAvailableLangs, reformatRawHtml, setIsTranslatedBlocks, sortTranslatesTable, translateBlocks} from "./lib";
import {
    addTextBlocks,
    clearTextBlocks, setAvailableLangs,
    setIsTranslatedIndexes, setReformattedHtml,
    setSortedTranslatesTable,
    setTranslatedTextBlocks
} from "../../features/files-input-panel/filesInputSlice.js";
import {useDispatch, useSelector} from "react-redux";


function Translator() {
    const dispatch = useDispatch()
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const sortedTranslatesTable = useSelector((state) => state.filesInput.sortedTranslatesTable)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const originalLang = useSelector((state) => state.filesInput.originalLang)
    const rawHtml = useSelector((state) => state.filesInput.rawHtml)


    useEffect(() => {
        const availableLangs = getAvailableLangs(translatesTable)

        dispatch(setAvailableLangs(availableLangs))
        dispatch(setSortedTranslatesTable(sortTranslatesTable(translatesTable, availableLangs)))
    }, [translatesTable, dispatch])

    useEffect(() => {
        const [textBlocks, reformattedHtml] = reformatRawHtml(rawHtml, sortedTranslatesTable[originalLang])

        const [
            translatedTextBlocks,
            isTranslatedIndexes
        ] = translateBlocks(sortedTranslatesTable, availableLangs, originalLang, textBlocks)

        dispatch(clearTextBlocks())
        dispatch(setReformattedHtml(reformattedHtml))
        dispatch(setTranslatedTextBlocks(translatedTextBlocks))
        dispatch(setIsTranslatedIndexes(isTranslatedIndexes))
        dispatch(addTextBlocks(textBlocks))

    }, [rawHtml, dispatch])

    return (
        <Grid container direction={"row"} flexWrap={"nowrap"}>
            <Grid item width={"300px"} flexShrink={0}>
                <Sidebar>
                    <FilesInputPanel/>
                </Sidebar>
            </Grid>
            <Grid item padding={"16px"} width={`calc(100% - 300px)`}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDown/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant="h6">
                            Translates
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <TranslatesPanel/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDown/>}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography variant="h6">
                            HTML
                        </Typography>
                        <TranslatesProgress/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <HtmlPanel/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

export default Translator
