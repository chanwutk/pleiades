import { View, CompositeView } from './View';
import { jsonCopy } from './Utils';

export class FacetView extends CompositeView<null> {
  private view: View;
  private facet: FacetInfo;

  public constructor(view: View, facet: FacetInfo) {
    super('facet');
    this.facet = facet;
    this.view = view;
  }

  public export() {
    return {
      facet: this.facet.export(),
      spec: this.view.export(),
    };
  }

  public append(_: null, option: {}) {
    // add facet to an available axis
    if (!this.facet['column']) {
      this.facet.column = option;
    } else if (!this.facet['row']) {
      this.facet.row = option;
    }
  }

  public prepend() {
    throw new Error('prepend is not supported for FacetView');
  }

  public remove(_: number, axis: 'row' | 'column') {
    this.facet.remove(axis);
  }

  public isCompatible(_: any): boolean {
    // facet is always compatible
    return true;
  }

  public rearrange() {
    // switch between row and column
    if (this.facet['row'] && this.facet['column']) {
      this.facet.swapAxis();
    }
  }

  public clone() {
    const cloned = new FacetView(this.view, this.facet);
    cloned.id = this.id;
    return cloned;
  }

  public deepClone() {
    const cloned = new FacetView(this.view.deepClone(), this.facet.clone());
    cloned.id = this.id;
    return cloned;
  }

  public findView(id: number) {
    if (id === this.id) return this;
    return this.view.findView(id);
  }
}

/**
 * This class contains information for facet
 */
export class FacetInfo {
  row?: {};
  column?: {};

  constructor(info: { row?: {}; column?: {} }) {
    this.row = info.row;
    this.column = info.column;
  }

  public export() {
    return {
      ...(this.row ? { row: this.row } : {}),
      ...(this.column ? { column: this.column } : {}),
    };
  }

  public swapAxis() {
    [this.row, this.column] = [this.column, this.row];
  }

  public remove(axis: 'row' | 'column') {
    this[axis] = undefined;
  }

  public clone() {
    return new FacetInfo({
      ...(this.row ? { row: jsonCopy(this.row) } : {}),
      ...(this.column ? { column: jsonCopy(this.column) } : {}),
    });
  }
}
