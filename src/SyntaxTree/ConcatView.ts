import { CompositeView } from './CompositeView';
import { View } from './View';
import { moveElement } from './Utils';

export class ConcatView implements CompositeView {
  concat: View[];
  orient: 'h' | 'v';

  constructor(orient: 'h' | 'v') {
    this.concat = [];
    this.orient = orient;
  }

  export() {
    return { [this.orient + 'concat']: this.concat.map(l => l.export()) };
  }

  append(view: View) {
    this.concat.push(view);
  }

  prepend(view: View) {
    this.concat.unshift(view);
  }

  isCompatible(_view: View): boolean {
    // concat is always compatible
    return true;
  }

  rearrange(from: number, to: number) {
    moveElement(this.concat, from, to);
  }
}