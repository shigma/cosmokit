import { capitalize, camelCase, paramCase, snakeCase, uncapitalize } from '../src'
import { expect } from 'chai'

describe('String Manipulations', () => {
  it('capitalize', () => {
    expect(capitalize('aa-aa_aA')).to.equal('Aa-aa_aA')
  })

  it('uncapitalize', () => {
    expect(uncapitalize('Aa-aa_aA')).to.equal('aa-aa_aA')
  })

  it('camel case', () => {
    expect(camelCase('aa-aa_aA')).to.equal('aaAaAA')
  })

  it('param case', () => {
    expect(paramCase('aa-aa_aA')).to.equal('aa-aa-a-a')
  })

  it('snake case', () => {
    expect(snakeCase('aa-aa_aA')).to.equal('aa_aa_a_a')
  })
})
