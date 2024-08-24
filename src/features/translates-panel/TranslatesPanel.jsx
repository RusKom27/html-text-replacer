import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


function TranslatesPanel() {
    const translatesTable = useSelector((state) => state.filesInput.translatesTable)
    const availableLangs = useSelector((state) => state.filesInput.availableLangs)

    useEffect(() => {
    }, [translatesTable])

    return (
        <Box padding={"16px"} marginY={"24px"} maxHeight={"700px"} overflow={"scroll"}>
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {availableLangs && Object.keys(availableLangs).map((key, index) => (
                                <TableCell key={index}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {translatesTable && translatesTable.map((row, index) => {
                            if (index === 0) return
                            return (
                                <TableRow key={index}>
                                    {row.map((key, index) => {
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
