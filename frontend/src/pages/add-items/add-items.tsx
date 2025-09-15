import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { TableRenderer } from "../../components/table";
import { TableRow, TableCell, TextField, IconButton, Box, Input, Stack, Checkbox } from "@mui/material";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";
import { ItemsData } from "../item-list/mui-table-constants";
import { createData } from "../item-list/mui-table-utils";
import { TableToolbar } from "../../components/table/parts";
import { generateShortId } from "../../utils";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<any>();

export const AddItems = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState<any[]>([]);
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [selectedRowId, setSelectedRowId] = useState<string[]>([])

    const getItems = useCallback(async () => {
        let response: any[] = []
        try {
            response = [
                { name: 'value1', category: 'c1', cost: 22, price: 44 },
                { name: 'value2', category: 'c2', cost: 40, price: 45 },
                { name: 'value3', category: 'c3', cost: 30, price: 34 },
                { name: 'value4', category: 'c4', cost: 55, price: 64 }
            ];
            // response = await itemsService.getItems() ?? [];
        } catch (err) {
            console.log('Failed to fetch Items', err);
        }
        const parsedRowData: any[] = response?.map((rowData: any, index: number) => {
            return { rowId: generateShortId(), ...createData(index, rowData.name, rowData.category, rowData.cost, rowData.price) }
        });
        setRows(parsedRowData);
    }, []);

    useEffect(() => {
        getItems();
    }, []);

    const onEditClick = useCallback(() => {
        setEnableEdit(true);
    }, []);

    const onCancelClick = useCallback(() => {
        setEnableEdit(false);
    }, []);

    const onDeleteClick = useCallback(() => {
        setRows(preState => {
            let clonedPreStateRows = [...preState];
            clonedPreStateRows = clonedPreStateRows.filter(rowInfo => !selectedRowId.includes(rowInfo.rowId));
            return clonedPreStateRows;
        });
        setSelectedRowId([]);
    }, [selectedRowId]);

    const onSaveClick = useCallback(() => {
        setEnableEdit(false);
    }, []);

    const onAddItem = useCallback(() => {
        const newItem = { rowId: generateShortId(), name: '', category: '', cost: 0, price: 0 };
        setRows((preState) => [newItem, ...preState])
        setSelectedRowId(preState => [newItem.rowId, ...preState]);
    }, []);

    const onCheckboxClick = useCallback((args: any) => {
        setSelectedRowId(preState => {
            let clonedPreState = [...preState];
            if (clonedPreState.includes(args.target.name)) {
                clonedPreState = clonedPreState.filter(clonedItem => clonedItem !== (args.target.name));
            } else {
                clonedPreState.push(args.target.name);
            }
            return clonedPreState;
        })
    }, []);

    const onCellValueChange = useCallback((value: any, columnName: string, rowId: string) => {
        console.log('value:', value, 'column:', columnName);
        setRows((preState) => {
            const clonedPreState = [...preState];
            const modifyedRecordIndex = clonedPreState.findIndex(info => info.rowId === rowId);
            if (modifyedRecordIndex !== -1 && Object.hasOwn(clonedPreState[modifyedRecordIndex], columnName)) {
                clonedPreState[modifyedRecordIndex][columnName] = value;
            }
            return clonedPreState;
        })
    }, []);

    const ItemsColumn: TableColumn[] = useMemo(() => ([
        {
            id: 'action',
            label: 'Action',
            type: '',
            renderCell: (args: IRenderCellArgs) => {
                const { rowIndex, value, rowData, columnName } = args;
                return (
                    <Box sx={{ display: "flex", flexDirection: "row", height: "100px" }}>
                        <Checkbox checked={selectedRowId.includes(rowData.rowId)}
                            color="secondary"
                            name={rowData.rowId}
                            onClick={onCheckboxClick} />
                    </Box>
                );
            },
            disablePadding: false,
            isVisable: true,
            width: '5%'
        },
        {
            id: 'name',
            label: 'Item Name',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { rowIndex, value, columnName, rowData } = args;
                return (
                    <>
                        {(enableEdit && selectedRowId.includes(rowData.rowId)) ?
                            <Autocomplete
                                disablePortal
                                value={value}
                                options={['soop', 'books', 'biskets', 'coffee', 'oil', 'mixcher']}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Enter Name" />}
                                freeSolo
                                onChange={(event, newValue: any) => {
                                    onCellValueChange(newValue, 'name', rowData.rowId);
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.title);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push(`Add "${inputValue}"`);
                                    }
                                    return filtered;
                                }}
                                getOptionLabel={(option: any) => option}
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            width: '50%',
            isVisable: true
        },
        {
            id: 'cost',
            label: 'Item Cost',
            type: 'number',
            renderCell: (args: IRenderCellArgs) => {
                const { rowIndex, value, columnName, rowData } = args;
                return (
                    <>
                        {(enableEdit && selectedRowId.includes(rowData.rowId)) ?
                            <TextField
                                type="number"
                                value={value}
                                onChange={(args) => { onCellValueChange(args.target.value, 'cost', rowData.rowId) }}
                                variant="standard"
                                size="small"
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            width: '10%',
            isVisable: true
        },
        {
            id: 'category',
            label: 'Category',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { rowIndex, value, columnName, rowData } = args;
                return (
                    <>
                        {(enableEdit && selectedRowId.includes(rowData.rowId)) ?
                            <Autocomplete
                                disablePortal
                                value={value}
                                options={['soop', 'books', 'biskets', 'coffee', 'oil', 'mixcher']}
                                sx={{ width: '100%' }}
                                renderInput={(params) => <TextField {...params} label="Enter Category" />}
                                freeSolo
                                onChange={(event, newValue: any) => {
                                    onCellValueChange(newValue, 'category', rowData.rowId);
                                }}
                                filterOptions={(options, params) => {
                                    const filtered = filter(options, params);
                                    const { inputValue } = params;
                                    // Suggest the creation of a new value
                                    const isExisting = options.some((option) => inputValue === option.title);
                                    if (inputValue !== '' && !isExisting) {
                                        filtered.push(`Add "${inputValue}"`);
                                    }
                                    return filtered;
                                }}
                                getOptionLabel={(option: any) => option}
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            width: '25%',
            isVisable: true
        },
        {
            id: 'price',
            label: 'Item Price',
            type: 'number',
            renderCell: (args: IRenderCellArgs) => {
                const { rowIndex, value, columnName, rowData } = args;
                return (
                    <>
                        {(enableEdit && selectedRowId.includes(rowData.rowId)) ?
                            <TextField
                                type="number"
                                value={value}
                                onChange={(args) => { onCellValueChange(args.target.value, 'cost', rowData.rowId) }}
                                variant="standard"
                                size="small"
                            /> :
                            value
                        }
                    </>
                );
            },
            disablePadding: false,
            width: '10%',
            isVisable: true
        },
    ]), [selectedRowId, onCheckboxClick, enableEdit]);

    return (

        <Stack sx={{ marginTop: 2, height: '100%' }} maxWidth={'xl'} className="store-add-items-container" spacing={3}>
            <TableToolbar AllowAddRecord numSelected={selectedRowId.length} onAddNewItem={onAddItem}
                onCancel={onCancelClick} onDelete={onDeleteClick} onEdit={onEditClick} onSave={onSaveClick} />
            <TableRenderer data={rows} columns={ItemsColumn} />
            <Box sx={{ width: '100%', display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" color="primary">
                    Save
                </Button>
            </Box>
        </Stack>);
});
