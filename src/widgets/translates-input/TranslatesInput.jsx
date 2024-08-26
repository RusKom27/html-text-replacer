import {Box, Input, InputLabel} from "@mui/material";
import {useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {setTranslatesTable} from "../../features/files-input-panel/filesInputSlice.js";
import Typography from "@mui/material/Typography";
import readXlsxFile from "read-excel-file";
import {removeEmptyColumns} from "./lib";

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



