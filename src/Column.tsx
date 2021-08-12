import { ColumnContainer, ColumnTitle } from './styles';
import React, { FC } from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { addTask } from './state/actions';

// Represents one group of tasks.
// Contains a task list and an option to add a new task.
export const Column: FC<ColumnProps> = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      
      {tasks.map((task) => {
        return (<Card text={task.text} key={task.id} id={task.id} />);
      })}

      <AddNewItem 
        toggleButtonText='➕ Add another task'
        onAdd={(text) => dispatch(addTask(text.valueOf(), id))}
        dark
      />
    </ColumnContainer>
  );
}

type ColumnProps = {
  text: string;
  id: string;
}