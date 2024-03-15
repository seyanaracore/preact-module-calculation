import cls from './styles.module.scss'
import { useContext, useEffect, useId, useRef } from 'react'
import CartItem from './CartItem'
import { StoreContext } from '@/context'
import useFetching from '@/hooks/useFetching'
import ScreenService from '@/services/screenService'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import useCartState from '@/hooks/useCartState'
import { currencyFormat } from '@/utils'
import { useCartSummaryPrice, useFinishedProductPrice } from '@/hooks/useCartPrice'
import TableSummary from '@/components/CartResult/TableSummary'
import getDataTableInstance from '@/helpers/initTable'

const CartResult = () => {
  const {
    modulesInHeight,
    modulesInWidth,
    moduleId,
    setController,
    table,
    setTable,
    setReceivingCard,
  } = useContext(StoreContext)

  const isFullColorModule = useIsFullColorModule()
  const cartState = useCartState()
  const finishedProductPrice = useFinishedProductPrice()
  const summaryPrice = useCartSummaryPrice()
  const tableId = useId()
  const tableRef = useRef(null)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullColorModule])

  useEffect(() => {
    if (!table && tableRef.current) {
      const newTable = getDataTableInstance(tableRef.current)

      setTable(newTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRef])

  return (
    <>
      <div className={cls.resultContainer}>
        <table
          class="table display responsive nowrap"
          id={tableId}
          ref={tableRef}
          width="100%"
          style={{ width: '100%' }}
        >
          <thead>
            <tr class={cls.tableHead}>
              <th scope="col">Комплектующие</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Цена</th>
              <th scope="col">Сумма</th>
            </tr>
          </thead>
          <tbody>
            {cartState.map((cartItem, idx) => (
              <CartItem
                {...cartItem}
                idx={idx}
                key={idx}
              />
            ))}
            <TableSummary />
          </tbody>
        </table>
      </div>
      <div>
        <p className={cls.summaryPrice}>Сумма: {currencyFormat.format(summaryPrice)}</p>

        <p className={cls.finishedProductPrice}>
          Стоимость готового изделия: {currencyFormat.format(finishedProductPrice)}
        </p>
      </div>
    </>
  )
}

export default CartResult
