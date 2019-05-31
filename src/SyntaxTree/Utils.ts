import { View } from './View';

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

export function isUnitSpec(view: View) {
  const spec = view.export();
  return (
    !spec['spec'] &&
    !spec['layer'] &&
    !spec['concat'] &&
    !spec['hconcat'] &&
    !spec['vconcat']
  );
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
