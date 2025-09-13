import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { TableRenderer } from "../../components/table";
import { TableRow, TableCell, TextField, IconButton, Box, Input, Autocomplete, Stack } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";
import { ItemsData } from "../item-list/mui-table-constants";
import { createData } from "../item-list/mui-table-utils";
import { TableToolbar } from "../../components/table/parts";

export const AddItems = memo(() => {
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
            id: 'action',
            label: 'Action',
            type: '',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                console.log(args);

                return (
                    <Box sx={{ display: "flex", flexDirection: "row", height: "100px" }}>
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
        },
        {
            id: 'itemName',
            label: 'Item Name',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                return (
                    <>
                        {_editIndex === rowIndex ?
                            <Autocomplete
                                disablePortal
                                options={['soop']}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Enter Name" />}
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
            id: 'cost',
            label: 'Item Cost',
            type: 'number',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                console.log(args);
                return (
                    <>
                        {_editIndex === rowIndex ?
                            <TextField
                                type="number"
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
            id: 'category',
            label: 'Category',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { editIndex: _editIndex, rowIndex, value, columnName } = args;
                console.log(args);
                return (
                    <>
                        {_editIndex === rowIndex ?
                            <Autocomplete
                                disablePortal
                                options={['soop']}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Enter Category" />}
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            isVisable: true
        }
    ]), [_setEditIndex]);

    return (

        <Stack sx={{ marginTop: 2, height: '100%' }} maxWidth={'xl'} className="store-add-items-container" spacing={3}>
            <TableToolbar AllowAddRecord numSelected={3} onAddNewItem={()=>{console.log('dfd')}}/>
            <TableRenderer data={[]} columns={ItemsColumn} editIndex={editIndex} setEditIndex={_setEditIndex} AllowAddRecord />
            <Box sx={{ width: '100%', display: "flex", justifyContent: "flex-end"}}>
                <Button
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </Box>
        </Stack>);
});
