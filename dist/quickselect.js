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
  function QuickSelect() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.setHeaderHeight = (0, _lodash.isNumber)(options.setHeaderHeight) ? options.setHeaderHeight : 0;
    this.setItemsFormat = (0, _lodash.isFunction)(options.setItemsFormat) ? options.setItemsFormat : null;
    this.setClass = (0, _lodash.isFunction)(options.setClass) ? options.setClass : function (className) {
      return className;
    };
    this.setMax = (0, _lodash.isNumber)(options.setMax) ? options.setMax : 1000000;
    this.setLang = (0, _lodash.isFunction)(options.setLang) ? options.setLang : function (item) {
      return { items: '\u4E0B\u6CE8 ' + item + ' \u5143', disable: '停用' };
    };

    this.beforeShow = (0, _lodash.isFunction)(options.beforeShow) ? options.beforeShow : null;
    this.afterDisable = (0, _lodash.isFunction)(options.afterDisable) ? options.afterDisable : null;
    this.willSetValue = (0, _lodash.isFunction)(options.willSetValue) ? options.willSetValue : null;

    this.activeElement = null;
    this.event = {
      el: isEl(options.el),
      div: [],
      body: []
    };

    Array.from(document.querySelectorAll('.' + this.setClass('quickSelect'))).map(function (item) {
      item.delete();
    });

    this.div = initial.bind(this)(options.items, options.disable) || null;

    bindEl.bind(this)();

    this.event.body.push(addAndRemove(document, { click: clickOut.bind(this) }));

    this.bind = function () {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.event.el = checkAliveDom(_this.event.el);

      var elements = isEl(el);
      if (elements) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            if (_this.event.el.indexOf(item) === -1) {
              _this.event.el = _this.event.el.concat(item);
              bindEl.bind(_this)([item]);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    };

    this.updateData = function (items, disable) {
      _this.event.el = checkAliveDom(_this.event.el);

      _this.div = initial.bind(_this)(items, disable);
    };

    this.remove = function () {
      unbind.bind(_this)();
      _this.div.parentNode.removeChild(_this.div);
    };

    return this;
  }

  QuickSelect.init = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new QuickSelect(options);
  };

  function createDiv() {
    var _this2 = this;

    var div = create({ append: document.body, class: this.setClass('quickSelect') });
    this.event.div.push(addAndRemove(div, { click: function click(e) {
        e.stopPropagation();
      } }));
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var item = _step2.value;

        _this2.event.div.push(addAndRemove(create({ tag: 'a', append: div, inner: _this2.setLang(item).items, class: _this2.setClass('quickSelect') + '-item' }), {
          mousedown: function mousedown(e) {
            e.preventDefault();
          },
          click: function click(e) {
            if (_this2.willSetValue) {
              _this2.willSetValue(item);
            } else {
              _this2.activeElement.value = item;
              if (_this2.activeElement.onchange) {
                _this2.activeElement.onchange();
              }
            }
            hide.bind(_this2)();
          }
        }));
      };

      for (var _iterator2 = this.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    this.event.div.push(addAndRemove(create({ tag: 'a', append: div, inner: this.setLang().disable, class: this.setClass('quickSelect') + '-item' }), {
      mousedown: function mousedown(e) {
        e.preventDefault();
      },
      click: function click(e) {
        _this2.disable = true;
        hide.bind(_this2)();
        _this2.afterDisable ? _this2.afterDisable() : alert(_this2.setLang().disable);
      }
    }));
    div.delete = function () {
      return _this2.remove();
    };
    return div;
  }

  function bindEl() {
    var _this3 = this;

    var elements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.event.el;
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      var _loop2 = function _loop2() {
        var el = _step3.value;

        addAndRemove(el, {
          focus: function focus() {
            if (_this3.beforeShow) {
              runPromise(_this3.beforeShow).then(function () {
                if (!_this3.disable) {
                  _this3.activeElement = el;
                  show.bind(_this3)(el);
                }
              });
            } else {
              if (!_this3.disable) {
                _this3.activeElement = el;
                show.bind(_this3)(el);
              }
            }
          },
          mousedown: function mousedown(e) {
            if (!_this3.disable) {
              e.target.blur();
              e.target.focus();
            }
          },
          keydown: function keydown(e) {
            if (!_this3.disable) {
              hide.bind(_this3)();
            }
          },
          blur: function blur(e) {
            if (!_this3.disable && (e.target.disabled || e.target)) {
              hide.bind(_this3)();
            }
          }
        });
      };

      for (var _iterator3 = elements[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        _loop2();
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  }

  function show(el) {
    if (!this.disable) {
      this.div.classList.add(this.setClass('is-active'));
      var i = el.getBoundingClientRect();
      var d = this.div.getBoundingClientRect();
      var scrolly = window.scrollY || window.pageYOffset;
      var pos = {
        top: (i.top - d.height < this.setHeaderHeight + 15 ? i.top + scrolly + i.height + 15 : i.top - d.height + scrolly - 15) + 'px',
        left: i.left + i.width / 2 - d.width / 2 + 'px'
      };
      if (i.top - d.height < this.setHeaderHeight + 15) {
        this.div.classList.add(this.setClass('is-top'));
      } else {
        this.div.classList.remove(this.setClass('is-top'));
      }
      for (var atr in pos) {
        this.div.style[atr] = pos[atr];
      }
    }
  }

  function hide() {
    this.div.classList.remove(this.setClass('is-active'));
  }

  function clickOut(e) {
    if (!this.disable && !(0, _lodash.includes)(this.event.el, e.target)) {
      hide.bind(this)();
    }
  }

  function runPromise(func) {
    return new Promise(function (resolve) {
      resolve(func());
    });
  }

  function checkAliveDom(elements) {
    return elements.filter(function (item) {
      if (!document.body.contains(item)) {
        item.destroy();
      }
      return document.body.contains(item);
    });
  }

  function format(items) {
    var _this4 = this;

    return this.setItemsFormat !== null ? this.setItemsFormat(items) : (0, _lodash.take)((0, _lodash.sortBy)((0, _lodash.filter)(items, function (n) {
      return (0, _lodash.isNumber)(n) && n > 0 && n <= _this4.setMax && n % 1 === 0;
    })), 10);
  }

  function initial() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.items;
    var disable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.disable;

    if (this.div) this.div.parentNode.removeChild(this.div);
    this.items = (0, _lodash.isArray)(items) ? format.bind(this)(items) : [10, 25, 50, 100], this.disable = (0, _lodash.isBoolean)(disable) ? disable : true;
    var div = createDiv.bind(this)();

    return div;
  }

  function addAndRemove(el, option) {
    for (var key in option) {
      el.addEventListener(key, option[key]);
    }
    el.destroy = function () {
      for (var _key in option) {
        el.removeEventListener(_key, option[_key]);
      }
    };
    return el;
  }

  function unbind() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (items) {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.event[items][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _item = _step4.value;

          _item.destroy();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      this.event[items] = [];
    } else {
      for (var _items in this.event) {
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = this.event[_items][Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _item2 = _step5.value;

            _item2.destroy();
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        this.event[_items] = [];
      }
    }
  }

  function isEl(el) {
    if ((0, _lodash.isElement)(el)) {
      return [el];
    }
    if ((0, _lodash.isEmpty)(el)) {
      return [];
    }
    if ((0, _lodash.isObject)(el)) {
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = el[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var i = _step6.value;

          if ((0, _lodash.isElement)(i) === false) {
            return [];
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6.return) {
            _iterator6.return();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return Array.from(el);
    } else {
      return [];
    }
  }

  function create() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var set = {
      tag: options.tag || 'div',
      inner: options.inner || null,
      class: options.class || null,
      append: options.append || null
    };
    var el = document.createElement(set.tag);
    if (set.inner) el.innerText = set.inner;
    if (set.class) el.setAttribute('class', set.class);
    if (set.append) set.append.appendChild(el);
    return el;
  }
  module.exports = exports['default'];
});
