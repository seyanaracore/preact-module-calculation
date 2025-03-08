import { ChangeEvent, useContext, useEffect, useMemo } from 'react'
import commonCls from '@/assets/scss/common.module.scss'
import { StoreContext } from '@/context'
import groupBy from 'lodash-es/groupBy'
import { ModuleTypeId } from '@/api/enums'
import { ModulesListItem } from '@/types'
import { useQueryModulesList, useQueryModuleTypes } from '@/query'
import clsx from 'clsx'

type GroupedModules = Record<ModuleTypeId, ModulesListItem[]>

const ModuleSelect = () => {
  const { moduleId, setModuleId } = useContext(StoreContext)
  const { data: modulesList } = useQueryModulesList()
  const { data: moduleTypes } = useQueryModuleTypes()
  const containerClasses = clsx([commonCls.selectContainer, commonCls.mediaLgWidth100])
  const selectClasses = clsx([commonCls.select, commonCls.formInput])

  const groupedModules = useMemo<GroupedModules | null>(() => {
    if (!modulesList?.length || !moduleTypes) return null

    return groupBy(modulesList, (module) => module['parent-id']) as GroupedModules
  }, [modulesList, moduleTypes])

  const onChangeModuleId = (e: ChangeEvent<HTMLSelectElement>) => {
    setModuleId((e.target as HTMLSelectElement).value)
  }

  useEffect(() => {
    if (!groupedModules || moduleId) return

    setModuleId(Object.values(groupedModules)[0][0].id.toString())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupedModules])
  return (
    <label class={commonCls.labelMargin}>
      Модуль
      <br />
      <div class={containerClasses}>
        <select
          onChange={onChangeModuleId}
          value={moduleId}
          native-select
          class={selectClasses}
        >
          {!groupedModules ? (
            <option selected>Загрузка</option>
          ) : (
            Object.entries(groupedModules).map(([moduleTypeId, modulesList]) => (
              <optgroup
                label={moduleTypes![moduleTypeId].name}
                key={moduleTypeId}
              >
                {(modulesList as ModulesListItem[]).map(({ name, id }, idx) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {name}
                  </option>
                ))}
              </optgroup>
            ))
          )}
        </select>
      </div>
    </label>
  )
}

export default ModuleSelect
