import { useDrag } from 'react-dnd';
import { useAppState } from '../state/AppStateContext';
import { DragItem } from '../DragItem';
import { setDraggedItem } from '../state/actions';

export const useItemDrag = (item: DragItem) => {
  const { dispatch } = useAppState();
  const [_, drag] = useDrag({
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

  return { drag }
}

