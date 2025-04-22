import cls from './app.module.scss'
import { isProdService } from './consts'
import { useQueryController } from './query'
import ModuleSelect from '@/components/ModuleSelect'
import ScreenSize from '@/components/ScreenSize'
import CalculatorTable from '@/components/CalculatorTable'
import ImplementationTypeSelect from '@/components/ImplementationTypeSelect'
import { currencyFormat } from '@/utils'
import { useCartSummaryPrice, useFinishedProductPrice } from '@/hooks/useCartPrice'

const App = () => {
  const finishedProductPrice = useFinishedProductPrice()
  const summaryPrice = useCartSummaryPrice()
  const { isError: controllerIsError } = useQueryController()

  return (
    <div class={cls.root}>
      <div class={cls.form}>
        <ModuleSelect />
        <ScreenSize />
        <ImplementationTypeSelect />
      </div>
      {controllerIsError && (
        <p
          style="margin-bottom: 0; margin-top: 1rem"
          className="red_text"
        >
          Ошибка загрузки данных. Не удалось определить контроллер для заданных парамеров
        </p>
      )}
      <CalculatorTable />
      <div className={cls.tableSummaryContainer}>
        {!isProdService && (
          <p className={cls.summaryPrice}>Сумма: {currencyFormat.format(summaryPrice)}</p>
        )}

        <p className={cls.finishedProductPrice}>
          Стоимость готового изделия: {currencyFormat.format(finishedProductPrice)}
        </p>
      </div>
    </div>
  )
}

export default App
