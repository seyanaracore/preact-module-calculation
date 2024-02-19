import { ModuleItem } from '@/types'
import cls from './styles.module.scss'
import { ChangeEvent, useMemo } from 'react'
import { StateUpdater } from 'preact/hooks'
import ModuleAmountInput from '@/components/ModuleAmountInput'

type ScreenSizeProps = {
  width: ModuleItem['width']
  height: ModuleItem['height']
  modulesInWidth: number
  modulesInHeight: number
  setModulesInWidth: StateUpdater<number>
  setModulesInHeight: StateUpdater<number>
}

const ScreenSize = ({
  width,
  height,
  modulesInWidth,
  modulesInHeight,
  setModulesInWidth,
  setModulesInHeight,
}: ScreenSizeProps) => {
  return (
    <div>
      Размер экрана
      <br />
      <div class={cls.moduleAmountInputsContainer}>
        <ModuleAmountInput
          unit={width}
          label="Ширина"
          setAmount={setModulesInWidth}
          amount={modulesInWidth}
        />
        <ModuleAmountInput
          unit={height}
          label="Высота"
          setAmount={setModulesInHeight}
          amount={modulesInHeight}
        />
      </div>
    </div>
  )
}

export default ScreenSize
