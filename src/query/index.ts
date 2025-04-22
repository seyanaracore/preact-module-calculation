import { useQuery, useQueryClient } from 'react-query'
import { useContext, useMemo } from 'react'
import api from '@/api'
import { StoreContext } from '@/context'
import useIsCabinetImplementation from '@/hooks/useIsCabinetImplementation'
import useIsFullColorModule from '@/hooks/useIsFullColorModule'
import { IMPLEMENTATION_LIST, isProdService } from '@/consts'

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
  const { implementationType } = useContext(StoreContext)
  const queryClient = useQueryClient()
  const isCabinetImplementation = useIsCabinetImplementation()

  const cabinetId = useMemo(
    () => IMPLEMENTATION_LIST.find((item) => item.code === implementationType)?.id,
    [implementationType]
  )

  // Queries
  const query = useQuery({
    queryKey: [QueryKey.Cabinet, cabinetId] as const,
    queryFn({ queryKey }) {
      const [, cabinetId] = queryKey

      if (!cabinetId) {
        console.error('Implementation not found')
        return
      }

      return api.getCabinet({ id: cabinetId, prodService: isProdService })
    },
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
  const query = useQuery({
    queryKey: [QueryKey.Profile],
    queryFn: () => api.getProfile({ prodService: isProdService }),
  })

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
    queryKey: [QueryKey.Controller, controllerPayload] as const,
    queryFn: ({ queryKey }) => {
      const [, controllerPayload] = queryKey

      return api.getController({ ...controllerPayload, prodService: isProdService })
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
    queryFn: () => api.getReceivingCard({ prodService: isProdService }),
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
    queryFn: () => api.getGalvanization({ prodService: isProdService }),
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
    queryFn: () => api.getCorner({ prodService: isProdService }),
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
    queryFn: () => api.getMagnet({ prodService: isProdService }),
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
    queryKey: [QueryKey.PowerUnit, moduleId] as const,
    queryFn({ queryKey }) {
      const [, moduleId] = queryKey

      return api.getPowerUnit({ id: moduleId, prodService: isProdService })
    },
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
    queryFn: () => api.getModulesList({ prodService: isProdService }),
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
    queryFn({ queryKey }) {
      const [, moduleId] = queryKey

      return api.getModuleInfo({ id: moduleId, prodService: isProdService })
    },
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
    queryFn: () => api.getModuleTypes({ prodService: isProdService }),
  })

  return {
    ...query,
    invalidate: () => queryClient.invalidateQueries({ queryKey: QueryKey.ModuleTypes }),
  }
}
