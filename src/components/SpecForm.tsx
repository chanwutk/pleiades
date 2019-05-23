import React from 'react';
import ReactModal from 'react-modal';
import MonacoEditor, {
  EditorDidMount,
  ChangeHandler
} from 'react-monaco-editor';

ReactModal.setAppElement('#root');

export interface ISpecFormProps {
  isOpen: boolean;
  onClose: (toSave: boolean) => void;
  contentLabel: string;
  spec: string;
  setSpec: (txt: string) => void;
}

export const SpecForm: React.FC<ISpecFormProps> = (
  { isOpen, onClose, contentLabel, spec, setSpec }
) => {
  const handleChange: ChangeHandler = val => {
    setSpec(val);
  };

  const handleEditorDidMount: EditorDidMount = editor => {
    editor.focus();
  };

  return (
    <ReactModal isOpen={isOpen} contentLabel={contentLabel}>
      <button onClick={() => onClose(true)}>Save</button>
      <button onClick={() => onClose(false)}>Cancel</button>
      <MonacoEditor
        width="800"
        height="600"
        language="json"
        value={spec}
        onChange={handleChange}
        editorDidMount={handleEditorDidMount}
      />
    </ReactModal>
  );
};
