import { View, CompositeView } from './View';
import { jsonCopy, findViewInArray, extractData } from './Utils';

export class FacetView extends CompositeView<null> {
  private view: View;
  private facetInfo: FacetInfo;

  public constructor(view: View, facetInfo: FacetInfo) {
    super('facet');
    this.facetInfo = facetInfo;
    this.view = view;
  }

  public export() {
    // need a better way to extract data from composed specs
    const { data, ...spec } = extractData(this.view.export() as IRawSpec);
    return {
      data: data[0],
      facet: this.facetInfo.export(),
      ...spec,
    };
  }

  public append(_: null, option: {}) {
    // add facet to an available axis
    if (!this.facetInfo['column']) {
      this.facetInfo.column = option;
    } else if (!this.facetInfo['row']) {
      this.facetInfo.row = option;
    }
  }

  public prepend() {
    throw new Error('prepend is not supported for FacetView');
  }

  public remove(_: number, axis: 'row' | 'column') {
    this.facetInfo.remove(axis);
  }

  public isCompatible(_: any): boolean {
    // facet is always compatible
    return true;
  }

  public rearrange() {
    // switch between row and column
    if (this.facetInfo['row'] && this.facetInfo['column']) {
      this.facetInfo.swapAxis();
    }
  }

  public clone() {
    const cloned = new FacetView(this.view, this.facetInfo);
    cloned._id = this._id;
    return cloned;
  }

  public deepClone() {
    const cloned = new FacetView(this.view.deepClone(), this.facetInfo.clone());
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

  public getSubViews(): View[] {
    return [this.view];
  }

  public changeInfo(info: FacetInfo) {
    this.facetInfo = info;
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
