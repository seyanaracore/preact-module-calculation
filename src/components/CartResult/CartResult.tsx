import cls from './styles.module.scss'
import { useContext, useEffect, useMemo } from 'react'
import usePowerUnitAmount from '@/hooks/usePowerUnitAmount'
import CartItem from './CartItem'
import type { CartItem as ICartItem } from './types'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import useFetching from '@/hooks/useFetching'
import ScreenService from '@/services/screenService'
import { ModuleTypeId } from '@/api/enums'

const CartResult = () => {
  const {
    powerUnit,
    corner,
    galvanization,
    profile,
    controller,
    modulesInHeight,
    modulesInWidth,
    moduleInfo,
    moduleId,
    setController,
  } = useContext(StoreContext)

  const { fetching: getController, isError: getControllerIsError } = useFetching(
    async (payload: Parameters<typeof ScreenService.getController>[0]) => {
      setController(undefined)

      const res = await ScreenService.getController(payload)

      setController(res)
    }
  )

  useEffect(() => {
    if (!moduleId) return

    getController({
      moduleId,
      modulesInWidth,
      modulesInHeight,
    })
  }, [moduleId, modulesInWidth, modulesInHeight])

  useEffect(() => {
    if (getControllerIsError) console.error(getControllerIsError)
  }, [getControllerIsError])

  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()

  const modulesTotalAmount = useMemo(
    () => modulesInWidth * modulesInHeight,
    [modulesInHeight, modulesInWidth]
  )

  const totalConsumption = useMemo(
    () => (!moduleInfo ? 0 : moduleInfo.consumption * modulesTotalAmount),
    [moduleInfo, modulesTotalAmount]
  )

  const profileAmount = useMemo(
    () => Math.ceil(modulesSummaryWidth * 2 + modulesSummaryHeight * 2),
    [modulesSummaryWidth, modulesSummaryHeight]
  )

  const magnetsAmount = useMemo(() => modulesTotalAmount * 4, [modulesTotalAmount])

  const galvanizationAmount = useMemo(
    () => Math.ceil(modulesSummaryHeight * modulesInWidth + modulesSummaryHeight),
    [modulesSummaryHeight, modulesInWidth]
  )

  const powerUnitsAmount = usePowerUnitAmount(totalConsumption)

  const isFullColorModule = useMemo(
    () =>
      !moduleInfo
        ? false
        : [ModuleTypeId.outdoor, ModuleTypeId.interior].includes(moduleInfo?.typeId),
    [moduleInfo]
  )

  const receivingCardAmount = useMemo(() => {
    // ((общее количество точек по ширине*количество модулей по ширине)/256)*((общее количество точек по высоте*количество модулей по высоте)/256)
    if (!moduleInfo) return 0

    return Math.ceil(
      ((moduleInfo.ledsInHeight * modulesInHeight) / 256) *
        ((moduleInfo.ledsInWidth * modulesInWidth) / 256)
    )
  }, [moduleInfo, modulesInHeight, modulesInWidth])

  const cartInfo = useMemo<Record<string, ICartItem | undefined>>(() => {
    const totalModulePrice = !moduleInfo ? 0 : moduleInfo.price * modulesTotalAmount
    const totalPowerUnitPrice = !powerUnit ? 0 : powerUnitsAmount * powerUnit.price

    return {
      module: {
        title: moduleInfo?.name || '',
        name: moduleInfo?.name || '',
        amount: modulesTotalAmount,
        unit: 'шт.',
        price: moduleInfo?.price || '',
        totalPrice: totalModulePrice,
      },
      powerUnit: {
        title: `Бл. пит. ${powerUnit?.name || ''}`,
        name: powerUnit?.name || '',
        amount: powerUnitsAmount,
        unit: 'шт.',
        price: powerUnit?.price || '',
        totalPrice: totalPowerUnitPrice,
      },
      controller: !controller
        ? { title: 'Контроллер', isLoading: true }
        : {
            title: `Контроллер ${controller.name}`,
            name: controller.name,
            price: controller.price,
            unit: 'шт.',
            amount: 1,
            totalPrice: controller.price,
          },
      profile: {
        title: profile?.name || '',
        name: profile?.name || '',
        unit: 'мм.',
        amount: profileAmount,
      },
      galvanization: {
        title: galvanization?.name || '',
        name: galvanization?.name || '',
        unit: 'мм.',
        amount: galvanizationAmount,
      },
      corner: {
        title: corner?.name || '',
        name: corner?.name || '',
        unit: 'шт.',
        amount: 4,
      },
      magnet: {
        title: 'Магниты',
        name: 'Магниты',
        unit: 'шт.',
        amount: magnetsAmount,
      },
      receivingCard: isFullColorModule
        ? {
            title: 'Принимающая карта',
            unit: 'шт.',
            amount: receivingCardAmount,
            totalPrice: 2360 * receivingCardAmount,
          }
        : undefined,
    }
  }, [
    controller,
    corner,
    galvanization,
    profile,
    galvanizationAmount,
    magnetsAmount,
    moduleInfo,
    modulesTotalAmount,
    powerUnit,
    powerUnitsAmount,
    profileAmount,
  ])

  if (!moduleInfo) return <div>Загрузка...</div>

  return (
    <div class={cls.resultContainer}>
      <table class={['table', cls.table].join(' ')}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Название</th>
            <th scope="col">Кол-во</th>
            <th scope="col">Сумма</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(cartInfo).map((cartItem, idx) =>
            cartItem ? (
              <CartItem
                {...cartItem}
                idx={idx}
                key={idx}
              />
            ) : null
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CartResult
