import React, { useState } from 'react';
import { PopupEditor } from './PopupEditor';
import { success, failure } from '../utils';
import * as vl from 'vega-lite';

export interface IVegaLiteEditorProps {
  showModal: boolean;
  setShowModal: (val: boolean) => void;
  value: string;
  setValue: (txt: string) => void;
  contentLabel: string;
  onSuccess: (json: any) => void;
}

export const VegaLiteEditor: React.FC<IVegaLiteEditorProps> = ({
  showModal,
  setShowModal,
  value,
  setValue,
  contentLabel,
  onSuccess
}) => {
  const [errorMsg, setErrorMsg] = useState('');

  const stringToSpec = (value: string) => {
    try {
      const json = JSON.parse(value);
      if (!('data' in json)) {
        return failure('data field must exist.');
      }

      // TODO: can we do anything with the output of the compilation?
      // currently we only call it for side-effect (to see if it errors or not)
      vl.compile(json);
      return success(json);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return failure(e.message);
      } else if (e.message === 'Invalid spec') {
        return failure(e.message);
      } else {
        throw e;
      }
    }
  };

  const handleClose = (toSave: boolean) => {
    if (toSave) {
      const result = stringToSpec(value);
      switch (result.tag) {
        case 'success':
          setErrorMsg('');
          onSuccess(result.value);
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

  return (
    <PopupEditor
      isOpen={showModal}
      contentLabel={contentLabel}
      onClose={handleClose}
      value={value}
      setValue={setValue}
      errorMsg={errorMsg}
    />
  );
};
