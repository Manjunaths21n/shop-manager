import type { HeadCell } from "../../components/add-items-table/types";
import type { IRenderCellArgs, TableColumn } from "../../components/table/types";
import { TableRow, TableCell, TextField, IconButton, Box, Input } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

export const ItemsData = [
  {
    action:'',
    column1: 'column1 value1',
    column2: 'column2 value1'
  },
  {
    action:'',
    column1: 'column1 value2',
    column2: 'column2 value2'
  },
  {
    action:'',
    column1: 'column1 value3',
    column2: 'column2 value3'
  },
  {
    action:'',
    column1: 'column1 value4',
    column2: 'column2 value4'
  }
]

export const headCells: HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Items Name',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: true,
    label: 'Item Category',
  },
  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Const',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  }
];
