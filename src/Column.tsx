import { ColumnContainer, ColumnTitle } from './styles';
import React, { FC, useRef } from 'react';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { addTask } from './state/actions';
import { useItemDrag } from './utils/useItemDrag'

// Represents one group of tasks.
// Contains a task list and an option to add a new task.
export const Column: FC<ColumnProps> = ({ text, id }: ColumnProps) => {
  const { getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });
  drag(ref);

  return (
    // We need a ref to specify the drag target. We know it will be a div element.
    // We manually provide HTMLDivElement type to useRef call, then provide it
    // as ref prop to ColumnContainer.
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      
      {tasks.map((task) => {
        return (<Card text={task.text} key={task.id} id={task.id} />);
      })}

      <AddNewItem 
        toggleButtonText='+ Add another task'
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