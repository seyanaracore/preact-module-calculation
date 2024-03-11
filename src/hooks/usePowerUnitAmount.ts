import { useMemo } from 'react'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// percent
const reserve = 20
const onePowerUnitConsumption = 200

const usePowerUnitAmount = (consumption: number): number => {
  const fullConsumption = consumption + consumption * (reserve / 100)

  return useMemo(
    () => (consumption > 0 ? roundToLargerInt(fullConsumption / onePowerUnitConsumption) : 0),
    [fullConsumption, consumption]
  )
}

export default usePowerUnitAmount
