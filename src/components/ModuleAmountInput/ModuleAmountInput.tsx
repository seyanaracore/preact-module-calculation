import cls from './styles.module.scss'
import { ChangeEvent, useEffect, useMemo, useRef } from 'react'
import commonCls from '@/assets/scss/common.module.scss'

const getSize = (mmSize: number) => mmSize / 1000

const format = (size: number) =>
  size.toString().slice(-1) === '0' ? `${getSize(size)}0` : getSize(size)

const ModuleAmountInput = ({
  unit,
  amount,
  setAmount,
  label,
}: {
  unit: number
  label: string
  setAmount: (value: number) => void
  amount: number
}) => {
  const id = `module-calc-input-${label}`
  const targetValue = useMemo(() => unit * amount, [amount, unit])
  const numberInputRef = useRef<HTMLInputElement>(null)

  const increase = () => {
    setAmount(amount + 1)
  }

  const reduce = () => {
    if (amount <= 1) return

    setAmount(amount - 1)
  }

  const setAmountNumberInputWidth = () => {
    if (!numberInputRef.current) return

    numberInputRef.current.style.width = '0'
    numberInputRef.current.style.width = `${numberInputRef.current.scrollWidth + 4}px`
  }

  const updateInputAmount = () => {
    if (!numberInputRef.current) return

    numberInputRef.current.value = amount.toString()
  }

  const onChangeInputAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const number = +input.value
    const isEmpty = input.value === ''

    if (!isEmpty && Number.isNaN(number)) {
      updateInputAmount()
      return
    }

    if (isEmpty || number < 1) return

    setAmount(number)
  }

  useEffect(() => setAmountNumberInputWidth, [amount])

  useEffect(() => {
    setAmountNumberInputWidth()
  }, [])

  return (
    <div className={cls.moduleAmountInputContainer}>
      <div className={[cls.moduleAmountInput, commonCls.formInput].join(' ')}>
        <span className={cls.moduleAmountFormatted}>{format(targetValue)}</span>
        <div className={cls.moduleAmountInputSide}>
          <label className={cls.moduleAmountInfo}>
            <input
              value={amount}
              min={1}
              id={id}
              className={cls.moduleAmountInputNumber}
              onBlur={updateInputAmount}
              onChange={onChangeInputAmount}
              type="text"
              inputmode="numeric"
              ref={numberInputRef}
            />
            мод
          </label>
          <div className={cls.moduleControlButtonsContainer}>
            <button
              className={cls.moduleControlButton}
              onClick={increase}
              type="button"
            >
              +
            </button>
            <button
              className={cls.moduleControlButton}
              onClick={reduce}
              type="button"
            >
              -
            </button>
          </div>
        </div>
      </div>
      <label
        className={cls.moduleLabel}
        for={id}
      >
        {label}
      </label>
    </div>
  )
}

export default ModuleAmountInput
