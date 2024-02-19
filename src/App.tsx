import ModuleSelect from '@/components/ModuleSelect'
import { useEffect, useMemo, useState } from 'react'
import {
  ControllerItem,
  CornerItem,
  GalvanizationItem,
  ModuleItem,
  ModulesListItem,
  PowerUnitItem,
  ProfileItem,
} from '@/types'
import ScreenService from '@/services/screenService'
import ScreenSize from '@/components/ScreenSize'
import useFetching from '@/hooks/useFetching'
import CartResult from '@/components/CartResult'
import cls from './app.module.scss'

const App = () => {
  const [moduleId, setModuleId] = useState<string>('')
  const [moduleInfo, setModuleInfo] = useState<ModuleItem>()
  const [modulesInWidth, setModulesInWidth] = useState(1)
  const [modulesInHeight, setModulesInHeight] = useState(1)
  const [controller, setController] = useState<ControllerItem>()
  const [modulesList, setModulesList] = useState<ModulesListItem[]>([])
  const [profile, setProfile] = useState<ProfileItem>()
  const [galvanization, setGalvanization] = useState<GalvanizationItem>()
  const [powerUnit, setPowerUnit] = useState<PowerUnitItem>()
  const [corner, setCorner] = useState<CornerItem>()

  const modulesSummaryWidth = useMemo(
    () => (!moduleInfo ? 0 : modulesInWidth * moduleInfo.width),
    [modulesInWidth, moduleInfo]
  )

  const modulesSummaryHeight = useMemo(
    () => (!moduleInfo ? 0 : modulesInHeight * moduleInfo.height),
    [modulesInHeight, moduleInfo]
  )

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

  const { fetching: getModuleInfo } = useFetching(async () => {
    const res = await ScreenService.getModuleInfo(moduleId)

    setModuleInfo(res)
  })

  const { fetching: getModulesList, isLoading: getModulesListIsLoading } = useFetching(async () => {
    const res = await ScreenService.getModulesList()

    setModulesList(res)
    if (!moduleId) setModuleId(res[0].id.toString())
  })

  const { fetching: getController } = useFetching(
    async (payload: Parameters<typeof ScreenService.getControllerBySize>[0]) => {
      setController(undefined)

      const res = await ScreenService.getControllerBySize(payload)

      setController(res)
    }
  )

  const isLoading = useMemo(
    () =>
      [
        getProfileIsLoading,
        getGalvanizationIsLoading,
        getPowerUnitIsLoading,
        getCornerIsLoading,
        getModulesListIsLoading,
      ].some(Boolean),
    [
      getProfileIsLoading,
      getGalvanizationIsLoading,
      getPowerUnitIsLoading,
      getCornerIsLoading,
      getModulesListIsLoading,
    ]
  )

  useEffect(() => {
    if (moduleId) getModuleInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleId])

  useEffect(() => {
    if (!modulesSummaryHeight || !modulesSummaryWidth) return

    getController({ summaryWidth: modulesSummaryWidth, summaryHeight: modulesSummaryHeight / 10 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modulesSummaryHeight, modulesSummaryWidth])

  useEffect(() => {
    Promise.allSettled([
      getProfile(),
      getGalvanization(),
      getPowerUnit(),
      getCorner(),
      getModulesList(),
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) return <div>Загрузка...</div>

  return (
    <div class={cls.root}>
      <form class={cls.form}>
        <ModuleSelect
          moduleId={moduleId}
          setModuleId={setModuleId}
          modulesList={modulesList}
        />
        {!moduleInfo ? (
          'Загрузка...'
        ) : (
          <ScreenSize
            width={moduleInfo.width}
            height={moduleInfo.height}
            modulesInWidth={modulesInWidth}
            setModulesInWidth={setModulesInWidth}
            modulesInHeight={modulesInHeight}
            setModulesInHeight={setModulesInHeight}
          />
        )}
      </form>
      {!moduleInfo || isLoading ? (
        'Загрузка...'
      ) : (
        <CartResult
          moduleInfo={moduleInfo}
          controller={controller}
          modulesInHeight={modulesInHeight}
          modulesInWidth={modulesInWidth}
          galvanization={galvanization!}
          powerUnit={powerUnit!}
          profile={profile!}
          corner={corner!}
        />
      )}
    </div>
  )
}

export default App
