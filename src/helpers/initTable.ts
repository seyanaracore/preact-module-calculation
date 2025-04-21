import DataTable from 'datatables.net-dt'
import 'datatables.net-buttons-dt'
import jszip from 'jszip'
//@ts-ignore
import 'datatables.net-buttons/js/buttons.html5.mjs'
import { DATA_TABLE_BASE_CONFIG } from '@/consts'

const getDataTableInstance = (domTable: string | HTMLElement) => {
  const node = typeof domTable === 'string' ? `#${domTable}` : domTable

  window.$.fn.dataTable.Buttons.jszip(jszip)

  return new DataTable(node, {
    ...DATA_TABLE_BASE_CONFIG,
  })
}

export default getDataTableInstance
