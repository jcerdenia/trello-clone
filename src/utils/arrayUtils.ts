type Item = {
  id: string
}

// Accept any array of objects that have the field id: string
export const findItemIndexById = <TItem extends Item>(
  items: TItem[], // enforce id: string field on each item
  id: string // id that will be used for lookup
) => {
  return items.findIndex((item: TItem) => item.id === id);
}