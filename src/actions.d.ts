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

interface ISelectOperand2IdAction {
  type: 'select-operand2-id';
  operandId: number | null;
}

interface IOperateAction {
  type: 'operate';
  operand1: any;
  operand2Id: number | null;
  operator: Operator;
}

type Action =
  | IAddSpecAction
  | IModifySpecAction
  | IDeleteSpecAction
  | IUndoAction
  | IRedoAction
  | ISelectOperand1Action
  | ISelectOperand2IdAction
  | IOperateAction;
