import { useIsFetching } from 'react-query'
import DataTable from 'datatables.net-dt'
import cls from './styles.module.scss'
import { excelImage, realExcelExportButton } from '@/components/CalculatorTable/excelExport'
import { DATA_TABLE_BASE_CONFIG } from '@/consts'
import type { RefObject } from 'react'

const TableButtons = ({ tableRef }: { tableRef: RefObject<HTMLTableElement> }) => {
  const isLoading = useIsFetching()

  const exportExcelHandler = async () => {
    if (!tableRef?.current) return

    const clonedDomTable = tableRef.current.cloneNode(true) as HTMLTableElement

    const clonedInstanceTable = new DataTable(clonedDomTable, {
      ...DATA_TABLE_BASE_CONFIG,
      layout: {
        topStart: {
          // @ts-expect-error skip type check
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
