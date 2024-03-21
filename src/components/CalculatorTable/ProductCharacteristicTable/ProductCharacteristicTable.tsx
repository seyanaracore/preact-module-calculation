import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useModulesSizes from '@/hooks/useModulesSizes'
import { useQueryModuleInfo } from '@/query'
import {
  useSummaryResolution,
  useHeightResolution,
  useWidthResolution,
} from '@/hooks/useResolution'
import {
  useCabinetsInHeightAmount,
  useCabinetsInWidthAmount,
  useTotalConsumption,
} from '@/hooks/useAmounts'
import cls from '../styles.module.scss'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'
import ProductCharacteristicItem from '@/components/CalculatorTable/ProductCharacteristicTable/ProductCharacteristicItem'

const increaseSummarySize = 50

const ProductCharacteristicTable = () => {
  const { data: moduleInfo } = useQueryModuleInfo()
  const { modulesInWidth, modulesInHeight } = useContext(StoreContext)
  const { modulesSummaryWidth, modulesSummaryHeight } = useModulesSizes()
  const summaryResolution = useSummaryResolution()
  const widthResolution = useWidthResolution()
  const heightResolution = useHeightResolution()
  const totalConsumption = useTotalConsumption()
  const isCabinetImplementation = useIsCabinetImplementation()
  const cabinetsInWidthAmount = useCabinetsInWidthAmount()
  const cabinetsInHeightAmount = useCabinetsInHeightAmount()
  const headersList = ['Характеристика', '', '', '', 'Значение']

  const productSizes = useMemo(() => {
    if (isCabinetImplementation) return [modulesSummaryWidth, modulesSummaryHeight]
    return [modulesSummaryWidth + increaseSummarySize, modulesSummaryHeight + increaseSummarySize]
  }, [isCabinetImplementation, modulesSummaryHeight, modulesSummaryWidth])

  // При изменении кол-ва элементов поправить выгрузку экселя
  const characteristicsList = useMemo(() => {
    const firstItem = isCabinetImplementation
      ? {
          label: 'Количество кабинетов (в ширину × в высоту), шт:',
          value: `${cabinetsInWidthAmount}x${cabinetsInHeightAmount}`,
        }
      : {
          label: 'Количество модулей (в ширину × в высоту), шт:',
          value: `${modulesInWidth}x${modulesInHeight}`,
        }

    return [
      firstItem,
      {
        label: 'Разрешение одного модуля, пикс:',
        value: moduleInfo ? `${moduleInfo?.ledsInWidth} x ${moduleInfo?.ledsInHeight}` : '0 x 0',
      },
      {
        label: 'Общее разрешение экрана, пикс:',
        value: `${widthResolution} x ${heightResolution}`,
      },
      {
        label: 'Количество пикселей, всего:',
        value: summaryResolution,
      },
      {
        label: 'Потребляемая мощность, вт:',
        value: totalConsumption,
      },
      {
        label: 'Размер конструкции, мм:',
        value: `${productSizes[0]} x ${productSizes[1]}`,
      },
    ]
  }, [
    isCabinetImplementation,
    cabinetsInWidthAmount,
    cabinetsInHeightAmount,
    modulesInWidth,
    modulesInHeight,
    moduleInfo?.ledsInWidth,
    moduleInfo?.ledsInHeight,
    widthResolution,
    heightResolution,
    summaryResolution,
    totalConsumption,
    productSizes,
  ])

  return (
    <>
      <tr>
        {headersList.map((headerItem, idx) => (
          <td
            scope="col"
            key={idx}
            className={cls.tableHead}
          >
            {headerItem}
          </td>
        ))}
      </tr>
      {characteristicsList.map((characteristicItem, idx) => (
        <ProductCharacteristicItem
          key={idx}
          {...characteristicItem}
        />
      ))}
    </>
  )
}

export default ProductCharacteristicTable
