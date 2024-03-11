import { useContext, useMemo } from 'react'
import { ModuleTypeId } from '@/api/enums'
import { StoreContext } from '@/context'

export const FullColorModulesTypes = [ModuleTypeId.outdoor, ModuleTypeId.interior]

const useIsFullColorModule = () => {
  const { moduleInfo } = useContext(StoreContext)

  return useMemo(
    () => (!moduleInfo ? false : FullColorModulesTypes.includes(moduleInfo?.typeId)),
    [moduleInfo]
  )
}

export default useIsFullColorModule
