import { useContext, useMemo } from 'react'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import { ModuleImplementationType } from '@/enums'
import { StoreContext } from '@/context'

const useModuleImplementationTypes = () => {
  const isFullColorModule = useIsFullColorModule()
  const { moduleInfo } = useContext(StoreContext)

  return useMemo(() => {
    if (isFullColorModule && moduleInfo?.width === 320 && moduleInfo?.height === 160)
      return [ModuleImplementationType.Monolithic, ModuleImplementationType.Cabinet640x640]
    return [ModuleImplementationType.Monolithic]
  }, [isFullColorModule, moduleInfo])
}

export default useModuleImplementationTypes
