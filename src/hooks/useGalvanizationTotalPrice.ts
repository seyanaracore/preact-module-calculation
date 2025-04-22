import { useMemo } from 'react'
import { useGalvanizationAmount } from '@/hooks/useAmounts'
import roundToLargerInt from '@/helpers/roundToLargerInt'
import { useQueryGalvanization } from '@/query'

// мм
const galvanizationUnitLen = 3000

/**
 * Суммарная стоимость оцинковки
 */
const useGalvanizationTotalPrice = () => {
  const { data: galvanization } = useQueryGalvanization()
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
