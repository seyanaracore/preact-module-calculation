import cls from './styles.module.scss'
import { useContext, useMemo } from 'react'
import ModuleAmountInput from '@/components/ModuleAmountInput'
import { StoreContext } from '@/context'
import {
  useHeightModuleMultiplicity,
  useWidthModuleMultiplicity,
} from '@/hooks/useCabinetMultiplicity'
import commonCls from '@/assets/scss/common.module.scss'

const ScreenSize = () => {
  const {
    modulesInHeight,
    modulesInWidth,
    moduleInfo,
    setModulesInHeight,
    setModulesInWidth,
    implementationType,
  } = useContext(StoreContext)

  const widthAmountInputMultiplicity = useWidthModuleMultiplicity()
  const heightAmountInputMultiplicity = useHeightModuleMultiplicity()

  return (
    <div class={commonCls.labelMargin}>
      Размер экрана
      <br />
      {!moduleInfo ? (
        <div class={cls.moduleAmountInputsContainer}>Загрузка...</div>
      ) : (
        <div class={cls.moduleAmountInputsContainer}>
          <ModuleAmountInput
            unit={moduleInfo.width}
            label="Ширина"
            setAmount={setModulesInWidth}
            multiplicity={widthAmountInputMultiplicity}
            amount={modulesInWidth}
            implementationType={implementationType}
          />
          <ModuleAmountInput
            unit={moduleInfo.height}
            label="Высота"
            setAmount={setModulesInHeight}
            multiplicity={heightAmountInputMultiplicity}
            amount={modulesInHeight}
            implementationType={implementationType}
          />
        </div>
      )}
    </div>
  )
}

export default ScreenSize
