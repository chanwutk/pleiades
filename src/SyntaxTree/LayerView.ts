import { CompositeView, UnitView } from './View';
import { moveElement, findViewInArray, replaceViewInArray } from './Utils';

export class LayerView extends CompositeView<UnitView> {
  private layer: UnitView[];

  public constructor() {
    super('layer');
    this.layer = [];
  }

  public export() {
    return { layer: this.layer.map(l => l.export()) };
  }

  public append(view: UnitView) {
    this.layer.push(view);
  }

  public prepend(view: UnitView) {
    this.layer.unshift(view);
  }

  public remove(index: number) {
    this.layer.splice(index, 1);
  }

  public isCompatible(view: UnitView): boolean {
    const spec = view.export();
    return (
      !spec['spec'] &&
      !spec['layer'] &&
      !spec['concat'] &&
      !spec['hconcat'] &&
      !spec['vconcat']
    );
  }

  public rearrange(from: number, to: number) {
    moveElement(this.layer, from, to);
  }

  public clone() {
    const cloned = new LayerView();
    cloned._id = this._id;
    cloned.layer = [...this.layer];
    return cloned;
  }

  public deepClone() {
    const cloned = new LayerView();
    cloned._id = this._id;
    cloned.layer = this.layer.map(view => view.deepClone());
    return cloned;
  }

  public findView(id: number) {
    return findViewInArray(id, this.layer, this);
  }

  public replaceChild(view: View, id: number) {
    return replaceViewInArray(view, this.layer, id);
  }

  public getEncoding() {
    return this.layer.map(l => l.getEncoding());
  }

  public getSubViews(): View[] {
    return [...this.layer];
  }
}
