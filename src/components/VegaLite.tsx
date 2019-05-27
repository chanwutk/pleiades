import React from 'react';
import shallowequal from 'shallowequal';
import Vega from 'react-vega';
import NativeVegaLite from 'react-vega-lite';

export const VegaLite = React.memo(
  NativeVegaLite,
  ({ spec: xSpec, ...xRest }, { spec: ySpec, ...yRest }) => {
    return shallowequal(xRest, yRest) && Vega.isSameSpec(xSpec, ySpec);
  }
);
