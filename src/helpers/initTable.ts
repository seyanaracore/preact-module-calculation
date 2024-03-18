import DataTable from 'datatables.net-dt'
import { dataTableBaseConfig } from '@/consts'

const getDataTableInstance = (domTable: string | HTMLElement) => {
  const node = typeof domTable === 'string' ? `#${domTable}` : domTable

  return new DataTable(node, {
    ...dataTableBaseConfig,
  })
}

export default getDataTableInstance
