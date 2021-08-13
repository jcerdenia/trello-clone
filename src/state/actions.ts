import { DragItem } from '../DragItem';

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

export const moveTask = (
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Action => {
  return {
    type: "MOVE_TASK",
    payload: { draggedItemId, hoveredItemId, sourceColumnId, targetColumnId }
  }
}

export const setDraggedItem = (draggedItem: DragItem | null): Action => {
  return {
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem
  }
} 

// Action types:

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

interface MoveTaskAction {
  type: "MOVE_TASK";
  payload: { 
    draggedItemId: string;
    hoveredItemId: string | null;
    sourceColumnId: string;
    targetColumnId: string;
  }
}

interface SetDraggedItemAction {
  type: "SET_DRAGGED_ITEM";
  payload: DragItem | null
}

 // type Action will resolve to one of the given types:
export type Action = AddListAction | AddTaskAction | MoveListAction | MoveTaskAction | SetDraggedItemAction;