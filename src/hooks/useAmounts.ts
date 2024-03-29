import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import roundToLargerInt from '@/helpers/roundToLargerInt'
import {
  useHeightModuleMultiplicity,
  useWidthModuleMultiplicity,
} from '@/hooks/useCabinetMultiplicity'
import { useQueryModuleInfo } from '@/query'

export { default as useReceivingCardAmount } from './useReceivingCardAmount'
export { default as usePowerUnitAmount } from './usePowerUnitAmount'

/**
 * Суммарное кол-во модулей
 */
export const useModulesTotalAmount = () => {
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)

  return useMemo(() => modulesInWidth * modulesInHeight, [modulesInHeight, modulesInWidth])
}

/**
 * Суммарное потребление из кол-ва модулей
 */
export const useTotalConsumption = () => {
  const modulesTotalAmount = useModulesTotalAmount()
  const { data: moduleInfo } = useQueryModuleInfo()

  return useMemo(
    () => (!moduleInfo ? 0 : moduleInfo.consumption * modulesTotalAmount),
    [moduleInfo, modulesTotalAmount]
  )
}

/**
 * Количество профиля
 */
export const useProfileAmount = () => {
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()

  return useMemo(
    () => roundToLargerInt(modulesSummaryWidth * 2 + modulesSummaryHeight * 2),
    [modulesSummaryWidth, modulesSummaryHeight]
  )
}

/**
 * Количество магнитов
 */
export const useMagnetsAmount = () => {
  const modulesTotalAmount = useModulesTotalAmount()

  return useMemo(() => modulesTotalAmount * 4, [modulesTotalAmount])
}

/**
 * Количество оцинковки
 */
export const useGalvanizationAmount = () => {
  const { modulesSummaryHeight } = useModulesSizes()
  const { modulesInWidth } = useContext(StoreContext)

  return useMemo(
    () => roundToLargerInt(modulesSummaryHeight * modulesInWidth + modulesSummaryHeight),
    [modulesSummaryHeight, modulesInWidth]
  )
}

/**
 * Количество кабинетов в ширину
 */
export const useCabinetsInWidthAmount = () => {
  const { modulesInWidth } = useContext(StoreContext)
  const widthAmountInputMultiplicity = useWidthModuleMultiplicity()

  return useMemo(
    () => modulesInWidth / widthAmountInputMultiplicity,
    [modulesInWidth, widthAmountInputMultiplicity]
  )
}

/**
 * Количество кабинетов в высоту
 */
export const useCabinetsInHeightAmount = () => {
  const { modulesInHeight } = useContext(StoreContext)
  const heightAmountInputMultiplicity = useHeightModuleMultiplicity()

  return useMemo(
    () => modulesInHeight / heightAmountInputMultiplicity,
    [modulesInHeight, heightAmountInputMultiplicity]
  )
}

/**
 * Количество кабинетов
 */
export const useCabinetsAmount = () => {
  const cabinetsInWidth = useCabinetsInWidthAmount()
  const cabinetsInHeight = useCabinetsInHeightAmount()

  return useMemo(() => cabinetsInWidth * cabinetsInHeight, [cabinetsInHeight, cabinetsInWidth])
}
