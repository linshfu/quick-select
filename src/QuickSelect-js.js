import {
  isFunction,
  isObject,
  isElement,
  isArray,
  isEmpty,
  isBoolean,
  isNumber,
  take,
  sortBy,
  filter,
  includes
} from 'lodash'

export default function QuickSelect(options = {}) {
  this.setHeaderHeight = isNumber(options.setHeaderHeight) ? options.setHeaderHeight : 0
  this.setItemsFormat = isFunction(options.setItemsFormat) ? options.setItemsFormat : null
  this.setClass = isFunction(options.setClass) ? options.setClass : className => className
  this.setMax = isNumber(options.setMax) ? options.setMax : 1000000
  this.setLang = isFunction(options.setLang) ? options.setLang : item => {
    return { items: `下注 ${item} 元`, disable: '停用'}
  }

  this.beforeShow = isFunction(options.beforeShow) ? options.beforeShow : null
  this.afterDisable = isFunction(options.afterDisable) ? options.afterDisable : null
  this.willSetValue = isFunction(options.willSetValue) ? options.willSetValue : null

  this.activeElement = null
  this.event = {
    el: isEl(options.el),
    div: [],
    body: []
  }

  Array.from(document.querySelectorAll(`.${this.setClass('quickSelect')}`)).map((item) => {
    item.delete()
  })

  this.div = initial.bind(this)(options.items, options.disable) || null

  bindEl.bind(this)()

  this.event.body.push(
    addAndRemove(document, { click: clickOut.bind(this) })
  )

  this.event.body.push(
    // addAndRemove(window, { resize: hide.bind(this) })
  )

  this.bind = (el = {}) => {
    this.event.el = checkAliveDom(this.event.el)

    const elements = isEl(el)
    if (elements) {
      for (const item of elements) {
        if (this.event.el.indexOf(item) === -1) {
          this.event.el = this.event.el.concat(item)
          bindEl.bind(this)([item])
        }
      }
    }
  }

  this.updateData = (items, disable) => {
    this.event.el = checkAliveDom(this.event.el)

    this.div = initial.bind(this)(items, disable)
  }

  this.remove = () => {
    unbind.bind(this)()
    this.div.parentNode.removeChild(this.div)
  }

  return this
}

QuickSelect.init = (options = {}) => {
  return new QuickSelect(options)
}

function createDiv () {
  const div = create({ append: document.body, class: this.setClass('quickSelect') })
  this.event.div.push(
    addAndRemove(div, { click: (e) => { e.stopPropagation() } })
  )
  for (const item of this.items) {
    this.event.div.push(
      addAndRemove(create({ tag: 'a', append: div, inner: this.setLang(item).items, class: `${this.setClass('quickSelect')}-item` }), {
        mousedown: (e) => {
          e.preventDefault()
        },
        click: (e) => {
          if (this.willSetValue) {
            this.willSetValue(item)
          } else {
            this.activeElement.value = item
            if (this.activeElement.onchange) {
              this.activeElement.onchange()
            }
          }
          hide.bind(this)()
        }
      })
    )
  }
  this.event.div.push(
    addAndRemove(create({ tag: 'a', append: div, inner: this.setLang().disable, class: `${this.setClass('quickSelect')}-item` }), {
      mousedown: (e) => {
        e.preventDefault()
      },
      click: (e) => {
        this.disable = true
        hide.bind(this)()
        this.afterDisable ? this.afterDisable() : alert(this.setLang().disable)
      }
    })
  )
  div.delete = () => this.remove()
  return div
}

function bindEl (elements = this.event.el) {
  for (const el of elements) {
    addAndRemove(el, {
      focus: () => {
        if (this.beforeShow) {
          runPromise(this.beforeShow).then(() => {
            if (!this.disable) {
              this.activeElement = el
              show.bind(this)(el)
            }
          })
        } else {
          if (!this.disable) {
            this.activeElement = el
            show.bind(this)(el)
          }
        }
      },
      mousedown: (e) => {
        if (!this.disable) {
          e.target.blur()
          e.target.focus()
        }
      },
      keydown: (e) => {
        if (!this.disable) {
          hide.bind(this)()
        }
      },
      blur: (e) => {
        if (!this.disable && (e.target.disabled || e.target)) {
          hide.bind(this)()
        }
      }
    })
  }
}

function show (el) {
  if (!this.disable) {
    this.div.classList.add(this.setClass('is-active'))
    const i = el.getBoundingClientRect()
    const d = this.div.getBoundingClientRect()
    const scrollx = window.scrollX || window.pageXOffset
    const scrolly = window.scrollY || window.pageYOffset

    const pos = {
      top: `${
        (i.top - d.height < this.setHeaderHeight + 15)
        ? i.top + scrolly + i.height + 15
        : i.top - d.height + scrolly - 15
      }px`,
      left: `${
        i.left + i.width / 2 - d.width /2 + scrollx
      }px`
    }
    if (i.top - d.height < this.setHeaderHeight + 15) {
      this.div.classList.add(this.setClass('is-top'))
    } else {
      this.div.classList.remove(this.setClass('is-top'))
    }
    for (let atr in pos) {
      this.div.style[atr] = pos[atr]
    }
  }
}

function hide () {
  this.div.classList.remove(this.setClass('is-active'))
}

function clickOut (e) {
  if (!this.disable && !includes(this.event.el, e.target)) {
    hide.bind(this)()
  }
}

function runPromise (func) {
  return new Promise((resolve) => {
    resolve(func())
  })
}

function checkAliveDom(elements) {
  return elements.filter((item) => {
    if (!document.body.contains(item)) {
      item.destroy()
    }
    return document.body.contains(item)
  })
}

function format (items) {
  return this.setItemsFormat !== null
  ? this.setItemsFormat(items)
  : take(sortBy(filter(items, n => isNumber(n) && n > 0 && n <= this.setMax && n % 1 === 0)), 10)
}

function initial (items = this.items, disable = this.disable) {
  if (this.div) this.div.parentNode.removeChild(this.div)
  this.items = isArray(items) ? format.bind(this)(items) : [10, 25, 50, 100],
  this.disable = isBoolean(disable) ? disable : true
  const div = createDiv.bind(this)()

  return div
}

function addAndRemove (el, option) {
  for (const key in option) {
    el.addEventListener(key, option[key])
  }
  el.destroy = () => {
    for (const key in option) {
      el.removeEventListener(key, option[key])
    }
  }
  return el
}

function unbind (items = null) {
  if (items) {
    for (const item of this.event[items]) {
      item.destroy()
    }
    this.event[items] = []
  } else {
    for (const items in this.event) {
      for (const item of this.event[items]) {
        item.destroy()
      }
      this.event[items] = []
    }
  }
}

function isEl (el) {
  if (isElement(el)) {
    return [el]
  }
  if (isEmpty(el)) {
    return []
  }
  if (isObject(el)) {
    for (let i of el) {
      if (isElement(i) === false) {
        return []
      }
    }
    return Array.from(el)
  } else {
    return []
  }
}

function create (options = {}) {
  const set = {
    tag: options.tag || 'div',
    inner: options.inner || null,
    class: options.class || null,
    append: options.append || null
  }
  const el = document.createElement(set.tag)
  if (set.inner) el.innerText = set.inner
  if (set.class) el.setAttribute('class', set.class)
  if (set.append) set.append.appendChild(el)
  return el
}
