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

type ExtraOperator =
  | RepeatInfo
  | FacetInfo
  | InsertOrder
  | { option: InsertOrder; orient: ConcatOrient };

interface IOperateAction {
  type: 'operate';
  operands: number[];
  operator: Operator;
  extra?: ExtraOperator;
}

interface IDecomposeAction {
  type: 'decompose';
  operand: number;
}

interface IModifyInfoAction {
  type: 'modify-info';
  operand: number;
  info: RepeatInfo | FacetInfo;
}

interface IRearrangeSubViewsAction {
  type: 'rearrange-subview';
  operand: number;
  order: number[];
  orient?: ConcatOrient;
}

type Action =
  | IAddSpecAction
  | IModifySpecAction
  | IDeleteSpecAction
  | IUndoAction
  | IRedoAction
  | ISelectOperandAction
  | IOperateAction
  | IModifyInfoAction
  | IDecomposeAction
  | IRearrangeSubViewsAction;

type ViewType = 'unit' | 'layer' | 'concat' | 'repeat' | 'facet';
