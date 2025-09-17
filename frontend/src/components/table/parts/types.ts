export interface EnhancedTableToolbarProps {
    numSelected: number;
    onAddNewItem(): void;
    onEdit?(): void;
    onSave?(): void;
    onCancel?(): void;
    onDelete?(): void;
    AllowAddRecord: boolean;
    showIcon?: boolean;
    showFilter?: boolean;
    showToggleSelection?: boolean;
    onToggleAllSelection?(): void;
}