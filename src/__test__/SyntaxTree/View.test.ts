import { ViewHolder, UnitView } from '../../SyntaxTree/View';

const spec = {
  data: { url: "data/cars.json" },
  mark: "point",
  encoding: {
    x: { field: "Horsepower", type: "quantitative" },
    y: { field: "Miles_per_Gallon", type: "quantitative" }
  }
};

describe('UnitView', () => {
  it('correctly exports', () => {
    const view = new UnitView(spec);
    expect(view.export()).toEqual(spec);
  });

  it('correctly edits spec', () => {
    const view = new UnitView({});
    expect(view.export()).toEqual({});

    view.edit(spec);
    expect(view.export()).toEqual(spec);
  });
});

describe('ViewHolder', () => {
  it('correctly exports from View', () => {
    const view = new UnitView(spec);
    const holder = new ViewHolder(view);

    expect(holder.export()).toEqual(view.export());
  });
});
