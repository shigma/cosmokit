export function capitalize(source: string) {
  return source.charAt(0).toUpperCase() + source.slice(1)
}

export function uncapitalize(source: string) {
  return source.charAt(0).toLowerCase() + source.slice(1)
}

export function camelCase(source: string) {
  return source.replace(/[_-][a-z]/g, str => str.slice(1).toUpperCase())
}

export function paramCase(source: string) {
  return uncapitalize(source).replace(/_/g, '-').replace(/(?<!^)[A-Z]/g, str => '-' + str.toLowerCase())
}

export function snakeCase(source: string) {
  return uncapitalize(source).replace(/-/g, '_').replace(/(?<!^)[A-Z]/g, str => '_' + str.toLowerCase())
}

export const camelize = camelCase
export const hyphenate = paramCase

namespace Letter {
  /* eslint-disable @typescript-eslint/member-delimiter-style */
  interface LowerToUpper {
    a: 'A', b: 'B', c: 'C', d: 'D', e: 'E', f: 'F', g: 'G', h: 'H', i: 'I', j: 'J', k: 'K', l: 'L', m: 'M',
    n: 'N', o: 'O', p: 'P', q: 'Q', r: 'R', s: 'S', t: 'T', u: 'U', v: 'V', w: 'W', x: 'X', y: 'Y', z: 'Z',
  }

  interface UpperToLower {
    A: 'a', B: 'b', C: 'c', D: 'd', E: 'e', F: 'f', G: 'g', H: 'h', I: 'i', J: 'j', K: 'k', L: 'l', M: 'm',
    N: 'n', O: 'o', P: 'p', Q: 'q', R: 'r', S: 's', T: 't', U: 'u', V: 'v', W: 'w', X: 'x', Y: 'y', Z: 'z',
  }
  /* eslint-enable @typescript-eslint/member-delimiter-style */

  export type Upper = keyof UpperToLower
  export type Lower = keyof LowerToUpper

  export type ToUpper<S extends string> = S extends Lower ? LowerToUpper[S] : S
  export type ToLower<S extends string, P extends string = ''> = S extends Upper ? `${P}${UpperToLower[S]}` : S
}

/* eslint-disable @typescript-eslint/naming-convention */
export type camelize<S extends string> = S extends `${infer L}-${infer M}${infer R}` ? `${L}${Letter.ToUpper<M>}${camelize<R>}` : S
export type hyphenate<S extends string> = S extends `${infer L}${infer R}` ? `${Letter.ToLower<L, '-'>}${hyphenate<R>}` : S
/* eslint-enable @typescript-eslint/naming-convention */
