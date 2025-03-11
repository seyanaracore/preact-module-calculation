import { useState, useEffect, useCallback } from 'react'

type SerializeFn<T> = (value: T) => string
type ParseFn<T> = (value: string) => T

interface UseUrlStateOptions<T> {
  serialize?: SerializeFn<T>
  parse?: ParseFn<T>
}

/**
 * Хук для синхронизации отдельного параметра URL с состоянием компонента.
 *
 * @param key - Ключ параметра в URL.
 * @param defaultValue - Значение по умолчанию, если параметр отсутствует.
 * @param options - Опциональный объект с функциями serialize и parse для работы с типом T.
 *
 * @returns Кортеж [value, setUrlState]
 *
 * Пример использования с типом number:
 *
 * const [count, setCount] = useUrlState<number>('count', 0, {
 *   serialize: (v) => v.toString(),
 *   parse: (v) => parseInt(v, 10),
 * });
 *
 * Пример использования со string (по умолчанию):
 *
 * const [name, setName] = useUrlState('name', 'defaultName');
 */
function useUrlState<T>(
  key: string,
  defaultValue: T,
  options: UseUrlStateOptions<T> = {}
): [T, (newValue: T) => void] {
  const {
    serialize = (value: T) => String(value),
    parse = (value: string) => value as unknown as T,
  } = options

  // Функция для получения текущего значения параметра из URL
  const getParam = useCallback((): T => {
    const params = new URLSearchParams(window.location.search)
    const paramStr = params.get(key)

    if (paramStr === null) {
      return defaultValue
    }

    try {
      return parse(paramStr)
    } catch (error) {
      console.error(`Error parsing URL parameter "${key}"`, error)
      return defaultValue
    }
  }, [key, defaultValue, parse])

  const [value, setValue] = useState<T>(getParam)

  // Функция для обновления параметра в URL и состояния
  const setUrlState = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(window.location.search)

      // Если значение undefined или null, удаляем параметр
      if (newValue === undefined || newValue === null) {
        params.delete(key)
      } else {
        params.set(key, serialize(newValue))
      }

      const newSearch = params.toString()
      const newUrl = `${window.location.pathname}${newSearch ? `?${newSearch}` : ''}`

      // Обновляем URL без перезагрузки страницы
      window.history.replaceState(null, '', newUrl)

      // Обновляем локальное состояние
      setValue(newValue)
    },
    [key, serialize]
  )

  // Подписка на событие popstate для синхронизации с изменениями истории
  useEffect(() => {
    const handlePopState = () => {
      setValue(getParam())
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [getParam])

  return [value, setUrlState]
}

export type UseUrlStateReturn<T> = ReturnType<typeof useUrlState<T>>

export default useUrlState
