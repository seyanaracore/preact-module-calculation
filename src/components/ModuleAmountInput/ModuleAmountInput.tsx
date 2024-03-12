import cls from './styles.module.scss'
import { ChangeEvent, useEffect, useMemo, useRef } from 'react'
import commonCls from '@/assets/scss/common.module.scss'
import { ModuleLabelUnit } from '@/enums/ModuleLabelUnit'
import roundToLargerInt from '@/helpers/roundToLargerInt'

const getSize = (mmSize: number) => mmSize / 1000

const format = (size: number) =>
  size.toString().slice(-1) === '0' ? getSize(size).toString().padEnd(5, '0') : getSize(size)

const ModuleAmountInput = ({
  unit,
  amount,
  setAmount,
  label,
  multiplicity = 1,
  labelUnit = ModuleLabelUnit.Module,
}: {
  unit: number
  label: string
  setAmount: (value: number) => void
  amount: number
  multiplicity?: number
  labelUnit?: ModuleLabelUnit
}) => {
  const id = `module-calc-input-${label}`

  const isCabinetUnit = useMemo(
    () => labelUnit === ModuleLabelUnit.Cabinet && typeof multiplicity !== 'undefined',
    [labelUnit, multiplicity]
  )

  const getValueWithCabinetUnit = (val: number) => (isCabinetUnit ? val / multiplicity : val)
  const targetValue = useMemo(() => unit * amount, [amount, unit])
  const numberInputRef = useRef<HTMLInputElement>(null)

  const handledAmountWithCabinetUnit = useMemo(
    () => getValueWithCabinetUnit(amount),
    [amount, isCabinetUnit, multiplicity]
  )

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

  useEffect(() => setAmountNumberInputWidth, [handledAmountWithCabinetUnit])

  useEffect(() => {
    setAmountNumberInputWidth()
  }, [])

  useEffect(() => {
    if (multiplicity <= 1) return

    if (amount < multiplicity) {
      setAmount(multiplicity)
      return
    }

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
              value={handledAmountWithCabinetUnit}
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
