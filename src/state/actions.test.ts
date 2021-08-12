import { addTask, addList, moveList, Action } from './actions';

describe('Action Creators', () => {
  it('creates an add task action', () => {
    const [taskName, taskId] = ["Task", "1"];
    const action: Action = addTask(taskName, taskId);
    expect(action.type).toEqual("ADD_TASK");
    expect(action.payload).toEqual({ text: taskName, listId: taskId })
  });

  it('creates an add list action', () => {
    const listName = "This is a list";
    const action: Action = addList(listName);
    expect(action.type).toEqual("ADD_LIST");
    expect(action.payload).toEqual(listName);
  });

  it('creates a move list action', () => {
    const action: Action = moveList("3", "1");
    expect(action.type).toEqual("MOVE_LIST");
    expect(action.payload).toEqual({ draggedId: "3", hoverId: "1" });
  })
})