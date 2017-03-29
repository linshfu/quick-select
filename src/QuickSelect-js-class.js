import _ from 'lodash'

export default class QuickSelect {
  constructor(init = {}) {
    this.init = initial(init)

    let event = handler(this.init)
  }

  static bind(init) {
    return new QuickSelect(init)
  }

  unbind() {
    event.div.remove()
    for (let item in event.arr) {
      event.arr[item].obj.removeEventListener(event.arr[item].e, event.arr[item].fn)
    }
  }

  update() {
    const newInit = initial(init)
    for (var key in init) {
      this.init[key] = newInit[key]
    }
    this.unbind()
    event = handler(this.init)
  }
}

function initial(init) {
  return {
    elements: (_.isObject(init.elements)) ? _.filter(init.elements, (n) => _.isElement(n) && n.tagName === 'INPUT' && n.type === 'text') : {},
    setAmount: (_.isArray(init.setAmount)) ? _.take(_.sortBy(_.filter(_.compact(_.map(init.setAmount, _.parseInt)), (n) => n >= 0 && n <= 1000000)),10) : [],
    toggle: (_.isBoolean(init.toggle)) ? init.toggle : false,
    prefix: (_.isString(init.prefix) && init.prefix !== '') ? `${init.prefix}-` : '',
    lang: (_.isFunction(init.lang)) ? init.lang : (amount) => {
      return {
        msg: `下注 ${amount} 元`,
        stop: '停用'
      }
    },
    notify: (_.isFunction(init.notify)) ? init.notify : () => alert('停用')
  }
}

function handler(init) {
  if (init.toggle !== false) {
    const arr = []
    const div = cea('div', document.body, {class: `${init.prefix}quickSelect`}, '')
    let active = false
    let select = {}

    arr.push(bind(div, 'mouseover', () => {
      active = true
    }))

    arr.push(bind(div, 'mouseout', () => {
      active = false
    }))

    for (let obj in init.elements) {
      arr.push(bind(init.elements[obj], 'focus', () => {
        if (init.toggle !== false) {
          select = init.elements[obj]
          div.style.display = 'block'
          const i = init.elements[obj].getBoundingClientRect()
          const d = div.getBoundingClientRect()
          const s = { top: `${(i.top - d.height < 0) ? i.top + i.height : i.top - d.height}px`, left: `${i.left + i.width / 2 - d.width /2}px`}
          for(let atr in s){
            div.style[atr] = s[atr];
          }
        }
      }))

      arr.push(bind(init.elements[obj], 'blur', () => {
        if (!active) {
          div.style.display = 'none'
        }
      }))
    }

    for (let key in init.setAmount) {
      bind(cea('a', div, '', init.lang(init.setAmount[key]).msg), 'click', () => {
        select.value = init.setAmount[key]
        div.style.display = 'none'
      })
    }

    bind(cea('a', div, '', init.lang('stop').stop), 'click', () => {
      div.style.display = 'none'
      init.toggle = false
      init.notify()
    })

    return {div: div, arr: arr}
  }
}

function bind(e, t, c) {
  e.addEventListener(t, c)
  return {obj: e, e: t, fn: c}
}

function cea(t, a, atr, i) {
  const el = document.createElement(t)
  if(atr !== {}) {
    for(let key in atr) {
      el.setAttribute(key, atr[key])
    }
  }
  if (i !== '') {
      el.innerText = i
  }
  if (a !== '') {
    a.appendChild(el)
  }
  return el
}
