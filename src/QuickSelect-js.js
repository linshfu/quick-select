import _ from 'lodash'

export default function QuickSelect(init = {}) {
  this.init = initial(init)

  let event = handler(this.init)

  this.unbind = () => {
    event.div.remove()
    for (let item in event.arr) {
      event.arr[item].obj.removeEventListener(event.arr[item].e, event.arr[item].fn)
    }
  }

  this.push = (el) => {
    const initEl = initial({elements: el}).elements
    if (initEl === []) {
      return
    }
    this.init.elements = this.init.elements.concat(initEl)
    event.arr = event.arr.concat(addInput({
      elements: initEl,
      toggle: this.init.toggle
    }, event.div))
  }

  this.update = (init) => {
    const newInit = initial(init)
    for (var key in init) {
      this.init[key] = newInit[key]
    }
    this.unbind()
    event = handler(this.init)
  }

  return this
}

QuickSelect.init = function (init) {
  return new QuickSelect(init)
}

QuickSelect.active = false

function initial(init) {
  return {
    elements: (_.isObject(init.elements)) ? _.filter(init.elements, (n) => _.isElement(n) && n.tagName === 'INPUT' && n.type === 'text') : [],
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
    let arr = []
    const div = cea('div', document.body, {class: `${init.prefix}quickSelect`}, '')

    arr.push(bind(div, 'mouseover', () => {
      QuickSelect.active = true
    }))

    arr.push(bind(div, 'mouseout', () => {
      QuickSelect.active = false
    }))
    arr = arr.concat(addInput(init, div))

    for (let key in init.setAmount) {
      bind(cea('a', div, '', init.lang(init.setAmount[key]).msg), 'click', () => {
        addInput.select.value = init.setAmount[key]
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

function addInput(init, div) {
  const arr = []
  for (let obj in init.elements) {
    arr.push(bind(init.elements[obj], 'focus', () => {
      if (init.toggle !== false) {
        addInput.select = init.elements[obj]
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
      if (!QuickSelect.active) {
        div.style.display = 'none'
      }
    }))
  }
  return arr
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
