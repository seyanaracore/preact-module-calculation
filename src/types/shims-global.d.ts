import { JQueryStatic } from 'jquery'

declare global {
  interface ObjectConstructor {
    keys<T>(obj: T): Array<keyof T>

    // @ts-ignore
    entries<T, K = keyof T>(o: T): [K, T[K]][]
  }

  interface Window {
    $: JQueryStatic
  }
}
