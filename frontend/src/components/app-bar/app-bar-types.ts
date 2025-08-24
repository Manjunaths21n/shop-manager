export type Anchor = 'top' | 'left' | 'bottom' | 'right';


export type TToggleDrawer = (anchor: Anchor, open?: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void

export interface IDrawerState {
  top: boolean;
  left: boolean;
  bottom: boolean;
  right: boolean;
}
