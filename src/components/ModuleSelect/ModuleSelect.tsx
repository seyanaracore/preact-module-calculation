import { ChangeEvent, useContext, useEffect, useMemo } from 'react'
import cls from './styles.module.scss'
import commonCls from '@/assets/scss/common.module.scss'
import { StoreContext } from '@/context'
import groupBy from 'lodash-es/groupBy'
import useFetching from '@/hooks/useFetching'
import ScreenService from '@/services/screenService'
import { ModuleTypeId } from '@/api/enums'
import { ModulesListItem } from '@/types'

type GroupedModules = Record<ModuleTypeId, ModulesListItem[]>

const ModuleSelect = () => {
  const {
    moduleId,
    setModuleId,
    modulesList,
    setModulesList,
    moduleTypes,
    setModuleInfo,
    setModuleTypes,
    setPowerUnit,
  } = useContext(StoreContext)

  const groupedModules = useMemo<GroupedModules | null>(() => {
    if (!modulesList.length || !moduleTypes) return null

    return groupBy(modulesList, (module) => module['parent-id']) as GroupedModules
  }, [modulesList, moduleTypes])

  const onChangeModuleId = (e: ChangeEvent<HTMLSelectElement>) => {
    setModuleId((e.target as HTMLSelectElement).value)
  }

  const { fetching: getPowerUnit } = useFetching(async () => {
    if (!moduleId) return

    const res = await ScreenService.getPowerUnit(moduleId)

    setPowerUnit(res)
  })

  const { fetching: getModulesList } = useFetching(async () => {
    const res = await ScreenService.getModulesList()

    setModulesList(res)
  })

  const { fetching: getModulesTypesList } = useFetching(async () => {
    const res = await ScreenService.getModuleTypes()

    setModuleTypes(res)
  })

  const { fetching: getModuleInfo } = useFetching(async () => {
    const res = await ScreenService.getModuleInfo(moduleId)

    setModuleInfo(res)
  })

  useEffect(() => {
    Promise.allSettled([getModulesList(), getModulesTypesList()])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!moduleId) return
    getModuleInfo()
    getPowerUnit()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  useEffect(() => {
    if (!groupedModules) return

    setModuleId(Object.values(groupedModules)[0][0].id.toString())
  }, [groupedModules])
  return (
    <label>
      Модуль
      <br />
      <div class={cls.moduleSelectContainer}>
        <select
          onChange={onChangeModuleId}
          value={moduleId}
          class={[cls.moduleSelect, commonCls.formInput].join(' ')}
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
