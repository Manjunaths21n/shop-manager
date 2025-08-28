import { useMemo } from "react";
import { TableBody } from "@mui/material";
import { rows } from "../constants";
import type { Data, Order } from "../types";
import { getComparator } from "../utils";
import { EnhancedTableRow } from "./table-row";

interface IEnhancedTableBody {
    selected: readonly number[];
    page: number;
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    order: Order;
    rowsPerPage: number;
    tableRows: any[];
    orderBy: keyof Data;
    editIndex: number;
    onEditClick(index: number): void;
    onDeleteClick(index: number): void;
    onSaveClick(): void;
    onCancleClick(): void;
    handleRowChange(value: Data): void
}

export function EnhancedTableBody(props: Readonly<IEnhancedTableBody>) {
    const { selected, page, setSelected, order, rowsPerPage, orderBy, tableRows,
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
                        selected={selected} setSelected={setSelected} handleRowChange={handleRowChange}
                    />
                );
            })}
        </TableBody>
    );
}
