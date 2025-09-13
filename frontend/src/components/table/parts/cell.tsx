import React, { useCallback } from "react";
import { TableRow, TableCell, TextField, IconButton, Box, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IRenderCellArgs, TableColumn } from "../types";

interface IAddItemTableCell<T = object> {
    row: T;
    column: TableColumn;
    rowIndex: number;
    editIndex: number;
    renderCell(args: IRenderCellArgs): React.JSX.Element;
    // onEditClick(index: number): void;
    // onDeleteClick(index: number): void;
    // onSaveClick(): void;
    // onCancleClick(): void;
    // onCellValueChange(field: string, value: string): void;
}

export const AddItemTableCell = (props: IAddItemTableCell) => {
    const { row: _row, rowIndex, editIndex, renderCell, column } = props;
    const labelId = `enhanced-table-checkbox-${rowIndex}`;

    const row = _row as any;

    // const _onEditClick = useCallback(() => {
    //     onEditClick(rowIndex);
    // }, []);

    // const _onDeleteClick = useCallback(() => {
    //     onDeleteClick(rowIndex);
    // }, []);

    return (<>
        {/* <TableCell padding="none"> */}
        {/* <Box sx={{ display: "flex", flexDirection: "row" }}>
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
            </Box> */}
        {/* </TableCell>
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
        </TableCell> */}

        <TableCell id={labelId} key={column.id} height={'50px'}
            // align={column.type === 'number' ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}>
            {renderCell({ editIndex, rowIndex, value: row[column.id], columnName: column.id })}
        </TableCell>

    </>
    );
}