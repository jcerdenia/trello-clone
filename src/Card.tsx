import { CardContainer } from './styles';
import { isHidden } from './utils/isHidden';
import { moveTask, setDraggedItem } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { useDrop } from 'react-dnd';
import { useItemDrag } from './utils/useItemDrag';
import { useRef } from 'react';

// Represents one task.
export const Card = ({ text, id, columnId, isPreview }: CardProps) => {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({ type: 'CARD', id, text, columnId });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover() {
      if (!draggedItem) return;
      if (draggedItem.type !== 'CARD') return;
      if (draggedItem.id === id) return;
      const action = moveTask(draggedItem.id, id, draggedItem.columnId, columnId);
      dispatch(action);
    }
  });

  drag(drop(ref));

  return (
    <CardContainer
      isHidden={isHidden(draggedItem, 'CARD', id, isPreview)}
      isPreview={isPreview}
      ref={ref}
    >
      {text}
    </CardContainer>
  );
}

type CardProps = {
  text: string;
  id: string;
  columnId: string;
  isPreview?: boolean;
}