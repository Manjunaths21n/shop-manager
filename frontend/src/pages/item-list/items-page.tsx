import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { createData } from "./mui-table-utils";
import { TableRenderer } from "../../components/table";
import { TextField, Box, Autocomplete, Stack, Skeleton } from "@mui/material";
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";
import { TableSkeleton } from "../../components";
import { generateShortId } from "../../utils";
import { VoiceToText } from "../../components/mic/mic-component";

export const ColumnIds = {
    NAME: 'name',
    CATEGORY: 'category',
    COST: 'cost',
    PRICE: 'price'
}

export const Items = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState<any[]>([]);
    const [itemsName, setItemsName] = useState<any[]>([]);
    const [itemscategory, setItemsCategory] = useState<any[]>([]);
    const [filterItemName, setFilterItemName] = useState('');
    const [filterItemCategory, setFilterItemCategory] = useState('');
    const selectedFilter = useRef('')

    const [isPending, startTransition] = useTransition();

    const getItems = useCallback(async () => {

        let response: any[] = []
        try {
            response = await itemsService.getItems() ?? [
                { name: 'value1', category: 'c1', cost: 22, price: 44 },
                { name: 'value2', category: 'c2', cost: 40, price: 45 },
                { name: 'value3', category: 'c3', cost: 30, price: 34 },
                { name: 'value4', category: 'c4', cost: 55, price: 64 }
            ];
        } catch (err) {
            console.log('Failed to fetch Items', err);
        }
        const parsedRowData: any[] = response?.map((rowData: any, index: number) => {
            return { ...createData(generateShortId(), rowData.name, rowData.category, rowData.cost, rowData.price, rowData.itemId) }
        });
        // originalRows.current = response;
        startTransition(() => {
            setRows(parsedRowData);
            setItemsName(parsedRowData?.map((info: any) => (info[ColumnIds.NAME])) ?? []);
            setItemsCategory(parsedRowData?.map((info: any) => (info[ColumnIds.CATEGORY])) ?? []);
        });
    }, []);

    useEffect(() => {
        startTransition(async () => getItems());
    }, []);

    const ItemsColumn: TableColumn[] = useMemo(() => ([
        {
            id: ColumnIds.NAME,
            label: 'Item Name',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { value } = args;
                return (
                    <>{value}</>
                );
            },
            disablePadding: false,
            isVisable: true,
            width: '60%'
        },
        {
            id: ColumnIds.CATEGORY,
            label: 'Category',
            type: 'string',
            renderCell: (args: IRenderCellArgs) => {
                const { value } = args;
                return (
                    <>{value}</>
                );
            },
            disablePadding: true,
            width: '20%',
            isVisable: true
        },
        {
            id: ColumnIds.COST,
            label: 'Item Cost',
            type: 'number',
            renderCell: (args: IRenderCellArgs) => {
                const { value } = args;
                return (
                    <>{value}</>
                );
            },
            disablePadding: false,
            width: '10%',
            isVisable: true
        },
        {
            id: ColumnIds.PRICE,
            label: 'Item Price',
            type: 'number',
            renderCell: (args: IRenderCellArgs) => {
                const { value } = args;
                return (
                    <>{value}</>
                );
            },
            disablePadding: false,
            width: '10%',
            isVisable: true
        }
    ]), []);

    const onNameFilterFocus = useCallback(() => {
        selectedFilter.current = 'name-Filter';
    }, []);

    const onCategoryFilterFocus = useCallback(() => {
        selectedFilter.current = 'category-Filter';
    }, []);

    const handleVoiceToText = useCallback((value: string) => {
        console.log(value);
        if (selectedFilter.current === 'name-Filter') {
            setFilterItemName(value);
        } else if (selectedFilter.current === 'category-Filter') {
            setFilterItemCategory(value);
        }
    }, []);

    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <VoiceToText language="kn-IN" setText={handleVoiceToText} />
            <Stack direction="row" spacing={6} width={'100%'} marginBottom={5} >
                <Box width={'50%'}>
                    <Autocomplete
                        disablePortal
                        options={itemsName}
                        onFocus={onNameFilterFocus}
                        value={filterItemName}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params}
                            onChange={(args) => { setFilterItemName(args.target.value) }}
                            label="Filter Item Name" />}
                    />
                </Box>
                <Box width={'50%'}>
                    <Autocomplete
                        disablePortal
                        onFocus={onCategoryFilterFocus}
                        value={filterItemCategory}
                        options={itemscategory}
                        sx={{ width: '100%' }}
                        renderInput={(params) => <TextField {...params}
                            onChange={(args) => { setFilterItemCategory(args.target.value) }}
                            label="Filter Category" />}
                    />
                </Box>
            </Stack>
            {isPending ? <TableSkeleton /> : <TableRenderer data={rows} columns={ItemsColumn} />}
        </Container>
    );
});
