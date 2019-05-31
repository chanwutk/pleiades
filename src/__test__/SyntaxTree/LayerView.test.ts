import { LayerView } from '../../SyntaxTree/LayerView';
import { UnitView } from '../../SyntaxTree/View';
import { jsonCopy } from '../../SyntaxTree/Utils';
import { defaultVegaLiteWidth, defaultVegaLiteHeight } from '../../variables';

const spec1 = {
  data: { url: 'data/cars.json' },
  mark: 'point',
  encoding: {
    x: { field: 'Horsepower', type: 'quantitative' },
    y: { field: 'Miles_per_Gallon', type: 'quantitative' },
  },
};

const spec2 = {
  data: { url: 'data/movies.json' },
  mark: 'bar',
  encoding: {
    x: {
      bin: true,
      field: 'IMDB_Rating',
      type: 'quantitative',
    },
    y: {
      aggregate: 'count',
      type: 'quantitative',
    },
  },
};

const spec3 = {
  data: { url: 'data/stocks.csv' },
  transform: [{ filter: "datum.symbol==='GOOG'" }],
  mark: 'line',
  encoding: {
    x: { field: 'date', type: 'temporal' },
    y: { field: 'price', type: 'quantitative' },
  },
};

describe('LayerView', () => {
  it('is correctly initialized', () => {
    const layer = new LayerView();
    expect(layer.export()).toEqual({ layer: [] });
  });

  it('correctly getType', () => {
    const layer = new LayerView();
    expect(layer.type).toEqual('layer');
  });

  it('is correctly appended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export().layer).toEqual([
      { ...spec1, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
    ]);

    layer.append(new UnitView(jsonCopy(spec2)));
    expect(layer.export().layer).toEqual([
      { ...spec1, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
      { ...spec2, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
    ]);
  });

  it('is correctly prepended', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    expect(layer.export().layer).toEqual([
      { ...spec1, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
    ]);

    layer.prepend(new UnitView(jsonCopy(spec2)));
    expect(layer.export().layer).toEqual([
      { ...spec2, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
      { ...spec1, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
    ]);
  });

  it('correctly removes view', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    layer.append(new UnitView(jsonCopy(spec2)));
    layer.append(new UnitView(jsonCopy(spec3)));

    layer.remove(1);
    expect(layer.export().layer).toEqual([
      { ...spec1, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
      { ...spec3, width: defaultVegaLiteWidth, height: defaultVegaLiteHeight },
    ]);
  });

  it('is correctly rearranged', () => {
    const layer = new LayerView();

    layer.append(new UnitView(jsonCopy(spec1)));
    layer.append(new UnitView(jsonCopy(spec2)));
    layer.append(new UnitView(jsonCopy(spec3)));
    layer.rearrange(0, 2);
    expect(layer.export().layer).toEqual([
      {
        ...spec2,
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
      },
      {
        ...spec3,
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
      },
      {
        ...spec1,
        width: defaultVegaLiteWidth,
        height: defaultVegaLiteHeight,
      },
    ]);
  });

  it('correctly checks for compatibility', () => {
    const layer = new LayerView();

    // the method is not implemented
    expect(layer.isCompatible(new UnitView(jsonCopy(spec1)))).toBeTruthy();
  });
});
