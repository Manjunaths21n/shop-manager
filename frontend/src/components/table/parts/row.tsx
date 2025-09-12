import { TableRow, TableCell, Checkbox, IconButton, Box, Input } from "@mui/material";
import { AddItemTableCell } from "./cell";
import type { TableColumn } from "../types";
import { useCallback } from "react";

interface IEnhancedTableBody<T = object> {
    row: T;
    selected: readonly number[];
    // setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    rowIndex: number;
    editIndex: number;
    onEditClick(index: number): void;
    onDeleteClick(index: number): void;
    columns: TableColumn[];
    // renderCell(): React.JSX.Element;
    onSaveClick(): void;
    onCancleClick(): void;
    handleRowChange(value: T): void;
}

export function EnhancedTableRow<T = object>(props: Readonly<IEnhancedTableBody<T>>) {
    const { row: _row, selected, rowIndex, editIndex, handleRowChange, columns,
        onEditClick, onCancleClick, onDeleteClick, onSaveClick } = props;

    const row = _row as any;

    const isItemSelected = selected.includes(row.id);

    // const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    //     const selectedIndex = selected.indexOf(id);
    //     let newSelected: readonly number[] = [];

    //     if (selectedIndex === -1) {
    //         newSelected = newSelected.concat(selected, id);
    //     } else if (selectedIndex === 0) {
    //         newSelected = newSelected.concat(selected.slice(1));
    //     } else if (selectedIndex === selected.length - 1) {
    //         newSelected = newSelected.concat(selected.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelected = newSelected.concat(
    //             selected.slice(0, selectedIndex),
    //             selected.slice(selectedIndex + 1),
    //         );
    //     }
    //     setSelected(newSelected);
    // };

    const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
        const updated = { ...row };
        updated[field] = value;
        handleRowChange(updated);
    };

    const cellRender = useCallback(() => {
        const cells = [];
        // columns.forEach(element => {
            
        // });
        for (const key in row) {
            if (Object.hasOwn(row, key)) {
                // const recordData = row[key];
                const column = columns.find((column) => column.id === key);
                if (column) {

                    cells.push(<AddItemTableCell
                        row={row} rowIndex={rowIndex} editIndex={editIndex}
                        key={rowIndex}
                        columnName={key}
                        renderCell={column.renderCell}
                    // onEditClick={onEditClick} onCancleClick={onCancleClick}
                    // onDeleteClick={onDeleteClick} onSaveClick={onSaveClick}
                    // onCellValueChange={handleChange}
                    />);
                }

            }
        }
        return cells;
    }, [editIndex, rowIndex, columns, row]);

    return (
        <TableRow
            hover
            // onClick={(event) => handleClick(event, row.id)}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer', border: '1px solid ButtonFace' }}
        >
            {cellRender()}
        </TableRow>
    );

}
