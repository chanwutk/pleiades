export function moveElement(arr: Array<any>, from: number, to: number) {
  if (!(from in arr && to in arr)) {
    throw new Error(`from (=${from}) or to (=${to}) is out of arr bound (=[0,${arr.length - 1}])`);
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