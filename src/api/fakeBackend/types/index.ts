import type { DBItem, ModuleType } from '../db'

export type ModulesListItem = Pick<DBItem, 'name' | 'id' | 'parent-id'>
export type { ModuleType, DBItem }
