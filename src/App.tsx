import ModuleSelect from '@/components/ModuleSelect'
import { useContext, useEffect, useMemo } from 'react'
import ScreenService from '@/services/screenService'
import ScreenSize from '@/components/ScreenSize'
import useFetching from '@/hooks/useFetching'
import CartResult from '@/components/CartResult'
import cls from './app.module.scss'
import { StoreContext } from '@/context'

const App = () => {
  const { setProfile, setGalvanization, setPowerUnit, setCorner } = useContext(StoreContext)

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

  const { fetching: getPowerUnit, isLoading: getPowerUnitIsLoading } = useFetching(async () => {
    const res = await ScreenService.getPowerUnit()

    setPowerUnit(res)
  })

  const { fetching: getCorner, isLoading: getCornerIsLoading } = useFetching(async () => {
    const res = await ScreenService.getCorner()

    setCorner(res)
  })

  const isLoading = useMemo(
    () =>
      [
        getProfileIsLoading,
        getGalvanizationIsLoading,
        getPowerUnitIsLoading,
        getCornerIsLoading,
      ].some(Boolean),
    [getProfileIsLoading, getGalvanizationIsLoading, getPowerUnitIsLoading, getCornerIsLoading]
  )

  useEffect(() => {
    Promise.allSettled([getProfile(), getGalvanization(), getPowerUnit(), getCorner()])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div class={cls.root}>
      <form class={cls.form}>
        <ModuleSelect />
        <ScreenSize />
      </form>
      <CartResult />
    </div>
  )
}

export default App
