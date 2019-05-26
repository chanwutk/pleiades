import React from 'react';
import ReactModal from 'react-modal';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import { FakeButton } from './FakeButton';
import { X, Save } from 'react-feather';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

ReactModal.setAppElement('#root');

export interface IPopupEditorProps {
  isOpen: boolean;
  onClose: (toSave: boolean) => void;
  contentLabel: string;
  value: string;
  setValue: (txt: string) => void;
  alias: string;
  setAlias: (txt: string) => void;
  errorMsg?: string;
  extras: React.ReactNode[];
}

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(4),
    width: 300,
  },
}));

export const PopupEditor: React.FC<IPopupEditorProps> = ({
  isOpen,
  onClose,
  contentLabel,
  value,
  setValue,
  alias,
  setAlias,
  errorMsg,
  extras
}) => {
  const classes = useStyles();

  const handleEditorDidMount: EditorDidMount = editor => editor.focus();

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
          {extras}
        </div>
        <span className="error-msg">{errorMsg ? errorMsg : null}</span>
      </div>
      <TextField
        id="standard-name"
        label="Name"
        className={classes.textField}
        value={alias}
        onChange={event => setAlias(event.target.value)}
        margin="normal"
      />
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
            wordWrap: 'on'
          }}
        />
      </div>
    </ReactModal>
  );
};
