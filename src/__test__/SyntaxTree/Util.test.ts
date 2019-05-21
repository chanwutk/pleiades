import { moveElement } from '../../SyntaxTree/Utils';

describe('moveElement', () => {
  it('correctly moves element to back', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    moveElement(arr, 2, 4);
    expect(arr).toEqual([0, 1, 3, 4, 2, 5]);
  });

  it('correctly moves element to front', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    moveElement(arr, 4, 2);
    expect(arr).toEqual([0, 1, 4, 2, 3, 5]);
  });

  it('correctly moves element to to the same position', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    moveElement(arr, 3, 3);
    expect(arr).toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('throws an error when index is out of bound', () => {
    const arr = [0, 1, 2];
    expect(() => moveElement(arr, -1, 1)).toThrow(`from (=-1) or to (=1) is out of arr bound (=[0,2])`);
    expect(() => moveElement(arr, 1, 3)).toThrow(`from (=1) or to (=3) is out of arr bound (=[0,2])`);
  });
});