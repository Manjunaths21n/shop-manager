
import { memo, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import Container from "@mui/material/Container";
import { useServices } from "../../context";
import { createData } from "./mui-table-utils";
import { TableRenderer } from "../../components/table";
import { TextField, Box, Autocomplete, Stack, Icon, ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";
import { TableSkeleton } from "../../components";
import { generateShortId } from "../../utils";
import GridViewIcon from '@mui/icons-material/GridView';
import TableChartIcon from '@mui/icons-material/TableChart';
import { GridViewRender } from "./grid-layout";

export const ColumnIds = {
    NAME: 'name',
    CATEGORY: 'category',
    COST: 'cost',
    PRICE: 'price'
}

export const Items = memo(() => {
    const { itemsService } = useServices();
    const [rows, setRows] = useState<any[]>([]);
    const [viewType, setViewType] = useState<'grid-view'|'table-view'>('table-view');
    const [itemsName, setItemsName] = useState<any[]>([]);
    const [itemscategory, setItemsCategory] = useState<any[]>([]);
    const [filterItemName, setFilterItemName] = useState('');
    const [filterItemCategory, setFilterItemCategory] = useState('');
    const selectedFilter = useRef('')

    const [isPending, startTransition] = useTransition();

    const getItems = useCallback(async () => {

        let response: any[] = []
        try {
            response = await itemsService.getItems() as Record<string, any>[] ?? [
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

 const handleViewType = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    console.log(newAlignment );
    setViewType(newAlignment as any);
  };

    return (
        <Container sx={{ marginTop: 2 }} maxWidth={'xl'} >
            <Stack direction="row" spacing={1} width={'100%'} marginBottom={5} >
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
                <Box width={'40%'}>
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
                <Box width={'10%'} minWidth={'100px'} sx={{ alignContent: 'center' }}>
                    <ToggleButtonGroup
                        orientation="horizontal"
                        value={viewType}
                        exclusive={true}
                        onChange={handleViewType}
                    >
                        <ToggleButton value="grid-view" aria-label="grid-view">
                            <GridViewIcon fontSize="medium" />
                        </ToggleButton>
                        <ToggleButton value="table-view" aria-label="table-view">
                            <TableChartIcon fontSize="medium" />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Stack>
            
            {isPending ? <TableSkeleton /> :viewType==='grid-view'?<GridViewRender data={rows}/>: <TableRenderer data={rows} columns={ItemsColumn} />}
        </Container>
    );
});
