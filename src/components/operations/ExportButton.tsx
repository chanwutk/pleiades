import React from 'react';
import Button from '@material-ui/core/Button';
import Launch from '@material-ui/icons/Launch';

export interface IExportButtonProps {
  tree: View | null;
}

export const ExportButton: React.FC<IExportButtonProps> = ({ tree }) => {
  const exportDisabled = tree === null;
  const doanloadJson = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(tree!.export(), null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(file);
    element.download = 'visualization.json';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Button onClick={doanloadJson} color="primary" disabled={exportDisabled}>
      <Launch /> &nbsp; Export
    </Button>
  );
};
