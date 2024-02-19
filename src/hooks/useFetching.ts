import { useState } from 'react'

/**
 * @returns object with fetch func, loading state and error state
 */
const useFetching = <T extends (...args: any[]) => unknown>(callback: T) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string | null>(null)

  type AwaitedCb = Awaited<ReturnType<T>>

  const fetching = async (...args: Parameters<T>): Promise<AwaitedCb | Error> => {
    try {
      setIsError(null)
      setIsLoading(true)

      const res = await callback(...args)

      return res as AwaitedCb
    } catch (e) {
      if (e instanceof Error) setIsError(e.message)

      return e as Error
    } finally {
      setIsLoading(false)
    }
  }

  return { fetching, isLoading, isError }
}

export default useFetching
