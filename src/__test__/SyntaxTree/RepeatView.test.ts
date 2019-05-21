import { RepeatView } from '../../SyntaxTree/RepeatView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from './TestUtils';

const spec = {
  data: { url: "data/cars.json" },
  mark: "point",
  encoding: {
    x: { field: "Horsepower", type: "quantitative" },
    y: { field: "Miles_per_Gallon", type: "quantitative" }
  }
};

describe('RepeatView', () => {
  it('correctly initialized', () => {
    const facet1 = new RepeatView(new UnitView(jsonCopy(spec)), {});
    expect(facet1.export()).toEqual({ repeat: {}, spec });

    const facet2 = new RepeatView(new UnitView(jsonCopy(spec)), { rowChannel: 'x' });
    expect(facet2.export()).toEqual({
      repeat: { row: [] },
      spec: {
        data: { url: "data/cars.json" },
        mark: "point",
        encoding: {
          x: { field: { repeat: "row" }, type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" }
        }
      }
    });

    const facet3 = new RepeatView(new UnitView(jsonCopy(spec)), { columnChannel: 'y' });
    expect(facet3.export()).toEqual({
      repeat: { column: [] },
      spec: {
        data: { url: "data/cars.json" },
        mark: "point",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: { repeat: "column" }, type: "quantitative" }
        }
      }
    });
  });


  it('correctly addAxis', () => {
    const facet = new RepeatView(new UnitView(jsonCopy(spec)), {});
    facet.addAxis('x', 'row');
    expect(facet.export()).toEqual({
      repeat: { row: [] },
      spec: {
        data: { url: "data/cars.json" },
        mark: "point",
        encoding: {
          x: { field: { repeat: "row" }, type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" }
        }
      }
    });

    facet.addAxis('y', 'column');
    expect(facet.export()).toEqual({
      repeat: { row: [], column: [] },
      spec: {
        data: { url: "data/cars.json" },
        mark: "point",
        encoding: {
          x: { field: { repeat: "row" }, type: "quantitative" },
          y: { field: { repeat: "column" }, type: "quantitative" }
        }
      }
    });
  });

  it('correctly appended', () => {
    const repeat = new RepeatView(new UnitView(jsonCopy(spec)), { rowChannel: 'x', columnChannel: 'y' });

    repeat.append('field1', 'row');
    expect(repeat.export().repeat).toEqual({ row: ['field1'], column: [] });
    repeat.append('field2', 'row');
    expect(repeat.export().repeat).toEqual({ row: ['field1', 'field2'], column: [] });

    repeat.append('field3', 'column');
    expect(repeat.export().repeat).toEqual({ row: ['field1', 'field2'], column: ['field3'] });
    repeat.append('field4', 'column');
    expect(repeat.export().repeat).toEqual({ row: ['field1', 'field2'], column: ['field3', 'field4'] });
  });

  it('correctly prepended', () => {
    const repeat = new RepeatView(new UnitView(jsonCopy(spec)), { rowChannel: 'x', columnChannel: 'y' });

    repeat.append('field1', 'row');
    repeat.prepend('field2', 'row');
    expect(repeat.export().repeat).toEqual({ row: ['field2', 'field1'], column: [] });

    repeat.append('field3', 'column');
    repeat.prepend('field4', 'column');
    expect(repeat.export().repeat).toEqual({ row: ['field2', 'field1'], column: ['field4', 'field3'] });
  });

  it('correctly rearranged', () => {
    const repeat = new RepeatView(new UnitView(jsonCopy(spec)), { rowChannel: 'x', columnChannel: 'y' });
    repeat.append('field1', 'row');
    repeat.append('field2', 'row');
    repeat.append('field3', 'row');
    repeat.append('field4', 'row');
    repeat.append('field1', 'column');
    repeat.append('field2', 'column');
    repeat.append('field3', 'column');
    repeat.append('field4', 'column');

    repeat.rearrange(1, 3, 'row');
    repeat.rearrange(3, 1, 'column');
    expect(repeat.export().repeat).toEqual({
      row: ['field1', 'field3', 'field4', 'field2'],
      column: ['field1', 'field4', 'field2', 'field3']
    });
  });

  it('correctly check compatibility', () => {
    const facet = new RepeatView(new UnitView(jsonCopy(spec)), {});
    expect(facet.isCompatible('field')).toBeTruthy();
  });
});

