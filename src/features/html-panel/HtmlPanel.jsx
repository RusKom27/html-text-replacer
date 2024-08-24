import {useSelector} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import Typography from "@mui/material/Typography";
import {Box, Button, Grid} from "@mui/material";
import {createBlocks, selectElementText} from "./lib";

function HtmlPanel() {
    const reformattedHtml = useSelector((state) => state.filesInput.reformattedHtml)
    const root = useRef()

    useEffect(() => {
        createBlocks(reformattedHtml, root)
    }, [reformattedHtml])

    const selectHTML = useCallback(() => {
        selectElementText(root.current)
    }, [root])

    return (
        <Box>
            <Button
                variant="contained"
                color="success"
                onClick={selectHTML}
            >
                Copy HTML
            </Button>
            <Grid container direction={"row"} flexWrap={"nowrap"} maxHeight={"700px"}
                  marginY={"24px"}
                  overflow={"scroll"} width={"100%"}
                  backgroundColor={"#282e33"} paddingX={"16px"}>

                <Typography
                    className={"rawHtml"}
                    ref={root}
                    color={"#e7c993"}
                    variant={"body3"}
                    fontFamily={"monospace"}
                    component={"div"}

                ></Typography>
            </Grid>
        </Box>
    )
}


export default HtmlPanel





