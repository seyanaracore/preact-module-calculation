import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'

const useModulesSizes = () => {
  const { moduleInfo, modulesInWidth, modulesInHeight } = useContext(StoreContext)

  const modulesSummaryWidth = useMemo(
    () => (!moduleInfo ? 0 : modulesInWidth * moduleInfo.width),
    [modulesInWidth, moduleInfo]
  )

  const modulesSummaryHeight = useMemo(
    () => (!moduleInfo ? 0 : modulesInHeight * moduleInfo.height),
    [modulesInHeight, moduleInfo]
  )

  return {
    modulesSummaryWidth,
    modulesSummaryHeight,
  }
}

export default useModulesSizes