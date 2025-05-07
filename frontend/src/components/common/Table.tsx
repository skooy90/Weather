import React from 'react';
import styled from 'styled-components';
import { TableColumn } from '../../types';

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyField: keyof T;
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.thead`
  background-color: #f7fafc;
`;

const TableHeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f7fafc;
  }

  &:hover {
    background-color: #edf2f7;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
`;

const Table = <T extends { [key: string]: any }>({ columns, data, keyField }: TableProps<T>) => {
  return (
    <StyledTable>
      <TableHeader>
        <tr>
          {columns.map((column) => (
            <TableHeaderCell key={column.key.toString()}>
              {column.label}
            </TableHeaderCell>
          ))}
        </tr>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item[keyField]}>
            {columns.map((column) => (
              <TableCell key={column.key.toString()}>
                {column.render
                  ? column.render(item)
                  : item[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default Table; 