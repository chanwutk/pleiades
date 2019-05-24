import React from 'react';
import ReactModal from 'react-modal';
import MonacoEditor, {
  EditorDidMount,
} from 'react-monaco-editor';
import stringify from 'json-stringify-pretty-compact';
import { FakeButton } from './FakeButton';
import { X, Save } from 'react-feather';

ReactModal.setAppElement('#root');

export interface IPopupEditorProps {
  isOpen: boolean;
  onClose: (toSave: boolean) => void;
  contentLabel: string;
  value: string;
  setValue: (txt: string) => void;
  errorMsg?: string;
}

const examples = [
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
    "description": "A simple bar chart with embedded data.",
    "data": {
      "values": [
        { "a": "A", "b": 28 }, { "a": "B", "b": 55 }, { "a": "C", "b": 43 },
        { "a": "D", "b": 91 }, { "a": "E", "b": 81 }, { "a": "F", "b": 53 },
        { "a": "G", "b": 19 }, { "a": "H", "b": 87 }, { "a": "I", "b": 52 }
      ]
    },
    "mark": "bar",
    "encoding": {
      "x": { "field": "a", "type": "ordinal" },
      "y": { "field": "b", "type": "quantitative" }
    }
  },

  {
    "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
    "description": "A bar chart showing the US population distribution of age groups in 2000.",
    "data": { "url": "https://vega.github.io/editor/data/population.json" },
    "transform": [{ "filter": "datum.year == 2000" }],
    "mark": "bar",
    "encoding": {
      "y": {
        "field": "age", "type": "ordinal",
        "scale": { "rangeStep": 17 }
      },
      "x": {
        "aggregate": "sum", "field": "people", "type": "quantitative",
        "axis": { "title": "population" }
      }
    }
  }

]

export const PopupEditor: React.FC<IPopupEditorProps> = ({
  isOpen,
  onClose,
  contentLabel,
  value,
  setValue,
  errorMsg
}) => {
  const handleEditorDidMount: EditorDidMount = editor => {
    editor.focus();
  };

  return (
    <ReactModal isOpen={isOpen} contentLabel={contentLabel} className="modal">
      <div className="modal-toolbar">
        <div className="modal-buttons">
          <FakeButton onClick={() => onClose(false)}>
            <X />
            &nbsp; Close
          </FakeButton>
          <FakeButton onClick={() => onClose(true)}>
            <Save />
            &nbsp; Save
          </FakeButton>
          {
            examples.map((example, i) => (
              <FakeButton onClick={() => setValue(stringify(example))}>
                Example {i + 1}
              </FakeButton>
            ))
          }
        </div>
        <span className="error-msg">
          {errorMsg ? errorMsg : null}
        </span>
      </div>
      <div className="editor">
        <MonacoEditor
          language="json"
          value={value}
          onChange={txt => setValue(txt)}
          editorDidMount={handleEditorDidMount}
          options={{
            automaticLayout: true,
            cursorBlinking: 'smooth',
            folding: true,
            lineNumbersMinChars: 4,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
          }}
        />
      </div>
    </ReactModal>
  );
};
