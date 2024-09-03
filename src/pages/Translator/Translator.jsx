import {Accordion, AccordionDetails, AccordionSummary, Grid} from "@mui/material";
import {Sidebar, TranslatesProgress} from "../../widgets/index.js";
import {FilesInputPanel, HtmlPanel, TranslatesPanel} from "../../features/index.js";
import {ArrowDropDown} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

function Translator() {

    return (
        <Grid container direction={"row"} flexWrap={"nowrap"}>
            <Grid item width={"300px"} flexShrink={0}>
                <Sidebar>
                    <FilesInputPanel/>
                </Sidebar>
            </Grid>
            <Grid item padding={"16px"} width={`calc(100% - 300px)`}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDown/>}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant="h6">
                            Translates
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>
                        <TranslatesPanel/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ArrowDropDown/>}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        <Typography variant="h6">
                            HTML
                        </Typography>
                        <TranslatesProgress/>
                    </AccordionSummary>
                    <AccordionDetails>
                        <HtmlPanel/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
    )
}

export default Translator
