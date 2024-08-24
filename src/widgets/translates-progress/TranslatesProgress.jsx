import {Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Typography from "@mui/material/Typography";

function TranslatesProgress() {

    const [translatedProgress, setTranslatedProgress] = useState()
    const isTranslatedIndexes = useSelector((state) => state.filesInput.isTranslatedIndexes)
    const textBlocks = useSelector((state) => state.filesInput.textBlocks)


    useEffect(() => {
        setTranslatedProgress(isTranslatedIndexes.filter(el => el).length)
    }, [textBlocks, isTranslatedIndexes])


    return (
        <Box className={"progress-wrapper"}>
            <Box className={"progress"} width={`${translatedProgress / textBlocks.length * 100}%`}>
                <Typography
                    color={"#e7c993"}
                    variant={"body3"}
                    fontFamily={"monospace"}
                    component={"div"}
                    whiteSpace={"nowrap"}
                >
                    {`${translatedProgress} / ${textBlocks.length}`}
                </Typography>
            </Box>
        </Box>
    )
}

export default TranslatesProgress