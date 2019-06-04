import { View, CompositeView } from './View';
import { moveElement, findViewInArray, replaceViewInArray } from './Utils';

export class ConcatView extends CompositeView<View> {
  private concat: View[];
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
    this.concat.push(view);
  }

  public prepend(view: View) {
    this.concat.unshift(view);
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

  public clone() {
    const cloned = new ConcatView(this.orient);
    cloned._id = this._id;
    cloned.concat = [...this.concat];
    return cloned;
  }

  public deepClone() {
    const cloned = new ConcatView(this.orient);
    cloned._id = this._id;
    cloned.concat = this.concat.map(view => view.deepClone());
    return cloned;
  }

  public findView(id: number) {
    return findViewInArray(id, this.concat, this);
  }

  public replaceChild(view: View, id: number) {
    return replaceViewInArray(view, this.concat, id);
  }

  public getSubViews(): View[] {
    return [...this.concat];
  }

  public getOrient() {
    return this.orient;
  }
}
