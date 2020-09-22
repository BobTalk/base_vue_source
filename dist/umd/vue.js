(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function isObject(data) {
    return _typeof(data) == 'object' && data != null;
  }
  function def(data, key, value) {
    Object.defineProperty(data, key, {
      enumerable: false,
      // 不参与循环
      writable: false,
      configurable: false,
      value: value
    });
  }
  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newVal) {
        return vm[source][key] = newVal;
      }
    });
  }
  var LIFECYCLE_HOOKS = ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed', 'activated', 'deactivated', 'errorCaptured', 'serverPrefetch'];
  var stratas = {}; // 合并钩子函数 参数来源与 stratas[key](parent[key], child[key]) 

  function mergeHook(parentVal, childVal) {
    console.log('mergeHook');

    if (childVal) {
      if (parentVal) {
        return parentVal.concat(childVal);
      } else {
        return [childVal];
      }
    } else {
      return parentVal;
    }
  }

  LIFECYCLE_HOOKS.forEach(function (hook) {
    console.log('LIFECYCLE_HOOKS');
    stratas[hook] = mergeHook;
  });

  function mergeAssets(parentVal, childVal) {
    var res = Object.create(parentVal);

    if (childVal) {
      for (var key in childVal) {
        res[key] = childVal[key];
      }
    }

    return res;
  }

  stratas.components = mergeAssets; // 合并配置选项

  function mergeOptions(parent, child) {
    console.log(parent);
    var options = {};

    for (var key in parent) {
      mergeField(key);
    }

    for (var _key in child) {
      // 如果已合并 就不在合并
      if (!parent.hasOwnProperty(_key)) {
        mergeField(_key);
      }
    }

    function mergeField(key) {
      console.log("mergeField"); // 主要用于生命周期

      if (stratas[key]) {
        return options[key] = stratas[key](parent[key], child[key]);
      }

      if (_typeof(parent[key]) === 'object' && _typeof(child[key]) === 'object') {
        options[key] = _objectSpread2(_objectSpread2({}, parent[key]), child[key]);
      } else if (child[key] == null) {
        options[key] = parent[key];
      } else {
        options[key] = child[key];
      }
    }

    return options;
  }
  var isReservedTag = function isReservedTag(tagName) {
    var str = "p, div, span, input, button, h1, h2, h3, h4, h5, textarea, hr, select";
    var obj = {};
    str.split(',').forEach(function (tag) {
      obj[tag.trim()] = true;
    });
    return obj[tagName];
  };

  var oldArrayMethods = Array.prototype; // value.__proto__ = arrayMethods
  // arrayMethods.__proto__ = oldArrayMethods

  var arrayMethods = Object.create(oldArrayMethods);
  var methods = ['push', 'shift', 'unshift', 'pop', 'sort', 'splice', 'reverse'];
  methods.forEach(function (method) {
    arrayMethods[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = oldArrayMethods[method].apply(this, args);
      var inserted;
      var ob = this.__ob__;

      switch (method) {
        case "push":
        case "unshift":
          inserted = args;

        case 'splice':
          inserted = args.slice(2);
      }

      if (inserted) ob.observeArray(inserted);
      ob.dep.notify();
      return result;
    };
  });

  var id = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id;
      this.subs = [];
    }

    _createClass(Dep, [{
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "depend",
      value: function depend() {
        Dep.target.addDep(this); // this.subs.push(Dep.target) // 观察者模式
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }();
  var stack = [];
  function pushTarget(watcher) {
    Dep.target = watcher;
    stack.push(watcher);
  }
  function popTarget() {
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var Observe = /*#__PURE__*/function () {
    function Observe(value) {
      _classCallCheck(this, Observe);

      this.dep = new Dep();
      def(value, '__ob__', this);

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods;
        this.observeArray(value);
      } else {
        this.walk(value); // 对数组进行监控
      }
    }

    _createClass(Observe, [{
      key: "observeArray",
      value: function observeArray(value) {
        for (var i = 0; i < value.length; i++) {
          observe(value[i]);
        }
      }
    }, {
      key: "walk",
      value: function walk(data) {
        var keys = Object.keys(data);
        keys.forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observe;
  }(); // 核心 数据拦截


  function defineReactive(data, key, value) {
    var dep = new Dep(); // observe(value)

    var childOb = observe(value); // 返回结果为observe实例

    Object.defineProperty(data, key, {
      configurable: true,
      enumerable: true,
      get: function get() {
        console.log('get Val');

        if (Dep.target) {
          // 当前watcher
          dep.depend();

          if (childOb) {
            childOb.dep.depend(); // 收集数组依赖

            if (Array.isArray(value)) {
              //主要用于数组中的数据又是数组
              dependArray(value);
            }
          }
        }

        return value;
      },
      set: function set(newVal) {
        console.log('set Val');
        if (newVal == value) return;
        observe(newVal);
        value = newVal;
        dep.notify(); // 执行warcher
      }
    });
  }

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }

  function observe(data) {
    var isObj = isObject(data);
    if (!isObj) return; // 是否是对象

    return new Observe(data); // 观察数据
  }

  function initState(vm) {
    console.log(vm); // 数据来源 data props ...

    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      initData(vm);
    }

    if (opts.computed) ;

    if (opts.watch) ;
  }

  function initData(vm) {
    var data = vm.$options.data;
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 需要把数据挂到实例上 否者会导致无法修改

    for (var key in data) {
      proxy(vm, '_data', key);
    } // 数据劫持函数


    observe(data);
  }

  /**
   *  ?: 匹配不捕获
   *  @summary 模版编译
   */
  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // abc-dfc

  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
  var startTagOpen = new RegExp("^<" + qnameCapture);
  var startTagClose = /^\s*(\/?)>/;
  var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>");
  function parseHTML(html) {
    var root = null;
    var currentParent; // 标识但前父级

    var stack = [];
    var ELEMENT_TYPE = 1;
    var TEXT_TYPE = 3;

    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        type: ELEMENT_TYPE,
        children: [],
        attrs: attrs,
        parent: null
      };
    }

    function start(tagName, attrs) {
      var element = createASTElement(tagName, attrs);

      if (!root) {
        root = element;
      }

      currentParent = element;
      stack.push(element);
    }

    function chars(text) {
      console.log('文本', text);
      text = text.replace(/\s/g, '');

      if (text) {
        currentParent.children.push({
          text: text,
          type: TEXT_TYPE
        });
      }
    }

    function end(tagName) {
      console.log('结束标签', tagName);
      var element = stack.pop();
      currentParent = stack[stack.length - 1];

      if (currentParent) {
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd == 0) {
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          advance(endTagMatch[0].length);
          end(endTagMatch[1]);
          continue;
        }
      }

      var text = void 0;

      if (textEnd >= 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        advance(text.length);
        chars(text);
      }
    }

    function advance(n) {
      html = html.substring(n);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr;

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          advance(attr[0].length);
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
        }

        console.log(match);
        console.log(html);

        if (_end) {
          advance(_end[0].length);
          return match;
        }
      }
    }

    return root;
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
  function generate(el) {
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "', ").concat(el.attrs.length ? genProps(el.attrs) : "undefined").concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  function genProps(attrs) {
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i];

      if (attr.name == 'style') {
        (function () {
          var obj = {};
          attr.value.split(';').forEach(function (item) {
            var _item$split = item.split(":"),
                _item$split2 = _slicedToArray(_item$split, 2),
                key = _item$split2[0],
                value = _item$split2[1];

            obj[key] = value;
          });
          attr.value = obj;
        })();
      }

      console.log(attr);
      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ",");
    }

    console.log(str);
    return "{".concat(str.slice(0, -1), "}");
  }

  function genChildren(el) {
    var children = el.children;

    if (children && children.length > 0) {
      return "".concat(children.map(function (c) {
        return gen(c);
      }).join(','));
    } else {
      return false;
    }
  }

  function gen(node) {
    if (node.type == 1) {
      // 元素
      return generate(node);
    } else {
      var text = node.text;
      var tokens = []; // 重置正则指针

      var lastIndex = defaultTagRE.lastIndex = 0;
      var match, index;

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function compileToFunction(template) {
    // 1. 解析html字符串 将html字符串 ==》ast语法树
    var root = parseHTML(template); //  2. 需要将ast语法树生成最终的render函数（字符串拼接）

    var code = generate(root); // 将ast树再次转化成js语法 _c('div', {id:'', style:{}},_c('p',undefined,_v('hello')))
    // 使用new Function 结合with实现所有的模版

    var renderFn = new Function("with(this){return ".concat(code, "}")); // 返回虚拟dom (对象)

    return renderFn;
  }

  var callbacks = [];
  var waiting = true;
  function nextTick(cb) {
    callbacks.push(cb);

    if (waiting) {
      setTimeout(function () {
        callbacks.forEach(function (fn) {
          return fn();
        });
        waiting = true;
        callbacks = [];
      }, 0);
      waiting = false;
    }
  }

  var queue = [];
  var has = {};

  function flushSchedularQueue() {
    queue.forEach(function (watcher) {
      return watcher.run();
    });
    queue = [];
    has = {};
  }

  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      queue.push(watcher);
      has[id] = true;
      nextTick(flushSchedularQueue);
    }
  }

  var id$1 = 0;

  var Watcher = /*#__PURE__*/function () {
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm;
      this.getter = exprOrFn;
      this.cb = cb;
      this.id = id$1++;
      this.depsId = new Set();
      this.deps = [];
      this.options = options;
      this.get(); // 渲染函数执行
    }

    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        pushTarget(this); // 收集watcher

        this.getter();
        popTarget(); // 删除watcher
      }
    }, {
      key: "update",
      value: function update() {
        queueWatcher(this); // 主要用于多次出发收集完毕后一次执行
        // this.getter()
      }
    }, {
      key: "run",
      value: function run() {
        this.get();
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        // 不能存放重复的dep/watcher
        var id = dep.id;

        if (this.depsId.has(id)) {
          this.depsId.add(id);
          this.deps.push(dep);
          dep.addSub(this); // this => watcher 函数在dep.js中
        }
      }
    }]);

    return Watcher;
  }();

  function patch(oldVnode, vnode) {
    console.log(oldVnode, vnode); // 判断是更新还是渲染

    var isRealElement = oldVnode.nodeType;

    if (isRealElement) {
      var oldEle = oldVnode;
      var parentEle = oldEle.parentNode;
      var el = createElm(vnode);
      parentEle.insertBefore(el, oldEle.nextSibling);
      parentEle.removeChild(oldEle);
      return el; //供mount函数使用
    }
  }

  function createElm(vnode) {
    var tag = vnode.tag,
        children = vnode.children,
        key = vnode.key,
        data = vnode.data,
        text = vnode.text;

    if (typeof tag === 'string') {
      vnode.el = document.createElement(tag);
      updateProps(vnode);
      children && children.forEach(function (child) {
        return vnode.el.appendChild(createElm(child));
      });
    } else {
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }

  function updateProps(vnode) {
    var newProps = vnode.data || {};
    var el = vnode.el;

    for (var key in newProps) {
      if (key == 'style') {
        for (var styleName in newProps.style) {
          el.style[styleName] = newProps.style[styleName];
        }
      } else if (key == 'class') {
        el.className = newProps["class"];
      } else {
        el.setAttribute(key, newProps[key]);
      }
    }
  }

  function mountComponent(vm, el) {
    var options = vm.$options;
    vm.$el = el;
    callHook(vm, 'beforeMount');

    var updateComponent = function updateComponent() {
      // 通过虚拟dom 创建真实dom
      vm._update(vm._render());
    };

    new Watcher(vm, updateComponent, function () {}, true);
    callHook(vm, 'mounted');
  }
  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vNode) {
      console.log(vNode);
      var vm = this;
      vm.$el = patch(vm.$el, vNode); //使用虚拟节点渲染真实dom
    };
  }
  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this; // 用户传入的 与全局合并 options 千万别写错了

      console.log(vm.constructor);
      vm.$options = mergeOptions(vm.constructor.options, options);
      callHook(vm, 'beforeCreate'); // 初始化状态

      initState(vm);
      callHook(vm, 'created'); // render渲染

      if (vm.$options.el) {
        vm.$mount(vm.$options.el);
      }
    };

    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 先查找render template 最后用el

      if (!options.render) {
        var template = options.template;

        if (!template && el) {
          template = el.outerHTML;
        }

        options.render = compileToFunction(template);
      }

      mountComponent(vm, el);
    };

    Vue.prototype.$nextTick = nextTick;
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var key = data.key;

    if (key) {
      delete data.key;
    }

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    if (isReservedTag(tag)) {
      return vnode(tag, data, key, children, undefined);
    } else {
      // 组件
      var Ctor = vm.$options.components[tag];
      return createComponent(vm, tag, data, key, children, Ctor);
    }
  }

  function createComponent(vm, tag, data, key, children, Ctor) {
    var constructorFn;

    if (isObject(Ctor)) {
      // 调用extend.js中的extend
      constructorFn = vm.$options._base.extend(Ctor);
    }

    var cid = constructorFn && constructorFn.cid;
    return vnode("vue-component-".concat(cid, "-").concat(tag), data, key, undefined, {
      constructorFn: constructorFn,
      children: children
    });
  } // 文本节点


  function createTextNode(vm, text) {
    return vnode(undefined, undefined, undefined, undefined, text);
  }

  function vnode(tag, data, key, children, text, componentOptions) {
    return {
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text,
      componentOptions: componentOptions
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };

    Vue.prototype._v = function (text) {
      return createTextNode(this, text);
    };

    Vue.prototype._s = function (val) {
      return val == null ? '' : _typeof(val) === 'object' ? JSON.stringify(val) : val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      return render.call(vm);
    };
  }

  function initMixin$1(Vue) {
    Vue.mixin = function (mixin) {
      // this => Vue
      // 如何实现两个对象的合并
      console.log(this);
      this.options = mergeOptions(this.options, mixin);
    };
  }

  var ASSETS_TYPE = ["component", "filter", 'directive'];

  function initAssetRegisters(Vue) {
    ASSETS_TYPE.forEach(function (type) {
      Vue[type] = function (id, definition) {
        console.log(id);
        console.log(definition);
        console.log(type);

        if (type == 'component') {
          definition = this.options._base.extend(definition);
        }

        this.options[type + 's'][id] = definition;
      };
    });
  }

  var cid = 0;
  function initExtend(Vue) {
    Vue.extend = function (extendOptions) {
      console.log(extendOptions);

      var Sub = function VueComponent(options) {
        this._init(options);
      };

      Sub.prototype = Object.create(this.prototype);
      Sub.prototype.constructor = Sub;
      Sub.cid = cid++;
      Sub.options = mergeOptions(this.options, extendOptions);
      console.dir(Sub);
      return Sub;
    };
  }

  function initGlobalAPI(Vue) {
    Vue.options = {};
    initMixin$1(Vue); // 初始化 组件 指令 过滤器

    ASSETS_TYPE.forEach(function (type) {
      Vue.options[type + 's'] = {};
    });
    Vue.options._base = Vue;
    initExtend(Vue); //注册extend

    initAssetRegisters(Vue);
  }

  function Vue(options) {
    this._init(options); // 在原型上

  }

  initMixin(Vue);
  renderMixin(Vue);
  lifecycleMixin(Vue);
  initGlobalAPI(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
