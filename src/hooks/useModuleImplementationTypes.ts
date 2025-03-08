import { useContext, useMemo } from 'react'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import { ModuleImplementationType } from '@/enums'
import { useQueryModuleInfo } from '@/query'

/**
 * В каком исполнении может быть текущий модуль
 */
const useModuleImplementationTypes = () => {
  const isFullColorModule = useIsFullColorModule()
  const { data: moduleInfo, isLoading } = useQueryModuleInfo()

  const moduleImplementationTypes = useMemo(() => {
    if (isFullColorModule && moduleInfo?.width === 320 && moduleInfo?.height === 160) {
      return [ModuleImplementationType.Monolithic, ModuleImplementationType.Cabinet640x640]
    }

    return [ModuleImplementationType.Monolithic]
  }, [isFullColorModule, moduleInfo])

  return {
    moduleImplementationTypes,
    isLoading,
  }
}

export default useModuleImplementationTypes
