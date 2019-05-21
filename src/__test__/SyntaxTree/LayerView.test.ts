import { LayerView } from '../../SyntaxTree/LayerView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from './TestUtils';

const spec1 = {
  data: { url: "data/cars.json" },
  mark: "point",
  encoding: {
    x: { field: "Horsepower", type: "quantitative" },
    y: { field: "Miles_per_Gallon", type: "quantitative" }
  }
};

const spec2 = {
  data: { url: "data/movies.json" },
  mark: "bar",
  encoding: {
    x: {
      bin: true,
      field: "IMDB_Rating",
      type: "quantitative"
    },
    y: {
      aggregate: "count",
      type: "quantitative"
    }
  }
}

const spec3 = {
  data: { url: "data/stocks.csv" },
  transform: [{ filter: "datum.symbol==='GOOG'" }],
  mark: "line",
  encoding: {
    x: { field: "date", type: "temporal" },
    y: { field: "price", type: "quantitative" }
  }
};

describe('LayerView', () => {
  it('correctly initialized', () => {
    const layer = new LayerView();
    expect(layer.export()).toEqual({ layer: [] });
  });

  it('correctly appended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export()).toEqual({ layer: [spec1] });

    layer.append(new UnitView(jsonCopy(spec2)));
    expect(layer.export()).toEqual({ layer: [spec1, spec2] });
  });

  it('correctly prepended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export()).toEqual({ layer: [spec1] });

    layer.prepend(new UnitView(jsonCopy(spec2)));
    expect(layer.export()).toEqual({ layer: [spec2, spec1] });
  });

  it('correctly rearranged', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    layer.append(new UnitView(jsonCopy(spec2)));
    layer.append(new UnitView(jsonCopy(spec3)));
    layer.rearrange(0, 2);
    expect(layer.export()).toEqual({ layer: [spec2, spec3, spec1] });
  });

  it('correctly check compatibility', () => {
    const layer = new LayerView();

    // the method is not implemented
    expect(layer.isCompatible(new UnitView(jsonCopy(spec1)))).toBeTruthy();
  });
});

