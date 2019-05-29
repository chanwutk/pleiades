import React from 'react';
import MonacoEditor, {
  EditorDidMount,
  EditorWillMount
} from 'react-monaco-editor';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Save';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import vegaLiteSchema from 'vega-lite/build/vega-lite-schema.json';

/**
 * Adds markdownDescription props to a schema. See https://github.com/Microsoft/monaco-editor/issues/885
 */
const addMarkdownProps = value => {
  if (typeof value === 'object' && value !== null) {
    if (value.description) {
      value.markdownDescription = value.description;
    }

    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        value[key] = addMarkdownProps(value[key]);
      }
    }
  }
  return value;
};

addMarkdownProps(vegaLiteSchema);

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

const schema = [
  {
    schema: vegaLiteSchema,
    uri: 'https://vega.github.io/schema/vega-lite/v3.json'
  }
];

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

  const handleEditorDidMount: EditorDidMount = editor => {
    editor.focus();
  };

  const handleEditorWillMount: EditorWillMount = monaco => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: false,
      enableSchemaRequest: true,
      schemas: schema,
      validate: true
    });
  };

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
            editorWillMount={handleEditorWillMount}
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
