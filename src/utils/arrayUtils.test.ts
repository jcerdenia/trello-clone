import { findItemIndexById, removeItemAtIndex, insertItemAtIndex, moveItem } from './arrayUtils';

describe('Array Utils', () => {
  it('finds the index of an item in the list by its ID', () => {
    const list = [{ id: "6", name: "Dogs" }, { id: "3", name: "Cats" }, { id: "9", name: "Mice" }];
    expect(findItemIndexById(list, "3")).toEqual(1);
    expect(findItemIndexById(list, "6")).toEqual(0);
    expect(findItemIndexById(list, "9")).toEqual(2);
  });

  it('removes an array item at a given index', () => {
    const list = ["Cats", "Dogs", "Mice"];
    const newList = removeItemAtIndex(list, 1);
    expect(newList).toEqual(["Cats", "Mice"]);
    expect(removeItemAtIndex(newList, 0)).toEqual(["Mice"]);
  });

  it('inserts an item in an array at the given index', () => {
    const list = ["Cats", "Dogs", "Mice"];
    expect(insertItemAtIndex(list, "Horses", 2)).toEqual(["Cats", "Dogs", "Horses", "Mice"]);
    expect(insertItemAtIndex(list, "Kangaroos", 0)).toEqual(["Kangaroos", "Cats", "Dogs", "Mice"]);
  });

  it('moves an array item from one index to another', () => {
    const list = ["Dogs", "Cats", "Horses", "Mice", "Penguins"];
    expect(moveItem(list, 0, 3)).toEqual(["Cats", "Horses", "Mice", "Dogs", "Penguins"]);
    expect(moveItem(list, 3, 1)).toEqual(["Dogs", "Mice", "Cats", "Horses", "Penguins"]);
  });
})