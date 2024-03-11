import { createContext } from 'preact'
import {
  ControllerItem,
  CornerItem,
  GalvanizationItem,
  MagnetItem,
  ModuleItem,
  ModulesListItem,
  ModuleTypeItem,
  ModuleTypeItemById,
  PowerUnitItem,
  ProfileItem,
  ReceivingItem,
} from '@/types'
import { ReactNode, useState } from 'react'
import { StateUpdater } from 'preact/hooks'

type UseState<S> = [S, StateUpdater<S>]

type States = {
  modulesList: UseState<ModulesListItem[]>
  moduleInfo: UseState<ModuleItem | undefined>
  controller: UseState<ControllerItem | undefined>
  profile: UseState<ProfileItem | undefined>
  galvanization: UseState<GalvanizationItem | undefined>
  powerUnit: UseState<PowerUnitItem | undefined>
  corner: UseState<CornerItem | undefined>
  magnet: UseState<MagnetItem | undefined>
  moduleTypes: UseState<ModuleTypeItemById | undefined>
  receivingCard: UseState<ReceivingItem | undefined | null>

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
  const [moduleInfo, setModuleInfo] = useState<ModuleItem>()
  const [modulesInWidth, setModulesInWidth] = useState(1)
  const [modulesInHeight, setModulesInHeight] = useState(1)
  const [controller, setController] = useState<ControllerItem>()
  const [modulesList, setModulesList] = useState<ModulesListItem[]>([])
  const [profile, setProfile] = useState<ProfileItem>()
  const [galvanization, setGalvanization] = useState<GalvanizationItem>()
  const [powerUnit, setPowerUnit] = useState<PowerUnitItem>()
  const [corner, setCorner] = useState<CornerItem>()
  const [magnet, setMagnet] = useState<MagnetItem>()
  const [moduleTypes, setModuleTypes] = useState<ModuleTypeItemById>()
  const [receivingCard, setReceivingCard] = useState<ReceivingItem | null>()

  const storeValue: Store = {
    moduleId,
    setModuleId,
    moduleInfo,
    setModuleInfo,
    modulesInWidth,
    setModulesInWidth,
    modulesInHeight,
    setModulesInHeight,
    controller,
    setController,
    modulesList,
    setModulesList,
    profile,
    setProfile,
    galvanization,
    setGalvanization,
    powerUnit,
    setPowerUnit,
    corner,
    setCorner,
    moduleTypes,
    setModuleTypes,
    receivingCard,
    setReceivingCard,
    magnet,
    setMagnet,
  }

  return <StoreContext.Provider value={storeValue}>{children}</StoreContext.Provider>
}
