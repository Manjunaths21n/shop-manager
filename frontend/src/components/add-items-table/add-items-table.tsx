import React, { useState, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { IconButton, Box, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from '@mui/material/Paper';
import { rows } from './constants';
import type { Data, Order } from './types';
import { EnhancedTableHead, EnhancedTableToolbar } from './parts';
import { EnhancedTableBody } from './parts/table-body';
import { createData } from './utils';

export function AddItemTable() {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<any>('calories');
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [tableRows, setTableRows] = useState<any[]>(rows);
    const [editIndex, setEditIndex] = useState<number>(-1);

    const onAddNewItem = useCallback(() => {
        setTableRows(preRows => {
            const newItemId = preRows[preRows.length - 1].id + 1;
            return [createData(newItemId, 'New Item', `Category ${newItemId}`, 200, 300), ...preRows];
        });
        setEditIndex(0);
    }, []);


    const onItemChange = useCallback((updatedRow: Data) => {
        setTableRows(preRows => {
            const clonedPreRows = [...preRows];
            clonedPreRows.splice(editIndex, 1, updatedRow);
            return clonedPreRows;
        });
    }, [editIndex]);

    const onEditClick = useCallback((editIndex: number) => {
        setEditIndex(editIndex);
    }, []);


    const onDeleteClick = useCallback((index: number) => {
        setTableRows(preRows => {
            const clonedRows = [...preRows];
            clonedRows.splice(index, 1);
            return clonedRows;
        })
        setEditIndex(-1);
    }, []);

    const onCancleClick = useCallback(() => {
        setEditIndex(-1);
    }, []);

    const onSaveClick = useCallback(() => {
        setEditIndex(-1);
    }, []);

    const handleRequestSort = useCallback((event: React.MouseEvent<unknown>, property: any,) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, []);

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = tableRows.map((n) => n.id);
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
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} onAddNewItem={onAddNewItem} />
                    <TableContainer>
                        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'} >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={tableRows.length} />
                            <EnhancedTableBody
                                selected={selected} editIndex={editIndex} rowsPerPage={rowsPerPage}
                                onEditClick={onEditClick} onDeleteClick={onDeleteClick} onSaveClick={onSaveClick}
                                onCancleClick={onCancleClick} tableRows={tableRows} handleRowChange={onItemChange}
                                page={page} setSelected={setSelected} order={order} orderBy={orderBy} />
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tableRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
            <Box sx={{ width: '100%', display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onSaveClick}
                >
                    Save
                </Button>
            </Box>
        </>
    );
}
