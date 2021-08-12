import { createContext, useContext, FC, Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { Task, List, AppState, appStateReducer } from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, appData);
  const { draggedItem, lists } = state;
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  }

  return (
    <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export const useAppState = () => {
  return useContext(AppStateContext);
}

// Dummy data representing initial state:
const appData: AppState = {
  lists: [
    {
      id: "0",
      text: "To Do",
      tasks: [{ id: "c0", text: "Generate app scaffold" }]
    },
    {
      id: "1",
      text: "In Progress",
      tasks: [{ id: "c1", text: "Learn TypeScript" }]
    },
    {
      id: "2",
      text: "Done",
      tasks: [{ id: "c2", text: "Begin to use static typing" }]
    }
  ],
  draggedItem: null
}