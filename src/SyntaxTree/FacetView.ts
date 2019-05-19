import { View, CompositeView } from './View';


export class FacetView implements CompositeView<null> {
  private view: View;
  private facet: FacetInfo;

  public constructor(view: View, facet: FacetInfo) {
    this.facet = facet;
    this.view = view;
  }

  public export() {
    return {
      facet: this.facet,
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

  public isCompatible(_view: View): boolean {
    // repeat is always compatible
    return true;
  }

  public rearrange() {
    // switch between row and column
    if (this.facet['row'] && this.facet['column']) {
      const { row, column } = this.facet;
      this.facet.row = column;
      this.facet.column = row;
    }
  }
}

/**
 * This class contains information for facet
 */
export class FacetInfo {
  row: {}
  column: {}

  constructor(row: {}, column: {}) {
    this.row = row;
    this.column = column
  }
}
