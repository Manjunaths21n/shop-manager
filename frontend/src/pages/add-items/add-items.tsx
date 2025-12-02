import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { TableRenderer } from "../../components/table";
import { TableRow, TableCell, TextField, IconButton, Box, Input, Stack, Checkbox, Tooltip, Skeleton } from "@mui/material";
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
import { TableSkeleton } from "../../components";
import { ColumnIds } from "../item-list";

const filter = createFilterOptions<any>();

const generateItemIdByItems = (items: any[]) => {
    let largNumber = 0;
    for (const itemInfo of items) {
        const itemIdAsNumber = Number(itemInfo.itemId);
        if (largNumber < itemIdAsNumber) {
            largNumber = itemIdAsNumber;
        }
    }

    return `${largNumber}`;
}

export const AddItems = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState<Record<string, any>[]>([]);
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [selectedRowId, setSelectedRowId] = useState<string[]>([])
    const [isPending, startTransition] = useTransition();

    const originalRows = useRef<Record<string, any>[]>([])
    const navigate = useNavigate();

    const getItems = useCallback(async () => {
        let response: Record<string, any>[] = []
        try {
            response = (await itemsService.getItems() as Record<string, any>[]) ?? [
                { name: 'value1', category: 'c1', cost: 22, price: 44 },
                { name: 'value2', category: 'c2', cost: 40, price: 45 },
                { name: 'value3', category: 'c3', cost: 30, price: 34 },
                { name: 'value4', category: 'c4', cost: 55, price: 64 }
            ];
        } catch (err) {
            console.log('Failed to fetch Items', err);
        }
        const parsedRowData: any[] = response?.map((rowData: any) => {
            return { ...createData(generateShortId(), rowData.name, rowData.category, rowData.cost, rowData.price, rowData.itemId) }
        });
        originalRows.current = parsedRowData;
        startTransition(() => setRows(parsedRowData));
    }, []);

    useEffect(() => {
        startTransition(async () => getItems());
    }, []);

    const onEditClick = useCallback(() => {
        setEnableEdit(true);
    }, []);

    const onCancelClick = useCallback(() => {
        setEnableEdit(false);
        setRows((preState) => [...preState].slice(1));
        setSelectedRowId([]);
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
        setSelectedRowId([]);
    }, []);

    const onAddItem = useCallback(() => {

        const newItem = { ...createData(generateShortId(), '', '', 0, 0, ''), isNewItem: true };
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
        // console.log('value:', value, 'column:', columnName);
        setRows((preState) => {
            const clonedPreState = [...preState];
            const modifyedRecordIndex = clonedPreState.findIndex(info => info.rowId === rowId);
            if (modifyedRecordIndex !== -1 && Object.hasOwn(clonedPreState[modifyedRecordIndex], columnName)) {
                clonedPreState[modifyedRecordIndex][columnName] = value;
            }
            console.log(clonedPreState[modifyedRecordIndex]);
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
                    <Box sx={{ display: "flex", flexDirection: "row", height: "50px" }}>
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
            id: ColumnIds.NAME,
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
                                onChange={(event, newValue: any = '') => {
                                    const _newValue = newValue.includes('Add "') ? newValue.slice(newValue.indexOf('"') + 1, newValue.lastIndexOf('"')) : newValue;
                                    onCellValueChange(_newValue, 'name', rowData.rowId);
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
            id: ColumnIds.COST,
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
            id: ColumnIds.CATEGORY,
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
                                onChange={(event, newValue: any = '') => {
                                    const _newValue = newValue.includes('Add "') ? newValue.slice(newValue.indexOf('"') + 1, newValue.lastIndexOf('"')) : newValue;
                                    onCellValueChange(_newValue, 'category', rowData.rowId);
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
            id: ColumnIds.PRICE,
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
                                onChange={(args) => { onCellValueChange(args.target.value, 'price', rowData.rowId) }}
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

    const onItemsSubmit = useCallback(async () => {
        let latestItemId = Number(generateItemIdByItems(originalRows.current))
        const newItems: any[] = [];
        const existedItems: any[] = [];
        const deletedRows = originalRows.current.filter((info) => (!rows.some((rowInfo) => (rowInfo.itemId === info.itemId))));

        rows.forEach(info => {
            const itemInfo = {
                name: info.name,
                category: info.category,
                cost: info.cost,
                price: info.price,
                itemId: info.itemId
            }
            info.isNewItem ?
                newItems.push({ ...itemInfo, itemId: `${++latestItemId}` }) :
                existedItems.push({ ...itemInfo });
        })
        if (newItems.length) {
            const res = await itemsService.addItems(newItems);
            console.log('addItems res', res);
        }

        if (existedItems.length) {
            const updateRes = await itemsService.updateItems(existedItems);
            console.log('updateItems res', updateRes);
        }

        if (deletedRows.length) {
            const deleteItemsRes = await itemsService.deleteItems(deletedRows.map((deletedItems) => deletedItems.itemId));
            console.log('deleteItems Res', deleteItemsRes);
        }
        navigate("/");
    }, [rows]);

    return (
        <Stack sx={{ marginTop: 2, height: '100%' }} maxWidth={'xl'} className="store-add-items-container" spacing={3}>
            <TableToolbar AllowAddRecord numSelected={selectedRowId.length} onAddNewItem={onAddItem}
                onCancel={onCancelClick} onDelete={onDeleteClick} onEdit={onEditClick} onSave={onSaveClick} />
            {isPending ?
                <TableSkeleton />
                : <TableRenderer data={rows} columns={ItemsColumn} />}
            <Box sx={{ width: '100%', display: "flex", justifyContent: "flex-end" }}>
                <Tooltip title='Save'>
                    <Button variant="contained" color="primary" onClick={onItemsSubmit}>
                        Save
                    </Button>
                </Tooltip>
            </Box>
        </Stack>);
});
