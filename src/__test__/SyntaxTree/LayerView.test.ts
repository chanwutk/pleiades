import { LayerView } from '../../SyntaxTree/LayerView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from '../../SyntaxTree/Utils';

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
  it('is correctly initialized', () => {
    const layer = new LayerView();
    expect(layer.export()).toEqual({ layer: [] });
  });

  it('is correctly appended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export()).toEqual({ layer: [spec1] });

    layer.append(new UnitView(jsonCopy(spec2)));
    expect(layer.export()).toEqual({ layer: [spec1, spec2] });
  });

  it('is correctly prepended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export()).toEqual({ layer: [spec1] });

    layer.prepend(new UnitView(jsonCopy(spec2)));
    expect(layer.export()).toEqual({ layer: [spec2, spec1] });
  });

  it('correctly removes view', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    layer.append(new UnitView(jsonCopy(spec2)));
    layer.append(new UnitView(jsonCopy(spec3)));

    layer.remove(1);
    expect(layer.export()).toEqual({ layer: [spec1, spec3] });
  });

  it('is correctly rearranged', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    layer.append(new UnitView(jsonCopy(spec2)));
    layer.append(new UnitView(jsonCopy(spec3)));
    layer.rearrange(0, 2);
    expect(layer.export()).toEqual({ layer: [spec2, spec3, spec1] });
  });

  it('correctly checks for compatibility', () => {
    const layer = new LayerView();

    // the method is not implemented
    expect(layer.isCompatible(new UnitView(jsonCopy(spec1)))).toBeTruthy();
  });
});

