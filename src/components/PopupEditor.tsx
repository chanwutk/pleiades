import React from 'react';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

export interface IPopupEditorProps {
  isOpen: boolean;
  onClose: (toSave: boolean) => void;
  value: string;
  setValue: (txt: string) => void;
  alias: string;
  setAlias: (txt: string) => void;
  errorMsg?: string;
  extras: React.ReactNode[];
}

const editorHeight = 400;

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(4),
    width: 300
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1)
  },
  errorMessage: {
    fontStyle: 'italic',
    color: 'red'
  }
}));

export const PopupEditor: React.FC<IPopupEditorProps> = ({
  isOpen,
  onClose,
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
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle disableTypography>
        <TextField
          id="standard-name"
          label="Name"
          className={classes.textField}
          value={alias}
          onChange={event => setAlias(event.target.value)}
          margin="normal"
        />
        <Button onClick={() => onClose(true)}>
          <Save />
          &nbsp; Save
        </Button>
        {extras}
        <IconButton
          className={classes.closeButton}
          onClick={() => onClose(false)}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="editor">
          <MonacoEditor
            language="json"
            value={value}
            height={editorHeight}
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
        <span className={classes.errorMessage}>
          {errorMsg ? errorMsg : null}
        </span>
      </DialogContent>
    </Dialog>
  );
};
