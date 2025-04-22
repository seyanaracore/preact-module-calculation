import { useMemo } from 'react'
import { useQueryModuleInfo, useQueryModuleTypes } from '@/query'

const ProdServiceTableAdditionalData = () => {
  const style = { display: 'none' }
  const { data: moduleInfo } = useQueryModuleInfo()
  const { data: moduleTypes } = useQueryModuleTypes()
  const moduleName = useMemo(() => moduleInfo?.name || '', [moduleInfo])

  const moduleCategory = useMemo(
    () => (!moduleInfo ? '' : moduleTypes?.[moduleInfo?.typeId]?.name || ''),
    [moduleTypes, moduleInfo]
  )

  return (
    <>
      <tr style={style}>
        <td>{moduleCategory}</td>
        <td />
        <td />
        <td />
        <td />
      </tr>

      <tr style={style}>
        <td>{moduleName}</td>
        <td />
        <td />
        <td />
        <td />
      </tr>
    </>
  )
}

export default ProdServiceTableAdditionalData
