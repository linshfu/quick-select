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
      },
      headerHeight: 116
    }

    const s = QuickSelect.init(set)

    // default className=quickSelect
---
    s.push(el)
---
    s.update({
      setAmount: setAmount,
      toggle: true
    })

    s.unbind()
