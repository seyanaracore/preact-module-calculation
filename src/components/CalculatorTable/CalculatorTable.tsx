import { useContext, useEffect, useId, useRef } from 'react'
import clsx from 'clsx'
import cls from './styles.module.scss'

import TableButtons from './TableButtons'
import ProductCharacteristicTable from './ProductCharacteristicTable'
import CartTable from './CartTable'
import TableHead from './TableHead'
import CartSummary from './CartTable/CartSummary'
import ProdServiceTableAdditionalData from './ProdServiceTableAdditionalData'
import { StoreContext } from '@/context'

import getDataTableInstance from '@/helpers/initTable'
import { isProdService } from '@/consts'

const CalculatorTable = () => {
  const { table, setTable } = useContext(StoreContext)
  const tableId = useId()
  const tableRef = useRef<HTMLTableElement>(null)
  const tableCls = clsx('table display responsive nowrap', cls.calculatorTable)

  useEffect(() => {
    if (!table && tableRef.current) {
      const newTable = getDataTableInstance(tableRef.current)

      setTable(newTable)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRef])

  return (
    <>
      <div className={cls.resultContainer}>
        <table
          className={tableCls}
          id={tableId}
          ref={tableRef}
          width="100%"
          style={{ width: '100%' }}
        >
          <TableHead />
          <tbody>
            {isProdService && <ProdServiceTableAdditionalData />}
            <ProductCharacteristicTable />
            {!isProdService && <CartTable />}
            <CartSummary />
          </tbody>
        </table>
      </div>
      <TableButtons tableRef={tableRef} />
    </>
  )
}

export default CalculatorTable
