import React from "react";
import { TableCell } from "@mui/material";
import type { IRenderCellArgs, TableColumn } from "../types";

interface IAddItemTableCell<T = object> {
    row: T;
    column: TableColumn;
    rowIndex: number;
    renderCell(args: IRenderCellArgs): React.JSX.Element;
}

export const TableCellCustom = (props: IAddItemTableCell) => {
    const { row: _row, rowIndex, renderCell, column } = props;
    const labelId = `enhanced-table-checkbox-${rowIndex}`;

    const row = _row as any;

    return (<>
        {column.isVisable ? <TableCell id={labelId} key={column.id} height={'50px'}
            // align={column.type === 'number' ? 'right' : 'left'}
            padding={column.disablePadding ? 'none' : 'normal'}
            width={column.width ?? 'auto'}
            sx={{
                whiteSpace: "normal",
                wordBreak: "break-word"
            }}
        >
            {renderCell({ rowIndex, value: row[column.id], columnName: column.id, rowData: row })}
        </TableCell> : null}

    </>
    );
}