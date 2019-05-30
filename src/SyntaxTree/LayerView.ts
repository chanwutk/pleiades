import { CompositeView, UnitView } from './View';
import { moveElement } from './Utils';

export class LayerView extends CompositeView<UnitView> {
  private layer: View[];

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
    cloned.id = this.id;
    cloned.layer = this.layer.map(view => view.clone());
    return cloned;
  }

  public findView(id: number) {
    if (id === this.id) return this;
    for (const view of this.layer) {
      const result = view.findView(id);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }
}
