import { memo, useCallback, useEffect, useState } from "react";
import { EnhancedTable } from "../../components";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { createData } from "./mui-table-utils";
import { headCells } from "./mui-table-constants";

export const Items = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState([]);
    // const [columns, setColumns] = useState([]);

    const getItems = useCallback(async () => {
        const response = await itemsService.getItems()
        console.log(response);
        const parsedRowData = response.map((rowData: any, index: number) => {
            return createData(index, rowData.name, rowData.category, rowData.cost, rowData.price)
        });
        setRows(parsedRowData);
    }, []);

    useEffect(() => {
        getItems();
    }, [])
    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <EnhancedTable column={headCells} data={rows} />
        </Container>
    );
});
