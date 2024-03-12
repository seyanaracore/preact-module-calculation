import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import roundToLargerInt from '@/helpers/roundToLargerInt'

// Количество принимающих карта
const useReceivingCardAmount = () => {
  const { moduleInfo, modulesInHeight, modulesInWidth, receivingCard } = useContext(StoreContext)

  return useMemo(() => {
    // ((количество светодиодов одного модуля по ширине*количество модулей в ширину)/256)*((количество светодиодов по высоте*количество модулей в высоту)/256)
    if (!moduleInfo || !receivingCard) return 0

    //((40*12)/256))*((20*10)/256)=1.87*0,78 = 1.45 = 2

    return roundToLargerInt(
      ((moduleInfo.ledsInHeight * modulesInHeight) / 256) *
        ((moduleInfo.ledsInWidth * modulesInWidth) / 256)
    )
  }, [moduleInfo, modulesInHeight, modulesInWidth, receivingCard])
}

export default useReceivingCardAmount
