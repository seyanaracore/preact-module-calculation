import DataTable from 'datatables.net-dt'
import { excelExportButton } from '@/components/CartResult/excelExport'
import 'datatables.net-buttons-dt'
import { dataTableBaseConfig } from '@/consts'

const getDataTableInstance = (domTable: string | HTMLElement) => {
  const node = typeof domTable === 'string' ? `#${domTable}` : domTable

  const table = new DataTable(node, {
    ...dataTableBaseConfig,

    layout: {
      topStart: {
        // @ts-expect-error
        buttons: [excelExportButton],
      },
    },
  })

  table.buttons().container().insertBefore(window.$(table.buttons().container()))
  return table
}

export default getDataTableInstance
