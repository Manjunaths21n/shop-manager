export interface EnhancedTableToolbarProps {
    numSelected: number;
    onAddNewItem(): void;
    AllowAddRecord: boolean;
    showIcon?:boolean;
    showFilter?:boolean;
}