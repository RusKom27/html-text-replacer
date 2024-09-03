import {Input, InputLabel, Box, Grid, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from 'react-redux'
import {
    addHtmlFile,
    addTranslatesFile,
    removeHtmlFile,
    setRawHtml
} from '../../features/files-input-panel/filesInputSlice'
import {useEffect, useState} from "react";

function HtmlInput() {
    const [error, setError] = useState('');
    const [inputIsMuted, setInputIsMuted] = useState(false);
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const htmlFiles = useSelector((state) => state.filesInput.htmlFiles)
    const dispatch = useDispatch()

    useEffect(() => {
        if (translatesTable.length === 0) setInputIsMuted(true)
        else setInputIsMuted(false)

    }, [translatesTable])

    function handleHtmlInputChange(event) {
        const file = event.target.files[0];

        if (translatesTable.length === 0) {
            setError('No translates table loaded!')
            return;
        }

        if (file.name.split('.').at(-1) !== 'html') {
            setError('Wrong file type! Should be .html');
            return;
        } else {
            setError('');
        }

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = function (e) {
            dispatch(setRawHtml(e.target.result))

            let isFileExist = false;
            Object.keys(htmlFiles).map(file => {
                if (JSON.stringify(htmlFiles[file]) === JSON.stringify(e.target.result)) {
                    isFileExist = true
                }
            })
            if (!isFileExist) {
                dispatch(addHtmlFile({[file.name + "_" + Object.keys(htmlFiles).length]: e.target.result}))
            }


            setError("")
        };
        reader.onerror = function (e) {
            setError(e.target.error.name)
        }
    }

    const chooseActiveFileHandler = (event) => {
        document.querySelectorAll(".htmlFiles .listFile").forEach((elem) => {
            elem.classList.remove("active")
        })
        event.currentTarget.classList.add("active")

        dispatch(setRawHtml(htmlFiles[event.currentTarget.children[0].textContent]))
    }

    const removeFileHandler = (fileName) => {
        dispatch(removeHtmlFile(fileName))
    }

    return (

        <Box className={"input-wrapper"}>
            <InputLabel htmlFor={"htmlFile"}>New HTML Document</InputLabel>
            <Input disabled={inputIsMuted} type={"file"} id={"htmlFile"} onChange={handleHtmlInputChange}/>

            <Typography variant="subtitle1" color="red" component="p">
                {error}
            </Typography>
            <Divider/>
            <Grid className={"htmlFiles"} container maxHeight={"300px"} marginY={"14px"} flexWrap={"nowrap"}
                  direction={"column"}
                  spacing={"8px"}
                  overflow={"scroll"}>
                {Object.keys(htmlFiles).map((fileName) => (
                    <Grid key={fileName} className={"listFile"} onClick={chooseActiveFileHandler}
                          item>
                        <Typography>{fileName}</Typography>
                        <span className={"removeFile"} onClick={() => removeFileHandler(fileName)}>╳</span>
                    </Grid>
                ))}

            </Grid>
            <Divider/>
        </Box>
    )
}

export default HtmlInput
