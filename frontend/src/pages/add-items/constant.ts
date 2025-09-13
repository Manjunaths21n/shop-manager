import type { HeadCell } from "../../components/add-items-table/types";

export const addItemsColumns: HeadCell[] = [
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
  }
];