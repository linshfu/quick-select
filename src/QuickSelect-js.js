import _ from 'lodash'

export default function QuickSelect(init = {}) {
  this.init = initial(init)

  let event = handler(this.init)

  this.unbind = () => {
    for (let item in event.arr) {
      event.arr[item].obj.removeEventListener(event.arr[item].e, event.arr[item].fn)
    }
    event.div.remove()
  }

  this.push = (el) => {
    const elArr = elArray(el)
    if (elArr === undefined) {
      return
    }
    const initEl = initial({elements: elArr}).elements

    this.init.elements = this.init.elements.concat(initEl)

    event.arr = event.arr.concat(addInput(initEl, this.init, event.div))
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
    notify: (_.isFunction(init.notify)) ? init.notify : () => alert('停用'),
    headerHeight: (_.isNumber(init.headerHeight)) ? init.headerHeight : 0,
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

    arr = arr.concat(addInput(init.elements, init, div))

    for (let key in init.setAmount) {
      bind(cea('a', div, '', init.lang(init.setAmount[key]).msg), 'click', () => {
        addInput.select.value = init.setAmount[key]
        if (addInput.select.onchange !== null) {
          addInput.select.onchange()
        }
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

function addInput(elements, init, div) {
  const arr = []

  for (let obj in elements) {
    arr.push(bind(elements[obj], 'focus', () => {
      if (init.toggle !== false) {
        addInput.select = elements[obj]
        div.style.display = 'block'
        const i = elements[obj].getBoundingClientRect()
        const d = div.getBoundingClientRect()
        const h = (window.scrollY < init.headerHeight) ? init.headerHeight : 0
        const s = {
          top: `${
            (i.top - d.height < h)
            ? i.top + window.scrollY + i.height + 15
            : i.top - d.height + window.scrollY - 15
          }px`,
          left: `${
            i.left + i.width / 2 - d.width /2
          }px`
        }
        div.className = (i.top - d.height < h)
        ? `${init.prefix}quickSelect is-top`
        : `${init.prefix}quickSelect`
        for(let atr in s){
          div.style[atr] = s[atr];
        }
      }
    }))

    arr.push(bind(elements[obj], 'blur', () => {
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

function elArray(el) {
  const setEl = {
    '[object HTMLInputElement]': Array(el),
    '[object NodeList]': el
  }

  return setEl[el.toString()]
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
