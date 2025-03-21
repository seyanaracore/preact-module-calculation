import cls from './styles.module.scss'
import { excelImage, realExcelExportButton } from '@/components/CalculatorTable/excelExport'
import { useIsFetching } from 'react-query'
import DataTable from 'datatables.net-dt'
import { dataTableBaseConfig } from '@/consts'
import type { RefObject } from 'react'

const TableButtons = ({ tableRef }: { tableRef: RefObject<HTMLTableElement> }) => {
  const isLoading = useIsFetching()

  const exportExcelHandler = async () => {
    if (!tableRef?.current) return

    const clonedDomTable = tableRef.current.cloneNode(true) as HTMLTableElement

    const clonedInstanceTable = new DataTable(clonedDomTable, {
      ...dataTableBaseConfig,
      layout: {
        topStart: {
          // @ts-expect-error
          buttons: [realExcelExportButton],
        },
      },
    })

    clonedInstanceTable.buttons()[0].node.click()
    clonedInstanceTable.destroy()
  }

  return (
    <div className={cls.buttonsContainer}>
      <button
        className={cls.excelExportBtn}
        disabled={!!isLoading}
        onClick={exportExcelHandler}
      >
        <img
          src={excelImage}
          alt="excel icon"
        />
        Скачать
      </button>
    </div>
  )
}

export default TableButtons
