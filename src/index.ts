export type Dict<T = any, K extends string = string> = { [key in K]?: T }
export type Get<T extends {}, K> = K extends keyof T ? T[K] : never
export type Extract<S, T, U = S> = S extends T ? U : never
export type MaybeArray<T> = [T] extends [unknown[]] ? T : T | T[]
export type Promisify<T> = Promise<T extends Promise<infer S> ? S : T>
export type Awaitable<T> = [T] extends [Promise<unknown>] ? T : T | Promise<T>
export type Intersect<U> = (U extends any ? (arg: U) => void : never) extends ((arg: infer I) => void) ? I : never

export function noop(): any {}

export function isNullable(value: any) {
  return value === null || value === undefined
}

export function isPlainObject(data: any) {
  return data && typeof data === 'object' && !Array.isArray(data)
}

export function valueMap<T, U>(object: Dict<T>, transform: (value: T, key: string) => U): Dict<U> {
  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]))
}

export function clone<T>(source: T): T
export function clone(source: any) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(clone)
  if (source instanceof Date) return new Date(source.valueOf())
  if (source instanceof RegExp) return new RegExp(source.source, source.flags)
  return valueMap(source, clone)
}

export function pick<T, K extends keyof T>(source: T, keys?: Iterable<K>, forced?: boolean) {
  if (!keys) return { ...source }
  const result = {} as Pick<T, K>
  for (const key of keys) {
    if (forced || key in source) result[key] = source[key]
  }
  return result
}

export function omit<T, K extends keyof T>(source: T, keys?: Iterable<K>) {
  if (!keys) return { ...source }
  const result = { ...source } as Omit<T, K>
  for (const key of keys) {
    Reflect.deleteProperty(result, key)
  }
  return result
}

export function defineProperty<T, K extends keyof T>(object: T, key: K, value: T[K]): void
export function defineProperty<T, K extends keyof any>(object: T, key: K, value: any): void
export function defineProperty<T, K extends keyof any>(object: T, key: K, value: any) {
  Object.defineProperty(object, key, { writable: true, value })
}

export function contain(array1: readonly any[], array2: readonly any[]) {
  return array2.every(item => array1.includes(item))
}

export function intersection<T>(array1: readonly T[], array2: readonly T[]) {
  return array1.filter(item => array2.includes(item))
}

export function difference<S>(array1: readonly S[], array2: readonly any[]) {
  return array1.filter(item => !array2.includes(item))
}

export function union<T>(array1: readonly T[], array2: readonly T[]) {
  return Array.from(new Set([...array1, ...array2]))
}

export function deduplicate<T>(array: readonly T[]) {
  return [...new Set(array)]
}

export function remove<T>(list: T[], item: T) {
  const index = list.indexOf(item)
  if (index >= 0) {
    list.splice(index, 1)
    return true
  }
}

export function makeArray<T>(source: T | T[]) {
  return Array.isArray(source) ? source : isNullable(source) ? [] : [source]
}
