import {Grid} from "@mui/material";
import {HtmlInput, TranslatesInput} from "../../widgets";

function FilesInputPanel() {

    return (
        <Grid paddingY={"16px"} container spacing={2} direction={"row"} justifyContent={"center"}>
            <Grid item>
                <TranslatesInput/>
            </Grid>
            <Grid item>
                <HtmlInput/>
            </Grid>
        </Grid>
    )
}

export default FilesInputPanel
