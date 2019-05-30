import { jsonCopy } from './Utils';

let idCounter = 1;

export abstract class View {
  protected id: number;
  private type: ViewType;

  constructor(type: ViewType) {
    // NOTE: if possible, get rid of this mutation, but if not, that's fine
    this.id = idCounter++;
    this.type = type;
  }

  public getType() {
    return this.type;
  }

  public getId() {
    return this.id;
  }

  /**
   * export Vega-Lite spec in vl.json format
   * @returns exported Vega-Lite spec
   */
  abstract export(): object;

  abstract clone(): View;

  abstract findView(id: number): View | null;
}

/**
 * An indicator for a view in CompositView.
 * Concat and Layer need a View and UnitView to indicate the appearance of the view,
 * while Repeat only need a string that specify a field to indicate
 * the appearance of the view.
 * Facet only need a field name for each axis to specify facet property, so
 * it should not have a parameter. Thus, we use null.
 * TODO: explain this better!
 */
type ViewIndicator = View | string | null;

export abstract class CompositeView<V extends ViewIndicator> extends View {
  /**
   * Move subview at the position `from` to position `to`.
   * For example: in composite view with 4 subviews [0, 1, 2, 3], calling
   * rearrange(2, 0) result in the rearrangement of the subview to [2, 0, 1, 3]
   * @param {number} form the index of the view to be moved from.
   * @param {number} to the index of the view to be moved to.
   * @param {any} option an extra option for rearrangement.
   */
  abstract rearrange(from: number, to: number, option: any): void;

  /**
   * Append another view with a ViewIdicator `viewIndicator`
   * @param {V} viewIndicator the ViewIndicator to be appended.
   * @param {any} option an extra option for appending.
   */
  abstract append(viewIndicator: V, option: any): void;

  /**
   * Prepend another view with a ViewIdicator `viewIndicator`
   * @param {V} viewIndicator the ViewIndicator to be prepended.
   * @param {any} option an extra option for appending.
   */
  abstract prepend(viewIndicator: V, option: any): void;

  /**
   * Remove a view from composite view
   * @param {number} the index of the view to be removed
   * @param {any} option an extra option for removing
   */
  abstract remove(index: number, option: any): void;

  /**
   * Check if `viewIndicator` is competible with the current view
   * @param {V} viewIndicator a view indicator to be checked
   * @returns true if `viewIndicator` is competible with the current view
   *          false otherwise.
   */
  abstract isCompatible(viewIndicator: V): boolean;
}

export class UnitView extends View {
  private spec: IRawSpec;

  /**
   * Construct a unit view with a valid Vega-Lite spec.
   * @param {object} spec Vega-Lite spec
   */
  public constructor(spec: IRawSpec) {
    super('unit');
    this.spec = spec;
  }

  public edit(spec: IRawSpec) {
    this.spec = spec;
  }

  public export() {
    return this.spec;
  }

  public clone() {
    const cloned = new UnitView(this.spec);
    cloned.id = this.id;
    return cloned;
  }

  public deepClone() {
    const cloned = new UnitView(jsonCopy(this.spec));
    cloned.id = this.id;
    return cloned;
  }

  public findView(id: number) {
    return this.id === id ? this : null;
  }
}
