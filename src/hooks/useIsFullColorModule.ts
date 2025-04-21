import { useMemo } from 'react'
import { FULL_COLOR_MODULES_TYPES_LIST } from '@/consts'
import { useQueryModuleInfo } from '@/query'

/**
 * Текущий модуль - полноцветный
 */
const useIsFullColorModule = () => {
  const { data: moduleInfo } = useQueryModuleInfo()

  return useMemo(
    () => (!moduleInfo ? false : FULL_COLOR_MODULES_TYPES_LIST.includes(moduleInfo?.typeId)),
    [moduleInfo]
  )
}

export default useIsFullColorModule
