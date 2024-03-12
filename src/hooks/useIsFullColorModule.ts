import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { FullColorModulesTypesList } from '@/consts'

/**
 * Текущий модуль - полноцветный
 */
const useIsFullColorModule = () => {
  const { moduleInfo } = useContext(StoreContext)

  return useMemo(
    () => (!moduleInfo ? false : FullColorModulesTypesList.includes(moduleInfo?.typeId)),
    [moduleInfo]
  )
}

export default useIsFullColorModule
