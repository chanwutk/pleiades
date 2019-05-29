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

interface ISelectOperand1Action {
  type: 'select-operand1';
  id: number | null;
}

interface ISelectOperand2Action {
  type: 'select-operand2';
  operand: any;
}

interface IOperateAction {
  type: 'operate';
  operand1: any;
  operand2: any;
  operator: Operator;
}

type Action =
  | IAddSpecAction
  | IModifySpecAction
  | IDeleteSpecAction
  | IUndoAction
  | IRedoAction
  | ISelectOperand1Action
  | ISelectOperand2Action
  | IOperateAction;
