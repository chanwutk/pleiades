import { CompositeView, ViewHolder, UnitView, UnitViewHolder } from './View';
import { moveElement } from './Utils';
import { clone } from '@babel/types';

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
    this.layer.push(new UnitViewHolder(view));
  }

  public prepend(view: UnitView) {
    this.layer.unshift(new UnitViewHolder(view));
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
}
