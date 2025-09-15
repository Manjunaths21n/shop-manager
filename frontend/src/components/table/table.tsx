import React, { useState, useCallback, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import { EnhancedTableHead } from './parts';
import { EnhancedTableBody } from './parts/body';
import { createData } from './utils';
import type { Order, TableColumn } from './types';


interface ITableRenderer<T = object> {
    data: T[];
    columns: TableColumn[];
}

export function TableRenderer<T = object>(props: ITableRenderer<T>) {
    const { columns, data, } = props;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<any>('calories');
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const [tableRows, setTableRows] = useState<any[]>([]);

    // useEffect(() => {
    //     setTableRows(data);
    // }, [data])

    // const onAddNewItem = useCallback(() => {
    // setTableRows(preRows => {
    //     const newItemId = preRows[preRows.length - 1].id + 1;
    //     return [createData(newItemId, 'New Item', `Category ${newItemId}`, 200, 300), ...preRows];
    // });
    // setEditIndex(0);
    // }, []);


    const onItemChange = useCallback((updatedRow: T) => {
        // setTableRows(preRows => {
        //     const clonedPreRows = [...preRows];
        //     clonedPreRows.splice(editIndex, 1, updatedRow);
        //     return clonedPreRows;
        // });
    }, []);

    // const onEditClick = useCallback((editIndex: number) => {
    //     setEditIndex(editIndex);
    // }, []);


    const onDeleteClick = useCallback((index: number) => {
        // setTableRows(preRows => {
        //     const clonedRows = [...preRows];
        //     clonedRows.splice(index, 1);
        //     return clonedRows;
        // })
        // setEditIndex(-1);
    }, []);

    const onCancleClick = useCallback(() => {
        // setEditIndex(-1);
    }, []);

    const onSaveClick = useCallback(() => {
        // setEditIndex(-1);
    }, []);

    const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, property: any,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, []);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = data.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%' }} elevation={9}>
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'} >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                columns={columns}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={data.length} />
                            <EnhancedTableBody
                                selected={selected} rowsPerPage={rowsPerPage}
                                tableRows={data} handleRowChange={onItemChange}
                                page={page} order={order} orderBy={orderBy}
                                columns={columns}
                            />
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </>
    );
}
