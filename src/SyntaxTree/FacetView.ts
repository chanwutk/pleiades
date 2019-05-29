import { View, CompositeView, ViewHolder } from './View';


export class FacetView implements CompositeView<null> {
  private view: ViewHolder;
  private facet: FacetInfo;

  public constructor(view: View, facet: FacetInfo) {
    this.facet = facet;
    this.view = new ViewHolder(view);
  }

  public export() {
    return {
      facet: this.facet.export(),
      spec: this.view.export()
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

  public getType() {
    return 'facet';
  }
}

/**
 * This class contains information for facet
 */
export class FacetInfo {
  row: {} | undefined
  column: {} | undefined

  constructor(info: { row?: {}, column?: {} }) {
    this.row = info.row;
    this.column = info.column
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
}
