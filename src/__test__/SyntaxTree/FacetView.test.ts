import { FacetView, FacetInfo } from '../../SyntaxTree/FacetView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from '../../SyntaxTree/Utils';

const spec = {
  data: { url: "data/cars.json" },
  mark: "point",
  encoding: {
    x: { field: "Horsepower", type: "quantitative" },
    y: { field: "Miles_per_Gallon", type: "quantitative" }
  }
};

const row = { field: 'Origin', type: 'norminal' };
const column = { field: 'Cylinders', type: 'quantitative' };

describe('FacetView', () => {
  it('is correctly initialized', () => {
    const facet = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row }));
    expect(facet.export()).toEqual({ facet: { row }, spec });
  });

  it('is correctly appended', () => {
    const facet1 = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row }));

    facet1.append(null, column);
    expect(facet1.export()).toEqual({ facet: { row, column }, spec });

    const facet2 = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ column }));

    facet2.append(null, row);
    expect(facet2.export()).toEqual({ facet: { row, column }, spec });
  });

  it('does not support prepend', () => {
    const facet = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row }));

    expect(() => facet.prepend()).toThrow('prepend is not supported for FacetView');
  });

  it('correctly removes axis', () => {
    const facet = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row, column }));

    facet.remove(0, 'row');
    expect(facet.export()).toEqual({ facet: { column }, spec });
  });

  it('is correctly rearranged', () => {
    const facet = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row, column }));

    facet.rearrange();
    expect(facet.export()).toEqual({ facet: { row: column, column: row }, spec });
  });

  it('is correctly checks for compatibility', () => {
    const facet = new FacetView(new UnitView(jsonCopy(spec)), new FacetInfo({ row }));
    expect(facet.isCompatible(null)).toBeTruthy();
  });
});

