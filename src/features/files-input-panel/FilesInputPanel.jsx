import {Grid} from "@mui/material";
import {HtmlInput, LangDropdown, TranslateButton, TranslatesInput} from "../../widgets";

function FilesInputPanel() {

    return (
        <Grid paddingY={"16px"} container spacing={2} padding={"8px"} direction={"column"} alignItems={"center"}
              flexWrap={"nowrap"}
              justifyContent={"center"}>
            <Grid item width={"100%"}>
                <LangDropdown/>
            </Grid>
            <Grid item width={"100%"}>
                <TranslatesInput/>
            </Grid>
            <Grid item width={"100%"}>
                <HtmlInput/>
            </Grid>
            <Grid item>
                <TranslateButton/>
            </Grid>
        </Grid>
    )
}

export default FilesInputPanel
