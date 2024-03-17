import { createContext } from 'preact'
import { Table } from '@/types'
import { ReactNode, useState } from 'react'
import { StateUpdater } from 'preact/hooks'
import { ModuleImplementationType } from '@/enums'

type UseState<S> = [S, StateUpdater<S>]

type States = {
  implementationType: UseState<ModuleImplementationType>
  table: UseState<Table | null>

  modulesInWidth: UseState<number>
  modulesInHeight: UseState<number>
  moduleId: UseState<string>
}

export type StoreStates = {
  [key in keyof States]: States[key][0]
}

export type StoreSetters = {
  [key in keyof States as `set${Capitalize<key>}`]: States[key][1]
}

export type Store = StoreStates & StoreSetters

export const StoreContext = createContext<Store>({} as unknown as Store)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [moduleId, setModuleId] = useState<string>('')
  const [modulesInWidth, setModulesInWidth] = useState(1)
  const [modulesInHeight, setModulesInHeight] = useState(1)
  const [table, setTable] = useState<Table | null>(null)

  const [implementationType, setImplementationType] = useState<ModuleImplementationType>(
    ModuleImplementationType.Monolithic
  )

  const storeValue: Store = {
    moduleId,
    setModuleId,
    modulesInWidth,
    setModulesInWidth,
    modulesInHeight,
    setModulesInHeight,
    implementationType,
    setImplementationType,
    table,
    setTable,
  }

  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
}
