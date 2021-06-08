"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeferredElement = DeferredElement;
exports["default"] = exports.jsxs = exports.jsx = exports.Fragment = exports.render = void 0;
var _excluded = ["children"];

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var HELD = Symbol["for"]("held");
var TEXTNODE = Symbol["for"]("textnode"); // const FRAGMENT = Symbol.for("fragment");

function DeferredElement(item) {
  this.item = item;
}

var isProperty = function isProperty(key) {
  return key !== "children";
};

var render = function render(element, container) {
  if (element.type === HELD) {
    var output = element.item(element.config);
    (Array.isArray(output) ? output : [output]).forEach(function (child) {
      render(child, container);
    });
  } else {
    var dom = element.type === TEXTNODE ? container.ownerDocument.createTextNode("") : container.ownerDocument.createElement(element.type);
    Object.keys(element.props).filter(isProperty).forEach(function (name) {
      dom[name] = element.props[name];
    });
    element.props.children.forEach(function (child) {
      if (child) {
        render(child, dom);
      }
    });
    container.appendChild(dom);
  }
};

exports.render = render;

var Fragment = function Fragment(_ref) {
  var children = _ref.children;
  return children;
};

exports.Fragment = Fragment;

var jsx = function jsx(type, config) {
  if (type instanceof DeferredElement) {
    return {
      type: HELD,
      item: type.item,
      config: config
    };
  }

  if (typeof type === 'function') {
    return type(config);
  }

  var _config$children = config.children,
      children = _config$children === void 0 ? [] : _config$children,
      props = _objectWithoutProperties(config, _excluded);

  var childrenProps = [].concat(children);
  return {
    type: type,
    props: _objectSpread(_objectSpread({}, props), {}, {
      children: childrenProps.map(function (child) {
        return _typeof(child) === "object" ? child : {
          type: TEXTNODE,
          props: {
            nodeValue: child,
            children: []
          }
        };
      })
    })
  };
};

exports.jsx = jsx;
var jsxs = jsx;
exports.jsxs = jsxs;
var _default = {
  render: render,
  jsx: jsx,
  jsxs: jsx,
  DeferredElement: DeferredElement,
  Fragment: Fragment
};
exports["default"] = _default;
