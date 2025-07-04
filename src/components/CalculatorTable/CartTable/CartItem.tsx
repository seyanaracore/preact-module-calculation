import { currencyFormat } from '@/utils'
import cls from '@/components/CalculatorTable/styles.module.scss'
import type { CartItem as ICartItem } from '@/components/CalculatorTable/types'

export type CartItemProps = ICartItem & { idx: number }

const CartItem = (props: CartItemProps) => {
  if ('isLoading' in props) {
    return (
      <tr>
        <td>{props.title}</td>
        <td />
        <td />
        <td>Загрузка...</td>
        <td />
      </tr>
    )
  }

  return (
    <tr>
      <td>
        <a
          href={props.link}
          class={cls.link}
          target="_blank"
          rel="noreferrer"
        >
          {props.title}
        </a>
      </td>
      <td>
        <span style={{ display: 'none' }}>{props.unit}</span>
      </td>
      <td>{props.amount + props.unit}</td>
      <td>{props.price === undefined ? '' : currencyFormat.format(props.price)}</td>
      <td>{props.totalPrice === undefined ? '' : currencyFormat.format(props.totalPrice)}</td>
    </tr>
  )
}

export default CartItem
