
export function createData(
  rowId: string, name: string, category: string, cost: number, price: number, itemId: string): any {
  return {
    rowId,
    name,
    category,
    cost,
    price,
    itemId
  };
}
