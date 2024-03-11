import cls from './styles.module.scss'
import { useContext, useEffect, useMemo } from 'react'
import CartItem from './CartItem'
import { StoreContext } from '@/context'
import useFetching from '@/hooks/useFetching'
import ScreenService from '@/services/screenService'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import useCartState from '@/hooks/useCartState'

const CartResult = () => {
  const { modulesInHeight, modulesInWidth, moduleInfo, moduleId, setController, setReceivingCard } =
    useContext(StoreContext)

  const isFullColorModule = useIsFullColorModule()
  const cartState = useCartState()

  const { fetching: getController, isError: getControllerIsError } = useFetching(
    async (payload: Parameters<typeof ScreenService.getController>[0]) => {
      setController(undefined)

      const res = await ScreenService.getController(payload)

      setController(res)
    }
  )

  const { fetching: getReceivingCard, isError: getReceivingCardIsError } = useFetching(async () => {
    setReceivingCard(null)

    const res = await ScreenService.getReceivingCard()

    setReceivingCard(res)
  })

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

  useEffect(() => {
    if (getReceivingCardIsError) console.error(getReceivingCardIsError)
  }, [getReceivingCardIsError])

  useEffect(() => {
    if (isFullColorModule) getReceivingCard()
    else setReceivingCard(undefined)
  }, [isFullColorModule])

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
          {cartState.map((cartItem, idx) =>
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
