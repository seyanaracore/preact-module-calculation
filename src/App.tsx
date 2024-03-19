import ModuleSelect from '@/components/ModuleSelect'
import ScreenSize from '@/components/ScreenSize'
import CalculatorTable from '@/components/CalculatorTable'
import cls from './app.module.scss'
import ImplementationTypeSelect from '@/components/ImplementationTypeSelect'
import { currencyFormat } from '@/utils'
import { useCartSummaryPrice, useFinishedProductPrice } from '@/hooks/useCartPrice'

const App = () => {
  const finishedProductPrice = useFinishedProductPrice()
  const summaryPrice = useCartSummaryPrice()

  return (
    <div class={cls.root}>
      <form class={cls.form}>
        <ModuleSelect />
        <ScreenSize />
        <ImplementationTypeSelect />
      </form>
      <CalculatorTable />
      <div className={cls.tableSummaryContainer}>
        <p className={cls.summaryPrice}>Сумма: {currencyFormat.format(summaryPrice)}</p>

        <p className={cls.finishedProductPrice}>
          Стоимость готового изделия: {currencyFormat.format(finishedProductPrice)}
        </p>
      </div>
    </div>
  )
}

export default App
