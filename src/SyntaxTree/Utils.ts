import { View } from './View';
import {
  isUnitSpec,
  isLayerSpec,
  isRepeatSpec,
  isFacetSpec,
} from 'vega-lite/build/src/spec';
import {
  isConcatSpec,
  isHConcatSpec,
  isVConcatSpec,
} from 'vega-lite/build/src/spec/concat';

/**
 * Move an element that index `from` to the index `to` and shift the rest to the
 * index `from`.
 * For example: in an array with 4 elements [0, 1, 2, 3], calling
 * rearrange(2, 0) result in the rearrangement of the elements to [2, 0, 1, 3]
 * @param {Array} arr array containing the elements to be moved.
 * @param {number} from the index of the element to be moved from.
 * @param {number} to the index of the element to be moved to.
 */
export function moveElement(arr: Array<any>, from: number, to: number) {
  if (!(from in arr && to in arr)) {
    throw new Error(
      `from (=${from}) or to (=${to}) is out of arr bound (=[0,${arr.length -
        1}])`
    );
  }

  const fromElm = arr[from];
  if (from < to) {
    for (let i = from; i < to; i++) {
      arr[i] = arr[i + 1];
    }
  } else {
    for (let i = from; i > to; i--) {
      arr[i] = arr[i - 1];
    }
  }
  arr[to] = fromElm;
}

export function getData(spec: IRawSpec): IRawData[] {
  if (isUnitSpec(spec)) {
    return spec.data ? [spec.data] : [];
  }
  if (isRepeatSpec(spec) || isFacetSpec(spec)) {
    return [...getData(spec.spec), ...(spec.data ? [spec.data] : [])];
  }

  let specs: any[] = [];

  if (isLayerSpec(spec)) {
    specs = spec.layer;
  } else if (isConcatSpec(spec)) {
    specs = spec.concat;
  } else if (isHConcatSpec(spec)) {
    specs = spec.hconcat;
  } else if (isVConcatSpec(spec)) {
    specs = spec.vconcat;
  }

  return [
    ...specs
      .map(innerSpec => {
        return getData(innerSpec);
      })
      .flat(),
    ...(spec.data ? [spec.data] : []),
  ];
}

export function extractData(spec: IRawSpec): { spec: {}; data: IRawData[] } {
  return _extractData(jsonCopy(spec));
}

function _extractData(spec: IRawSpec): { spec: {}; data: IRawData[] } {
  if (isUnitSpec(spec)) {
    const { data, ...newSpec } = spec;
    return { data: data ? [data] : [], spec: newSpec };
  }
  if (isRepeatSpec(spec) || isFacetSpec(spec)) {
    const { data } = spec;
    const { data: extractedData, spec: extractedSpec } = _extractData(
      spec.spec
    );
    spec.spec = extractedSpec;
    return { data: [...(data ? [data] : []), ...extractedData], spec };
  }

  let key: string = '';
  if (isLayerSpec(spec)) {
    key = 'layer';
  } else if (isConcatSpec(spec)) {
    key = 'concat';
  } else if (isHConcatSpec(spec)) {
    key = 'hconcat';
  } else if (isVConcatSpec(spec)) {
    key = 'vconcat';
  }

  const { data } = spec;
  const outputData: IRawData[] = data ? [data] : [];
  for (let i = 0; i < spec[key].length; i++) {
    const { data: extractedData, spec: extractedSpec } = _extractData(
      spec[key][i]
    );
    outputData.push(...extractedData);
    spec[key][i] = extractedSpec;
  }
  return { data: outputData, spec };
}

export function findViewInArray(id: number, views: View[], currentView: View) {
  if (id === currentView.id) return { parent: null, view: currentView };
  for (const view of views) {
    const result = view.findView(id);
    if (result !== null) {
      return result.parent !== null
        ? result
        : { ...result, parent: currentView };
    }
  }
  return null;
}

export function replaceViewInArray(
  view: View,
  views: View[],
  id: number
): boolean {
  for (let i = 0; i < views.length; i++) {
    if (views[i].id === id) {
      views[i] = view;
      return true;
    }
  }
  return false;
}

export function jsonCopy(obj: {}) {
  return JSON.parse(JSON.stringify(obj));
}
