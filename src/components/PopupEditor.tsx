import React from 'react';
import ReactModal from 'react-modal';
import MonacoEditor, {
  EditorDidMount,
  ChangeHandler
} from 'react-monaco-editor';
import { FakeButton } from './FakeButton';
import { X, Save } from 'react-feather';

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
        <div className="modal-buttons">
          <FakeButton onClick={() => onClose(false)}>
            <X />
          </FakeButton>
          <FakeButton onClick={() => onClose(true)}>
            <Save />
          </FakeButton>
        </div>
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
