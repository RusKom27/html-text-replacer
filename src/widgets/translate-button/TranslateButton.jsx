import {Button} from "@mui/material";

import {useCallback} from "react";
import {reformatRawHtml, setIsTranslatedBlocks, translateBlocks} from "../../pages/Translator/lib/index.js";
import {useDispatch, useSelector} from "react-redux";
import {
    addTextBlocks,
    clearTextBlocks, setCurrentLang, setIsTranslatedIndexes,
    setReformattedHtml,
    setTranslatedTextBlocks
} from "../../features/files-input-panel/filesInputSlice.js";
import {createBlocks} from "../../features/html-panel/lib/index.js";

function TranslateButton() {

    const dispatch = useDispatch()

    const sortedTranslatesTable = useSelector((state) => state.filesInput.sortedTranslatesTable)
    const originalLang = useSelector((state) => state.filesInput.originalLang)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const currentLang = useSelector((state) => state.filesInput.currentLang)
    const rawHtml = useSelector((state) => state.filesInput.rawHtml)

    const translateHandler = useCallback(() => {
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

        createBlocks(reformattedHtml, currentLang, translatedTextBlocks)
        setIsTranslatedBlocks(isTranslatedIndexes)


    }, [rawHtml, sortedTranslatesTable, originalLang, currentLang, availableLangs])

    return (
        <Button onClick={translateHandler} variant={"contained"}>Translate</Button>
    )
}

export default TranslateButton
