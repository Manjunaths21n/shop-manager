import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { EnhancedTable } from "../../components";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { createData } from "./mui-table-utils";
import { headCells, ItemsData } from "./mui-table-constants";
import { TableRenderer } from "../../components/table";
import { TableRow, TableCell, TextField, IconButton, Box, Input, Autocomplete, InputLabel, Stack } from "@mui/material";
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
            id: 'name',
            label: 'Item Name',
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
            isVisable: true,
            width: '60%'
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
            disablePadding: true,
            width: '20%',
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
            width: '10%',
            isVisable: true
        },
        {
            id: 'price',
            label: 'Item Price',
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
            width: '10%',
            isVisable: true
        }
    ]), [_setEditIndex]);


    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <Stack direction="row" spacing={6} width={'100%'} marginBottom={5} >
                <Box width={'50%'}>
                    <Autocomplete
                        disablePortal
                        options={[]}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Filter Item Name" />}
                    />
                </Box>
                <Box width={'50%'}>
                    <Autocomplete
                        disablePortal
                        options={['soop']}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params} label="Filter Category" />}
                    />
                </Box>
            </Stack>
            <TableRenderer data={rows} columns={ItemsColumn} editIndex={editIndex} setEditIndex={_setEditIndex} />
        </Container>
    );
});
