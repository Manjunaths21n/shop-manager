import type { HeadCell } from "./mui-table-types";
import { createData } from "./mui-table-utils";

export const rows = [
  createData(1, 'Cupcake', 305, 3.7),
  createData(2, 'Donut', 452, 25.0),
  createData(3, 'Eclair', 262, 16.0),
  createData(4, 'Frozen yoghurt', 159, 6.0),
  createData(5, 'Gingerbread', 356, 16.0),
  createData(6, 'Honeycomb', 408, 3.2),
  createData(7, 'Ice cream sandwich', 237, 9.0),
  createData(8, 'Jelly Bean', 375, 0.0),
  createData(9, 'KitKat', 518, 26.0),
  createData(10, 'Lollipop', 392, 0.2),
  createData(11, 'Marshmallow', 318, 0),
  createData(12, 'Nougat', 360, 19.0),
  createData(13, 'Oreo', 437, 18.0),
];

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Items Name',
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
