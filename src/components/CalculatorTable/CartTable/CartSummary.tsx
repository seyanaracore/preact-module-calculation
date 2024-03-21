import { currencyFormat } from '@/utils'
import { useCartSummaryPrice, useFinishedProductPrice } from '@/hooks/useCartPrice'

const CartSummary = () => {
  const style = { display: 'none' }
  const finishedProductPrice = useFinishedProductPrice()
  const summaryPrice = useCartSummaryPrice()

  return (
    <>
      <tr style={style}>
        <td />
        <td />
        <td />
        <td />
        <td />
      </tr>
      <tr style={style}>
        <td>Сумма:</td>
        <td />
        <td />
        <td />
        <td>{currencyFormat.format(summaryPrice)}</td>
      </tr>
      <tr style={style}>
        <td>Стоимость готового изделия:</td>
        <td />
        <td />
        <td />
        <td>{currencyFormat.format(finishedProductPrice)}</td>
      </tr>
    </>
  )
}

export default CartSummary
