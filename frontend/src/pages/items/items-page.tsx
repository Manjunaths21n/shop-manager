import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { EnhancedTable } from "../../components";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { createData } from "./mui-table-utils";
import { headCells, ItemsData } from "./mui-table-constants";
import { TableRenderer } from "../../components/table";
import { TableRow, TableCell, TextField, IconButton, Box, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";

export const Items = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState([]);
    const [editIndex, setEditIndex] = useState<number>(-1);

    const getItems = useCallback(async () => {

        let response = []
        try {
            response = await itemsService.getItems() ?? [];
        } catch (err) {
            console.log('Failed to fetch Items', err);
        }
        console.log(response);
        const parsedRowData = response?.map((rowData: any, index: number) => {
            return createData(index, rowData.name, rowData.category, rowData.cost, rowData.price)
        });
        setRows(parsedRowData);
    }, []);

    useEffect(() => {
        getItems();
    }, []);

    const _setEditIndex = useCallback((value: number) => {
        setEditIndex(value);
    }, []);


    const ItemsColumn: TableColumn[] = useMemo(() => ([
        {
            id: 'column1',
            label: 'Column 1',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                return (
                    <>
                        {_editIndex === rowIndex ?
                            <TextField
                                value={value}
                                onChange={(e) => console.log(columnName, e.target.value)}
                                variant="standard"
                                size="small"
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            isVisable: true
        },
        {
            id: 'column2',
            label: 'Column 2',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                console.log(args);
                return (
                    <>
                        {_editIndex === rowIndex ?
                            <TextField
                                value={value}
                                onChange={(e) => console.log(columnName, e.target.value)}
                                variant="standard"
                                size="small"
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            isVisable: true
        },
        {
            id: 'action',
            label: 'Action',
            type: '',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                console.log(args);

                return (
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        {_editIndex === rowIndex ?
                            <>  <IconButton aria-label="save" size="small" onClick={() => _setEditIndex(-1)}>
                                <SaveIcon fontSize="small" />
                            </IconButton>
                                <IconButton aria-label="cancel" size="small" onClick={() => _setEditIndex(-1)}>
                                    <CancelIcon fontSize="small" />
                                </IconButton></> : <>
                                <IconButton aria-label="edit" size="small" onClick={() => _setEditIndex(rowIndex)}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => { console.log('deleted index', rowIndex); }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </>
                        }
                    </Box>
                );
            },
            disablePadding: false,
            isVisable: true
        }]), [_setEditIndex]);


    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <EnhancedTable column={headCells} data={rows} />
            <TableRenderer data={ItemsData} columns={ItemsColumn} editIndex={editIndex} setEditIndex={_setEditIndex} />
        </Container>
    );
});
