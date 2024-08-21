import {Input, InputLabel, Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDispatch} from 'react-redux'
import {setRawHtml} from '../../features/files-input-panel/filesInputSlice'
import {useState} from "react";

function HtmlInput() {
    const [error, setError] = useState('');
    const dispatch = useDispatch()

    function handleHtmlInputChange(event) {
        const file = event.target.files[0];

        if (file.name.split('.').at(-1) !== 'html') {
            setError('Wrong file type should be .html');
            return;
        } else {
            setError('');
        }

        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = function (e) {
            const content = e.target.result;

            dispatch(setRawHtml(content))
            setError("")
        };
        reader.onerror = function (e) {
            setError(e.target.error.name)
        }
    }

    return (

        <Box>
            <InputLabel htmlFor={"htmlFile"}>HTML Document</InputLabel>
            <Input type={"file"} id={"htmlFile"} onChange={handleHtmlInputChange}/>
            <Typography variant="subtitle1" color="red" component="p">
                {error}
            </Typography>
        </Box>
    )
}

export default HtmlInput
