import cls from './styles.module.scss'
import { useContext, useEffect, useId, useRef } from 'react'
import CartItem from './CartItem'
import { StoreContext } from '@/context'
import useCartState from '@/hooks/useCartState'
import { currencyFormat } from '@/utils'
import { useCartSummaryPrice, useFinishedProductPrice } from '@/hooks/useCartPrice'
import TableSummary from '@/components/CartResult/TableSummary'
import getDataTableInstance from '@/helpers/initTable'

const CartResult = () => {
  const { table, setTable } = useContext(StoreContext)
  const cartState = useCartState()
  const finishedProductPrice = useFinishedProductPrice()
  const summaryPrice = useCartSummaryPrice()
  const tableId = useId()
  const tableRef = useRef(null)

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
