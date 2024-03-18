import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { cabinetImplementationsList } from '@/consts'

/**
 * Выбран один из типов кабинета
 */
const useIsCabinetImplementation = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(
    () => cabinetImplementationsList.includes(implementationType),
    [implementationType]
  )
}

export default useIsCabinetImplementation
