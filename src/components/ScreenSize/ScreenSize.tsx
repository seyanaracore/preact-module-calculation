import { ModuleItem } from '@/types'
import cls from './styles.module.scss'
import { ChangeEvent, useMemo } from 'react'
import { StateUpdater } from 'preact/hooks'

type ScreenSizeProps = {
  width: ModuleItem['width']
  height: ModuleItem['height']
  modulesInWidth: number
  modulesInHeight: number
  setModulesInWidth: StateUpdater<number>
  setModulesInHeight: StateUpdater<number>
}

const getSize = (mmSize: number) => mmSize / 1000
const format = (size: number) => ((size * 1000).toString().slice(-1) === '0' ? `${size}0` : size)

const ScreenSize = ({
  width,
  height,
  modulesInWidth,
  modulesInHeight,
  setModulesInWidth,
  setModulesInHeight,
}: ScreenSizeProps) => {
  const widthStep = getSize(width)
  const heightStep = getSize(height)
  const modulesWidth = useMemo(() => getSize(width * modulesInWidth), [modulesInWidth, width])
  const modulesHeight = useMemo(() => getSize(height * modulesInHeight), [modulesInHeight, height])

  const onChangeWidthAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const numValue = input.valueAsNumber
    const isIncrease = numValue > modulesWidth

    if (isIncrease) setModulesInWidth((prev) => prev + 1)
    else if (modulesInWidth > 1) setModulesInWidth((prev) => prev - 1)
  }

  const onChangeHeightAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const numValue = input.valueAsNumber
    const isIncrease = numValue > modulesHeight

    if (isIncrease) setModulesInHeight((prev) => prev + 1)
    else if (modulesInHeight > 1) setModulesInHeight((prev) => prev - 1)
  }

  return (
    <div>
      Размер экрана
      <br />
      <div class={cls.modulesAmountInputsContainer}>
        <label class={cls.moduleAmountInputContainer}>
          Ширина
          <input
            type="number"
            class={cls.moduleAmountInput}
            value={format(modulesWidth)}
            step={widthStep}
            min={widthStep}
            onChange={onChangeWidthAmount}
            onKeyDown={(e) => e.preventDefault()}
          />
          <span class={cls.moduleAmountInfo}>{modulesInWidth} мод</span>
        </label>
        <label class={cls.moduleAmountInputContainer}>
          Высота
          <input
            type="number"
            value={format(modulesHeight)}
            step={heightStep}
            min={heightStep}
            class={cls.moduleAmountInput}
            onChange={onChangeHeightAmount}
            onKeyDown={(e) => e.preventDefault()}
          />
          <span class={cls.moduleAmountInfo}>{modulesInHeight} мод</span>
        </label>
      </div>
    </div>
  )
}

export default ScreenSize
