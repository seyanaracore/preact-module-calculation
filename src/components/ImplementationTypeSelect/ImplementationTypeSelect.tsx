import { type ChangeEvent, useContext, useEffect } from 'react'
import commonCls from '@/assets/scss/common.module.scss'
import { StoreContext } from '@/context'
import { ModuleImplementationType } from '@/enums'
import useModuleImplementationTypes from '@/hooks/useModuleImplementationTypes'
import clsx from 'clsx'
import { IMPLEMENTATION_LIST } from '@/consts'

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
          {IMPLEMENTATION_LIST.map((implementationTypeItem) => (
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
