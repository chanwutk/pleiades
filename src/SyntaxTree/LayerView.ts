import { View, CompositeView, ViewHolder } from './View';
import { moveElement } from './Utils';

export class LayerView implements CompositeView<View> {
  private layer: ViewHolder[];

  public constructor() {
    this.layer = [];
  }

  public export() {
    return { layer: this.layer.map(l => l.export()) };
  }

  public append(view: View) {
    this.layer.push(new ViewHolder(view));
  }

  public prepend(view: View) {
    this.layer.unshift(new ViewHolder(view));
  }

  public isCompatible(_: View): boolean {
    // TODO: check if view is compatible with the rest of the specs in this.layer
    return true;
  }

  public rearrange(from: number, to: number) {
    moveElement(this.layer, from, to);
  }
}