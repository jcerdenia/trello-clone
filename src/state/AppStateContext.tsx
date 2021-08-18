import { createContext, useContext, FC, Dispatch, ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';
import { Task, List, AppState, appStateReducer } from './appStateReducer';
import { Action } from './actions';
import { DragItem } from '../DragItem';
import { save } from '../api';
import { useEffect } from 'react';
import { withInitialState } from '../withInitialState';

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
}

type AppStateProviderProps = {
  children: ReactNode,
  initialState: AppState
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
  const { draggedItem, lists } = state;
  
  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  }

  useEffect(() => {
    if (draggedItem === null) {
      save(state); // When state is changed (except when dragging), save to API.
    }
  }, [state]);
  
  return (
    <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
});

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