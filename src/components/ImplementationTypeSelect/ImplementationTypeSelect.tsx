import { ChangeEvent, useContext, useEffect } from 'react'
import commonCls from '@/assets/scss/common.module.scss'
import { StoreContext } from '@/context'
import { ModuleImplementationType } from '@/enums'
import useModuleImplementationTypes from '@/hooks/useModuleImplementationTypes'
import clsx from 'clsx'

const IMPLEMENTATION_TYPES_LIST = [
  {
    title: 'Монолитный',
    code: ModuleImplementationType.Monolithic,
  },
  {
    title: 'Кабинет 640/640',
    code: ModuleImplementationType.Cabinet640x640,
  },
  {
    title: 'Кабинет 640/480',
    code: ModuleImplementationType.Cabinet640x480,
  },
]

const ImplementationTypeSelect = () => {
  const { implementationType, setImplementationType } = useContext(StoreContext)
  const { moduleImplementationTypes, isLoading } = useModuleImplementationTypes()
  const containerClasses = clsx([commonCls.selectContainer, commonCls.mediaLgWidth100])
  const selectClasses = clsx([commonCls.select, commonCls.formInput])

  const onChangeImplementationType = (e: ChangeEvent<HTMLSelectElement>) => {
    setImplementationType(Number((e.target as HTMLSelectElement).value))
  }

  useEffect(() => {
    if (!isLoading && !moduleImplementationTypes.includes(implementationType)) {
      setImplementationType(ModuleImplementationType.Monolithic)
    }
  }, [moduleImplementationTypes, implementationType, isLoading])

  return (
    <label class={commonCls.labelMargin}>
      Тип исполнения
      <br />
      <div class={containerClasses}>
        <select
          onChange={onChangeImplementationType}
          value={implementationType}
          native-select
          class={selectClasses}
        >
          {IMPLEMENTATION_TYPES_LIST.map((implementationTypeItem) => (
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
