import { useMemo } from 'react'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// процент
const reserve = 20
// потребление одного модуля
const onePowerUnitConsumption = 200

// Количество блоков питания для суммарного потрелебления всех модулей
const usePowerUnitAmount = (consumption: number): number => {
  const fullConsumption = consumption + consumption * (reserve / 100)

  return useMemo(
    () => (consumption > 0 ? roundToLargerInt(fullConsumption / onePowerUnitConsumption) : 0),
    [fullConsumption, consumption]
  )
}

export default usePowerUnitAmount
