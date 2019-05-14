import { View } from './View';

export interface CompositeView extends View {
  rearrange: (from: number, to: number) => void;
}
