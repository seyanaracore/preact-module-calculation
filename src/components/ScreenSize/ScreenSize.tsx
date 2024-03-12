import { ModuleItem } from '@/types'
import cls from './styles.module.scss'
import { useContext, useMemo } from 'react'
import { StateUpdater } from 'preact/hooks'
import ModuleAmountInput from '@/components/ModuleAmountInput'
import { StoreContext } from '@/context'
import { useIsCabinet640ModuleImplementation } from '@/hooks/useIsCabinet640ModuleImplementation'
import { heightModulesAmountMultiplicity, widthModulesAmountMultiplicity } from '@/consts'
import { ModuleLabelUnit } from '@/enums/ModuleLabelUnit'

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

  const isCabinet640Implementation = useIsCabinet640ModuleImplementation()

  const widthAmountInputMultiplicity = useMemo(() => {
    if (isCabinet640Implementation) return widthModulesAmountMultiplicity
  }, [isCabinet640Implementation])

  const heightAmountInputMultiplicity = useMemo(() => {
    if (isCabinet640Implementation) return heightModulesAmountMultiplicity
  }, [isCabinet640Implementation])

  const labelUnit = useMemo(() => {
    if (isCabinet640Implementation) return ModuleLabelUnit.Cabinet
    return ModuleLabelUnit.Module
  }, [isCabinet640Implementation])

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
          multiplicity={widthAmountInputMultiplicity}
          amount={modulesInWidth}
          labelUnit={labelUnit}
        />
        <ModuleAmountInput
          unit={moduleInfo.height}
          label="Высота"
          setAmount={setModulesInHeight}
          multiplicity={heightAmountInputMultiplicity}
          amount={modulesInHeight}
          labelUnit={labelUnit}
        />
      </div>
    </div>
  )
}

export default ScreenSize
