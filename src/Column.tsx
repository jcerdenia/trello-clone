import { ColumnContainer, ColumnTitle } from './styles';
import React, { FC, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { AddNewItem } from './AddNewItem';
import { useAppState } from './state/AppStateContext';
import { Card } from './Card';
import { addTask, moveList } from './state/actions';
import { useItemDrag } from './utils/useItemDrag'
import { isHidden } from './utils/isHidden'

// Represents one group of tasks.
// Contains a task list and an option to add a new task.
export const Column: FC<ColumnProps> = ({ text, id }: ColumnProps) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: "COLUMN", id, text });

  const [_, drop] = useDrop({
    accept: "COLUMN",
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      }
    }
  });

  drag(drop(ref));

  return (
    // We need a ref to specify the drag target. We know it will be a div element.
    // We manually provide HTMLDivElement type to useRef call, then provide it
    // as ref prop to ColumnContainer.
    <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id)}>
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