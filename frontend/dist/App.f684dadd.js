// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/utils/Observer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observer = exports.Observable = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Observer = exports.Observer = /*#__PURE__*/function () {
  function Observer() {
    _classCallCheck(this, Observer);
  }
  _createClass(Observer, [{
    key: "notify",
    value: function notify(event, data) {
      throw new Error('This method should be overridden by subclass');
    }
  }]);
  return Observer;
}();
var Observable = exports.Observable = /*#__PURE__*/function () {
  function Observable() {
    _classCallCheck(this, Observable);
  }
  _createClass(Observable, [{
    key: "addObserver",
    value: function addObserver(observer) {
      this.observers.push(observer);
    }
  }, {
    key: "removeObserver",
    value: function removeObserver(observer) {
      var index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    }
  }, {
    key: "notifyObservers",
    value: function notifyObservers(event, data) {
      var _iterator = _createForOfIteratorHelper(this.observers),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var observer = _step.value;
          observer.notify(event, data);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);
  return Observable;
}();
},{}],"src/models/Renderer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Observer2 = require("../utils/Observer.js");
var _class;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Renderer = exports.default = /*#__PURE__*/function (_Observer) {
  _inherits(Renderer, _Observer);
  var _super = _createSuper(Renderer);
  function Renderer() {
    var _this;
    _classCallCheck(this, Renderer);
    _this = _super.call(this);
    _this.grid = document.querySelector('.grid');
    return _this;
  }

  // CSS Classes 
  _createClass(Renderer, [{
    key: "notify",
    value: function notify(event, data) {
      console.log("Renderer received event: ".concat(event, ", with data:"), data);
      if (event === 'DeselectAll') {
        this.deselectAll();
      }
      if (event === 'ToggleCellSelect') {
        this.toggleCellSelect(data);
      }
      if (event === 'SelectCell') {
        this.deselectAll();
        this.select(data);
      }
      if (event === 'UpdateCellValues') {
        this.updateSelectedCellValues(data);
      }
      if (event === 'ClearSelectedCells') {
        this.clearSelectedCells();
      }
    }
  }, {
    key: "createAndAppendDiv",
    value:
    // Methods
    function createAndAppendDiv(parentElement, manipulateFn) {
      var newDiv = document.createElement("div");
      if (typeof manipulateFn === "function") {
        manipulateFn(newDiv, this);
      }
      parentElement.appendChild(newDiv);
    }
  }, {
    key: "generateGrid",
    value: function generateGrid(size) {
      // Clear grid
      this.grid.innerHTML = '';

      // Calculate pixel size of grid
      var gridSize = Math.min(400, Math.max(300, window.innerWidth - 50));
      var cellSize = gridSize / size;
      this.grid.style.width = "".concat(gridSize, "px");
      this.grid.style.height = "".concat(gridSize, "px");

      // Update layout to size
      this.grid.style.gridTemplateColumns = "repeat(".concat(size, ", 1fr)");
      for (var i = 0; i < Math.pow(size, 2); i++) {
        var cell = document.createElement("div");
        cell.classList.add(Renderer.CELL_CLASS);
        cell.style.width = "".concat(cellSize, "px");
        cell.style.height = "".concat(cellSize, "px");
        cell.dataset.x = i % size;
        cell.dataset.y = Math.floor(i / size);
        var cellInnerContainer = document.createElement("div");
        cellInnerContainer.classList.add(Renderer.CELL_INNER_CONTAINER_CLASS);
        cellInnerContainer.textContent = '';
        cell.appendChild(cellInnerContainer);
        this.grid.appendChild(cell);
      }
      var topClueContainer = document.querySelector(".".concat(Renderer.CLUE_CONTAINER_CLASS, ".").concat(Renderer.CLUE_TOP_CLASS));
      var bottomClueContainer = document.querySelector(".".concat(Renderer.CLUE_CONTAINER_CLASS, ".").concat(Renderer.CLUE_BOTTOM_CLASS));
      var leftClueContainer = document.querySelector(".".concat(Renderer.CLUE_CONTAINER_CLASS, ".").concat(Renderer.CLUE_LEFT_CLASS));
      var rightClueContainer = document.querySelector(".".concat(Renderer.CLUE_CONTAINER_CLASS, ".").concat(Renderer.CLUE_RIGHT_CLASS));
      var clueContainers = [topClueContainer, bottomClueContainer, leftClueContainer, rightClueContainer];
      var mainAxisSize = gridSize;
      var crossAxisSize = '2.5rem';
      topClueContainer.style.width = mainAxisSize;
      topClueContainer.style.height = crossAxisSize;
      bottomClueContainer.style.width = mainAxisSize;
      bottomClueContainer.style.height = crossAxisSize;
      leftClueContainer.style.width = crossAxisSize;
      leftClueContainer.style.height = mainAxisSize;
      rightClueContainer.style.width = crossAxisSize;
      rightClueContainer.style.height = mainAxisSize;
      clueContainers.forEach(function (container) {
        for (var _i = 0; _i < size; _i++) {
          var clueCell = document.createElement("div");
          clueCell.classList.add(Renderer.CLUE_CELL_CLASS);
          clueCell.dataset.index = _i;
          if (container.classList.contains(Renderer.CLUE_TOP_CLASS) || container.classList.contains(Renderer.CLUE_BOTTOM_CLASS)) {
            clueCell.style.width = "".concat(cellSize, "px");
            clueCell.style.height = crossAxisSize;
          } else {
            clueCell.style.width = crossAxisSize;
            clueCell.style.height = "".concat(cellSize, "px");
          }
          container.appendChild(clueCell);
        }
      });
    }
  }, {
    key: "select",
    value: function select(cell) {
      cell.classList.add(Renderer.CELL_SELECTED_CLASS);
      // this.updateBorders(cell);
      // this.updateNeighbourBorders(cell);
    }
  }, {
    key: "deselect",
    value: function deselect(cell) {
      cell.classList.remove(Renderer.CELL_SELECTED_CLASS);
    }
  }, {
    key: "deselectAll",
    value: function deselectAll() {
      var _this2 = this;
      var cells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
      cells.forEach(function (cell) {
        return _this2.deselect(cell);
      });
    }
  }, {
    key: "toggleCellSelect",
    value: function toggleCellSelect(cell) {
      cell.classList.toggle(Renderer.CELL_SELECTED_CLASS);
    }
  }, {
    key: "updateSelectedCellValues",
    value: function updateSelectedCellValues(value) {
      var selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
      var changedCells = [];
      selectedCells.forEach(function (cell) {
        if (cell.classList.contains(Renderer.CELL_GIVEN_CLASS)) return;
        cell.querySelector(".".concat(Renderer.CELL_INNER_CONTAINER_CLASS)).textContent = value;
      });
    }
  }, {
    key: "clearSelectedCells",
    value: function clearSelectedCells() {
      var selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
      var changedCells = [];
      selectedCells.forEach(function (cell) {
        cell.querySelector(".".concat(Renderer.CELL_INNER_CONTAINER_CLASS)).textContent = '';
      });
    }
  }, {
    key: "populateGivenCellAt",
    value: function populateGivenCellAt(x, y, value) {
      if (value && value > 0) {
        var cell = document.querySelector("[data-x='".concat(x, "'][data-y='").concat(y, "']"));
        cell.querySelector(".".concat(Renderer.CELL_INNER_CONTAINER_CLASS)).textContent = value;
        this.setCellAsGiven(cell);
      }
    }
  }, {
    key: "populateClues",
    value: function populateClues(clueContainerPosition, cluesToPopulate) {
      var clueContainerSelector = document.querySelector(".".concat(Renderer.CLUE_CONTAINER_CLASS, ".").concat(clueContainerPosition));
      for (var i = 0; i < cluesToPopulate.length; i++) {
        if (!cluesToPopulate[i] || cluesToPopulate[i] <= 0) continue;
        var clueCell = clueContainerSelector.querySelector("[data-index='".concat(i, "']"));
        clueCell.textContent = cluesToPopulate[i];
      }
    }
  }, {
    key: "setCellAsGiven",
    value: function setCellAsGiven(cell) {
      cell.classList.add(Renderer.CELL_GIVEN_CLASS);
    }
  }, {
    key: "highlightError",
    value: function highlightError(cell) {
      cell.classList.add('error');
    }
  }, {
    key: "highlightSeenClueError",
    value: function highlightSeenClueError(position, index) {
      var clue = document.querySelector(".clue-container.".concat(position, "[data-index='").concat(index, "']"));
    }
  }], [{
    key: "getAllSelectedCells",
    value: function getAllSelectedCells() {
      var cells = [];
      var selectedCells = document.querySelectorAll(Renderer.SELECTED_CELL_SELECTOR);
      selectedCells.forEach(function (cell) {
        cells.push({
          x: cell.dataset.x,
          y: cell.dataset.y
        });
      });
      console.log("Selected cells:", cells);
      return cells;
    }
  }]);
  return Renderer;
}(_Observer2.Observer);
_class = Renderer;
_defineProperty(Renderer, "GRID_CLASS", 'grid');
_defineProperty(Renderer, "CELL_CLASS", 'cell');
_defineProperty(Renderer, "CELL_SELECTED_CLASS", 'selected');
_defineProperty(Renderer, "CELL_GIVEN_CLASS", 'given');
_defineProperty(Renderer, "ERROR_CLASS", 'error');
_defineProperty(Renderer, "SELECTED_CELL_SELECTOR", ".".concat(_class.CELL_CLASS, ".").concat(_class.CELL_SELECTED_CLASS));
_defineProperty(Renderer, "GIVEN_CELL_SELECTOR", ".".concat(_class.CELL_CLASS, ".").concat(_class.CELL_GIVEN_CLASS));
_defineProperty(Renderer, "CELL_INNER_CONTAINER_CLASS", 'cell-inner-container');
_defineProperty(Renderer, "CLUE_CONTAINER_CLASS", 'clue-container');
_defineProperty(Renderer, "CLUE_CELL_CLASS", 'clue-cell');
_defineProperty(Renderer, "CLUE_TOP_CLASS", 'top');
_defineProperty(Renderer, "CLUE_BOTTOM_CLASS", 'bottom');
_defineProperty(Renderer, "CLUE_LEFT_CLASS", 'left');
_defineProperty(Renderer, "CLUE_RIGHT_CLASS", 'right');
},{"../utils/Observer.js":"src/utils/Observer.js"}],"src/helpers/helper.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAncestor = findAncestor;
function findAncestor(el, sel) {
  while ((el = el.parentElement) && !(el.matches || el.matchesSelector).call(el, sel));
  return el;
}
},{}],"src/models/InputHandler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Renderer = _interopRequireDefault(require("./Renderer.js"));
var _Observer = require("../utils/Observer.js");
var _helper = require("../helpers/helper.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var InputHandler = exports.default = /*#__PURE__*/function (_Observable) {
  _inherits(InputHandler, _Observable);
  var _super = _createSuper(InputHandler);
  function InputHandler() {
    var _this;
    _classCallCheck(this, InputHandler);
    _this = _super.call(this);
    _this.shiftPressed = false;
    _this.maxSize = 0;
    _this.observers = [];
    return _this;
  }
  _createClass(InputHandler, [{
    key: "initialiseGlobalEventListeners",
    value: function initialiseGlobalEventListeners() {
      var _this2 = this;
      document.addEventListener("keydown", function (event) {
        if (event.key === "Shift") {
          _this2.shiftPressed = true;
        }
      });
      document.addEventListener("keyup", function (event) {
        if (event.key === "Shift") {
          _this2.shiftPressed = false;
        }
      });
      document.addEventListener("keyup", function (event) {
        if (event.key === "Escape") {
          _this2.notifyObservers('DeselectAll', {});
        }
      });
      document.addEventListener("keydown", function (event) {
        return _this2.handleKeyPress(event);
      });
    }
  }, {
    key: "setMaxSize",
    value: function setMaxSize(gridSize) {
      this.maxSize = gridSize;
    }
  }, {
    key: "addClickEventListenersToGrid",
    value: function addClickEventListenersToGrid() {
      var _this3 = this;
      var grid = document.querySelector(".".concat(_Renderer.default.GRID_CLASS));
      grid.addEventListener('click', function (event) {
        return _this3.handleCellClick(event);
      });
    }
  }, {
    key: "handleCellClick",
    value: function handleCellClick(event) {
      var clickedCell = (0, _helper.findAncestor)(event.target, '.cell');
      console.log("Clicked: ", clickedCell);
      if (this.shiftPressed) {
        this.notifyObservers('ToggleCellSelect', clickedCell);
      } else {
        this.notifyObservers('SelectCell', clickedCell);
      }
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      var keyPressed = event.key;
      var selectedCells = [];
      if (!isNaN(keyPressed)) {
        var val = parseInt(keyPressed, 10);
        if (val > 0 && val <= this.maxSize) {
          selectedCells = _Renderer.default.getAllSelectedCells();
          this.notifyObservers('UpdateCellValues', val);
          this.notifyObservers('userChangedCellValue', selectedCells.map(function (cell) {
            return {
              x: cell.x,
              y: cell.y,
              value: val
            };
          }));
        }
      }
      if (keyPressed === "Delete" || keyPressed === "Backspace") {
        selectedCells = _Renderer.default.getAllSelectedCells();
        this.notifyObservers('ClearSelectedCells', {});
        this.notifyObservers('userClearedCells', selectedCells.map(function (cell) {
          return {
            x: cell.x,
            y: cell.y,
            value: 0
          };
        }));
      }
    }
  }]);
  return InputHandler;
}(_Observer.Observable);
},{"./Renderer.js":"src/models/Renderer.js","../utils/Observer.js":"src/utils/Observer.js","../helpers/helper.js":"src/helpers/helper.js"}],"src/models/PuzzleManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Observer2 = require("../utils/Observer.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var PuzzleManager = exports.default = /*#__PURE__*/function (_Observer) {
  _inherits(PuzzleManager, _Observer);
  var _super = _createSuper(PuzzleManager);
  function PuzzleManager(renderer) {
    var _this;
    var puzzle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    _classCallCheck(this, PuzzleManager);
    _this = _super.call(this);
    _this.renderer = renderer;
    _this.puzzle = puzzle;
    _this.puzzleState = '';
    return _this;
  }
  _createClass(PuzzleManager, [{
    key: "notify",
    value: function notify(event, changedCells) {
      console.log("Received event: ".concat(event, ", with data:"), changedCells);
      if (event === 'userChangedCellValue') {
        console.log("Entering 'userChangedCellValue' logic");
        console.log("Looping through ".concat(changedCells.length, " changed cells"));
        var _iterator = _createForOfIteratorHelper(changedCells),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var cell = _step.value;
            this.puzzle.userInput(cell.x, cell.y, cell.value);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        console.log("For loop complete, currentState: ".concat(this.puzzle.currentState));
        if (this.puzzle.isFilled()) {
          this.puzzleState = 'FILLED';
          console.log("PUZZLE IS FILLED");
          if (this.puzzle.isSolved()) {
            console.log("PUZZLE IS SOLVED");
          }
        } else {
          console.log("Errors: ", this.puzzle.checkCellsForErrors(changedCells));
        }
      }
      if (event === 'userClearedCells') {
        console.log("Entering 'userClearedCells' logic");
        console.log("Looping through ".concat(changedCells.length, " changed cells"));
        var _iterator2 = _createForOfIteratorHelper(changedCells),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _cell = _step2.value;
            this.puzzle.userInput(_cell.x, _cell.y, 0);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        console.log("For loop complete, currentState: ".concat(this.puzzle.currentState));
      }
    }
  }, {
    key: "newPuzzle",
    value: function newPuzzle(puzzle) {
      this.puzzle = puzzle;
      this.renderer.generateGrid(puzzle.gridSize);

      // Populate Given Digits
      for (var i = 0; i < puzzle.givenDigits.length; i++) {
        for (var j = 0; j < puzzle.givenDigits[i].length; j++) {
          this.renderer.populateGivenCellAt(j, i, puzzle.givenDigits[i][j]);
        }
      }
      this.renderer.populateClues('bottom', puzzle.bottomClues);
      this.renderer.populateClues('top', puzzle.topClues);
      this.renderer.populateClues('left', puzzle.leftClues);
      this.renderer.populateClues('right', puzzle.rightClues);
    }
  }]);
  return PuzzleManager;
}(_Observer2.Observer);
},{"../utils/Observer.js":"src/utils/Observer.js"}],"src/models/Puzzle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Puzzle = exports.default = /*#__PURE__*/function () {
  function Puzzle(_ref) {
    var gridSize = _ref.gridSize,
      _ref$givenDigits = _ref.givenDigits,
      givenDigits = _ref$givenDigits === void 0 ? [] : _ref$givenDigits,
      _ref$topClues = _ref.topClues,
      topClues = _ref$topClues === void 0 ? [] : _ref$topClues,
      _ref$bottomClues = _ref.bottomClues,
      bottomClues = _ref$bottomClues === void 0 ? [] : _ref$bottomClues,
      _ref$leftClues = _ref.leftClues,
      leftClues = _ref$leftClues === void 0 ? [] : _ref$leftClues,
      _ref$rightClues = _ref.rightClues,
      rightClues = _ref$rightClues === void 0 ? [] : _ref$rightClues;
    _classCallCheck(this, Puzzle);
    this.gridSize = gridSize;
    this.givenDigits = givenDigits;
    this.topClues = topClues;
    this.bottomClues = bottomClues;
    this.leftClues = leftClues;
    this.rightClues = rightClues;
    this.currentState = givenDigits.map(function (row) {
      return _toConsumableArray(row);
    });
    this.errors = [];
  }
  _createClass(Puzzle, [{
    key: "userInput",
    value: function userInput(x, y, value) {
      console.log("Puzzle received userInput for ".concat(x, ",").concat(y, " of ").concat(value));
      if (this.givenDigits[y][x]) return;
      this.currentState[y][x] = value;
    }
  }, {
    key: "validate",
    value: function validate() {}
  }, {
    key: "isFilled",
    value: function isFilled() {
      for (var i = 0; i < this.gridSize; i++) {
        for (var j = 0; j < this.gridSize; j++) {
          if (this.currentState[j][i] < 1) return false;
        }
      }
      return true;
    }
  }, {
    key: "isSolved",
    value: function isSolved() {
      for (var i = 0; i < this.gridSize; i++) {
        if (this.duplicatesInRow(i).length > 0 || this.duplicatesInColumn(i).length > 0 || !this.isClueSatisfied('top', i, this.topClues[i]) || !this.isClueSatisfied('bottom', i, this.bottomClues[i]) || !this.isClueSatisfied('left', i, this.leftClues[i]) || !this.isClueSatisfied('right', i, this.rightClues[i])) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {}
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {}
  }, {
    key: "getRow",
    value: function getRow(y) {
      return this.currentState[y];
    }
  }, {
    key: "getColumn",
    value: function getColumn(x) {
      return this.currentState.map(function (value) {
        return value[x];
      });
    }
  }, {
    key: "checkForDuplicates",
    value: function checkForDuplicates(array) {
      var valueToIndex = new Map();
      var duplicateIndices = [];
      for (var i = 0; i < array.length; i++) {
        var value = array[i];
        if (value === 0) continue;
        if (valueToIndex.has(value)) {
          duplicateIndices.push({
            index: i,
            value: value
          });
          duplicateIndices.push({
            index: valueToIndex.get(value),
            value: value
          });
        } else {
          valueToIndex.set(value, i);
        }
      }

      // Remove duplicates from the duplicateIndices array
      return Array.from(new Set(duplicateIndices));
    }
  }, {
    key: "duplicatesInRow",
    value: function duplicatesInRow(y) {
      var duplicates = this.checkForDuplicates(this.getRow(y));
      return duplicates.map(function (dup) {
        return {
          x: dup.index,
          y: parseInt(y, 10),
          value: dup.value
        };
      });
    }
  }, {
    key: "duplicatesInColumn",
    value: function duplicatesInColumn(x) {
      var duplicates = this.checkForDuplicates(this.getColumn(x));
      return duplicates.map(function (dup) {
        return {
          x: parseInt(x, 10),
          y: dup.index,
          value: dup.value
        };
      });
    }
  }, {
    key: "isClueSatisfied",
    value: function isClueSatisfied(clueDirection, index, clue) {
      if (!clue) return true;
      var array;
      switch (clueDirection) {
        case 'top':
          array = this.getColumn(index);
          break;
        case 'bottom':
          array = this.getColumn(index).reverse();
          break;
        case 'left':
          array = this.getRow(index);
          break;
        case 'right':
          array = this.getRow(index).reverse();
          break;
        default:
          break;
      }
      var seen = 0;
      var tallest = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i] > tallest) {
          tallest = array[i];
          seen++;
        }
      }
      return seen === clue;
    }
  }, {
    key: "checkCellsForErrors",
    value: function checkCellsForErrors(cells) {
      var _this = this;
      var errorCells = [];
      var checkedRows = new Set();
      var checkedColumns = new Set();
      var _iterator = _createForOfIteratorHelper(cells),
        _step;
      try {
        var _loop = function _loop() {
          var cell = _step.value;
          if (checkedRows.has(cell.y) && checkedColumns.has(cell.x)) {
            return 1; // continue
          }
          if (!checkedRows.has(cell.y)) {
            var dupesInRow = _this.duplicatesInRow(cell.y);
            console.log("Duplicates in Row: ", dupesInRow);
            if (dupesInRow.length > 0) {
              errorCells.push.apply(errorCells, _toConsumableArray(dupesInRow.map(function (c) {
                return {
                  x: c.x,
                  y: cell.y,
                  value: c.value
                };
              })));
            }
            checkedRows.add(cell.y);
          }
          if (!checkedColumns.has(cell.x)) {
            var dupesInColumn = _this.duplicatesInColumn(cell.x);
            console.log("Duplicates in Column: ", dupesInColumn);
            if (dupesInColumn.length > 0) {
              errorCells.push.apply(errorCells, _toConsumableArray(dupesInColumn.map(function (c) {
                return {
                  x: c.x,
                  y: c.y,
                  value: c.value
                };
              })));
            }
            checkedColumns.add(cell.x);
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          if (_loop()) continue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return errorCells;
    }
  }]);
  return Puzzle;
}();
},{}],"src/models/GameManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GameManager = exports.default = /*#__PURE__*/function () {
  function GameManager() {
    _classCallCheck(this, GameManager);
    this.timer;
    this.showErrors = false;
    this.zenMode = false;
    this.solved = true;
  }
  _createClass(GameManager, [{
    key: "startTimer",
    value: function startTimer() {}
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);
  return GameManager;
}();
},{}],"src/App.js":[function(require,module,exports) {
"use strict";

var _InputHandler = _interopRequireDefault(require("./models/InputHandler.js"));
var _PuzzleManager = _interopRequireDefault(require("./models/PuzzleManager.js"));
var _Puzzle = _interopRequireDefault(require("./models/Puzzle.js"));
var _GameManager = _interopRequireDefault(require("./models/GameManager.js"));
var _Renderer = _interopRequireDefault(require("./models/Renderer.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var main = function main() {
  var inputHandler = new _InputHandler.default();
  var renderer = new _Renderer.default();
  var puzzleManager = new _PuzzleManager.default(renderer);
  inputHandler.addObserver(renderer);
  inputHandler.addObserver(puzzleManager);
  var examplePuzzle = new _Puzzle.default({
    gridSize: 5,
    givenDigits: [[1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 1], [0, 0, 0, 4, 2], [0, 0, 2, 0, 0]],
    bottomClues: [0, 0, 0, 1, 0],
    leftClues: [0, 1, 0, 0, 0]
  });
  var examplePuzzle2 = new _Puzzle.default({
    gridSize: 3,
    givenDigits: [[1, 0, 0], [0, 2, 0], [0, 0, 0]],
    topClues: [2, 0, 0],
    leftClues: [0, 1, 0]
  });
  inputHandler.initialiseGlobalEventListeners();
  inputHandler.addClickEventListenersToGrid();
  inputHandler.setMaxSize(examplePuzzle2.gridSize);
  puzzleManager.newPuzzle(examplePuzzle2);
};
document.addEventListener("DOMContentLoaded", main);
},{"./models/InputHandler.js":"src/models/InputHandler.js","./models/PuzzleManager.js":"src/models/PuzzleManager.js","./models/Puzzle.js":"src/models/Puzzle.js","./models/GameManager.js":"src/models/GameManager.js","./models/Renderer.js":"src/models/Renderer.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64054" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/App.js"], null)
//# sourceMappingURL=/App.f684dadd.js.map