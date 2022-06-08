import { describe, it, equal, FakeTime, beforeEach, afterEach } from '../test_deps.ts'
import { Time } from '../mod.ts'

describe('Time Manipulations', () => {
  let clock: FakeTime

  const date = new Date(2020, 3, 1, 1, 30)
  const now = date.valueOf()

  beforeEach(() => {
    clock = new FakeTime(now)
  })

  afterEach(() => {
    clock.restore()
  })

  it('timezone offset', () => {
    Time.setTimezoneOffset(-480)
    equal(Time.getTimezoneOffset(), -480)
  })

  it('date number', () => {
    Time.getDateNumber() /* make coverage happy */
    equal(Time.getDateNumber(new Date(Date.UTC(2020, 0))), 18262)
    equal(Time.getDateNumber(1577808000000), 18262)
    equal(+Time.fromDateNumber(18262), +new Date(Date.UTC(2019, 11, 31, 16)))
  })

  it('parse time', () => {
    equal(Time.parseTime(''), 0)
    equal(Time.parseTime('0.5s'), Time.second / 2)
    equal(Time.parseTime('0.5m'), Time.minute / 2)
    equal(Time.parseTime('0.5h'), Time.hour / 2)
    equal(Time.parseTime('0.5d'), Time.day / 2)
    equal(Time.parseTime('0.5w'), Time.week / 2)
  })

  it('parse date', () => {
    equal(+Time.parseDate(''), now)
    equal(+Time.parseDate('1min'), now + Time.minute)
    /* std@0.142.0/testing 还未支持
    expect(+Time.parseDate('2:30')).to.approximately(now, Time.day)
    expect(+Time.parseDate('5-1-1:30')).to.approximately(now + 30 * Time.day, Time.day)*/
  })

  it('format time', () => {
    equal(Time.format(Time.millisecond), '1ms')
    equal(Time.format(Time.second), '1s')
    equal(Time.format(Time.minute), '1m')
    equal(Time.format(Time.hour), '1h')
    equal(Time.format(Time.day), '1d')
  })

  // it('format time long', () => {
  //   expect(Time.formatTime(Time.millisecond)).to.equal('0 秒')
  //   expect(Time.formatTime(Time.second)).to.equal('1 秒')
  //   expect(Time.formatTime(Time.minute)).to.equal('1 分钟')
  //   expect(Time.formatTime(Time.minute + 40 * Time.second)).to.equal('1 分钟 40 秒')
  //   expect(Time.formatTime(Time.hour)).to.equal('1 小时')
  //   expect(Time.formatTime(Time.hour + 50 * Time.minute)).to.equal('1 小时 50 分钟')
  //   expect(Time.formatTime(Time.day)).to.equal('1 天')
  //   expect(Time.formatTime(Time.day + 20 * Time.hour)).to.equal('1 天 20 小时')
  // })
})
