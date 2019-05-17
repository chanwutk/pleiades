export interface View {
  /**
   * export Vega-Lite spec in vl.json format
   */
  export: () => object;
}

/**
 * An indicator for a view in CompositView.
 * Concat and Layer need a View to indicate the appearance of the view,
 * while Facet and Repeat only need a string that specify a field to indicate
 * the appearance of the view.
 * TODO: explain this better!
 */
type ViewIndocator = View | string;

export interface CompositeView<V extends ViewIndocator> extends View {
  /**
   * Move subview at the position `from` to position `to`.
   * For example: in composite view with 4 subviews [0, 1, 2, 3], calling
   * rearrange(2, 0) result in the rearrangement of the subview to [2, 0, 1, 3]
   * @param {number} form the index of the view to be moved from.
   * @param {number} to the index of the view to be moved to.
   * @param {any} option an extra option for rearrangement.
   */
  rearrange: (from: number, to: number, option: any) => void;

  /**
   * Append another view with a ViewIdicator `elm`
   * @param {V} viewIndicator the ViewIndocator to be appended.
   * @param {any} option an extra option for appending.
   */
  append: (viewIndicator: V, option: any) => void;

  /**
   * Prepend another view with a ViewIdicator `elm`
   * @param {V} viewIndicator the ViewIndocator to be prepended.
   * @param {any} option an extra option for appending.
   */
  prepend: (viewIndicator: V, option: any) => void;
}

export class UnitView implements View {
  private spec: {};

  /**
   * Construct a unit view with a valid Vega-Lite spec.
   * @param {object} spec Vega-Lite spec
   */
  public constructor(spec: {}) {
    this.spec = spec;
  }

  public export() {
    return this.spec;
  }
}