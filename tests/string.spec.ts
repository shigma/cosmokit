import { capitalize, camelCase, formatProperty, paramCase, snakeCase, uncapitalize, sanitize } from '../src'
import { expect } from 'chai'

describe('String Manipulations', () => {
  it('capitalize', () => {
    expect(capitalize('aa-aa_aA')).to.equal('Aa-aa_aA')
  })

  it('uncapitalize', () => {
    expect(uncapitalize('Aa-aa_aA')).to.equal('aa-aa_aA')
  })

  it('camelCase', () => {
    expect(camelCase('aa-aa_aA')).to.equal('aaAaAA')
  })

  it('paramCase', () => {
    expect(paramCase('AAA')).to.equal('aaa')
    expect(paramCase('A0A0A')).to.equal('a0a0a')
    expect(paramCase('AA_AA_AA')).to.equal('aa-aa-aa')
    expect(paramCase('AaAaA')).to.equal('aa-aa-a')
    expect(paramCase('aAaAa')).to.equal('a-aa-aa')
    expect(paramCase('aAAAa')).to.equal('a-aa-aa')
    expect(paramCase('aa-aa_aAA')).to.equal('aa-aa-a-aa')
    expect(paramCase('aa-aa_aAAa')).to.equal('aa-aa-a-a-aa')
  })

  it('snakeCase', () => {
    expect(snakeCase('AAA')).to.equal('aaa')
    expect(paramCase('A0A0A')).to.equal('a0a0a')
    expect(snakeCase('AA-AA-AA')).to.equal('aa_aa_aa')
    expect(snakeCase('AaAaA')).to.equal('aa_aa_a')
    expect(snakeCase('aAaAa')).to.equal('a_aa_aa')
    expect(snakeCase('aAAAa')).to.equal('a_aa_aa')
    expect(snakeCase('aa-aa_aAA')).to.equal('aa_aa_a_aa')
    expect(snakeCase('aa-aa_aAAa')).to.equal('aa_aa_a_a_aa')
  })

  it('formatProperty', () => {
    expect(formatProperty(100)).to.equal('[100]')
    expect(formatProperty(Symbol('foo'))).to.equal('[Symbol(foo)]')
    expect(formatProperty('foo')).to.equal('.foo')
    expect(formatProperty('foo-bar')).to.equal('["foo-bar"]')
  })

  it('sanitize', () => {
    expect(sanitize('aa/bb/cc/')).to.equal('/aa/bb/cc')
  })
})
