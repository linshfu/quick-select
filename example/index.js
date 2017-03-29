import QuickSelect from '../src/QuickSelect.js'

if (module.hot) {
  module.hot.accept()
}

// const elements = document.querySelectorAll('.quickSelectInput, .setSelectButton')
// const setAmount = [5,10,30,50,100,300,1000,3000,5000]
const setAmount1 = [999,20,300,4000,6000,7000,8000]

const lang = (amount) => {
  return {
    msg: t(amount),
    stop: 'stop'
  }
}

const set = {
  elements: document.querySelectorAll('.quickSelectInput, .setSelectButton'),
  setAmount: [5,150,30,50,100,300,1000,3000,5000],
  toggle: true,
  prefix: '',
  lang: lang,
  notify: () => alert(123)
}

const s = QuickSelect.bind(set)

window.v = {setAmount: setAmount1}
window.b = {toggle: true}
window.s = s

function t(lang) {
  return `bet $${lang}`
}
