import { View, CompositeView } from './View';
import { moveElement } from './Utils';

export class LayerView implements CompositeView<View> {
  private layer: View[];

  public constructor() {
    this.layer = [];
  }

  public export() {
    return { layer: this.layer.map(l => l.export()) };
  }

  public append(view: View, _option: any) {
    this.layer.push(view);
  }

  public prepend(view: View, _option: any) {
    this.layer.unshift(view);
  }

  public isCompatible(view: View): boolean {
    // TODO: check if view is compatible with the rest of the specs in this.layer
    return true;
  }

  public rearrange(from: number, to: number, _option: any) {
    moveElement(this.layer, from, to);
  }
}