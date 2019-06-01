import { UnitView } from '../../SyntaxTree/View';

const spec = {
  data: { url: 'data/cars.json' },
  mark: 'point',
  encoding: {
    x: { field: 'Horsepower', type: 'quantitative' },
    y: { field: 'Miles_per_Gallon', type: 'quantitative' },
  },
};

describe('UnitView', () => {
  it('correctly exports', () => {
    const view = new UnitView(spec);
    expect(view.export()).toEqual(spec);
  });

  it('correctly getType', () => {
    const view = new UnitView(spec);
    expect(view.type).toEqual('unit');
  });

  it('correctly edits spec', () => {
    const view = new UnitView({ mark: 'point', data: { url: 'url' } });
    expect(view.export()).toEqual({
      mark: 'point',
      data: { url: 'url' },
    });

    view.edit(spec);
    expect(view.export()).toEqual(spec);
  });
});

describe('View', () => {
  it('creates Views with unique ids', () => {
    const view1 = new UnitView(spec);
    const view2 = new UnitView(spec);
    expect(view1.id).not.toEqual(view2.id);
  });
});
