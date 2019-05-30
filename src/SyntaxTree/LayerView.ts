import { CompositeView, ViewHolder, UnitView } from './View';
import { moveElement } from './Utils';

export class LayerView extends CompositeView<UnitView> {
  private layer: ViewHolder[];

  public constructor() {
    super('layer');
    this.layer = [];
  }

  public export() {
    return { layer: this.layer.map(l => l.export()) };
  }

  public append(view: UnitView) {
    this.layer.push(new ViewHolder(view));
  }

  public prepend(view: UnitView) {
    this.layer.unshift(new ViewHolder(view));
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
    this.layer.forEach((viewHolder: ViewHolder) => {
      cloned.layer.push(viewHolder.clone());
    });
    return cloned;
  }

  public findView(id: number) {
    this.layer.forEach((viewHolder: ViewHolder) => {
      const result = viewHolder.findView(id);
      if (result !== null) {
        return result;
      }
    });
    return null;
  }
}
