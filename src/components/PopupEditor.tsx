import React from 'react';
import ReactModal from 'react-modal';
import MonacoEditor, {
  EditorDidMount,
  ChangeHandler
} from 'react-monaco-editor';

ReactModal.setAppElement('#root');

export interface IPopupEditorProps {
  isOpen: boolean;
  onClose: (toSave: boolean) => void;
  contentLabel: string;
  value: string;
  setValue: ChangeHandler;
  errorMsg?: string;
}

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
        <button onClick={() => onClose(true)}>Save</button>
        <button onClick={() => onClose(false)}>Cancel</button>
        <span className="error-msg">
          {errorMsg ? errorMsg : null}
        </span>
      </div>
      <div className="editor">
        <MonacoEditor
          language="json"
          value={value}
          onChange={setValue}
          editorDidMount={handleEditorDidMount}
        />
      </div>
    </ReactModal>
  );
};
