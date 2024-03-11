import { useContext, useMemo } from 'react'
import type { CartItem as ICartItem } from '@/components/CartResult/types'
import { StoreContext } from '@/context'
import {
  useGalvanizationAmount,
  useMagnetsAmount,
  useModulesTotalAmount,
  usePowerUnitAmount,
  useProfileAmount,
  useReceivingCardAmount,
  useTotalConsumption,
} from '@/hooks/useAmounts'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import useProfileTotalPrice from '@/hooks/useProfileTotalPrice'
import useGalvanizationTotalPrice from '@/hooks/useGalvanizationTotalPrice'

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
  } = useContext(StoreContext)

  const modulesTotalAmount = useModulesTotalAmount()
  const totalConsumption = useTotalConsumption()
  const profileAmount = useProfileAmount()
  const magnetsAmount = useMagnetsAmount()
  const galvanizationAmount = useGalvanizationAmount()
  const powerUnitsAmount = usePowerUnitAmount(totalConsumption)
  const isFullColorModule = useIsFullColorModule()
  const receivingCardAmount = useReceivingCardAmount()
  const totalProfilePrice = useProfileTotalPrice()
  const totalGalvanizationPrice = useGalvanizationTotalPrice()

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
          amount: modulesTotalAmount * 4,
          totalPrice: modulesTotalAmount * 4 * magnet.price,
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

    return [
      moduleState,
      powerUnitState,
      controllerState,
      profileState,
      galvanizationState,
      cornerState,
      magnetState,
      receivingCardState,
    ]
  }, [
    controller,
    corner,
    galvanization,
    profile,
    galvanizationAmount,
    moduleInfo,
    modulesTotalAmount,
    powerUnit,
    powerUnitsAmount,
    profileAmount,
    receivingCard,
    totalProfilePrice,
    totalGalvanizationPrice,
    receivingCardAmount,
    magnet,
  ])
}

export default useCartState
