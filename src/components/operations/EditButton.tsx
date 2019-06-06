import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import { IOperationProps } from '../OperationBar';
import { PopupFacetOption } from '../popups/PopupFacetOption';
import { PopupRepeatOption } from '../popups/PopupRepeatOption';
import { RepeatView } from '../../SyntaxTree/RepeatView';
import { FacetView } from '../../SyntaxTree/FacetView';
import { PopupConcatOption } from '../popups/PopupConcatOption';
import { PopupLayerOption } from '../popups/PopupLayerOption';

export interface IEditButtonProps {}

export const EditButton: React.FC<IOperationProps & IEditButtonProps> = ({
  navBarOperands,
  mainViewOperands,
  tree,
}) => {
  const [isLayerPopupOpen, setIsLayerPopupOpen] = useState(false);
  const [isConcatPopupOpen, setIsConcatPopupOpen] = useState(false);
  const [isRepeatPopupOpen, setIsRepeatPopupOpen] = useState(false);
  const [isFacetPopupOpen, setIsFacetPopupOpen] = useState(false);

  const [currentView, setCurrentView] = useState<View | null>(null);
  const setters = {
    layer: setIsLayerPopupOpen,
    concat: setIsConcatPopupOpen,
    repeat: setIsRepeatPopupOpen,
    facet: setIsFacetPopupOpen,
    unit: () => {alert('Edit is currently not working for unit spec')},
  };

  const exportDisabled =
    mainViewOperands.length !== 1 ||
    navBarOperands.length !== 0 ||
    tree === null;

  const handleClick = () => {
    const { view } = tree!.findView(mainViewOperands[0])!;
    setCurrentView(view);
    setters[view.type](true);
  };

  return (
    <>
      <Button disabled={exportDisabled} onClick={handleClick}>
        <Edit /> &nbsp; Edit
      </Button>
      <PopupLayerOption
        isOpen={isLayerPopupOpen}
        onClose={() => setters.layer(false)}
        tree={tree!}
      />
      <PopupConcatOption
        isOpen={isConcatPopupOpen}
        onClose={() => setters.concat(false)}
        tree={tree!}
      />
      <PopupRepeatOption
        isOpen={isRepeatPopupOpen}
        onClose={() => setters.repeat(false)}
        currentRepeat={
          currentView instanceof RepeatView ? currentView.getInfo() : undefined
        }
      />
      <PopupFacetOption
        isOpen={isFacetPopupOpen}
        onClose={() => setters.facet(false)}
        currentFacet={
          currentView instanceof FacetView ? currentView.getInfo() : undefined
        }
      />
    </>
  );
};
