import { useGalvanizationAmount } from '@/hooks/useAmounts'
import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// mm
const galvanizationUnitLen = 3000

const useGalvanizationTotalPrice = () => {
  const { galvanization } = useContext(StoreContext)
  // mm amount
  const galvanizationAmount = useGalvanizationAmount()

  return useMemo(() => {
    if (!galvanization || !galvanizationAmount) return 0

    const pricePerUnit = roundToLargerInt(galvanization.price * (galvanizationUnitLen / 1000))
    const profileUnitsAmount = roundToLargerInt(galvanizationAmount / galvanizationUnitLen)

    return profileUnitsAmount * pricePerUnit
  }, [galvanizationAmount, galvanization])
}

export default useGalvanizationTotalPrice
