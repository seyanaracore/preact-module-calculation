import { useGalvanizationAmount } from '@/hooks/useAmounts'
import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// мм
const galvanizationUnitLen = 3000

/**
 * Суммарная стоимость оцинковки
 */
const useGalvanizationTotalPrice = () => {
  const { galvanization } = useContext(StoreContext)
  // кол-во мм
  const galvanizationAmount = useGalvanizationAmount()

  return useMemo(() => {
    if (!galvanization || !galvanizationAmount) return 0

    // Цена за метр
    const pricePerUnit = roundToLargerInt(galvanization.price * (galvanizationUnitLen / 1000))
    // Кол-во метров
    const profileUnitsAmount = roundToLargerInt(galvanizationAmount / galvanizationUnitLen)

    return profileUnitsAmount * pricePerUnit
  }, [galvanizationAmount, galvanization])
}

export default useGalvanizationTotalPrice
