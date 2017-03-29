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


window.add = document.querySelectorAll('.q1')
window.add1 = document.querySelectorAll('.q2')

const set = {
  setAmount: [5,150,30,50,100,300,1000,3000,5000],
  toggle: true,
  prefix: '',
  lang: lang,
  notify: () => alert(123)
}

const s = QuickSelect.init(set)

const fff = document.querySelectorAll('.q1')

for (var el in fff) {
  s.push(fff[el])
}

window.v = {setAmount: setAmount}
window.b = {toggle: true}
window.s = s

function t(lang) {
  return `bet $${lang}`
}
