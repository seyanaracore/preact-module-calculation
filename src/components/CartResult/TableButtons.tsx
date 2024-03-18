import cls from './styles.module.scss'
import {
  excelImage,
  loadExcelExportModule,
  realExcelExportButton,
} from '@/components/CartResult/excelExport'
import { useIsFetching } from 'react-query'
import DataTable from 'datatables.net-dt'
import { dataTableBaseConfig } from '@/consts'
import { useState, type Ref, useMemo } from 'react'

const TableButtons = ({ tableRef }: { tableRef: Ref<HTMLTableElement> }) => {
  const isFetching = useIsFetching()
  const [excelIsLoading, setExcelIsLoading] = useState(false)
  const isLoading = useMemo(() => excelIsLoading || !!isFetching, [isFetching, excelIsLoading])

  const exportExcelHandler = async () => {
    if (!tableRef.current) return
    setExcelIsLoading(true)
    await loadExcelExportModule()

    // eslint-disable-next-line no-proto
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
    setExcelIsLoading(false)
  }

  return (
    <div className={cls.buttonsContainer}>
      <button
        className={cls.excelExportBtn}
        disabled={isLoading}
        onClick={exportExcelHandler}
      >
        <img
          src={excelImage}
          alt="excel icon"
        />
        Excel
      </button>
    </div>
  )
}

export default TableButtons
