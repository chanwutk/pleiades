import React from 'react';
import ReactTooltip from 'react-tooltip';

export interface ITooltipTableProps {
  id: string;
  children: string[][];
}

export const TooltipTable: React.FC<ITooltipTableProps> = ({
  id,
  children
}) => (
  <ReactTooltip effect="solid" id={id}>
    <table className="tooltip-table">
      {children.map(([key, val]) => (
        <tr>
          <td>
            <strong>{key}</strong>:
          </td>
          <td>{val}</td>
        </tr>
      ))}
    </table>
  </ReactTooltip>
);
