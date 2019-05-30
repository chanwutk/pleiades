type View = import('./SyntaxTree/View').View;

interface IAddSpecAction {
  type: 'add-spec';
  json: IRawSpec;
  alias: string;
}

interface IModifySpecAction {
  type: 'modify-spec';
  json: IRawSpec;
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

interface ISelectOperandAction {
  type: 'select-operand';
  operand: number;
}

interface IOperateAction {
  type: 'operate';
  operands: number[];
  operator: Operator;
}

type Action =
  | IAddSpecAction
  | IModifySpecAction
  | IDeleteSpecAction
  | IUndoAction
  | IRedoAction
  | ISelectOperandAction
  | IOperateAction;

type ViewType = 'unit' | 'layer' | 'concat' | 'repeat' | 'facet';
