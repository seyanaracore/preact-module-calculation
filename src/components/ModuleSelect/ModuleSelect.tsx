import { ModulesListItem } from '@/types'
import { ChangeEvent } from 'react'
import cls from './styles.module.scss'
import commonCls from '@/assets/scss/common.module.scss'

type Props = {
  moduleId: string
  setModuleId: (module: string) => void
  modulesList: ModulesListItem[]
}

const ModuleSelect = ({ moduleId, setModuleId, modulesList }: Props) => {
  const onChangeModuleId = (e: ChangeEvent<HTMLSelectElement>) => {
    setModuleId((e.target as HTMLSelectElement).value)
  }

  return (
    <label>
      Модуль
      <br />
      <select
        onChange={onChangeModuleId}
        value={moduleId}
        class={[cls.moduleSelect, commonCls.formInput].join(' ')}
      >
        {!modulesList.length ? <option selected>Загрузка</option> : null}

        {modulesList.map(({ name, id }, idx) => (
          <option
            key={id}
            value={id}
          >
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default ModuleSelect
