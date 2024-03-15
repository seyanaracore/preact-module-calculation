import ModuleSelect from '@/components/ModuleSelect'
import { useContext, useEffect, useMemo } from 'react'
import ScreenService from '@/services/screenService'
import ScreenSize from '@/components/ScreenSize'
import useFetching from '@/hooks/useFetching'
import CartResult from '@/components/CartResult'
import cls from './app.module.scss'
import { StoreContext } from '@/context'
import ImplementationTypeSelect from '@/components/ImplementationTypeSelect'

const App = () => {
  const { setProfile, setGalvanization, setPowerUnit, setCorner, setMagnet } =
    useContext(StoreContext)

  const { fetching: getProfile, isLoading: getProfileIsLoading } = useFetching(async () => {
    const res = await ScreenService.getProfile()

    setProfile(res)
  })

  const { fetching: getGalvanization } = useFetching(async () => {
    const res = await ScreenService.getGalvanization()

    setGalvanization(res)
  })

  const { fetching: getCorner } = useFetching(async () => {
    const res = await ScreenService.getCorner()

    setCorner(res)
  })

  const { fetching: getMagnet } = useFetching(async () => {
    const res = await ScreenService.getMagnet()

    setMagnet(res)
  })

  useEffect(() => {
    Promise.allSettled([getProfile(), getGalvanization(), getCorner(), getMagnet()])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
