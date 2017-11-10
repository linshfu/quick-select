import QuickSelect from '../src/QuickSelect-js.js'

if (module.hot) {
  module.hot.accept()
}

window.elements = document.querySelectorAll('.quickSelectInput')
window.elements1 = document.querySelectorAll('.quickSelectInput1')
window.elements2 = document.querySelectorAll('.setSelectButton')
window.elements3 = document.getElementById('tes')
window.elements4 = document.querySelectorAll('.testnumber')
window.setAmount = [2,3,4,5,6,7]

// for (const item of elements) {
//   item.onchange = () => {
//     console.log('change')
//   }
// }
const testRemove = () => {
  for (const item of elements) {
    item.remove()
  }
}

const testDisable = () => {
  for (const item of elements) {
    item.disabled = true
  }
}

// setTimeout(() => testDisable(), 5000)

window.testRemove = testRemove
window.testDisable = testDisable

// const options = {
  // el: elements,
  // items: [1,2,3,4,5, 999999],
  // disable: false,
  // beforeShow () {
  //   const test = () => {
  //     for (const item of elements) {
  //       console.log('beforeShow')
  //     }
  //   }
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(test()), 500)
  //   })
  // },
  // afterDisable () {
  //   console.log('Disable')
  // },
  // setItemsFormat (items) {
  //   return items
  // },
  // setClass (className) {
  //   return `prefix-${className}`
  // },
  // setLang (item) {
  //   return {
  //     items: `${item}`,
  //     disable: 'disable'
  //   }
  // }
// }

const options = {
  el: elements,
  items: [123,223,323,423,9999999999,623,723,823,923,435],
  disable: false,
  setHeaderHeight: 116,
  setMax: 9999999999
}

const s = QuickSelect.init(options)
window.s = s
