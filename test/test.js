const assert = require('assert')
const _ = require('lodash')
const QuickSelect = require('../dist/quickselect.js')

describe('QuickSelect.init(set)', function() {
  it('no set should return Object', function() {
    const s = QuickSelect.init()
    assert.equal(true, _.isObject(s))
    describe('QuickSelect.init(set) return Object.', function() {
      it('el should be []', function() {
        assert.equal(true, s.event.el === [])
      })
      it('items should be [10, 25, 50, 100]', function() {
        assert.equal(true, s.items === [10, 25, 50, 100])
      })
      it('disable should be true', function() {
        assert.equal(true, s.disable)
      })
    })
  })
})
