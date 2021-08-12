// Action creators:

export const addTask = (text: string, listId: string): Action => {
  return { 
    type: "ADD_TASK", 
    payload: { text, listId }
  }
}

export const addList = (text: string): Action => {
  return {
    type: "ADD_LIST",
    payload: text
  }
}

export const moveList = (draggedId: string, hoverId: string): Action => {
  return {
    type: "MOVE_LIST",
    payload: { draggedId, hoverId }
  }
}

interface AddListAction {
  type: "ADD_LIST";
  payload: string;
}

interface AddTaskAction {
  type: "ADD_TASK";
  payload: { text: string; listId: string }
}

interface MoveListAction {
  type: "MOVE_LIST";
  payload: { draggedId: string, hoverId: string }
}

export type Action = AddListAction | AddTaskAction | MoveListAction; // will resolve to one of these types