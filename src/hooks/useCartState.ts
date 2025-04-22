import { useMemo } from 'react'
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
import {
  useQueryCabinet,
  useQueryController,
  useQueryCorner,
  useQueryGalvanization,
  useQueryMagnet,
  useQueryModuleInfo,
  useQueryPowerUnit,
  useQueryProfile,
  useQueryReceivingCart,
} from '@/query'
import type { CartItem as ICartItem } from '@/components/CalculatorTable/types'

const getLoadingState = (title: string) => ({
  title,
  isLoading: true as const,
})

export const useCartState = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { data: powerUnit } = useQueryPowerUnit()
  const { data: corner } = useQueryCorner()
  const { data: controller } = useQueryController()
  const { data: receivingCard } = useQueryReceivingCart()
  const { data: profile } = useQueryProfile()
  const { data: galvanization } = useQueryGalvanization()
  const { data: magnet } = useQueryMagnet()
  const { data: cabinet } = useQueryCabinet()
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

  return useMemo<ICartItem[]>(() => {
    const totalModulePrice = !moduleInfo ? 0 : moduleInfo.price * modulesTotalAmount
    const totalPowerUnitPrice = !powerUnit ? 0 : powerUnitsAmount * powerUnit.price

    const moduleState: ICartItem = !moduleInfo
      ? getLoadingState('Модуль')
      : {
          title: moduleInfo.name,
          link: moduleInfo.link,
          amount: modulesTotalAmount,
          id: moduleInfo.id,
          unit: 'шт.',
          price: moduleInfo.price,
          totalPrice: totalModulePrice,
        }

    const powerUnitState: ICartItem = !powerUnit
      ? getLoadingState('Бл. пит.')
      : {
          title: powerUnit.name,
          link: powerUnit.link,
          id: powerUnit.id,
          amount: powerUnitsAmount,
          unit: 'шт.',
          price: powerUnit.price,
          totalPrice: totalPowerUnitPrice,
        }

    const controllerState: ICartItem = !controller
      ? getLoadingState('Контроллер')
      : {
          title: `Контроллер ${controller.name}`,
          price: controller.price,
          link: controller.link,
          unit: 'шт.',
          id: controller.id,
          amount: 1,
          totalPrice: controller.price,
        }

    const profileState: ICartItem = !profile
      ? getLoadingState('Профиль')
      : {
          title: profile.name,
          link: profile.link,
          id: profile.id,
          unit: 'мм.',
          amount: profileAmount,
          price: profile.price,
          totalPrice: totalProfilePrice,
        }

    const galvanizationState: ICartItem = !galvanization
      ? getLoadingState('Оцинковка')
      : {
          title: galvanization.name,
          link: galvanization.link,
          id: galvanization.id,
          unit: 'мм.',
          amount: galvanizationAmount,
          price: galvanization.price,
          totalPrice: totalGalvanizationPrice,
        }

    const cornerState: ICartItem = !corner
      ? getLoadingState('Уголок')
      : {
          title: corner.name,
          link: corner.link,
          price: corner.price,
          id: corner.id,
          unit: 'шт.',
          amount: 4,
          totalPrice: 4 * corner.price,
        }

    const magnetState: ICartItem = !magnet
      ? getLoadingState('Магнит')
      : {
          title: magnet.name,
          link: magnet.link,
          id: magnet.id,
          price: magnet.price,
          unit: 'шт.',
          amount: magnetsAmount,
          totalPrice: magnetsAmount * magnet.price,
        }

    const receivingCardState: ICartItem | undefined =
      receivingCard === null
        ? getLoadingState('Принимающая карта')
        : !receivingCard
          ? undefined
          : {
              title: `Принимающая карта ${receivingCard.name}`,
              unit: 'шт.',
              id: receivingCard.id,
              link: receivingCard.link,
              price: receivingCard.price,
              amount: receivingCardAmount,
              totalPrice: receivingCard.price * receivingCardAmount,
            }

    const cabinetState: ICartItem | undefined =
      cabinet === null
        ? getLoadingState('Кабинет')
        : !cabinet
          ? undefined
          : {
              title: cabinet.name,
              price: cabinet.price,
              link: cabinet.link,
              id: cabinet.id,
              unit: 'шт.',
              amount: cabinetsAmount,
              totalPrice: cabinet.price * cabinetsAmount,
            }

    const monolithicImplementationCartState = [
      moduleState,
      powerUnitState,
      controllerState,
      receivingCardState,
      profileState,
      galvanizationState,
      cornerState,
      magnetState,
    ]

    if (isCabinetImplementation)
      return [
        moduleState,
        powerUnitState,
        controllerState,
        receivingCardState,
        cabinetState,
      ].filter(Boolean)

    return monolithicImplementationCartState.filter(Boolean)
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
