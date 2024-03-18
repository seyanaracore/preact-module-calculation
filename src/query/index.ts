import { useQuery, useQueryClient } from 'react-query'
import api from '@/api'
import { useContext, useMemo } from 'react'
import { StoreContext } from '@/context'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'

enum QueryKey {
  Cabinet = 'cabinet',
  Profile = 'profile',
  Controller = 'controller',
  ReceivingCart = 'receivingCart',
  Galvanization = 'galvanization',
  Corner = 'corner',
  Magnet = 'magnet',
  PowerUnit = 'powerUnit',
  ModulesList = 'modulesList',
  ModuleInfo = 'moduleInfo',
  ModuleTypes = 'moduleTypes',
}

export const useQueryCabinet = () => {
  const queryClient = useQueryClient()
  const isCabinetImplementation = useIsCabinetImplementation()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Cabinet],
    queryFn: api.getCabinet,
    enabled: isCabinetImplementation,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Cabinet }),
    remove: () => queryClient.removeQueries({ queryKey: QueryKey.Cabinet }),
  }
}

export const useQueryProfile = () => {
  const queryClient = useQueryClient()
  // Queries
  const query = useQuery({ queryKey: [QueryKey.Profile], queryFn: api.getProfile })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Profile }),
  }
}

export const useQueryController = () => {
  const queryClient = useQueryClient()
  const { modulesInHeight, modulesInWidth, moduleId } = useContext(StoreContext)

  const controllerPayload = useMemo(
    () => ({ modulesInHeight, modulesInWidth, moduleId }),
    [modulesInHeight, modulesInWidth, moduleId]
  )

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Controller, controllerPayload],
    queryFn: () => {
      return api.getController(controllerPayload)
    },
    enabled: !!moduleId,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Controller }),
  }
}

export const useQueryReceivingCart = () => {
  const queryClient = useQueryClient()
  const isFullColorModule = useIsFullColorModule()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.ReceivingCart, isFullColorModule],
    queryFn: api.getReceivingCard,
    enabled: isFullColorModule,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.ReceivingCart }),
  }
}

export const useQueryGalvanization = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Galvanization],
    queryFn: api.getGalvanization,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Galvanization }),
  }
}

export const useQueryCorner = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Corner],
    queryFn: api.getCorner,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Corner }),
  }
}

export const useQueryMagnet = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Magnet],
    queryFn: api.getMagnet,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.Magnet }),
  }
}

export const useQueryPowerUnit = () => {
  const queryClient = useQueryClient()
  const { moduleId } = useContext(StoreContext)

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.PowerUnit, moduleId],
    queryFn: () => api.getPowerUnit(moduleId),
    enabled: !!moduleId,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.PowerUnit }),
  }
}

export const useQueryModulesList = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.ModulesList],
    queryFn: api.getModulesList,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.ModulesList }),
  }
}

export const useQueryModuleInfo = () => {
  const queryClient = useQueryClient()
  // Queries
  const { moduleId } = useContext(StoreContext)

  const query = useQuery({
    queryKey: [QueryKey.ModuleInfo, moduleId],
    queryFn: () => api.getModuleInfo(moduleId),
    enabled: !!moduleId,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.ModuleInfo }),
  }
}

export const useQueryModuleTypes = () => {
  const queryClient = useQueryClient()

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.ModuleTypes],
    queryFn: api.getModuleTypes,
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.ModuleTypes }),
  }
}
