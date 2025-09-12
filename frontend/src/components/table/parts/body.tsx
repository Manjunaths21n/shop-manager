import { useMemo } from "react";
import { TableBody } from "@mui/material";
import { getComparator } from "../utils";
import { EnhancedTableRow } from "./row";
import type { Order, TableColumn } from "../types";

interface IEnhancedTableBody<T = object> {
    selected: readonly number[];
    page: number;
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    order: Order;
    rowsPerPage: number;
    columns: TableColumn[];
    tableRows: any[];
    orderBy: keyof T;
    editIndex: number;
    onEditClick(index: number): void;
    onDeleteClick(index: number): void;
    onSaveClick(): void;
    onCancleClick(): void;
    handleRowChange(value: T): void
}

export function EnhancedTableBody<T = object>(props: Readonly<IEnhancedTableBody<T>>) {
    const { selected, page, setSelected, order, rowsPerPage, orderBy, tableRows, columns,
        onEditClick, onDeleteClick, onSaveClick, onCancleClick, editIndex, handleRowChange } = props;

    const visibleRows = useMemo(() => (
        [...tableRows]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ), [tableRows, order, orderBy, page, rowsPerPage]);

    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                return (
                    <EnhancedTableRow
                        row={row} rowIndex={index} editIndex={editIndex}
                        key={index} onEditClick={onEditClick} onCancleClick={onCancleClick}
                        onDeleteClick={onDeleteClick} onSaveClick={onSaveClick}
                        selected={selected}
                        // setSelected={setSelected}
                        columns={columns}
                        handleRowChange={handleRowChange}
                    />
                );
            })}
        </TableBody>
    );
}
