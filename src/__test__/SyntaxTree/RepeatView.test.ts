import { RepeatView, RepeatInfo } from '../../SyntaxTree/RepeatView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from '../../SyntaxTree/Utils';
import { defaultVegaLiteWidth, defaultVegaLiteHeight } from '../../variables';

const spec = {
  data: { url: 'data/cars.json' },
  mark: 'point',
  encoding: {
    x: { field: 'Horsepower', type: 'quantitative' },
    y: { field: 'Miles_per_Gallon', type: 'quantitative' },
  },
};

describe('RepeatView', () => {
  it('is correctly initialized', () => {
    const facet1 = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {})
    );
    expect(facet1.export()).toEqual({
      repeat: {},
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        ...spec,
      },
    });

    const facet2 = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
      })
    );
    expect(facet2.export()).toEqual({
      repeat: { row: [] },
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: { repeat: 'row' }, type: 'quantitative' },
          y: { field: 'Miles_per_Gallon', type: 'quantitative' },
        },
      },
    });

    const facet3 = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        columnChannel: 'y',
      })
    );
    expect(facet3.export()).toEqual({
      repeat: { column: [] },
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: 'Horsepower', type: 'quantitative' },
          y: { field: { repeat: 'column' }, type: 'quantitative' },
        },
      },
    });
  });

  it('correctly getType', () => {
    const repeat = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {})
    );
    expect(repeat.type).toEqual('repeat');
  });

  it('is correctly addAxis', () => {
    const facet = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {})
    );
    facet.addAxis('x', 'row');
    expect(facet.export()).toEqual({
      repeat: { row: [] },
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: { repeat: 'row' }, type: 'quantitative' },
          y: { field: 'Miles_per_Gallon', type: 'quantitative' },
        },
      },
    });

    facet.addAxis('y', 'column');
    expect(facet.export()).toEqual({
      repeat: { row: [], column: [] },
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: { repeat: 'row' }, type: 'quantitative' },
          y: { field: { repeat: 'column' }, type: 'quantitative' },
        },
      },
    });
  });

  it('is correctly removeAxis', () => {
    const facet = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
        columnChannel: 'y',
      })
    );
    facet.removeAxis('column');
    expect(facet.export()).toEqual({
      repeat: { row: [] },
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: { repeat: 'row' }, type: 'quantitative' },
          y: { field: 'Miles_per_Gallon', type: 'quantitative' },
        },
      },
    });

    facet.removeAxis('row');
    expect(facet.export()).toEqual({
      repeat: {},
      spec: {
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
        data: { url: 'data/cars.json' },
        mark: 'point',
        encoding: {
          x: { field: 'Horsepower', type: 'quantitative' },
          y: { field: 'Miles_per_Gallon', type: 'quantitative' },
        },
      },
    });
  });

  it('is correctly appended', () => {
    const repeat = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
        columnChannel: 'y',
      })
    );

    repeat.append('field1', 'row');
    expect(repeat.export().repeat).toEqual({ row: ['field1'], column: [] });
    repeat.append('field2', 'row');
    expect(repeat.export().repeat).toEqual({
      row: ['field1', 'field2'],
      column: [],
    });

    repeat.append('field3', 'column');
    expect(repeat.export().repeat).toEqual({
      row: ['field1', 'field2'],
      column: ['field3'],
    });
    repeat.append('field4', 'column');
    expect(repeat.export().repeat).toEqual({
      row: ['field1', 'field2'],
      column: ['field3', 'field4'],
    });
  });

  it('is correctly prepended', () => {
    const repeat = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
        columnChannel: 'y',
      })
    );

    repeat.append('field1', 'row');
    repeat.prepend('field2', 'row');
    expect(repeat.export().repeat).toEqual({
      row: ['field2', 'field1'],
      column: [],
    });

    repeat.append('field3', 'column');
    repeat.prepend('field4', 'column');
    expect(repeat.export().repeat).toEqual({
      row: ['field2', 'field1'],
      column: ['field4', 'field3'],
    });
  });

  it('correctly removes view', () => {
    const repeat = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
      })
    );
    repeat.append('field1', 'row');
    repeat.append('field2', 'row');
    repeat.append('field3', 'row');
    repeat.append('field4', 'row');

    repeat.remove(2, 'row');
    expect(repeat.export().repeat).toEqual({
      row: ['field1', 'field2', 'field4'],
    });
  });

  it('is correctly rearranged', () => {
    const repeat = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {
        rowChannel: 'x',
        columnChannel: 'y',
      })
    );
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
      column: ['field1', 'field4', 'field2', 'field3'],
    });
  });

  it('correctly checks for compatibility', () => {
    const facet = new RepeatView(
      new UnitView(jsonCopy(spec)),
      new RepeatInfo([], [], {})
    );
    expect(facet.isCompatible('field')).toBeTruthy();
  });
});
