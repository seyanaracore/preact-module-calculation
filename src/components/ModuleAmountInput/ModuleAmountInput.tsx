import cls from './styles.module.scss'
import { ChangeEvent, useEffect, useMemo, useRef } from 'react'
import commonCls from '@/assets/scss/common.module.scss'
import { ModuleLabelUnit } from '@/consts'
import { ModuleImplementationType } from '@/enums'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'

const getSize = (mmSize: number) => mmSize / 1000

const format = (size: number) =>
  size.toString().slice(-1) === '0' ? getSize(size).toString().padEnd(5, '0') : getSize(size)

const ModuleAmountInput = ({
  unit,
  amount,
  setAmount,
  label,
  implementationType,
  multiplicity = 1,
}: {
  unit: number
  label: string
  setAmount: (value: number) => void
  amount: number
  implementationType: ModuleImplementationType
  multiplicity?: number
}) => {
  const id = `module-calc-input-${label}`
  const isCabinetImplementation = useIsCabinetImplementation()

  /**
   * заголовок в чём считается
   * @example 'мод' | 'каб'
   */
  const labelUnit = useMemo(() => {
    return ModuleLabelUnit[implementationType]
  }, [implementationType])

  /**
   * Значение в мм
   *
   * unit * module amounts = 360 * 2 = 740
   */
  const targetValue = useMemo(() => unit * amount, [amount, unit])
  const numberInputRef = useRef<HTMLInputElement>(null)

  /**
   * Кол-во модулей деленая переданную кратность, кратность 4 = 4 модуля = 1 labelUnit (напр. каб.)
   */
  const amountWithImplementationType = useMemo(() => {
    if (isCabinetImplementation) return amount / multiplicity

    return amount
  }, [amount, isCabinetImplementation, multiplicity])

  const increase = () => {
    const newAmount = amount + multiplicity

    setAmount(newAmount)
  }

  const reduce = () => {
    const newAmount = amount - multiplicity

    if (newAmount < 1) return

    setAmount(newAmount)
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

    setAmount(number * multiplicity)
  }

  useEffect(() => setAmountNumberInputWidth, [amountWithImplementationType])

  useEffect(() => {
    setAmountNumberInputWidth()
  }, [])

  /**
   * Обработчик изменения кратности
   */
  useEffect(() => {
    // если кратность по умолчанию - выходим
    if (multiplicity <= 1) return

    // если кол-во модулей меньше переданной кратности - ставим минимальное значение - значение кратности, напр. 2
    if (amount < multiplicity) {
      setAmount(multiplicity)
      return
    }

    // если текущее кол-во не подходит переданной кратности, то добиваем необходимое кол-во модулей в большую сторону
    if (amount % multiplicity) {
      setAmount(amount + (multiplicity - (amount % multiplicity)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multiplicity])

  return (
    <div className={cls.moduleAmountInputContainer}>
      <div className={[cls.moduleAmountInput, commonCls.formInput].join(' ')}>
        <span className={cls.moduleAmountFormatted}>{format(targetValue)}</span>
        <div className={cls.moduleAmountInputSide}>
          <label className={cls.moduleAmountInfo}>
            <input
              value={amountWithImplementationType}
              min={1}
              id={id}
              className={cls.moduleAmountInputNumber}
              onBlur={updateInputAmount}
              onChange={onChangeInputAmount}
              type="text"
              inputmode="numeric"
              ref={numberInputRef}
            />
            {labelUnit}
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
