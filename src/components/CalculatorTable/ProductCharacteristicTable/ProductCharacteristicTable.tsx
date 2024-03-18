import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import { useQueryModuleInfo } from '@/query'
import useSummaryResolution from '@/hooks/useSummaryResolution'
import { useTotalConsumption } from '@/hooks/useAmounts'
import cls from '../styles.module.scss'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'

const increaseSummarySize = 50

const ProductCharacteristicTable = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()
  const summaryResolution = useSummaryResolution()
  const totalConsumption = useTotalConsumption()
  const isCabinetImplementation = useIsCabinetImplementation()

  const productSizes = useMemo(() => {
    if (isCabinetImplementation) return [modulesSummaryWidth, modulesSummaryHeight]
    return [modulesSummaryWidth + increaseSummarySize, modulesSummaryHeight + increaseSummarySize]
  }, [isCabinetImplementation, modulesSummaryHeight, modulesSummaryWidth])

  return (
    <>
      <tr>
        <td
          scope="col"
          className={cls.tableHead}
        >
          Характеристика
        </td>
        <td
          scope="col"
          className={cls.tableHead}
        />
        <td
          scope="col"
          className={cls.tableHead}
        />
        <td
          scope="col"
          className={cls.tableHead}
        >
          Значение
        </td>
      </tr>
      <tr>
        <td>Количество модулей (в ширину × в высоту), шт:</td>
        <td />
        <td />
        <td>
          {modulesInWidth}x{modulesInHeight}
        </td>
      </tr>
      <tr>
        <td>Размер конструкции, мм:</td>
        <td />
        <td />
        <td>
          {productSizes[0]} x {productSizes[1]}
        </td>
      </tr>
      <tr>
        <td>Разрешение экрана, пикс:</td>
        <td />
        <td />
        <td>
          {moduleInfo?.ledsInWidth} x {moduleInfo?.ledsInHeight}
        </td>
      </tr>
      <tr>
        <td>Количество пискелей:</td>
        <td />
        <td />
        <td>{summaryResolution}</td>
      </tr>
      <tr>
        <td>Потребляемая мощность:</td>
        <td />
        <td />
        <td>{totalConsumption}</td>
      </tr>
    </>
  )
}

export default ProductCharacteristicTable
