import { useContext } from 'react'
import cls from './styles.module.scss'
import ModuleAmountInput from '@/components/ModuleAmountInput'
import { StoreContext } from '@/context'
import {
  useHeightModuleMultiplicity,
  useWidthModuleMultiplicity,
} from '@/hooks/useCabinetMultiplicity'
import commonCls from '@/assets/scss/common.module.scss'
import { useQueryModuleInfo } from '@/query'

const ScreenSize = () => {
  const {
    modulesInHeight,
    modulesInWidth,
    setModulesInHeight,
    setModulesInWidth,
    implementationType,
  } = useContext(StoreContext)

  const { data: moduleInfo, isLoading } = useQueryModuleInfo()
  const widthAmountInputMultiplicity = useWidthModuleMultiplicity()
  const heightAmountInputMultiplicity = useHeightModuleMultiplicity()

  return (
    <div class={commonCls.labelMargin}>
      Размер экрана
      <br />
      <div class={cls.moduleAmountInputsContainer}>
        <ModuleAmountInput
          unit={moduleInfo?.width}
          label="Ширина"
          setAmount={setModulesInWidth}
          multiplicity={widthAmountInputMultiplicity}
          amount={modulesInWidth}
          implementationType={implementationType}
          isLoading={isLoading}
        />
        <ModuleAmountInput
          unit={moduleInfo?.height}
          label="Высота"
          setAmount={setModulesInHeight}
          multiplicity={heightAmountInputMultiplicity}
          amount={modulesInHeight}
          implementationType={implementationType}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ScreenSize
