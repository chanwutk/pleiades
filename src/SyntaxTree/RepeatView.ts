import { View, CompositeView } from './View';
import { moveElement, findViewInArray, jsonCopy } from './Utils';

export class RepeatView extends CompositeView<string> {
  private repeatInfo: RepeatInfo;
  private view: View;

  public constructor(view: View, repeatInfo: RepeatInfo) {
    super('repeat');
    this.repeatInfo = repeatInfo;
    this.view = view;
  }

  public export() {
    return {
      repeat: this.repeatInfo.export(),
      spec: applyRepeat(this.view.export(), this.repeatInfo),
    };
  }

  /**
   * Add a repeating axis
   * @param channel encoding channel for the axis to be repeated
   * @param orient orient of the added axis
   */
  public addAxis(channel: string, orient: 'row' | 'column') {
    this.repeatInfo.addAxis(channel, orient);
  }

  /**
   * Remove a repeating axis
   * @param orient orient of the removed axis
   */
  public removeAxis(orient: 'row' | 'column') {
    this.repeatInfo.removeAxis(orient);
  }

  public append(field: string, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      this.repeatInfo[option].push(field);
    }
  }

  public prepend(field: string, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      this.repeatInfo[option].unshift(field);
    }
  }

  public remove(index: number, axis: 'row' | 'column') {
    this.repeatInfo.remove(index, axis);
  }

  public isCompatible(_: string): boolean {
    // repeat is always compatible
    return true;
  }

  public rearrange(from: number, to: number, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      moveElement(this.repeatInfo[option], from, to);
    }
  }

  public clone() {
    const cloned = new RepeatView(this.view, this.repeatInfo);
    cloned._id = this._id;
    return cloned;
  }

  public deepClone() {
    const cloned = new RepeatView(
      this.view.deepClone(),
      this.repeatInfo.clone()
    );
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

interface ChannelInfo {
  rowChannel?: string;
  columnChannel?: string;
}

/**
 * This class contains information for repeat
 */
export class RepeatInfo {
  public row: string[];
  public column: string[];
  public rowChannel?: string;
  public columnChannel?: string;

  public constructor(row: string[], column: string[], info: ChannelInfo) {
    this.row = info.rowChannel ? row : [];
    this.column = info.columnChannel ? column : [];
    this.rowChannel = info.rowChannel;
    this.columnChannel = info.columnChannel;
  }

  /**
   * Add an orient to repeat `channel`
   * @param orient an orient to be added
   * @param channel the encoding channel the orient is repeating
   */
  public repeat(orient: 'row' | 'column', channel: string) {
    if (!this.isRepeating(orient)) {
      this[orient] = [];
      (this as any)[`${orient}Channel`] = channel;
    }
  }

  /**
   * Check if repeating the `axis`
   * @param orient orient to be checked if repeating
   */
  public isRepeating(orient: 'row' | 'column'): boolean {
    return !!(this as any)[`${orient}Channel`];
  }

  public export() {
    return {
      ...(this.isRepeating('row') ? { row: jsonCopy(this.row) } : {}),
      ...(this.isRepeating('column') ? { column: jsonCopy(this.column) } : {}),
    };
  }

  public remove(index: number, axis: 'row' | 'column') {
    this[axis].splice(index, 1);
  }

  /**
   * Add a repeating axis
   * @param channel encoding channel for the axis to be repeated
   * @param orient orient of the added axis
   */
  public addAxis(channel: string, orient: 'row' | 'column') {
    this[orient] = [];
    (this as any)[`${orient}Channel`] = channel;
  }

  /**
   * Remove a repeating axis
   * @param orient orient of the removed axis
   */
  public removeAxis(orient: 'row' | 'column') {
    this[orient] = [];
    (this as any)[`${orient}Channel`] = undefined;
  }

  public getChannelInfo(): ChannelInfo {
    return {
      ...(this.rowChannel ? { rowChannel: this.rowChannel } : {}),
      ...(this.columnChannel ? { columnChannel: this.columnChannel } : {}),
    };
  }

  public clone() {
    return new RepeatInfo(this.row, this.column, {
      ...(this.rowChannel ? { rowChannel: this.rowChannel } : {}),
      ...(this.columnChannel ? { columnChannel: this.columnChannel } : {}),
    });
  }
}

/**
 * list of keys for nested spec
 */
const nestedTypes = ['layer', 'concat', 'hconcat', 'vconcat', 'spec'];

/**
 * Apply repeat information `repeat` to `spec`
 * @param spec the spec the repeat information `repeat` to be applied
 * @param repeat the repeat information to apply to `spec`
 */
function applyRepeat(spec: any, repeat: RepeatInfo) {
  let nestedType: string | undefined = undefined;
  nestedTypes.forEach(type => {
    if (spec[type]) {
      nestedType = type;
    }
  });

  const { [nestedType || '$invalid-vl-field$']: nestedSpecs, ...output } = spec;
  if (nestedType) {
    output[nestedType] = nestedSpecs.map((nestedSpec: any) =>
      applyRepeat(nestedSpec, repeat)
    );
  }

  if (output.encoding) {
    applyRepeatToEncoding(output.encoding, repeat);
  }
  return output;
}

/**
 * Apply repeat information `repeat` to `encoding`
 * @param encoding the encoding repeat information `repeat` to be applied
 * @param repeat the repeat information applying
 */
function applyRepeatToEncoding(encoding: any, repeat: RepeatInfo) {
  if (repeat.rowChannel && encoding[repeat.rowChannel]) {
    encoding[repeat.rowChannel].field = { repeat: 'row' };
  }
  if (repeat.columnChannel && encoding[repeat.columnChannel]) {
    encoding[repeat.columnChannel].field = { repeat: 'column' };
  }
}
