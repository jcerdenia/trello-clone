import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useAppState } from '../state/AppStateContext';
import { DragItem } from '../DragItem';
import { setDraggedItem } from '../state/actions';
import { getEmptyImage } from 'react-dnd-html5-backend';

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    // When we start dragging, we store the item in our app state.
    // When we stop, we rest it to null.
    type: item.type, // this will be CARD or COLUMN
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
      // returns dragged item object and dispatches setDraggedItem action
    },
    end: () => dispatch(setDraggedItem(null)) // called when item is
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [preview]);

  return { drag }
}