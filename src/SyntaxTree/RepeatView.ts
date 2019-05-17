import { View, CompositeView } from './View';
import { moveElement } from './Utils';

export class RepeatView implements CompositeView<string> {
  private repeatInfo: RepeatInfo;
  private view: View;

  public constructor(view: View, rowChannel: string | undefined, columnChannel: string | undefined) {
    this.repeatInfo = new RepeatInfo([], [], rowChannel, columnChannel);
    this.view = view;
  }

  public export() {
    return {
      repeat: {
        ...(this.repeatInfo.isRepeating('row') ? { row: this.repeatInfo.row } : {}),
        ...(this.repeatInfo.isRepeating('column') ? { column: this.repeatInfo.column } : {})
      },
      spec: applyRepeat(this.view.export(), this.repeatInfo)
    };
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

  public isCompatible(_view: View): boolean {
    // repeat is always compatible
    return true;
  }

  public rearrange(from: number, to: number, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      moveElement(this.repeatInfo[option], from, to);
    }
  }
}

class RepeatInfo {
  public row: string[];
  public column: string[];
  public rowChannel: string | undefined;
  public columnChannel: string | undefined;

  public constructor(row: string[], column: string[], rowChannel: string | undefined, columnChannel: string | undefined) {
    this.row = rowChannel ? row : [];
    this.column = columnChannel ? column : [];
    this.rowChannel = rowChannel;
    this.columnChannel = columnChannel;
  }

  public isRepeating(option: 'row' | 'column'): boolean {
    return !!(<any>this)[`${option}Channel`];
  }
}

const nestedTypes = ['layer', 'concat', 'hconcat', 'vconcat', 'spec'];

function applyRepeat(spec: any, repeat: RepeatInfo) {
  let nestedType: string | undefined = undefined;
  nestedTypes.forEach(type => {
    if (spec[type]) {
      nestedType = type;
    }
  })

  const { [nestedType || '$invalid-vl-field$']: nestedSpecs, ...output } = spec;
  if (nestedType) {
    output[nestedType] = nestedSpecs.map((nestedSpec: any) => applyRepeat(nestedSpec, repeat));
  }

  if (output.encoding) {
    applyRepeatToEncoding(output.encoding, repeat);
  }
  return output;
}

function applyRepeatToEncoding(encoding: any, repeat: RepeatInfo) {
  if (repeat.rowChannel && encoding[repeat.rowChannel]) {
    encoding[repeat.rowChannel].field = { repeat: 'row' };
  }
  if (repeat.columnChannel && encoding[repeat.columnChannel]) {
    encoding[repeat.columnChannel].field = { repeat: 'column' };
  }
}