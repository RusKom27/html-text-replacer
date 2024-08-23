import {Input, InputLabel, Box} from "@mui/material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setTranslatedTextBlocks,
    setTranslatesTable,
    setIsTranslatedIndexes
} from "../../features/files-input-panel/filesInputSlice.js";
import Typography from "@mui/material/Typography";
import readXlsxFile from "read-excel-file";

function HtmlInput() {
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    const textBlocks = useSelector((state) => state.filesInput.textBlocks)
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)
    const originalLang = useSelector((state) => state.filesInput.originalLang)

    useEffect(() => {
        let translatedTextBlocks = {}
        let sortedTranslatesTable = {}

        if (!translatesTable.length) return

        Object.keys(availableLangs).forEach((key) => {
            translatedTextBlocks[key] = []
            sortedTranslatesTable[key] = []
        })


        translatesTable.forEach((row, i) => {
            row.forEach((elem, j) => {
                if (elem === "" || elem === null) return
                if (!sortedTranslatesTable[Object.keys(availableLangs)[j]])
                    sortedTranslatesTable[Object.keys(availableLangs)[j]] = []

                sortedTranslatesTable[Object.keys(availableLangs)[j]].push(elem)
            })
        })


        translatedTextBlocks[originalLang] = textBlocks


        Object.keys(availableLangs).forEach(lang => {
            let translated = 0
            let isTranslatedIndexes = []
            if (lang === originalLang) return

            document.querySelector(`[data-text]`)?.classList.remove("translated")
            document.querySelector(`[data-text]`)?.classList.remove("not-translated")

            translatedTextBlocks[originalLang].forEach((block, index) => {
                let translatedBlockIndex = null
                sortedTranslatesTable[originalLang].map((elem, index) => {

                    if (
                        `${block}`.toLowerCase().trim().replaceAll(" ", "") ===
                        `${elem}`.toLowerCase().trim().replaceAll(" ", ""))
                        translatedBlockIndex = index
                })

                const translatedBlock = sortedTranslatesTable[lang][translatedBlockIndex]

                if (!translatedBlock) {
                    isTranslatedIndexes.push(false)
                    document.querySelector(`[data-text="${index}"]`)?.classList.add("not-translated")
                    translatedTextBlocks[lang].push(block)

                } else {
                    translatedTextBlocks[lang].push(translatedBlock)
                    isTranslatedIndexes.push(true)
                    document.querySelector(`[data-text="${index}"]`)?.classList.add("translated")
                    translated++
                }

            })
            console.log(`${translated}/${textBlocks.length}`)
        })


        dispatch(setTranslatedTextBlocks(translatedTextBlocks))

    }, [textBlocks, translatesTable, originalLang])


    function handleTranslatesInputChange(event) {
        const file = event.target.files[0];

        if (file.name.split('.').at(-1) !== 'xlsx') {
            setError('Wrong file type! Should be .xlsx');
            return;
        } else {
            setError('');
        }

        readXlsxFile(file).then((rows) => {

            console.log(removeEmptyColumns(rows));

            dispatch(setTranslatesTable(removeEmptyColumns(rows)))
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

function removeEmptyColumns(array) {
    const columnsToKeep = [];

    // Проверяем каждый столбец
    for (let col = 0; col < array[0].length; col++) {
        let isEmptyColumn = true;

        // Проверяем, есть ли хотя бы один непустой элемент в столбце
        for (let row = 0; row < array.length; row++) {
            if (array[row][col] !== null && array[row][col] !== undefined && array[row][col] !== '') {
                isEmptyColumn = false;
                break;
            }
        }

        // Если столбец не пустой, сохраняем его индекс
        if (!isEmptyColumn) {
            columnsToKeep.push(col);
        }
    }

    // Создаем новый массив без пустых столбцов
    const newArray = array.map(row => columnsToKeep.map(col => row[col]));

    return newArray;
}