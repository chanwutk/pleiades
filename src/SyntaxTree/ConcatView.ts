import { View, CompositeView, ViewHolder } from './View';
import { moveElement } from './Utils';

export class ConcatView extends CompositeView<View> {
  private concat: ViewHolder[];
  private orient: 'h' | 'v';

  public constructor(orient: 'h' | 'v') {
    super('concat');
    this.concat = [];
    this.orient = orient;
  }

  public export() {
    return { [this.orient + 'concat']: this.concat.map(l => l.export()) };
  }

  public append(view: View) {
    this.concat.push(new ViewHolder(view));
  }

  public prepend(view: View) {
    this.concat.unshift(new ViewHolder(view));
  }

  public remove(index: number) {
    this.concat.splice(index, 1);
  }

  public isCompatible(_: View): boolean {
    // concat is always compatible
    return true;
  }

  public rearrange(from: number, to: number) {
    moveElement(this.concat, from, to);
  }
}
