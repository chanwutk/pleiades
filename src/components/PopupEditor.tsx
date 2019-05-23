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
}

export const PopupEditor: React.FC<IPopupEditorProps> = (
  { isOpen, onClose, contentLabel, value, setValue }
) => {

  const handleEditorDidMount: EditorDidMount = editor => {
    editor.focus();
  };

  return (
    <ReactModal isOpen={isOpen} contentLabel={contentLabel} className="modal">
      <div className="button-group">
        <button onClick={() => onClose(true)}>Save</button>
        <button onClick={() => onClose(false)}>Cancel</button>
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
