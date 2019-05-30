import React from 'react';
import { shallowEqual } from 'react-redux';
import Vega from 'react-vega';
import NativeVegaLite from 'react-vega-lite';

export const VegaLite = React.memo(
  NativeVegaLite,
  ({ spec: xSpec, ...xRest }, { spec: ySpec, ...yRest }) => {
    return shallowEqual(xRest, yRest) && Vega.isSameSpec(xSpec, ySpec);
  }
);
