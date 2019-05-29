import React, { useState } from 'react';
import * as vl from 'vega-lite';
import stringify from 'json-stringify-pretty-compact';
import Button from '@material-ui/core/Button';

import { success, failure } from '../utils';
import { PopupEditor } from './PopupEditor';

export interface IVegaLiteEditorProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  value: string;
  setValue: (txt: string) => void;
  alias: string;
  setAlias: (txt: string) => void;
  onSuccess: (alias: string, json: any) => void;
}

const examples = [
  {
    data: { url: 'https://vega.github.io/editor/data/cars.json' },
    mark: 'point',
    encoding: {
      x: { field: 'Horsepower', type: 'quantitative' },
      y: { field: 'Miles_per_Gallon', type: 'quantitative' }
    }
  },

  {
    data: { url: 'https://vega.github.io/editor/data/population.json' },
    transform: [{ filter: 'datum.year == 2000' }],
    mark: 'bar',
    encoding: {
      y: {
        field: 'age',
        type: 'ordinal',
        scale: { rangeStep: 17 }
      },
      x: {
        aggregate: 'sum',
        field: 'people',
        type: 'quantitative',
        axis: { title: 'population' }
      }
    }
  }
];

const stringToSpec = (value: string) => {
  try {
    const json = JSON.parse(value);
    if (!('data' in json) || !('url' in json.data)) {
      return failure('data field must exist and must be url.');
    }

    // TODO: can we do anything with the output of the compilation?
    // currently we only call it for side-effect (to see if it errors or not)
    vl.compile(json);
    return success(json);
  } catch (e) {
    return failure(e.message);
  }
};

export const VegaLiteEditor: React.FC<IVegaLiteEditorProps> = ({
  showModal,
  setShowModal,
  value,
  setValue,
  alias,
  setAlias,
  onSuccess
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = (toSave: boolean) => {
    if (toSave) {
      const result = stringToSpec(value);
      switch (result.tag) {
        case 'success':
          setErrorMsg('');
          onSuccess(alias, result.value);
          setShowModal(false);
          return;
        case 'failure':
          setErrorMsg(result.value);
          // NOTE: this does not close the dialog
          return;
      }
    } else {
      setErrorMsg('');
      setShowModal(false);
      return;
    }
  };

  const handleChange = (txt: string) => {
    const result = stringToSpec(txt);
    switch (result.tag) {
      case 'success':
        setErrorMsg('');
        break;
      case 'failure':
        setErrorMsg(result.value);
        break;
    }
    setValue(txt);
  };

  const extras = examples.map((example, i) => (
    <Button key={i} onClick={() => setValue(stringify(example))}>
      Example {i + 1}
    </Button>
  ));

  return (
    <PopupEditor
      isOpen={showModal}
      onClose={handleClose}
      value={value}
      onChange={handleChange}
      alias={alias}
      setAlias={setAlias}
      errorMsg={errorMsg}
      extras={extras}
    />
  );
};
