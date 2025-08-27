import { useMemo } from "react";
import { TableBody } from "@mui/material";
import { rows } from "../mui-table-constants";
import type { Data, Order } from "../mui-table-types";
import { getComparator } from "../mui-table-utils";
import { EnhancedTableRow } from "./table-row";

interface IEnhancedTableBody {
    selected: readonly number[];
    page: number;
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    order: Order;
    rowsPerPage: number;
    orderBy: keyof Data;
}

export function EnhancedTableBody(props: Readonly<IEnhancedTableBody>) {
    const { selected, page, setSelected, order, rowsPerPage, orderBy } = props;

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage],
    );

    return (
        <TableBody>
            {visibleRows.map((row, index) => {
                return (
                    <EnhancedTableRow
                        row={row}
                        key={index}
                        selected={selected}
                        setSelected={setSelected}
                        index={index}
                    />
                );
            })}
        </TableBody>
    );
}
