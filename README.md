# quick-select
    import QuickSelect from 'quick-select'

    const qs = QuickSelect.init({
      el: document.querySelectorAll('.Input'), // default: []
      items: [1,2,3,4,5],                      // default: [10, 25, 50, 100]
      disable: false,                          // default: true

      beforeShow () {                          // default: null
        alert('beforeShow')
      },

      afterDisable () {                        // default: null
        alert(‘Disable’)
      },

      setItemsFormat (items) {                 // default: 取10組 Number 1000000 > n > 0
        return items
      },

      setClass (className) {                   // default: quickSelect
        return `prefix-${className}`
      },

      setLang (item) {                         // default: { items: `下注 ${item} 元`, disable: '停用'}
        return {
          items: `bet $${item}`,
          disable: 'disable'
        }
      },
      
      setHeaderHeight: 116,                    // default: 0
    })

    qs.bind(document.querySelectorAll('.Input'))

    qs.updateDate([10, 25, 50, 100], true)

    qs.remove()

