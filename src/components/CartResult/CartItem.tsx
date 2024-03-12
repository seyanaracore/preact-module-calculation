import { currencyFormat } from '@/utils'
import type { CartItem as ICartItem } from './types'

export type CartItemProps = ICartItem & { idx: number }

const CartItem = (props: CartItemProps) => {
  if ('isLoading' in props) {
    return (
      <tr>
        <th scope="row">{props.idx + 1}</th>
        <td>{props.title}</td>
        <td>Загрузка...</td>
      </tr>
    )
  }

  return (
    <tr>
      <th scope="row">{props.idx + 1}</th>
      <td>{props.title}</td>
      <td>{props.amount + props.unit}</td>
      <td>{props.totalPrice === undefined ? '' : currencyFormat.format(props.totalPrice)}</td>
    </tr>
  )
}

export default CartItem
