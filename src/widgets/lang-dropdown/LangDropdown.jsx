import {InputLabel, MenuItem, Select, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {setCurrentLang, setOriginalLang} from "../../features/files-input-panel/filesInputSlice.js";
import {KeyboardArrowRight} from "@mui/icons-material";

function LangDropdown() {
    const dispatch = useDispatch()
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const currentLang = useSelector((state) => state.filesInput.currentLang)
    const originalLang = useSelector((state) => state.filesInput.originalLang)
    const translatedTextBlocks = useSelector((state) => state.filesInput.translatedTextBlocks)

    useEffect(() => {
        if (!availableLangs) return
        dispatch(setCurrentLang(Object.keys(availableLangs)[0]))

    }, [availableLangs])

    function handleLangDropdownChange(event) {
        dispatch(setCurrentLang(event.target.value))

        document.querySelectorAll("[data-text]").forEach((elem) => {
            elem.innerText = ` ${translatedTextBlocks[event.target.value][elem.dataset.text]} `
                .replaceAll("$", " <span class=\"currency\">$</span>")
                .replaceAll("€", " <span class=\"currency\">$</span>")
                .replaceAll("euros", " <span class=\"currency\">$</span>")
                .replaceAll("euro", " <span class=\"currency\">$</span>")
                .replaceAll("undefined", "")
        })
    }

    function handleOriginalLangDropdownChange(event) {
        dispatch(setOriginalLang(event.target.value))
    }

    if (!availableLangs) return

    return (
        <Grid container gap={"16px"} direction={"row"} justifyContent={"center"}>
            <Grid item>
                <InputLabel htmlFor={"originalLang"}>Original lang</InputLabel>
                <Select id={'originalLang'} value={originalLang} onChange={handleOriginalLangDropdownChange}>
                    {availableLangs && Object.keys(availableLangs).map((key, index) => {
                        return (
                            <MenuItem key={index} value={key}>{key}</MenuItem>
                        )
                    })}
                </Select>
            </Grid>
            <Grid item marginY={"auto"}>
                <KeyboardArrowRight/>
            </Grid>
            <Grid item>
                <InputLabel htmlFor={"currentLang"}>Lang</InputLabel>
                <Select id={'currentLang'} value={currentLang} onChange={handleLangDropdownChange}>
                    {availableLangs && Object.keys(availableLangs).map((key, index) => {
                        return (
                            <MenuItem key={index} value={key}>{key}</MenuItem>
                        )
                    })}
                </Select>
            </Grid>
        </Grid>
    )
}

export default LangDropdown
