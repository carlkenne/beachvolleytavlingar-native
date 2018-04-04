import { get } from '../parseHtml'

describe('should parse ', () => {
  it('from arrays', () => {
    const data = [
      { key: 'spelplats', values: [1, 2, 3] },
      { key: 'tom', values: [] },
    ]
    expect(get(data, 'spelplats')).toEqual(1)
    expect(get(data, 'tom')).toEqual('')
  })
})
