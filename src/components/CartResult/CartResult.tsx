import cls from './styles.module.scss'
import { useMemo } from 'react'
import {
  ControllerItem,
  CornerItem,
  GalvanizationItem,
  ModuleItem,
  PowerUnitItem,
  ProfileItem,
} from '@/types'
import usePowerUnitAmount from '@/hooks/usePowerUnitAmount'
import CartItem from './CartItem'
import type { CartItem as ICartItem } from './types'

type CartResultProps = {
  controller?: ControllerItem
  galvanization: GalvanizationItem
  moduleInfo: ModuleItem
  powerUnit: PowerUnitItem
  profile: ProfileItem
  corner: CornerItem
  modulesInWidth: number
  modulesInHeight: number
}

const CartResult = ({
  controller,
  galvanization,
  moduleInfo,
  powerUnit,
  profile,
  corner,
  modulesInWidth,
  modulesInHeight,
}: CartResultProps) => {
  const modulesTotalAmount = useMemo(
    () => modulesInWidth + modulesInHeight,
    [modulesInHeight, modulesInWidth]
  )

  const modulesSummaryWidth = useMemo(
    () => (!moduleInfo ? 0 : modulesInWidth * moduleInfo.width),
    [modulesInWidth, moduleInfo]
  )

  const modulesSummaryHeight = useMemo(
    () => (!moduleInfo ? 0 : modulesInHeight * moduleInfo.height),
    [modulesInHeight, moduleInfo]
  )

  const totalConsumption = useMemo(
    () => (!moduleInfo ? 0 : moduleInfo.consumption * modulesTotalAmount),
    [moduleInfo, modulesTotalAmount]
  )

  const profileAmount = useMemo(
    () => Math.ceil(modulesSummaryWidth + modulesSummaryHeight),
    [modulesSummaryWidth, modulesSummaryHeight]
  )

  const magnetsAmount = useMemo(() => modulesTotalAmount * 4, [modulesTotalAmount])

  const galvanizationAmount = useMemo(
    () =>
      Math.ceil(
        ((modulesInWidth + modulesInHeight) *
          moduleInfo.height *
          (modulesInWidth * moduleInfo.width + moduleInfo.width)) /
          1000
      ),
    [moduleInfo, modulesInWidth, modulesInHeight]
  )

  const powerUnitsAmount = usePowerUnitAmount(totalConsumption)

  const cartInfo = useMemo<Record<string, ICartItem>>(() => {
    const totalModulePrice = !moduleInfo ? 0 : moduleInfo.price * modulesTotalAmount
    const totalPowerUnitPrice = !powerUnit ? 0 : powerUnitsAmount * powerUnit.price

    return {
      module: {
        title: `Модуль ${moduleInfo.name}`,
        name: moduleInfo.name,
        amount: modulesTotalAmount,
        unit: 'шт.',
        price: moduleInfo.price,
        totalPrice: totalModulePrice,
      },
      powerUnit: {
        title: `Бл. пит. ${powerUnit.name}`,
        name: powerUnit.name,
        amount: powerUnitsAmount,
        unit: 'шт.',
        price: powerUnit.price,
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
        title: `Профиль ${profile.name}`,
        name: profile.name,
        unit: 'мм.',
        amount: profileAmount,
      },
      galvanization: {
        title: `Оцинковка ${galvanization.name}`,
        name: galvanization.name,
        unit: 'мм.',
        amount: galvanizationAmount,
      },
      corner: {
        title: corner.name,
        name: corner.name,
        unit: 'шт.',
        amount: 4,
      },
      magnet: {
        title: 'Магниты',
        name: 'Магниты',
        unit: 'шт.',
        amount: magnetsAmount,
      },
    }
  }, [
    controller,
    corner,
    galvanization,
    galvanizationAmount,
    magnetsAmount,
    moduleInfo,
    modulesTotalAmount,
    powerUnit,
    powerUnitsAmount,
    profile,
    profileAmount,
  ])

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
          {Object.values(cartInfo).map((cartItem, idx) => (
            <CartItem
              {...cartItem}
              idx={idx}
              key={idx}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CartResult
