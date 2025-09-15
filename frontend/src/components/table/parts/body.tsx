import { useMemo } from "react";
import { Container, TableBody } from "@mui/material";
import { getComparator } from "../utils";
import { TableRowCustom } from "./row";
import type { Order, TableColumn } from "../types";

interface IEnhancedTableBody<T = object> {
    selected: readonly number[];
    page: number;
    order: Order;
    rowsPerPage: number;
    columns: TableColumn[];
    tableRows: any[];
    orderBy: keyof T;
    handleRowChange(value: T): void
}

export function EnhancedTableBody<T = object>(props: Readonly<IEnhancedTableBody<T>>) {
    const { selected, page, order, rowsPerPage, orderBy, tableRows, columns, handleRowChange } = props;

    const visibleRows = useMemo(() => (
        [...tableRows]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    ), [tableRows, order, orderBy, page, rowsPerPage]);

    return (
        <>
            <TableBody>
                {visibleRows.length ? visibleRows.map((row, index) => {
                    return (
                        <TableRowCustom
                            row={row} rowIndex={index}
                            key={index}
                            selected={selected}
                            columns={columns}
                            handleRowChange={handleRowChange}
                        />
                    );
                }) :
                    null}
            </TableBody>
            {visibleRows.length === 0 && <Container sx={{ alignContent: 'center', height: '50px' }}>Empty Items</Container>}
        </>
    );
}
