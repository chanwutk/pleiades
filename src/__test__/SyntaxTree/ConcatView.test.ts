import { ConcatView } from '../../SyntaxTree/ConcatView';
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

describe('ConcatView', () => {
  it('is correctly initialized', () => {
    const hconcat = new ConcatView('h');
    expect(hconcat.export()).toEqual({ hconcat: [] });

    const vconcat = new ConcatView('v');
    expect(vconcat.export()).toEqual({ vconcat: [] });
  });

  it('is correctly appended', () => {
    const concat = new ConcatView('h');

    concat.append(new UnitView(jsonCopy(spec1)));
    expect(concat.export()).toEqual({ hconcat: [spec1] });

    concat.append(new UnitView(jsonCopy(spec2)));
    expect(concat.export()).toEqual({ hconcat: [spec1, spec2] });
  });

  it('is correctly prepended', () => {
    const concat = new ConcatView('h');

    concat.append(new UnitView(jsonCopy(spec1)));
    expect(concat.export()).toEqual({ hconcat: [spec1] });

    concat.prepend(new UnitView(jsonCopy(spec2)));
    expect(concat.export()).toEqual({ hconcat: [spec2, spec1] });
  });

  it('correctly removes view', () => {
    const concat = new ConcatView('h');
    concat.append(new UnitView(jsonCopy(spec1)));
    concat.append(new UnitView(jsonCopy(spec2)));
    concat.append(new UnitView(jsonCopy(spec3)));

    concat.remove(1);
    expect(concat.export()).toEqual({ hconcat: [spec1, spec3] });
  });

  it('is correctly rearranged', () => {
    const concat = new ConcatView('h');

    concat.append(new UnitView(jsonCopy(spec1)));
    concat.append(new UnitView(jsonCopy(spec2)));
    concat.append(new UnitView(jsonCopy(spec3)));
    concat.rearrange(0, 2);
    expect(concat.export()).toEqual({ hconcat: [spec2, spec3, spec1] });
  });

  it('correctly checks for compatibility', () => {
    const concat = new ConcatView('h');
    concat.append(new UnitView(jsonCopy(spec1)));
    expect(concat.isCompatible(new UnitView(jsonCopy(spec2)))).toBeTruthy();
  });
});

