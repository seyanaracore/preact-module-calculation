import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { CABINET_IMPLEMENTATION_LIST } from '@/consts'

/**
 * Выбран один из типов кабинета
 */
const useIsCabinetImplementation = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(
    () => CABINET_IMPLEMENTATION_LIST.includes(implementationType),
    [implementationType]
  )
}

export default useIsCabinetImplementation
