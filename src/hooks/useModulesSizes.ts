import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { useQueryModuleInfo } from '@/query'

const useModulesSizes = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)

  /**
   * Суммарная ширина модулей
   */
  const modulesSummaryWidth = useMemo(
    () => (!moduleInfo ? 0 : modulesInWidth * moduleInfo.width),
    [modulesInWidth, moduleInfo]
  )

  /**
   * Суммарная высота модулей
   */
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
