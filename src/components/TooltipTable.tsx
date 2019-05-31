import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

export interface ITooltipTableProps {
  table: string[][];
  children: any;
}

const useStyles = makeStyles(_ => ({
  keyColumn: { textAlign: 'right' },
}));

export const TooltipTable: React.FC<ITooltipTableProps> = ({
  table,
  children,
}) => {
  const classes = useStyles();
  const title = (
    <table>
      <tbody>
        {table.map(([key, val]) => (
          <tr key={key}>
            <td className={classes.keyColumn}>
              <strong>{key}</strong>:
            </td>
            <td>{typeof val === 'string' ? val : (val as any).type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Tooltip placement="top" title={title}>
      {children}
    </Tooltip>
  );
};
