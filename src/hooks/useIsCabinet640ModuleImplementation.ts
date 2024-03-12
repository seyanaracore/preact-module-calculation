import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { ModuleImplementationType } from '@/enums'

export const useIsCabinet640ModuleImplementation = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(
    () => implementationType === ModuleImplementationType.Cabinet640x640,
    [implementationType]
  )
}
