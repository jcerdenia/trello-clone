interface AddListAction  {
  type: "ADD_LIST";
  payload: string;
}

interface AddTaskAction {
  type: "ADD_TASK";
  payload: { text: string; listId: string }
}

export type Action = AddListAction | AddTaskAction // will resolve to one of these types

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