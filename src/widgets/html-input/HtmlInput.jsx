import {Input, InputLabel, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch, useSelector} from 'react-redux'
import {setRawHtml} from '../../features/files-input-panel/filesInputSlice'
import {useEffect, useState} from "react";

function HtmlInput() {
    const [error, setError] = useState('');
    const [inputIsMuted, setInputIsMuted] = useState(false);
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
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
            setError("")
        };
        reader.onerror = function (e) {
            setError(e.target.error.name)
        }
    }

    return (

        <Box>
            <InputLabel htmlFor={"htmlFile"}>HTML Document</InputLabel>
            <Input disabled={inputIsMuted} type={"file"} id={"htmlFile"} onChange={handleHtmlInputChange}/>
            <Typography variant="subtitle1" color="red" component="p">
                {error}
            </Typography>
        </Box>
    )
}

export default HtmlInput
