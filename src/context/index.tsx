import { createContext } from 'preact'
import { type Table } from '@/types'
import { type ReactNode, useState } from 'react'
import { ModuleImplementationType } from '@/enums'
import useUrlState, { type UseUrlStateReturn } from '@/hooks/useUrlState'

type UseState<S> = UseUrlStateReturn<S>

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
  const [moduleId, setModuleId] = useUrlState('module-id', '')

  const [modulesInWidth, setModulesInWidth] = useUrlState('modules-in-width', 1, {
    parse: (value) => parseInt(value, 10),
  })

  const [modulesInHeight, setModulesInHeight] = useUrlState('modules-in-height', 1, {
    parse: (value) => parseInt(value, 10),
  })

  const [table, setTable] = useState<Table | null>(null)

  const [implementationType, setImplementationType] = useUrlState<ModuleImplementationType>(
    'implementation-type',
    ModuleImplementationType.Monolithic,
    {
      parse: (value) => parseInt(value, 10),
    }
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
