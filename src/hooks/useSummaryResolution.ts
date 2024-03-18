import { useQueryModuleInfo } from '@/query'
import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'

const useSummaryResolution = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()

  return useMemo(() => {
    if (!moduleInfo) return 0

    const summaryLedsWidth = moduleInfo.ledsInWidth * modulesInWidth
    const summaryLedsHeight = moduleInfo.ledsInHeight * modulesInHeight

    return summaryLedsWidth * summaryLedsHeight
  }, [moduleInfo, modulesInHeight, modulesInWidth])
}

export default useSummaryResolution
