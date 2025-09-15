import { TableRow, TableCell, Checkbox, IconButton, Box, Input } from "@mui/material";
import { TableCellCustom } from "./cell";
import type { TableColumn } from "../types";
import { useCallback } from "react";

interface IEnhancedTableBody<T = object> {
    row: T;
    selected: readonly number[];
    rowIndex: number;
    columns: TableColumn[];
    handleRowChange(value: T): void;
}

export function TableRowCustom<T = object>(props: Readonly<IEnhancedTableBody<T>>) {
    const { row: _row, selected, rowIndex, handleRowChange, columns } = props;

    const row = _row as any;

    const isItemSelected = selected.includes(row.id);

    const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
        const updated = { ...row };
        updated[field] = value;
        handleRowChange(updated);
    };

    const cellRender = useCallback(() => {
        const cells: any[] = [];
        columns.forEach(columnInfo => {
            cells.push(<TableCellCustom
                row={row} rowIndex={rowIndex}
                key={rowIndex}
                column={columnInfo}
                renderCell={columnInfo.renderCell}
            />);
        });
        return cells;
    }, [rowIndex, columns, row]);

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
