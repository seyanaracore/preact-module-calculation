import DBItem from './dbItem'

export type DBItemWithLink = DBItem & { link: string }
export type ModulesListItem = Pick<DBItem, 'name' | 'id' | 'parent-id'>
