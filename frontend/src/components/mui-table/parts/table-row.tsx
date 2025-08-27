import { TableRow, TableCell, Checkbox } from "@mui/material";
import type { Data, Order } from "../mui-table-types";

interface IEnhancedTableBody {
    row: Data;
    selected: readonly number[];
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    index: number;
}

export function EnhancedTableRow(props: Readonly<IEnhancedTableBody>) {
    const { row, selected, setSelected, index } = props;

    const isItemSelected = selected.includes(row.id);
    const labelId = `enhanced-table-checkbox-${index}`;

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };


    return (
        <TableRow
            hover
            onClick={(event) => handleClick(event, row.id)}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            sx={{ cursor: 'pointer' }}
        >
            <TableCell padding="checkbox">
                <Checkbox
                    color="primary"
                    checked={isItemSelected}
                />
            </TableCell>
            <TableCell
                component="th"
                id={labelId}
                scope="row"
                padding="none"
            >
                {row.name}
            </TableCell>
            <TableCell align="right">{row.cost}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
        </TableRow>
    );

}
