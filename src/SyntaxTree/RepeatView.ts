import { CompositeView } from './CompositeView';
import { View } from './View';
import { moveElement } from './Utils';

export class RepeatView implements CompositeView<string> {
  repeatInfo: RepeatInfo;
  view: View;

  constructor(view: View, rowChannel: string | undefined, columnChannel: string | undefined) {
    this.repeatInfo = new RepeatInfo([], [], rowChannel, columnChannel);
    this.view = view;
  }

  export() {
    return {
      repeat: {
        ...(this.repeatInfo.isRepeating('row') ? { row: this.repeatInfo.row } : {}),
        ...(this.repeatInfo.isRepeating('column') ? { column: this.repeatInfo.column } : {})
      },
      spec: applyRepeat(this.view.export(), this.repeatInfo)
    };
  }

  append(view: string, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      this.repeatInfo[option].push(view);
    }
  }

  prepend(view: string, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      this.repeatInfo[option].unshift(view);
    }
  }

  isCompatible(_view: View): boolean {
    // repeat is always compatible
    return true;
  }

  rearrange(from: number, to: number, option: 'row' | 'column') {
    if (this.repeatInfo.isRepeating(option)) {
      moveElement(this.repeatInfo[option], from, to);
    }
  }
}

class RepeatInfo {
  row: string[];
  column: string[];
  rowChannel: string | undefined;
  columnChannel: string | undefined;

  constructor(row: string[], column: string[], rowChannel: string | undefined, columnChannel: string | undefined) {
    this.row = rowChannel ? row : [];
    this.column = columnChannel ? column : [];
    this.rowChannel = rowChannel;
    this.columnChannel = columnChannel;
  }

  isRepeating(option: 'row' | 'column'): boolean {
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