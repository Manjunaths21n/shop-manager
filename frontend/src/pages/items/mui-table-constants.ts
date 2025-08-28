import type { HeadCell } from "../../components/add-items-table/types";


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
