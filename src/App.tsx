import ModuleSelect from '@/components/ModuleSelect'
import ScreenSize from '@/components/ScreenSize'
import CartResult from '@/components/CartResult'
import cls from './app.module.scss'
import ImplementationTypeSelect from '@/components/ImplementationTypeSelect'

const App = () => {
  return (
    <div class={cls.root}>
      <form class={cls.form}>
        <ModuleSelect />
        <ScreenSize />
        <ImplementationTypeSelect />
      </form>
      <CartResult />
    </div>
  )
}

export default App
