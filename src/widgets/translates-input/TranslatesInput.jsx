import {Box, Grid, Input, InputLabel} from "@mui/material";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addTranslatesFile, removeHtmlFile, removeTranslatesFile,
    setAvailableLangs, setRawHtml,
    setSortedTranslatesTable, setTranslatesTable
} from "../../features/files-input-panel/filesInputSlice.js";
import Typography from "@mui/material/Typography";
import readXlsxFile from "read-excel-file";
import {getAvailableLangs, sortTranslatesTable} from "../../pages/Translator/lib/index.js";
import {removeEmptyColumns} from "./lib/index.js";

function TranslatesInput() {
    const [error, setError] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch()
    const translatesFiles = useSelector((state) => state.filesInput.translatesFiles)

    const handleTranslatesInputChange = useCallback((event) => {
        const file = event.target.files[0];

        if (file.name.split('.').at(-1) !== 'xlsx') {
            setError('Wrong file type! Should be .xlsx');
            return;
        } else {
            setError('');
        }

        readXlsxFile(file).then((rows) => {
            setFile(file)
            const translatesTable = removeEmptyColumns(rows)
            const availableLangs = getAvailableLangs(translatesTable)

            dispatch(setTranslatesTable(translatesTable))
            dispatch(setAvailableLangs(availableLangs))
            dispatch(setSortedTranslatesTable(sortTranslatesTable(translatesTable, availableLangs)))

            // if (JSON.stringify(translatesTable))

            let isFileExist = false;
            Object.keys(translatesFiles).map(file => {
                if (JSON.stringify(translatesFiles[file]) === JSON.stringify(translatesTable)) {
                    isFileExist = true
                }
            })
            if (!isFileExist) {
                dispatch(addTranslatesFile({[file.name + "_" + Object.keys(translatesFiles).length]: translatesTable}))
            }

            setError("")
        }).catch(error => {
            setError(error)
        })
    }, [dispatch])


    const chooseActiveFileHandler = (event) => {
        document.querySelectorAll(".translateFiles .listFile").forEach((elem) => {
            elem.classList.remove("active")
        })
        const translatesTable = translatesFiles[event.currentTarget.children[0].textContent]
        const availableLangs = getAvailableLangs(translatesTable)

        event.currentTarget.classList.add("active")
        dispatch(setTranslatesTable(translatesTable))
        dispatch(setAvailableLangs(availableLangs))
        dispatch(setSortedTranslatesTable(sortTranslatesTable(translatesTable, availableLangs)))
    }

    const removeFileHandler = (fileName) => {
        dispatch(removeTranslatesFile(fileName))
    }

    return (
        <Box className={"input-wrapper"}>
            <InputLabel htmlFor={"docFile"}>{file ? file.name : "New Translates Document"} </InputLabel>
            <Input type={"file"} id={"docFile"} onChange={handleTranslatesInputChange}/>
            <Typography variant="subtitle1" color="red" component="p">
                {error}
            </Typography>
            <Grid className={"translateFiles"} container maxHeight={"300px"} marginY={"14px"} flexWrap={"nowrap"}
                  direction={"column"}
                  spacing={"8px"}
                  overflow={"scroll"}>
                {Object.keys(translatesFiles).map((fileName) => (
                    <Grid key={fileName} className={"listFile"} onClick={chooseActiveFileHandler} item>
                        <Typography>{fileName}</Typography>
                        <span className={"removeFile"} onClick={() => removeFileHandler(fileName)}>╳</span>
                    </Grid>
                ))}

            </Grid>
        </Box>
    )
}

export default TranslatesInput



