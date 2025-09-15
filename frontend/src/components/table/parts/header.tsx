import { TableHead, TableRow, TableCell, Checkbox, TableSortLabel, Box } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import type { EnhancedTableProps } from "../types";

export function EnhancedTableHead(props: Readonly<EnhancedTableProps>) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, columns } =
        props;
    const createSortHandler =
        (property: any) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {columns.map((column) => (
                    column.isVisable ? <TableCell
                        key={column.id}
                        // align={column.type === 'number' ? 'right' : 'left'}
                        padding={column.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === column.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={createSortHandler(column.id)}
                        >
                            {column.label}
                            {orderBy === column.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell> : null
                ))}
            </TableRow>
        </TableHead>
    );
}
