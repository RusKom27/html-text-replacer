import {Box, Input, InputLabel} from "@mui/material";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {setTranslatesTable} from "../../features/files-input-panel/filesInputSlice.js";
import Typography from "@mui/material/Typography";
import readXlsxFile from "read-excel-file";

function TranslatesInput() {
    const [error, setError] = useState('');
    const dispatch = useDispatch()

    const handleTranslatesInputChange = useCallback((event) => {
        const file = event.target.files[0];

        if (file.name.split('.').at(-1) !== 'xlsx') {
            setError('Wrong file type! Should be .xlsx');
            return;
        } else {
            setError('');
        }

        readXlsxFile(file).then((rows) => {
            dispatch(setTranslatesTable(removeEmptyColumns(rows)))
            setError("")
        }).catch(error => {
            setError(error)
        })
    }, [dispatch])


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

export default TranslatesInput

function removeEmptyColumns(array) {
    const columnsToKeep = [];

    for (let col = 0; col < array[0].length; col++) {
        let isEmptyColumn = true;

        for (let row = 0; row < array.length; row++) {
            if (array[row][col] !== null && array[row][col] !== undefined && array[row][col] !== '') {
                isEmptyColumn = false;
                break;
            }
        }

        if (!isEmptyColumn) {
            columnsToKeep.push(col);
        }
    }
    return array.map(row => columnsToKeep.map(col => row[col]));
}

