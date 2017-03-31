# quick-select
    // default className=quickSelect

    const setAmount = [5,10,30,50,100,300,1000,3000,5000]

    const elements = document.querySelectorAll('.Input')

    const set = {
      elements: elements,
      setAmount: setAmount,
      toggle: true,
      prefix: '',         // className prefix-quickSelect
      lang: (amount) => {
        return {
          msg: t(amount),
          stop: 'stop'
        }
      },
      headerHeight: 116   // px
    }

    const s = QuickSelect.init(set)
---
    s.push(el)
---
    s.unbind()
---
    s.update({
      setAmount: setAmount,
      toggle: true
    })
