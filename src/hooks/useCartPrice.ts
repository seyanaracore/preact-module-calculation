import { useMemo } from 'react'
import useCartState from '@/hooks/useCartState'
import { useModulesTotalAmount } from '@/hooks/useAmounts'

export const useCartSummaryPrice = () => {
  const cartState = useCartState()

  return useMemo(
    () =>
      cartState.reduce((prev, cartItem) => {
        if (!cartItem || !(cartItem as any)?.totalPrice) return prev

        return (cartItem as any).totalPrice + prev
      }, 0),
    [cartState]
  )
}

export const useCartResultPrice = () => {
  const cartSummaryPrice = useCartSummaryPrice()
  const modulesTotalAmount = useModulesTotalAmount()

  return useMemo(() => {
    // ((Сумма стоимости всех комплектующих для сборки)+(100*(количество модулей по ширине*количество модулей по высоте)))+50%= стоимость готового изделия .
    return (cartSummaryPrice + 100 * modulesTotalAmount) * 1.5
  }, [cartSummaryPrice, modulesTotalAmount])
}
