import { ViewHolder, UnitView } from './View';

const spec = {
  data: { url: "data/cars.json" },
  mark: "point",
  encoding: {
    x: { field: "Horsepower", type: "quantitative" },
    y: { field: "Miles_per_Gallon", type: "quantitative" }
  }
};

describe('UnitView', () => {
  it('correctly export', () => {
    const view = new UnitView(spec);
    expect(view.export()).toEqual(spec);
  });
});

describe('ViewHolder', () => {
  it('correctly export from View', () => {
    const view = new UnitView(spec);
    const holder = new ViewHolder(view);

    expect(holder.export()).toEqual(view.export());
  });
});
