import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import { CabinetImplementationsList } from '@/consts'

/**
 * Выбран один из типов кабинета
 */
const useIsCabinetImplementation = () => {
  const { implementationType } = useContext(StoreContext)

  return useMemo(
    () => CabinetImplementationsList.includes(implementationType),
    [implementationType]
  )
}

export default useIsCabinetImplementation
