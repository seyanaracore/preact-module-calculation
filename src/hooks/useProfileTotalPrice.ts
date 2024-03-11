import { useProfileAmount } from '@/hooks/useAmounts'
import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// mm
const profileUnitLen = 5800

const useProfileTotalPrice = () => {
  const { profile } = useContext(StoreContext)
  // mm amount
  const profileAmount = useProfileAmount()

  return useMemo(() => {
    if (!profile || !profileAmount) return 0

    const pricePerUnit = roundToLargerInt(profile.price * (profileUnitLen / 1000))
    const profileUnitsAmount = roundToLargerInt(profileAmount / profileUnitLen)

    return profileUnitsAmount * pricePerUnit
  }, [profileAmount, profile])
}

export default useProfileTotalPrice
