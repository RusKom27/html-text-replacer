import {Input, InputLabel, Box} from "@mui/material";

function HtmlInput() {

    return (
        <Box>
            <InputLabel htmlFor={"docFile"}>Translates Document</InputLabel>
            <Input type={"file"} id={"docFile"}/>
        </Box>
    )
}

export default HtmlInput
