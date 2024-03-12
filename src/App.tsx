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

  const { fetching: getGalvanization, isLoading: getGalvanizationIsLoading } = useFetching(
    async () => {
      const res = await ScreenService.getGalvanization()

      setGalvanization(res)
    }
  )

  const { fetching: getCorner, isLoading: getCornerIsLoading } = useFetching(async () => {
    const res = await ScreenService.getCorner()

    setCorner(res)
  })

  const { fetching: getMagnet, isLoading: getMagnetIsLoading } = useFetching(async () => {
    const res = await ScreenService.getMagnet()

    setMagnet(res)
  })

  const isLoading = useMemo(
    () =>
      [getProfileIsLoading, getGalvanizationIsLoading, getCornerIsLoading, getMagnetIsLoading].some(
        Boolean
      ),
    [getProfileIsLoading, getGalvanizationIsLoading, getCornerIsLoading, getMagnetIsLoading]
  )

  useEffect(() => {
    Promise.allSettled([getProfile(), getGalvanization(), getCorner(), getMagnet()])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <div>Загрузка...</div>

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
