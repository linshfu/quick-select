import _ from 'lodash'
import Vue from 'vue'

export default class QuickSelect {
  constructor (init = {}) {
    this.init = {
      elements: (_.isObject(init.elements)) ? _.filter(init.elements, (n) => _.isElement(n) && n.tagName === 'INPUT' && n.type === 'text') : {},
      setAmount: (_.isArray(init.setAmount)) ? _.take(_.sortBy(_.filter(_.compact(_.map(init.setAmount, _.parseInt)), (n) => n >= 0 && n <= 1000000)),10) : [],
      toggle: (_.isBoolean(init.toggle)) ? init.toggle : false,
      prefix: (_.isString(init.prefix) && init.prefix !== '') ? `${init.prefix}-` : ''
    }
    create(this.init)
  }

  static bind (init) {
    return new QuickSelect(init)
  }
}

function create (init) {
  const el = document.createElement('div')
  document.body.appendChild(el)

  new Vue({
    name: 'selectBox',
    el: el,
    data: {
      init: init,
      mouseout: true,
      show: false,
      active: Object
    },
    template: '<div class="quickSelect" v-show="show" @mouseover="mi" @mouseout="mo"><a v-for="item in init.setAmount" @click="select(item)">下注{{ item }}元</a><a @click="toggle">停用</a></div>',
    methods: {
      select (item) {
        this.active.value = item
        this.show = false
      },
      toggle () {
        this.init.toggle = false
        this.show = false
      },
      mi () {
        this.mouseout = false
      },
      mo () {
        this.mouseout = true
      }
    },
    mounted: function () {
      const vueThis = this
      for (let obj of this.init.elements) {
        obj.addEventListener('focus', function() {
          if (vueThis.init.toggle) {
            vueThis.show = true
            vueThis.$el.style.display = ''
            position(this, vueThis.$el)
            vueThis.active = this
          }
        })
        obj.addEventListener('blur', function(event) {
          if (vueThis.mouseout) {
            vueThis.show = false
          }
        })
      }
    }
  })
}
function position(input, div) {
  const i = input.getBoundingClientRect()
  const d = div.getBoundingClientRect()
  const s = { top: `${(i.top - d.height < 0) ? i.top + i.height : i.top - d.height}px`, left: `${i.left + i.width / 2 - d.width /2}px`}
  for(let atr in s){
    div.style[atr] = s[atr];
  }
}
