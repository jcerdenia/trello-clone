import { Action } from './actions';
import { nanoid } from 'nanoid';
import { findItemIndexById, moveItem } from '../utils/arrayUtils';
import { DragItem } from '../DragItem';

export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  // state is named draft, so we know we can mutate it.
  switch (action.type) {
    case "ADD_LIST": {
      /* Normally we would do something like this:
      return {
        ...state, // Use spread operator to get all fields from previous state.
        lists: [ // Then set lists field to be a new array
          ...state.lists, // including the old list
          { id: nanoid(), text: action.payload, tasks: [] } // plus the new item
        ]
      } */

      // But ImmerJS lets us mutate an object, and it will create a new object instance from it.
      // So just push the new item into the existing list in the "draft" state.
      draft.lists.push({
        id: nanoid(),
        text: action.payload,
        tasks: []
      });
      break; // No need to return the new state value, immer will handle it.
    }

    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const targetListIndex = findItemIndexById(draft.lists, listId);
      draft.lists[targetListIndex].tasks.push({
        id: nanoid(),
        text
      })
      break;
    }

    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }

    case "MOVE_TASK": {
      const { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId } = action.payload;
      const sourceListIndex = findItemIndexById(draft.lists, sourceColumnId);
      const targetListIndex = findItemIndexById(draft.lists, targetColumnId);
      const dragIndex = findItemIndexById(draft.lists[sourceListIndex].tasks, draggedItemId);
      const hoverIndex = hoveredItemId
        ? findItemIndexById(draft.lists[targetListIndex].tasks, hoveredItemId)
        : 0;
      
      const item = draft.lists[sourceListIndex].tasks[dragIndex]; // This is the moved item.
      draft.lists[sourceListIndex].tasks.splice(dragIndex, 1); // Remove the task from the source list.
      draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item); // Add the task to the target list.
      break;
    }

    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }

    default: {
      break;
    }
  }
}

export type Task = {
  id: string;
  text: string;
}

export type List = {
  id: string;
  text: string;
  tasks: Task[];
}

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
}