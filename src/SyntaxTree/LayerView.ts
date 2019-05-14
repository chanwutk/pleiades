import { CompositeView } from './CompositeView';
import { View } from './View';
import { moveElement } from './Utils';

export class LayerView implements CompositeView {
  layer: View[];

  constructor() {
    this.layer = [];
  }

  export() {
    return { layer: this.layer.map(l => l.export()) };
  }

  append(view: View) {
    this.layer.push(view);
  }

  prepend(view: View) {
    this.layer.unshift(view);
  }

  isCompatible(view: View): boolean {
    // TODO: check if view is compatible with the rest of the specs in this.layer
    return true;
  }

  rearrange(from: number, to: number) {
    moveElement(this.layer, from, to);
  }
}