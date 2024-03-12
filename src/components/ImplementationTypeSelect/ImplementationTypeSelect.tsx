import { ChangeEvent, useContext, useEffect } from 'react'
import cls from './styles.module.scss'
import commonCls from '@/assets/scss/common.module.scss'
import { StoreContext } from '@/context'
import { ModuleImplementationType } from '@/enums'
import useModuleImplementationTypes from '@/hooks/useModuleImplementationTypes'

const ImplementationTypeSelect = () => {
  const { implementationType, setImplementationType, moduleInfo } = useContext(StoreContext)
  const moduleImplementationTypes = useModuleImplementationTypes()

  const implementationTypesList = [
    {
      title: 'Монолитный',
      code: ModuleImplementationType.Monolithic,
    },
    {
      title: 'Кабинет 640/640',
      code: ModuleImplementationType.Cabinet640x640,
    },
  ]

  const onChangeImplementationType = (e: ChangeEvent<HTMLSelectElement>) => {
    setImplementationType(Number((e.target as HTMLSelectElement).value))
  }

  useEffect(() => {
    if (!moduleImplementationTypes.includes(implementationType)) {
      setImplementationType(ModuleImplementationType.Monolithic)
    }
  }, [moduleImplementationTypes, implementationType])

  return (
    <label>
      Тип исполнения
      <br />
      <div class={cls.moduleSelectContainer}>
        <select
          onChange={onChangeImplementationType}
          value={implementationType}
          class={[cls.moduleSelect, commonCls.formInput].join(' ')}
        >
          {implementationTypesList.map((implementationTypeItem) => (
            <option
              key={implementationTypeItem.code}
              value={implementationTypeItem.code}
              disabled={!moduleImplementationTypes.includes(implementationTypeItem.code)}
            >
              {implementationTypeItem.title}
            </option>
          ))}
        </select>
      </div>
    </label>
  )
}

export default ImplementationTypeSelect
