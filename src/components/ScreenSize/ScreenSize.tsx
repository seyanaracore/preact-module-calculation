import { ModuleItem } from '@/types'
import cls from './styles.module.scss'
import { ChangeEvent, useContext, useMemo } from 'react'
import { StateUpdater } from 'preact/hooks'
import ModuleAmountInput from '@/components/ModuleAmountInput'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'

type ScreenSizeProps = {
  width: ModuleItem['width']
  height: ModuleItem['height']
  modulesInWidth: number
  modulesInHeight: number
  setModulesInWidth: StateUpdater<number>
  setModulesInHeight: StateUpdater<number>
}

const ScreenSize = () => {
  const { modulesInHeight, modulesInWidth, moduleInfo, setModulesInHeight, setModulesInWidth } =
    useContext(StoreContext)

  if (!moduleInfo) return <div>Загрузка...</div>

  return (
    <div>
      Размер экрана
      <br />
      <div class={cls.moduleAmountInputsContainer}>
        <ModuleAmountInput
          unit={moduleInfo.width}
          label="Ширина"
          setAmount={setModulesInWidth}
          amount={modulesInWidth}
        />
        <ModuleAmountInput
          unit={moduleInfo.height}
          label="Высота"
          setAmount={setModulesInHeight}
          amount={modulesInHeight}
        />
      </div>
    </div>
  )
}

export default ScreenSize
