import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {setAvailableLangs} from "../files-input-panel/filesInputSlice.js";


function TranslatesPanel() {
    const dispatch = useDispatch()

    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)

    useEffect(() => {

        if (translatesTable.length === 0) return

        let availableLangs = {}

        translatesTable[0].forEach((key, index) => {
            if (key === null) return

            availableLangs[key] = index
        })

        dispatch(setAvailableLangs(availableLangs))

    }, [translatesTable])

    return (
        <Box padding={"16px"} marginY={"24px"} maxHeight={"700px"} overflow={"scroll"}>
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {Object.keys(availableLangs).map((key, index) => (
                                <TableCell key={index}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {translatesTable.map((row, index) => {
                            if (index === 0) return

                            return (

                                <TableRow key={index}>
                                    {row.map((key, index) => {
                                            if (index === 0) return
                                            return (
                                                <TableCell key={index}>{key}</TableCell>
                                            )
                                        }
                                    )}


                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    )
}

export default TranslatesPanel
