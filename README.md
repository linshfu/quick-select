# quick-select
    const setAmount = [5,10,30,50,100,300,1000,3000,5000]

    const elements = document.querySelectorAll('.Input')

    const set = {
      elements: elements,
      setAmount: setAmount,
      toggle: true,
      prefix: '', // className prefix
      lang: (amount) => {
        return {
          msg: t(amount),
          stop: 'stop'
        }
      }
    }

    const s = QuickSelect.bind(set)

    // default className=quickSelect
---
    s.update({
      setAmount: setAmount,
      toggle: true
    })

    s.unbind()
