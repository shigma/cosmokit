import { describe, it, equal } from '../test_deps.ts'
import { contain, deduplicate, difference, intersection, union } from '../mod.ts'

describe('Array Manipulations', () => {
  it('union', () => {
    equal(union([1, 2], [3, 4]), [1, 2, 3, 4])
    equal(union([1, 2], [1, 3]), [1, 2, 3])
    equal(union([], [2, 3]), [2, 3])
  })

  it('intersection', () => {
    equal(intersection([1, 2], [3, 4]), [])
    equal(intersection([1, 2], [1, 3]), [1])
    equal(intersection([1, 2, 3], [2, 3]), [2, 3])
  })

  it('difference', () => {
    equal(difference([1, 2], [3, 4]), [1, 2])
    equal(difference([1, 2], [1, 3]), [2])
    equal(difference([2, 3], []), [2, 3])
    equal(difference([], [2, 3]), [])
  })

  it('contain', () => {
    equal(contain([1, 2], [3, 4]), false)
    equal(contain([1, 2], [1, 3]), false)
    equal(contain([2, 3], []), true)
    equal(contain([], [2, 3]), false)
  })

  it('deduplicate', () => {
    equal(deduplicate([1, 2, 3, 3]), [1, 2, 3])
  })
})
