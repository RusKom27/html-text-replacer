import {InputLabel, Box, MenuItem, Select} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {useEffect} from "react";
import {setCurrentLang} from "../../features/files-input-panel/filesInputSlice.js";

function LangDropdown() {
    const dispatch = useDispatch()
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const currentLang = useSelector((state) => state.filesInput.currentLang)
    const translatedTextBlocks = useSelector((state) => state.filesInput.translatedTextBlocks)


    useEffect(() => {
        dispatch(setCurrentLang(Object.keys(availableLangs)[0]))

    }, [availableLangs])

    function handleLangDropdownChange(event) {
        dispatch(setCurrentLang(event.target.value))

        document.querySelectorAll("[data-text]").forEach((elem) => {
            elem.innerText = ` ${translatedTextBlocks[event.target.value][elem.dataset.text]} `
        })

    }

    return (
        <Box>
            <InputLabel htmlFor={"currentLang"}>Lang</InputLabel>
            <Select id={'currentLang'} value={currentLang} onChange={handleLangDropdownChange}>
                {availableLangs && Object.keys(availableLangs).map((key, index) => {
                    return (
                        <MenuItem key={index} value={key}>{key}</MenuItem>
                    )
                })}
            </Select>
        </Box>
    )
}

export default LangDropdown
