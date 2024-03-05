declare global {
  interface ObjectConstructor {
    keys<T>(obj: T): Array<keyof T>

    // @ts-ignore
    entries<T, K = keyof T>(o: T | ArrayLike<T>): [K, T[K]][]
  }
}
