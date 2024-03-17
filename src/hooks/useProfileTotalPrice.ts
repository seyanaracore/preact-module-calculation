import { useProfileAmount } from '@/hooks/useAmounts'
import { useMemo } from 'react'
import roundToLargerInt from '@/helpers/roundToLargerInt'
import { useQueryProfile } from '@/query'

// мм
const profileUnitLen = 5800

// Суммарная стоимость профиля
const useProfileTotalPrice = () => {
  const { data: profile } = useQueryProfile()
  // кол-во мм
  const profileAmount = useProfileAmount()

  return useMemo(() => {
    if (!profile || !profileAmount) return 0

    // Цена за метр
    const pricePerUnit = roundToLargerInt(profile.price * (profileUnitLen / 1000))
    // Кол-во метров
    const profileUnitsAmount = roundToLargerInt(profileAmount / profileUnitLen)

    return profileUnitsAmount * pricePerUnit
  }, [profileAmount, profile])
}

export default useProfileTotalPrice
