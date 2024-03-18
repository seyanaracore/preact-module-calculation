import cls from './styles.module.scss'
import { useContext, useEffect, useId, useRef } from 'react'
import { StoreContext } from '@/context'

import TableButtons from './TableButtons'
import ProductCharacteristicTable from './ProductCharacteristicTable'
import CartTable from './CartTable'

import getDataTableInstance from '@/helpers/initTable'

const CalculatorTable = () => {
  const { table, setTable } = useContext(StoreContext)
  const tableId = useId()
  const tableRef = useRef<HTMLTableElement>(null)

  useEffect(() => {
    if (!table && tableRef.current) {
      const newTable = getDataTableInstance(tableRef.current)

      setTable(newTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRef])

  return (
    <div className={cls.resultContainer}>
      <TableButtons tableRef={tableRef} />
      <table
        class="table display responsive nowrap"
        id={tableId}
        ref={tableRef}
        width="100%"
        style={{ width: '100%' }}
      >
        <thead>
          <tr
            className={cls.tableTitle}
            role="row"
          >
            <th>Технические характеристики</th>
            <th />
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          <ProductCharacteristicTable />
          <CartTable />
        </tbody>
      </table>
    </div>
  )
}

export default CalculatorTable
