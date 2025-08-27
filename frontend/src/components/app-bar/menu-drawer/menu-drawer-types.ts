import type { IDrawerState, TToggleDrawer } from "../app-bar-types";

export interface IAppBarMenuDrawerProps {
     toggleDrawer: TToggleDrawer;
     setSelectedItem(item: string): void;
     state: IDrawerState;
     selectedItem: string;
     itemList: string[];
}