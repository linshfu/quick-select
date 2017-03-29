(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash);
    global.QuickSelectJs = mod.exports;
  }
})(this, function (module, exports, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = QuickSelect;

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function QuickSelect() {
    var _this = this;

    var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.init = initial(init);

    var event = handler(this.init);

    this.unbind = function () {
      event.div.remove();
      for (var item in event.arr) {
        event.arr[item].obj.removeEventListener(event.arr[item].e, event.arr[item].fn);
      }
    };

    this.push = function (el) {
      var elArr = elArray(el);
      if (elArr === undefined) {
        return;
      }
      var initEl = initial({ elements: elArr }).elements;

      _this.init.elements = _this.init.elements.concat(initEl);

      event.arr = event.arr.concat(addInput({
        elements: initEl,
        toggle: _this.init.toggle
      }, event.div));
    };

    this.update = function (init) {
      var newInit = initial(init);
      for (var key in init) {
        _this.init[key] = newInit[key];
      }
      _this.unbind();
      event = handler(_this.init);
    };

    return this;
  }

  QuickSelect.init = function (init) {
    return new QuickSelect(init);
  };

  QuickSelect.active = false;

  function initial(init) {
    return {
      elements: _lodash2.default.isObject(init.elements) ? _lodash2.default.filter(init.elements, function (n) {
        return _lodash2.default.isElement(n) && n.tagName === 'INPUT' && n.type === 'text';
      }) : [],
      setAmount: _lodash2.default.isArray(init.setAmount) ? _lodash2.default.take(_lodash2.default.sortBy(_lodash2.default.filter(_lodash2.default.compact(_lodash2.default.map(init.setAmount, _lodash2.default.parseInt)), function (n) {
        return n >= 0 && n <= 1000000;
      })), 10) : [],
      toggle: _lodash2.default.isBoolean(init.toggle) ? init.toggle : false,
      prefix: _lodash2.default.isString(init.prefix) && init.prefix !== '' ? init.prefix + '-' : '',
      lang: _lodash2.default.isFunction(init.lang) ? init.lang : function (amount) {
        return {
          msg: '\u4E0B\u6CE8 ' + amount + ' \u5143',
          stop: '停用'
        };
      },
      notify: _lodash2.default.isFunction(init.notify) ? init.notify : function () {
        return alert('停用');
      }
    };
  }

  function handler(init) {
    if (init.toggle !== false) {
      var _ret = function () {
        var arr = [];
        var div = cea('div', document.body, { class: init.prefix + 'quickSelect' }, '');

        arr.push(bind(div, 'mouseover', function () {
          QuickSelect.active = true;
        }));

        arr.push(bind(div, 'mouseout', function () {
          QuickSelect.active = false;
        }));
        arr = arr.concat(addInput(init, div));

        var _loop = function _loop(key) {
          bind(cea('a', div, '', init.lang(init.setAmount[key]).msg), 'click', function () {
            addInput.select.value = init.setAmount[key];
            div.style.display = 'none';
          });
        };

        for (var key in init.setAmount) {
          _loop(key);
        }

        bind(cea('a', div, '', init.lang('stop').stop), 'click', function () {
          div.style.display = 'none';
          init.toggle = false;
          init.notify();
        });

        return {
          v: { div: div, arr: arr }
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }
  }

  function addInput(init, div) {
    var arr = [];

    var _loop2 = function _loop2(obj) {
      arr.push(bind(init.elements[obj], 'focus', function () {
        if (init.toggle !== false) {
          addInput.select = init.elements[obj];
          div.style.display = 'block';
          var i = init.elements[obj].getBoundingClientRect();
          var d = div.getBoundingClientRect();
          var s = { top: (i.top - d.height < 0 ? i.top + i.height : i.top - d.height) + 'px', left: i.left + i.width / 2 - d.width / 2 + 'px' };
          for (var atr in s) {
            div.style[atr] = s[atr];
          }
        }
      }));

      arr.push(bind(init.elements[obj], 'blur', function () {
        if (!QuickSelect.active) {
          div.style.display = 'none';
        }
      }));
    };

    for (var obj in init.elements) {
      _loop2(obj);
    }
    return arr;
  }

  function bind(e, t, c) {
    e.addEventListener(t, c);
    return { obj: e, e: t, fn: c };
  }

  function elArray(el) {
    var setEl = {
      '[object HTMLInputElement]': Array(el),
      '[object NodeList]': el
    };
    return setEl[el.toString()];
  }

  function cea(t, a, atr, i) {
    var el = document.createElement(t);
    if (atr !== {}) {
      for (var key in atr) {
        el.setAttribute(key, atr[key]);
      }
    }
    if (i !== '') {
      el.innerText = i;
    }
    if (a !== '') {
      a.appendChild(el);
    }
    return el;
  }
  module.exports = exports['default'];
});
