import CartItem from '@/components/CalculatorTable/CartTable/CartItem'
import useCartState from '@/hooks/useCartState'
import cls from '@/components/CalculatorTable/styles.module.scss'
import CartSummary from '@/components/CalculatorTable/CartTable/CartSummary'

const CartTable = () => {
  const cartState = useCartState()

  return (
    <>
      <tr>
        <th
          scope="col"
          className={cls.tableTitle}
        >
          Расчет стоимости комлектующих
        </th>
        <th
          scope="col"
          className={cls.tableTitle}
        />
        <th
          scope="col"
          className={cls.tableTitle}
        />
        <th
          scope="col"
          className={cls.tableTitle}
        />
        <th
          scope="col"
          className={cls.tableTitle}
        />
      </tr>
      <tr>
        <th
          scope="col"
          className={cls.tableHead}
        >
          Комплектующие
        </th>
        <th
          scope="col"
          className={cls.tableHead}
        >
          <span style={{ display: 'none' }}>Ед изм.</span>
        </th>
        <th
          scope="col"
          className={cls.tableHead}
        >
          Кол-во
        </th>
        <th
          scope="col"
          className={cls.tableHead}
        >
          Цена
        </th>
        <th
          scope="col"
          className={cls.tableHead}
        >
          Сумма
        </th>
      </tr>
      {cartState.map((cartItem, idx) => (
        <CartItem
          {...cartItem}
          idx={idx}
          key={idx}
        />
      ))}
      <CartSummary />
    </>
  )
}

export default CartTable
