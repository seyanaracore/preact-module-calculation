import { useContext, useMemo } from 'react'
import type { CartItem as ICartItem } from '@/components/CartResult/types'
import { StoreContext } from '@/context'
import {
  useCabinetsAmount,
  useGalvanizationAmount,
  useMagnetsAmount,
  useModulesTotalAmount,
  usePowerUnitAmount,
  useProfileAmount,
  useReceivingCardAmount,
  useTotalConsumption,
} from '@/hooks/useAmounts'
import useProfileTotalPrice from '@/hooks/useProfileTotalPrice'
import useGalvanizationTotalPrice from '@/hooks/useGalvanizationTotalPrice'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'

const getLoadingState = (title: string) => ({
  title,
  isLoading: true as const,
})

export const useCartState = () => {
  const {
    moduleInfo,
    powerUnit,
    corner,
    controller,
    receivingCard,
    profile,
    galvanization,
    magnet,
    cabinet,
  } = useContext(StoreContext)

  const modulesTotalAmount = useModulesTotalAmount()
  const totalConsumption = useTotalConsumption()
  const profileAmount = useProfileAmount()
  const magnetsAmount = useMagnetsAmount()
  const galvanizationAmount = useGalvanizationAmount()
  const powerUnitsAmount = usePowerUnitAmount(totalConsumption)
  const receivingCardAmount = useReceivingCardAmount()
  const cabinetsAmount = useCabinetsAmount()
  const totalProfilePrice = useProfileTotalPrice()
  const totalGalvanizationPrice = useGalvanizationTotalPrice()
  const isCabinetImplementation = useIsCabinetImplementation()

  return useMemo<Array<ICartItem | undefined>>(() => {
    const totalModulePrice = !moduleInfo ? 0 : moduleInfo.price * modulesTotalAmount
    const totalPowerUnitPrice = !powerUnit ? 0 : powerUnitsAmount * powerUnit.price

    const moduleState = !moduleInfo
      ? getLoadingState('Модуль')
      : {
          title: moduleInfo.name,
          name: moduleInfo.name,
          amount: modulesTotalAmount,
          unit: 'шт.',
          price: moduleInfo.price,
          totalPrice: totalModulePrice,
        }

    const powerUnitState = !powerUnit
      ? getLoadingState('Бл. пит.')
      : {
          title: `Бл. пит. ${powerUnit.name || ''}`,
          name: powerUnit.name || '',
          amount: powerUnitsAmount,
          unit: 'шт.',
          price: powerUnit.price || '',
          totalPrice: totalPowerUnitPrice,
        }

    const controllerState = !controller
      ? getLoadingState('Контроллер')
      : {
          title: `Контроллер ${controller.name}`,
          name: controller.name,
          price: controller.price,
          unit: 'шт.',
          amount: 1,
          totalPrice: controller.price,
        }

    const profileState = !profile
      ? getLoadingState('Профиль')
      : {
          title: profile.name,
          name: profile.name,
          unit: 'мм.',
          amount: profileAmount,
          totalPrice: totalProfilePrice,
        }

    const galvanizationState = !galvanization
      ? getLoadingState('Оцинковка')
      : {
          title: galvanization.name,
          name: galvanization.name,
          unit: 'мм.',
          amount: galvanizationAmount,
          totalPrice: totalGalvanizationPrice,
        }

    const cornerState = !corner
      ? getLoadingState('Уголок')
      : {
          title: corner.name,
          name: corner.name,
          unit: 'шт.',
          amount: 4,
          totalPrice: 4 * corner.price,
        }

    const magnetState = !magnet
      ? getLoadingState('Магнит')
      : {
          title: magnet.name,
          name: magnet.name,
          unit: 'шт.',
          amount: magnetsAmount,
          totalPrice: magnetsAmount * magnet.price,
        }

    const receivingCardState =
      receivingCard === null
        ? getLoadingState('Принимающая карта')
        : !receivingCard
          ? undefined
          : {
              title: `Принимающая карта ${receivingCard.name}`,
              unit: 'шт.',
              amount: receivingCardAmount,
              totalPrice: receivingCard.price * receivingCardAmount,
            }

    const cabinetState =
      cabinet === null
        ? getLoadingState('Кабинет')
        : !cabinet
          ? undefined
          : {
              title: cabinet.name,
              unit: 'шт.',
              amount: cabinetsAmount,
              totalPrice: cabinet.price * cabinetsAmount,
            }

    const monolithicImplementationCartState = [
      moduleState,
      powerUnitState,
      controllerState,
      profileState,
      galvanizationState,
      cornerState,
      magnetState,
      receivingCardState,
    ]

    if (isCabinetImplementation)
      return [moduleState, powerUnitState, controllerState, cabinetState, receivingCardState]

    return monolithicImplementationCartState
  }, [
    moduleInfo,
    modulesTotalAmount,
    powerUnit,
    powerUnitsAmount,
    controller,
    profile,
    profileAmount,
    totalProfilePrice,
    galvanization,
    galvanizationAmount,
    totalGalvanizationPrice,
    corner,
    magnet,
    magnetsAmount,
    receivingCard,
    receivingCardAmount,
    cabinet,
    cabinetsAmount,
    isCabinetImplementation,
  ])
}

export default useCartState
