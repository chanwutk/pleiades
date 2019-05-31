import { View, CompositeView } from './View';
import { jsonCopy, findViewInArray } from './Utils';

export class FacetView extends CompositeView<null> {
  private view: View;
  private facet: FacetInfo;

  public constructor(view: View, facet: FacetInfo) {
    super('facet');
    this.facet = facet;
    this.view = view;
  }

  public export() {
    // need a better way to extract data from composed specs
    const { data, ...spec } = this.view.export() as { data };
    return {
      data,
      facet: this.facet.export(),
      spec,
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
    cloned._id = this._id;
    return cloned;
  }

  public deepClone() {
    const cloned = new FacetView(this.view.deepClone(), this.facet.clone());
    cloned._id = this._id;
    return cloned;
  }

  public findView(id: number) {
    return findViewInArray(id, [this.view], this);
  }

  public replaceChild(view: View, id: number) {
    if (this.view.id === id) {
      this.view = view;
      return true;
    }
    return false;
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
