import { TableRow, TableCell, TextField, IconButton, Box, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { Data, Order } from "../types";
import { useCallback } from "react";

interface IAddItemTableCell {
    row: Data;
    rowIndex: number;
    editIndex: number;
    onEditClick(index: number): void;
    onDeleteClick(index: number): void;
    onSaveClick(): void;
    onCancleClick(): void;
    onCellValueChange(field: string, value: string): void;
}

export const AddItemTableCell = (props: IAddItemTableCell) => {
    const { row, onCellValueChange, rowIndex, editIndex, onEditClick, onDeleteClick, onSaveClick, onCancleClick } = props;
    const labelId = `enhanced-table-checkbox-${rowIndex}`;

    const _onEditClick = useCallback(() => {
        onEditClick(rowIndex);
    }, []);

    const _onDeleteClick = useCallback(() => {
        onDeleteClick(rowIndex);
    }, []);

    return (<>
        <TableCell padding="none">
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                {editIndex === rowIndex ?
                    <>  <IconButton aria-label="save" size="small" onClick={onSaveClick}>
                        <SaveIcon fontSize="small" />
                    </IconButton>
                        <IconButton aria-label="cancel" size="small" onClick={onCancleClick}>
                            <CancelIcon fontSize="small" />
                        </IconButton></> : <>
                        <IconButton aria-label="edit" size="small" onClick={_onEditClick}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" onClick={_onDeleteClick}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </>
                }
            </Box>
        </TableCell>
        <TableCell id={labelId} component="th" scope="row" padding="normal">
            {editIndex === rowIndex ?
                <TextField
                    value={row.name}
                    onChange={(e) => onCellValueChange("name", e.target.value)}
                    variant="standard"
                    size="small"
                /> :
                row.name
            }
        </TableCell>
        <TableCell align="left">
            {editIndex === rowIndex ?
                <TextField
                    value={row.category}
                    onChange={(e) => onCellValueChange("category", e.target.value)}
                    variant="standard"
                    size="small"
                /> : row.category}
        </TableCell>
        <TableCell align="right">
            {editIndex === rowIndex ?
                <TextField
                    type="number"
                    value={row.cost}
                    onChange={(e) => onCellValueChange("cost", e.target.value)}
                    variant="standard"
                    size="small"
                /> : row.cost}
        </TableCell>
        <TableCell align="right">{editIndex === rowIndex ?
            <TextField
                type="number"
                value={row.price}
                onChange={(e) => onCellValueChange("price", e.target.value)}
                variant="standard"
                size="small"
            /> : row.price}
        </TableCell>

    </>
    );
}