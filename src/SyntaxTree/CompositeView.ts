import { View } from './View';

export interface CompositeView<E extends View | string> extends View {
  rearrange: (from: number, to: number, option: any) => void;

  append: (elm: E, option: any) => void;

  prepend: (elm: E, option: any) => void;
}
