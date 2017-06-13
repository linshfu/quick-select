import QuickSelect from '../src/QuickSelect-js.js'

if (module.hot) {
  module.hot.accept()
}

const setAmount = [999,20,300,4000,6000,7000,8000]

const lang = (amount) => {
  return {
    msg: t(amount),
    stop: 'stop'
  }
}

window.add = document.querySelectorAll('.quickSelectInput')
const testRemove = () => {
  for (const item of add) {
    item.remove()
  }
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

const set = {
  elements: add,
  setAmount: [5,150,30,50,100,300,1000,3000,5000],
  toggle: true,
  prefix: '',
  lang: lang,
  notify: () => alert(123),
  headerHeight: 116
}

const s = QuickSelect.init(set)

window.testRemove = testRemove
window.v = {setAmount: setAmount}
window.b = {toggle: true}
window.s = s

function t(lang) {
  return `bet $${lang}`
}
