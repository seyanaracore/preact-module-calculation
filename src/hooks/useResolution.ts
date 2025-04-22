import { useContext, useMemo } from 'react'
import { useQueryModuleInfo } from '@/query'
import { StoreContext } from '@/context'

export const useWidthResolution = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth } = useContext(StoreContext)

  return useMemo(() => {
    if (!moduleInfo) return 0

    return moduleInfo.ledsInWidth * modulesInWidth
  }, [moduleInfo, modulesInWidth])
}

export const useHeightResolution = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInHeight } = useContext(StoreContext)

  return useMemo(() => {
    if (!moduleInfo) return 0

    return moduleInfo.ledsInHeight * modulesInHeight
  }, [moduleInfo, modulesInHeight])
}

export const useSummaryResolution = () => {
  const widthResolution = useWidthResolution()
  const heightResolution = useHeightResolution()

  return useMemo(() => {
    return widthResolution * heightResolution
  }, [widthResolution, heightResolution])
}
