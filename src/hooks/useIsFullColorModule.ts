import { useMemo } from 'react'
import { fullColorModulesTypesList } from '@/consts'
import { useQueryModuleInfo } from '@/query'

/**
 * Текущий модуль - полноцветный
 */
const useIsFullColorModule = () => {
  const { data: moduleInfo } = useQueryModuleInfo()

  return useMemo(
    () => (!moduleInfo ? false : fullColorModulesTypesList.includes(moduleInfo?.typeId)),
    [moduleInfo]
  )
}

export default useIsFullColorModule
