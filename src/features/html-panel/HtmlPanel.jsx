import {useDispatch} from "react-redux";
import {useCallback, useEffect, useRef} from "react";
import Typography from "@mui/material/Typography";
import {Box, Button, Grid} from "@mui/material";
import {selectElementText} from "./lib";

function HtmlPanel() {
    const root = useRef()

    useEffect(() => {

    }, [root])


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
                    id={"htmlRoot"}
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





