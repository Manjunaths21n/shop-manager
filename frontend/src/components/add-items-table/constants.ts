import type { HeadCell } from "./types";
import { createData } from "./utils";

export const rows = [
  createData(1, 'Cupcake', 'category 1', 305, 3.7),
  createData(2, 'Donut', 'category 2', 452, 25.0)
];

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Items Name',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  }
];
