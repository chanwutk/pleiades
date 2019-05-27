interface IAddSpecAction {
  type: 'add-spec';
  json: any;
  alias: string;
}

interface IModifySpecAction {
  type: 'modify-spec';
  json: any;
  alias: string;
  id: number;
}

interface IDeleteSpecAction {
  type: 'delete-spec';
  id: number;
}

interface IUndoAction {
  type: 'undo';
}

interface IRedoAction {
  type: 'redo';
}

interface ISelectModeAction {
  type: 'select-mode';
  mode: Mode;
}

type Action =
  | IAddSpecAction
  | IModifySpecAction
  | IDeleteSpecAction
  | IUndoAction
  | IRedoAction
  | ISelectModeAction;
