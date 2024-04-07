import { isNullable, mapValues } from './misc'

export function arrayBufferToBase64(buffer: ArrayBufferLike) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64')
  }
  let binary = ''
  const bytes = new Uint8Array(buffer)
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

export function base64ToArrayBuffer(base64: string) {
  if (typeof Buffer !== 'undefined') {
    // https://nodejs.org/api/buffer.html#bufbyteoffset
    const buf = Buffer.from(base64, 'base64')
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length)
  }
  const binary = atob(base64.replace(/\s/g, ''))
  const buffer = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i)
  }
  return buffer.buffer
}

type GlobalConstructorNames = keyof {
  [K in keyof typeof globalThis as typeof globalThis[K] extends abstract new (...args: any) => any ? K : never]: K
}

export function is<K extends GlobalConstructorNames>(type: K): (value: any) => value is InstanceType<typeof globalThis[K]>
export function is<K extends GlobalConstructorNames>(type: K, value: any): value is InstanceType<typeof globalThis[K]>
export function is<K extends GlobalConstructorNames>(type: K, value?: any): any {
  if (arguments.length === 1) return (value: any) => is(type, value)
  return type in globalThis && value instanceof (globalThis[type] as any)
    || Object.prototype.toString.call(value).slice(8, -1) === type
}

export function isArrayBufferLike(value: any): value is ArrayBufferLike {
  return is('ArrayBuffer', value) || is('SharedArrayBuffer', value)
}

export function isArrayBufferSource(value: any): value is ArrayBufferLike | ArrayBufferView {
  return isArrayBufferLike(value) || ArrayBuffer.isView(value)
}

export function clone<T>(source: T): T
export function clone(source: any) {
  if (!source || typeof source !== 'object') return source
  if (Array.isArray(source)) return source.map(clone)
  if (is('Date', source)) return new Date(source.valueOf())
  if (is('RegExp', source)) return new RegExp(source.source, source.flags)
  if (is('ArrayBuffer', source)) return source.slice(0)
  if (ArrayBuffer.isView(source)) return source.buffer.slice(source.byteOffset, source.byteOffset + source.byteLength)
  return mapValues(source, clone)
}

export function deepEqual(a: any, b: any, strict?: boolean): boolean {
  if (a === b) return true
  if (!strict && isNullable(a) && isNullable(b)) return true
  if (typeof a !== typeof b) return false
  if (typeof a !== 'object') return false
  if (!a || !b) return false

  function check<T>(test: (x: any) => x is T, then: (a: T, b: T) => boolean) {
    return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : undefined
  }

  return check(Array.isArray, (a, b) => a.length === b.length && a.every((item, index) => deepEqual(item, b[index])))
    ?? check(is('Date'), (a, b) => a.valueOf() === b.valueOf())
    ?? check(is('RegExp'), (a, b) => a.source === b.source && a.flags === b.flags)
    ?? Object.keys({ ...a, ...b }).every(key => deepEqual(a[key], b[key], strict))
}
