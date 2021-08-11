import { ColumnContainer, ColumnTitle } from './styles';
import React, { FC } from 'react';
import { AddNewItem } from './AddNewItem';

type ColumnProps = {
  text: string;
  children?: React.ReactNode;
}

export const Column: FC<ColumnProps> = ({ text, children }: ColumnProps) => {
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem 
        toggleButtonText='➕ Add another task'
        onAdd={console.log}
        dark
      />
    </ColumnContainer>
  );
}