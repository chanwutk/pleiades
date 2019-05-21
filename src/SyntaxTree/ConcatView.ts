import { View, CompositeView, ViewHolder } from './View';
import { moveElement } from './Utils';

export class ConcatView implements CompositeView<View> {
  private concat: ViewHolder[];
  private orient: 'h' | 'v';

  public constructor(orient: 'h' | 'v') {
    this.concat = [];
    this.orient = orient;
  }

  public export() {
    return { [this.orient + 'concat']: this.concat.map(l => l.export()) };
  }

  public append(view: View, _option: any) {
    this.concat.push(new ViewHolder(view));
  }

  public prepend(view: View, _option: any) {
    this.concat.unshift(new ViewHolder(view));
  }

  public isCompatible(_: View): boolean {
    // concat is always compatible
    return true;
  }

  public rearrange(from: number, to: number, _option: any) {
    moveElement(this.concat, from, to);
  }
}