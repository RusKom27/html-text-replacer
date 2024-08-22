import {Input, InputLabel, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setTranslatedTextBlocks, setTranslatesTable} from "../../features/files-input-panel/filesInputSlice.js";
import Typography from "@mui/material/Typography";
import readXlsxFile from "read-excel-file";

function HtmlInput() {
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const textBlocks = useSelector((state) => state.filesInput.textBlocks)
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)

    useEffect(() => {
        let translatedTextBlocks = {}
        let sortedTranslatesTable = {}

        if (!translatesTable.length) return

        Object.keys(availableLangs).forEach((key) => {
            translatedTextBlocks[key] = []
            sortedTranslatesTable[key] = []
        })


        translatesTable.forEach((row, i) => {
            if (i === 0) return


            row.forEach((elem, j) => {
                if (j === 0 || elem === "" || elem === null) return
                if (!sortedTranslatesTable[Object.keys(availableLangs)[j - 1]])
                    sortedTranslatesTable[Object.keys(availableLangs)[j - 1]] = []

                sortedTranslatesTable[Object.keys(availableLangs)[j - 1]].push(elem)
            })
        })

        translatedTextBlocks[Object.keys(availableLangs)[0]] = textBlocks


        Object.keys(availableLangs).forEach(lang => {
            let translated = 0
            if (lang === Object.keys(availableLangs)[0]) return

            translatedTextBlocks[Object.keys(availableLangs)[0]].forEach((block) => {
                let translatedBlockIndex = null
                sortedTranslatesTable[Object.keys(availableLangs)[0]].map((elem, index) => {

                    if (
                        `${block}`.toLowerCase().trim().replaceAll(" ", "") ===
                        `${elem}`.toLowerCase().trim().replaceAll(" ", ""))
                        translatedBlockIndex = index
                })

                const translatedBlock = sortedTranslatesTable[lang][translatedBlockIndex]

                if (!translatedBlock)
                    translatedTextBlocks[lang].push(block)
                else {
                    translatedTextBlocks[lang].push(translatedBlock)

                    translated++
                }

            })
            console.log(`${translated}/${textBlocks.length}`)
        })


        dispatch(setTranslatedTextBlocks(translatedTextBlocks))

    }, [textBlocks, translatesTable])


    function handleTranslatesInputChange(event) {
        const file = event.target.files[0];

        if (file.name.split('.').at(-1) !== 'xlsx') {
            setError('Wrong file type! Should be .xlsx');
            return;
        } else {
            setError('');
        }

        readXlsxFile(file).then((rows) => {
            dispatch(setTranslatesTable(rows))
            setError("")
        }).catch(error => {
            setError(error)
        })
    }


    return (
        <Box>
            <InputLabel htmlFor={"docFile"}>Translates Document</InputLabel>
            <Input type={"file"} id={"docFile"} onChange={handleTranslatesInputChange}/>
            <Typography variant="subtitle1" color="red" component="p">
                {error}
            </Typography>
        </Box>
    )
}

export default HtmlInput
