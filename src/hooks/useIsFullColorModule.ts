import { useMemo } from 'react'
import { FullColorModulesTypesList } from '@/consts'
import { useQueryModuleInfo } from '@/query'

/**
 * Текущий модуль - полноцветный
 */
const useIsFullColorModule = () => {
  const { data: moduleInfo } = useQueryModuleInfo()

  return useMemo(
    () => (!moduleInfo ? false : FullColorModulesTypesList.includes(moduleInfo?.typeId)),
    [moduleInfo]
  )
}

export default useIsFullColorModule
