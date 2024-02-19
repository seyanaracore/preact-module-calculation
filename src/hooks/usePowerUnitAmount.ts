import { useMemo } from 'react'

// percent
const reserve = 20
const onePowerUnitConsumption = 200

const usePowerUnitAmount = (consumption: number): number => {
  const fullConsumption = consumption + consumption * (reserve / 100)

  return useMemo(
    () => (consumption > 0 ? Math.ceil(fullConsumption / onePowerUnitConsumption) : 0),
    [fullConsumption, consumption]
  )
}

export default usePowerUnitAmount
