import cls from './styles.module.scss'
import { useContext, useMemo } from 'react'
import ModuleAmountInput from '@/components/ModuleAmountInput'
import { StoreContext } from '@/context'
import { ModuleImplementationType } from '@/enums'

const ScreenSize = () => {
  const {
    modulesInHeight,
    modulesInWidth,
    moduleInfo,
    setModulesInHeight,
    setModulesInWidth,
    implementationType,
  } = useContext(StoreContext)

  /**
   * Кратность по ширине, в зависимости от типа исполнения
   * @example 1,2,3/2,4,8
   */
  const widthAmountInputMultiplicity = useMemo(() => {
    if (implementationType === ModuleImplementationType.Cabinet640x640) {
      return 2
    }
  }, [implementationType])

  /**
   * Кратность по высоте, в зависимости от типа исполнения
   * @example 1,2,3/4,8,12
   */
  const heightAmountInputMultiplicity = useMemo(() => {
    if (implementationType === ModuleImplementationType.Cabinet640x640) {
      return 4
    }
  }, [implementationType])

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
    </div>
  )
}

export default ScreenSize
