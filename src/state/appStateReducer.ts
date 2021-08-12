import { Action } from './actions';
import { nanoid } from 'nanoid';
import { findItemIndexById } from '../utils/arrayUtils';

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
}

export const appStateReducer = (draft: AppState, action: Action): AppState | void => {
  // state is named draft, so we know we can mutate it.
  switch (action.type) {
    case "ADD_LIST": {
      /* Normally we would do it like this:
      return {
        ...state, // Use spread operator to get all fields from previous state.
        lists: [ // Then set lists field to be a new array
          ...state.lists, // including the old list
          { id: nanoid(), text: action.payload, tasks: [] } // plus the new item
        ]
      } */
      // But ImmerJS lets us mutate an object, and it will create a new object instance from it.
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

    default: {
      break;
    }
  }
}