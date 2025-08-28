import { TableRow, TableCell, Checkbox, IconButton, Box, Input } from "@mui/material";
import type { Data, Order } from "../types";
import { AddItemTableCell } from "./add-items-tabel-cell";

interface IEnhancedTableBody {
    row: Data;
    selected: readonly number[];
    setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
    rowIndex: number;
    editIndex: number;
    onEditClick(index: number): void;
    onDeleteClick(index: number): void;
    onSaveClick(): void;
    onCancleClick(): void;
    handleRowChange(value: Data): void;
}

export function EnhancedTableRow(props: Readonly<IEnhancedTableBody>) {
    const { row, selected, setSelected, rowIndex, editIndex, handleRowChange,
        onEditClick, onCancleClick, onDeleteClick, onSaveClick } = props;

    const isItemSelected = selected.includes(row.id);

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

    const handleChange = <K extends keyof Data>(field: K, value: Data[K]) => {
        const updated = { ...row };
        updated[field] = value;
        handleRowChange(updated);
    };

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
            <AddItemTableCell
                row={row} rowIndex={rowIndex} editIndex={editIndex}
                key={rowIndex} onEditClick={onEditClick} onCancleClick={onCancleClick}
                onDeleteClick={onDeleteClick} onSaveClick={onSaveClick}
                onCellValueChange={handleChange}
            />
            {/* {editIndex === index?<Input type=""/>:<TableCell component="th" id={labelId} scope="row" padding="normal">{row.name}</TableCell>}
            {editIndex === index?<Input type=""/>:<TableCell align="left">{row.category}</TableCell>}
            {editIndex === index?<Input type=""/>:<TableCell align="right">{row.cost}</TableCell>}
            {editIndex === index?<Input type=""/>:<TableCell align="right">{row.price}</TableCell>} */}
        </TableRow>
    );

}
