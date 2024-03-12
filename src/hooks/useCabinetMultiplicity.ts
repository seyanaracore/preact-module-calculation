import { useContext, useMemo } from 'react'
import { ModuleImplementationType } from '@/enums'
import { StoreContext } from '@/context'

/**
 * Кратность по ширине, в зависимости от типа исполнения
 * @example 1,2,3/2,4,8
 */
export const useWidthModuleMultiplicity = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(() => {
    if (implementationType === ModuleImplementationType.Cabinet640x640) {
      return 2
    }

    return 1
  }, [implementationType])
}

/**
 * Кратность по высоте, в зависимости от типа исполнения
 * @example 1,2,3/4,8,12
 */
export const useHeightModuleMultiplicity = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(() => {
    if (implementationType === ModuleImplementationType.Cabinet640x640) {
      return 4
    }

    return 1
  }, [implementationType])
}
