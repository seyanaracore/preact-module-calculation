import { useContext } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import { useQueryModuleInfo } from '@/query'
import useSummaryResolution from '@/hooks/useSummaryResolution'
import { useTotalConsumption } from '@/hooks/useAmounts'
import cls from '../styles.module.scss'

const increaseSummarySize = 50

const ProductCharacteristicTable = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()
  const summaryResolution = useSummaryResolution()
  const totalConsumption = useTotalConsumption()

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
          {modulesSummaryWidth + increaseSummarySize} x {modulesSummaryHeight + increaseSummarySize}
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
