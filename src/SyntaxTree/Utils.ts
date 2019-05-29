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

export function jsonCopy(obj: {}) {
  return JSON.parse(JSON.stringify(obj));
}

// export function isFacetSpec(spec: any): boolean {
//   return !!spec && spec['facet'] !== undefined;
// }

// export function isLayerSpec(spec: any): boolean {
//   return !!spec && spec['layer'] !== undefined;
// }

// export function isRepeatSpec(spec: any): boolean {
//   return !!spec && spec['repeat'] !== undefined;
// }

// export function isConcatSpec(spec: any): boolean {
//   return !!spec && spec['concat'] !== undefined;
// }

// export function isVConcatSpec(spec: any): boolean {
//   return !!spec && spec['vconcat'] !== undefined;
// }

// export function isHConcatSpec(spec: any): boolean {
//   return !!spec && spec['hconcat'] !== undefined;
// }

// export function parse(spec: any): View {
//   if (isLayerSpec(spec)) {
//     return new LayerView(spec);
//   }
// }
