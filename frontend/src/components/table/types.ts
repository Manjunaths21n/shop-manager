
// export interface Data {
//   id: number;
//   name: string;
//   category:string;
//   cost: number;
//   price: number;
// }

export interface IRenderCellArgs {
  rowIndex: number;
  value: any;
  columnName: string;
  rowData: Record<string, any>;
}

export interface TableColumn {
  disablePadding: boolean;
  width?: string;
  id: string;
  type: string;
  label: string;
  renderCell(args: IRenderCellArgs): React.JSX.Element;
  isVisable: boolean;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;

  columns: TableColumn[];
}
