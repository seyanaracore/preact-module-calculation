import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import roundToLargerInt from '@/helpers/roundToLargerInt'

export { default as useReceivingCardAmount } from './useReceivingCardAmount'
export { default as usePowerUnitAmount } from './usePowerUnitAmount'

export const useModulesTotalAmount = () => {
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)

  return useMemo(() => modulesInWidth * modulesInHeight, [modulesInHeight, modulesInWidth])
}

export const useTotalConsumption = () => {
  const modulesTotalAmount = useModulesTotalAmount()
  const { moduleInfo } = useContext(StoreContext)

  return useMemo(
    () => (!moduleInfo ? 0 : moduleInfo.consumption * modulesTotalAmount),
    [moduleInfo, modulesTotalAmount]
  )
}

export const useProfileAmount = () => {
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()

  return useMemo(
    () => roundToLargerInt(modulesSummaryWidth * 2 + modulesSummaryHeight * 2),
    [modulesSummaryWidth, modulesSummaryHeight]
  )
}

export const useMagnetsAmount = () => {
  const modulesTotalAmount = useModulesTotalAmount()

  return useMemo(() => modulesTotalAmount * 4, [modulesTotalAmount])
}

export const useGalvanizationAmount = () => {
  const { modulesSummaryHeight } = useModulesSizes()
  const { modulesInWidth } = useContext(StoreContext)

  return useMemo(
    () => roundToLargerInt(modulesSummaryHeight * modulesInWidth + modulesSummaryHeight),
    [modulesSummaryHeight, modulesInWidth]
  )
}
