"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __reflectGet = Reflect.get;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/tabbable/dist/index.js
var require_dist = __commonJS({
  "node_modules/tabbable/dist/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
    var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
    var NoElement = typeof Element === "undefined";
    var matches = NoElement ? function() {
    } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
      var _element$getRootNode;
      return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
    } : function(element) {
      return element === null || element === void 0 ? void 0 : element.ownerDocument;
    };
    var isInert = function isInert2(node, lookUp) {
      var _node$getAttribute;
      if (lookUp === void 0) {
        lookUp = true;
      }
      var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
      var inert = inertAtt === "" || inertAtt === "true";
      var result = inert || lookUp && node && isInert2(node.parentNode);
      return result;
    };
    var isContentEditable = function isContentEditable2(node) {
      var _node$getAttribute2;
      var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
      return attValue === "" || attValue === "true";
    };
    var getCandidates = function getCandidates2(el, includeContainer, filter) {
      if (isInert(el)) {
        return [];
      }
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }
      candidates = candidates.filter(filter);
      return candidates;
    };
    var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
      var candidates = [];
      var elementsToCheck = Array.from(elements);
      while (elementsToCheck.length) {
        var element = elementsToCheck.shift();
        if (isInert(element, false)) {
          continue;
        }
        if (element.tagName === "SLOT") {
          var assigned = element.assignedElements();
          var content = assigned.length ? assigned : element.children;
          var nestedCandidates = getCandidatesIteratively2(content, true, options);
          if (options.flatten) {
            candidates.push.apply(candidates, nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element,
              candidates: nestedCandidates
            });
          }
        } else {
          var validCandidate = matches.call(element, candidateSelector);
          if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
            candidates.push(element);
          }
          var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
          typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
          var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
          if (shadowRoot && validShadowRoot) {
            var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
            if (options.flatten) {
              candidates.push.apply(candidates, _nestedCandidates);
            } else {
              candidates.push({
                scopeParent: element,
                candidates: _nestedCandidates
              });
            }
          } else {
            elementsToCheck.unshift.apply(elementsToCheck, element.children);
          }
        }
      }
      return candidates;
    };
    var hasTabIndex = function hasTabIndex2(node) {
      return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
    };
    var getTabIndex = function getTabIndex2(node) {
      if (!node) {
        throw new Error("No node provided");
      }
      if (node.tabIndex < 0) {
        if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
          return 0;
        }
      }
      return node.tabIndex;
    };
    var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
      var tabIndex = getTabIndex(node);
      if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
        return 0;
      }
      return tabIndex;
    };
    var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
      return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
    };
    var isInput = function isInput2(node) {
      return node.tagName === "INPUT";
    };
    var isHiddenInput = function isHiddenInput2(node) {
      return isInput(node) && node.type === "hidden";
    };
    var isDetailsWithSummary = function isDetailsWithSummary2(node) {
      var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === "SUMMARY";
      });
      return r;
    };
    var getCheckedRadio = function getCheckedRadio2(nodes, form) {
      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked && nodes[i].form === form) {
          return nodes[i];
        }
      }
    };
    var isTabbableRadio = function isTabbableRadio2(node) {
      if (!node.name) {
        return true;
      }
      var radioScope = node.form || getRootNode(node);
      var queryRadios = function queryRadios2(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
      };
      var radioSet;
      if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
        radioSet = queryRadios(window.CSS.escape(node.name));
      } else {
        try {
          radioSet = queryRadios(node.name);
        } catch (err) {
          console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
          return false;
        }
      }
      var checked = getCheckedRadio(radioSet, node.form);
      return !checked || checked === node;
    };
    var isRadio = function isRadio2(node) {
      return isInput(node) && node.type === "radio";
    };
    var isNonTabbableRadio = function isNonTabbableRadio2(node) {
      return isRadio(node) && !isTabbableRadio(node);
    };
    var isNodeAttached = function isNodeAttached2(node) {
      var _nodeRoot;
      var nodeRoot = node && getRootNode(node);
      var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
      var attached = false;
      if (nodeRoot && nodeRoot !== node) {
        var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
        attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
        while (!attached && nodeRootHost) {
          var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
          nodeRoot = getRootNode(nodeRootHost);
          nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
          attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
        }
      }
      return attached;
    };
    var isZeroArea = function isZeroArea2(node) {
      var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
      return width === 0 && height === 0;
    };
    var isHidden = function isHidden2(node, _ref) {
      var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
      if (getComputedStyle(node).visibility === "hidden") {
        return true;
      }
      var isDirectSummary = matches.call(node, "details>summary:first-of-type");
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
      if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
        return true;
      }
      if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
        if (typeof getShadowRoot === "function") {
          var originalNode = node;
          while (node) {
            var parentElement = node.parentElement;
            var rootNode = getRootNode(node);
            if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
              return isZeroArea(node);
            } else if (node.assignedSlot) {
              node = node.assignedSlot;
            } else if (!parentElement && rootNode !== node.ownerDocument) {
              node = rootNode.host;
            } else {
              node = parentElement;
            }
          }
          node = originalNode;
        }
        if (isNodeAttached(node)) {
          return !node.getClientRects().length;
        }
        if (displayCheck !== "legacy-full") {
          return true;
        }
      } else if (displayCheck === "non-zero-area") {
        return isZeroArea(node);
      }
      return false;
    };
    var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement;
        while (parentNode) {
          if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
            for (var i = 0; i < parentNode.children.length; i++) {
              var child = parentNode.children.item(i);
              if (child.tagName === "LEGEND") {
                return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
              }
            }
            return true;
          }
          parentNode = parentNode.parentElement;
        }
      }
      return false;
    };
    var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
      if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
      //  because we're limited in the type of selectors we can use in JSDom (see related
      //  note related to `candidateSelectors`)
      isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
      isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }
      return true;
    };
    var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
      if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
        return false;
      }
      return true;
    };
    var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
      var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
      if (isNaN(tabIndex) || tabIndex >= 0) {
        return true;
      }
      return false;
    };
    var sortByOrder = function sortByOrder2(candidates) {
      var regularTabbables = [];
      var orderedTabbables = [];
      candidates.forEach(function(item, i) {
        var isScope = !!item.scopeParent;
        var element = isScope ? item.scopeParent : item;
        var candidateTabindex = getSortOrderTabIndex(element, isScope);
        var elements = isScope ? sortByOrder2(item.candidates) : element;
        if (candidateTabindex === 0) {
          isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
        } else {
          orderedTabbables.push({
            documentOrder: i,
            tabIndex: candidateTabindex,
            item,
            isScope,
            content: elements
          });
        }
      });
      return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
      }, []).concat(regularTabbables);
    };
    var tabbable = function tabbable2(container, options) {
      options = options || {};
      var candidates;
      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options.includeContainer, {
          filter: isNodeMatchingSelectorTabbable.bind(null, options),
          flatten: false,
          getShadowRoot: options.getShadowRoot,
          shadowRootFilter: isValidShadowRootTabbable
        });
      } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
      }
      return sortByOrder(candidates);
    };
    var focusable = function focusable2(container, options) {
      options = options || {};
      var candidates;
      if (options.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options.includeContainer, {
          filter: isNodeMatchingSelectorFocusable.bind(null, options),
          flatten: true,
          getShadowRoot: options.getShadowRoot
        });
      } else {
        candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options));
      }
      return candidates;
    };
    var isTabbable = function isTabbable2(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, candidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorTabbable(options, node);
    };
    var focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
    var isFocusable = function isFocusable2(node, options) {
      options = options || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorFocusable(options, node);
    };
    exports2.focusable = focusable;
    exports2.getTabIndex = getTabIndex;
    exports2.isFocusable = isFocusable;
    exports2.isTabbable = isTabbable;
    exports2.tabbable = tabbable;
  }
});

// node_modules/focus-trap/dist/focus-trap.js
var require_focus_trap = __commonJS({
  "node_modules/focus-trap/dist/focus-trap.js"(exports2) {
    "use strict";
    var tabbable = require_dist();
    function _arrayLikeToArray(r, a) {
      (null == a || a > r.length) && (a = r.length);
      for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
      return n;
    }
    function _arrayWithoutHoles(r) {
      if (Array.isArray(r)) return _arrayLikeToArray(r);
    }
    function _defineProperty(e, r, t) {
      return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: true,
        configurable: true,
        writable: true
      }) : e[r] = t, e;
    }
    function _iterableToArray(r) {
      if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread2(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _toConsumableArray(r) {
      return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
    }
    function _toPrimitive(t, r) {
      if ("object" != typeof t || !t) return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != typeof i) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == typeof i ? i : i + "";
    }
    function _unsupportedIterableToArray(r, a) {
      if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = {}.toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
      }
    }
    var activeFocusTraps = {
      activateTrap: function activateTrap(trapStack, trap) {
        if (trapStack.length > 0) {
          var activeTrap = trapStack[trapStack.length - 1];
          if (activeTrap !== trap) {
            activeTrap.pause();
          }
        }
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex === -1) {
          trapStack.push(trap);
        } else {
          trapStack.splice(trapIndex, 1);
          trapStack.push(trap);
        }
      },
      deactivateTrap: function deactivateTrap(trapStack, trap) {
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex !== -1) {
          trapStack.splice(trapIndex, 1);
        }
        if (trapStack.length > 0) {
          trapStack[trapStack.length - 1].unpause();
        }
      }
    };
    var isSelectableInput = function isSelectableInput2(node) {
      return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
    };
    var isEscapeEvent = function isEscapeEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
    };
    var isTabEvent = function isTabEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
    };
    var isKeyForward = function isKeyForward2(e) {
      return isTabEvent(e) && !e.shiftKey;
    };
    var isKeyBackward = function isKeyBackward2(e) {
      return isTabEvent(e) && e.shiftKey;
    };
    var delay = function delay2(fn) {
      return setTimeout(fn, 0);
    };
    var valueOrHandler = function valueOrHandler2(value) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return typeof value === "function" ? value.apply(void 0, params) : value;
    };
    var getActualTarget = function getActualTarget2(event) {
      return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
    };
    var internalTrapStack = [];
    var createFocusTrap2 = function createFocusTrap3(elements, userOptions) {
      var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
      var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
      var config = _objectSpread2({
        returnFocusOnDeactivate: true,
        escapeDeactivates: true,
        delayInitialFocus: true,
        isKeyForward,
        isKeyBackward
      }, userOptions);
      var state = {
        // containers given to createFocusTrap()
        // @type {Array<HTMLElement>}
        containers: [],
        // list of objects identifying tabbable nodes in `containers` in the trap
        // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
        //  is active, but the trap should never get to a state where there isn't at least one group
        //  with at least one tabbable node in it (that would lead to an error condition that would
        //  result in an error being thrown)
        // @type {Array<{
        //   container: HTMLElement,
        //   tabbableNodes: Array<HTMLElement>, // empty if none
        //   focusableNodes: Array<HTMLElement>, // empty if none
        //   posTabIndexesFound: boolean,
        //   firstTabbableNode: HTMLElement|undefined,
        //   lastTabbableNode: HTMLElement|undefined,
        //   firstDomTabbableNode: HTMLElement|undefined,
        //   lastDomTabbableNode: HTMLElement|undefined,
        //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
        // }>}
        containerGroups: [],
        // same order/length as `containers` list
        // references to objects in `containerGroups`, but only those that actually have
        //  tabbable nodes in them
        // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
        //  the same length
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: false,
        paused: false,
        // timer ID for when delayInitialFocus is true and initial focus in this trap
        //  has been delayed during activation
        delayInitialFocusTimer: void 0,
        // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
        recentNavEvent: void 0
      };
      var trap;
      var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
        return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
      };
      var findContainerIndex = function findContainerIndex2(element, event) {
        var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
        return state.containerGroups.findIndex(function(_ref) {
          var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
          return container.contains(element) || // fall back to explicit tabbable search which will take into consideration any
          //  web components if the `tabbableOptions.getShadowRoot` option was used for
          //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
          //  look inside web components even if open)
          (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
            return node === element;
          });
        });
      };
      var getNodeForOption = function getNodeForOption2(optionName) {
        var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$hasFallback = _ref2.hasFallback, hasFallback = _ref2$hasFallback === void 0 ? false : _ref2$hasFallback, _ref2$params = _ref2.params, params = _ref2$params === void 0 ? [] : _ref2$params;
        var optionValue = config[optionName];
        if (typeof optionValue === "function") {
          optionValue = optionValue.apply(void 0, _toConsumableArray(params));
        }
        if (optionValue === true) {
          optionValue = void 0;
        }
        if (!optionValue) {
          if (optionValue === void 0 || optionValue === false) {
            return optionValue;
          }
          throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
        }
        var node = optionValue;
        if (typeof optionValue === "string") {
          try {
            node = doc.querySelector(optionValue);
          } catch (err) {
            throw new Error("`".concat(optionName, '` appears to be an invalid selector; error="').concat(err.message, '"'));
          }
          if (!node) {
            if (!hasFallback) {
              throw new Error("`".concat(optionName, "` as selector refers to no known node"));
            }
          }
        }
        return node;
      };
      var getInitialFocusNode = function getInitialFocusNode2() {
        var node = getNodeForOption("initialFocus", {
          hasFallback: true
        });
        if (node === false) {
          return false;
        }
        if (node === void 0 || node && !tabbable.isFocusable(node, config.tabbableOptions)) {
          if (findContainerIndex(doc.activeElement) >= 0) {
            node = doc.activeElement;
          } else {
            var firstTabbableGroup = state.tabbableGroups[0];
            var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
            node = firstTabbableNode || getNodeForOption("fallbackFocus");
          }
        } else if (node === null) {
          node = getNodeForOption("fallbackFocus");
        }
        if (!node) {
          throw new Error("Your focus-trap needs to have at least one focusable element");
        }
        return node;
      };
      var updateTabbableNodes = function updateTabbableNodes2() {
        state.containerGroups = state.containers.map(function(container) {
          var tabbableNodes = tabbable.tabbable(container, config.tabbableOptions);
          var focusableNodes = tabbable.focusable(container, config.tabbableOptions);
          var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
          var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
          var firstDomTabbableNode = focusableNodes.find(function(node) {
            return tabbable.isTabbable(node);
          });
          var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
            return tabbable.isTabbable(node);
          });
          var posTabIndexesFound = !!tabbableNodes.find(function(node) {
            return tabbable.getTabIndex(node) > 0;
          });
          return {
            container,
            tabbableNodes,
            focusableNodes,
            /** True if at least one node with positive `tabindex` was found in this container. */
            posTabIndexesFound,
            /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
            firstTabbableNode,
            /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
            lastTabbableNode,
            // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
            //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
            //  because that API doesn't work with Shadow DOM as well as it should (@see
            //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
            //  to address an edge case related to positive tabindex support, this seems like a much easier,
            //  "close enough most of the time" alternative for positive tabindexes which should generally
            //  be avoided anyway...
            /** First tabbable node in container, __DOM__ order; `undefined` if none. */
            firstDomTabbableNode,
            /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
            lastDomTabbableNode,
            /**
             * Finds the __tabbable__ node that follows the given node in the specified direction,
             *  in this container, if any.
             * @param {HTMLElement} node
             * @param {boolean} [forward] True if going in forward tab order; false if going
             *  in reverse.
             * @returns {HTMLElement|undefined} The next tabbable node, if any.
             */
            nextTabbableNode: function nextTabbableNode(node) {
              var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              var nodeIdx = tabbableNodes.indexOf(node);
              if (nodeIdx < 0) {
                if (forward) {
                  return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                    return tabbable.isTabbable(el);
                  });
                }
                return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
                  return tabbable.isTabbable(el);
                });
              }
              return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
            }
          };
        });
        state.tabbableGroups = state.containerGroups.filter(function(group) {
          return group.tabbableNodes.length > 0;
        });
        if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
          throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
        }
        if (state.containerGroups.find(function(g) {
          return g.posTabIndexesFound;
        }) && state.containerGroups.length > 1) {
          throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
        }
      };
      var _getActiveElement = function getActiveElement(el) {
        var activeElement = el.activeElement;
        if (!activeElement) {
          return;
        }
        if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
          return _getActiveElement(activeElement.shadowRoot);
        }
        return activeElement;
      };
      var _tryFocus = function tryFocus(node) {
        if (node === false) {
          return;
        }
        if (node === _getActiveElement(document)) {
          return;
        }
        if (!node || !node.focus) {
          _tryFocus(getInitialFocusNode());
          return;
        }
        node.focus({
          preventScroll: !!config.preventScroll
        });
        state.mostRecentlyFocusedNode = node;
        if (isSelectableInput(node)) {
          node.select();
        }
      };
      var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
        var node = getNodeForOption("setReturnFocus", {
          params: [previousActiveElement]
        });
        return node ? node : node === false ? false : previousActiveElement;
      };
      var findNextNavNode = function findNextNavNode2(_ref3) {
        var target = _ref3.target, event = _ref3.event, _ref3$isBackward = _ref3.isBackward, isBackward = _ref3$isBackward === void 0 ? false : _ref3$isBackward;
        target = target || getActualTarget(event);
        updateTabbableNodes();
        var destinationNode = null;
        if (state.tabbableGroups.length > 0) {
          var containerIndex = findContainerIndex(target, event);
          var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
          if (containerIndex < 0) {
            if (isBackward) {
              destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
            } else {
              destinationNode = state.tabbableGroups[0].firstTabbableNode;
            }
          } else if (isBackward) {
            var startOfGroupIndex = state.tabbableGroups.findIndex(function(_ref4) {
              var firstTabbableNode = _ref4.firstTabbableNode;
              return target === firstTabbableNode;
            });
            if (startOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
              startOfGroupIndex = containerIndex;
            }
            if (startOfGroupIndex >= 0) {
              var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
              var destinationGroup = state.tabbableGroups[destinationGroupIndex];
              destinationNode = tabbable.getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target, false);
            }
          } else {
            var lastOfGroupIndex = state.tabbableGroups.findIndex(function(_ref5) {
              var lastTabbableNode = _ref5.lastTabbableNode;
              return target === lastTabbableNode;
            });
            if (lastOfGroupIndex < 0 && (containerGroup.container === target || tabbable.isFocusable(target, config.tabbableOptions) && !tabbable.isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
              lastOfGroupIndex = containerIndex;
            }
            if (lastOfGroupIndex >= 0) {
              var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
              var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
              destinationNode = tabbable.getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target);
            }
          }
        } else {
          destinationNode = getNodeForOption("fallbackFocus");
        }
        return destinationNode;
      };
      var checkPointerDown = function checkPointerDown2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          trap.deactivate({
            // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
            //  which will result in the outside click setting focus to the node
            //  that was clicked (and if not focusable, to "nothing"); by setting
            //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
            //  on activation (or the configured `setReturnFocus` node), whether the
            //  outside click was on a focusable node or not
            returnFocus: config.returnFocusOnDeactivate
          });
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
      };
      var checkFocusIn = function checkFocusIn2(event) {
        var target = getActualTarget(event);
        var targetContained = findContainerIndex(target, event) >= 0;
        if (targetContained || target instanceof Document) {
          if (targetContained) {
            state.mostRecentlyFocusedNode = target;
          }
        } else {
          event.stopImmediatePropagation();
          var nextNode;
          var navAcrossContainers = true;
          if (state.mostRecentlyFocusedNode) {
            if (tabbable.getTabIndex(state.mostRecentlyFocusedNode) > 0) {
              var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
              var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
              if (tabbableNodes.length > 0) {
                var mruTabIdx = tabbableNodes.findIndex(function(node) {
                  return node === state.mostRecentlyFocusedNode;
                });
                if (mruTabIdx >= 0) {
                  if (config.isKeyForward(state.recentNavEvent)) {
                    if (mruTabIdx + 1 < tabbableNodes.length) {
                      nextNode = tabbableNodes[mruTabIdx + 1];
                      navAcrossContainers = false;
                    }
                  } else {
                    if (mruTabIdx - 1 >= 0) {
                      nextNode = tabbableNodes[mruTabIdx - 1];
                      navAcrossContainers = false;
                    }
                  }
                }
              }
            } else {
              if (!state.containerGroups.some(function(g) {
                return g.tabbableNodes.some(function(n) {
                  return tabbable.getTabIndex(n) > 0;
                });
              })) {
                navAcrossContainers = false;
              }
            }
          } else {
            navAcrossContainers = false;
          }
          if (navAcrossContainers) {
            nextNode = findNextNavNode({
              // move FROM the MRU node, not event-related node (which will be the node that is
              //  outside the trap causing the focus escape we're trying to fix)
              target: state.mostRecentlyFocusedNode,
              isBackward: config.isKeyBackward(state.recentNavEvent)
            });
          }
          if (nextNode) {
            _tryFocus(nextNode);
          } else {
            _tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
          }
        }
        state.recentNavEvent = void 0;
      };
      var checkKeyNav = function checkKeyNav2(event) {
        var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        state.recentNavEvent = event;
        var destinationNode = findNextNavNode({
          event,
          isBackward
        });
        if (destinationNode) {
          if (isTabEvent(event)) {
            event.preventDefault();
          }
          _tryFocus(destinationNode);
        }
      };
      var checkTabKey = function checkTabKey2(event) {
        if (config.isKeyForward(event) || config.isKeyBackward(event)) {
          checkKeyNav(event, config.isKeyBackward(event));
        }
      };
      var checkEscapeKey = function checkEscapeKey2(event) {
        if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
          event.preventDefault();
          trap.deactivate();
        }
      };
      var checkClick = function checkClick2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      var addListeners = function addListeners2() {
        if (!state.active) {
          return;
        }
        activeFocusTraps.activateTrap(trapStack, trap);
        state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
          _tryFocus(getInitialFocusNode());
        }) : _tryFocus(getInitialFocusNode());
        doc.addEventListener("focusin", checkFocusIn, true);
        doc.addEventListener("mousedown", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("touchstart", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("click", checkClick, {
          capture: true,
          passive: false
        });
        doc.addEventListener("keydown", checkTabKey, {
          capture: true,
          passive: false
        });
        doc.addEventListener("keydown", checkEscapeKey);
        return trap;
      };
      var removeListeners = function removeListeners2() {
        if (!state.active) {
          return;
        }
        doc.removeEventListener("focusin", checkFocusIn, true);
        doc.removeEventListener("mousedown", checkPointerDown, true);
        doc.removeEventListener("touchstart", checkPointerDown, true);
        doc.removeEventListener("click", checkClick, true);
        doc.removeEventListener("keydown", checkTabKey, true);
        doc.removeEventListener("keydown", checkEscapeKey);
        return trap;
      };
      var checkDomRemoval = function checkDomRemoval2(mutations) {
        var isFocusedNodeRemoved = mutations.some(function(mutation) {
          var removedNodes = Array.from(mutation.removedNodes);
          return removedNodes.some(function(node) {
            return node === state.mostRecentlyFocusedNode;
          });
        });
        if (isFocusedNodeRemoved) {
          _tryFocus(getInitialFocusNode());
        }
      };
      var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
      var updateObservedNodes = function updateObservedNodes2() {
        if (!mutationObserver) {
          return;
        }
        mutationObserver.disconnect();
        if (state.active && !state.paused) {
          state.containers.map(function(container) {
            mutationObserver.observe(container, {
              subtree: true,
              childList: true
            });
          });
        }
      };
      trap = {
        get active() {
          return state.active;
        },
        get paused() {
          return state.paused;
        },
        activate: function activate(activateOptions) {
          if (state.active) {
            return this;
          }
          var onActivate = getOption(activateOptions, "onActivate");
          var onPostActivate = getOption(activateOptions, "onPostActivate");
          var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
          if (!checkCanFocusTrap) {
            updateTabbableNodes();
          }
          state.active = true;
          state.paused = false;
          state.nodeFocusedBeforeActivation = doc.activeElement;
          onActivate === null || onActivate === void 0 || onActivate();
          var finishActivation = function finishActivation2() {
            if (checkCanFocusTrap) {
              updateTabbableNodes();
            }
            addListeners();
            updateObservedNodes();
            onPostActivate === null || onPostActivate === void 0 || onPostActivate();
          };
          if (checkCanFocusTrap) {
            checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
            return this;
          }
          finishActivation();
          return this;
        },
        deactivate: function deactivate(deactivateOptions) {
          if (!state.active) {
            return this;
          }
          var options = _objectSpread2({
            onDeactivate: config.onDeactivate,
            onPostDeactivate: config.onPostDeactivate,
            checkCanReturnFocus: config.checkCanReturnFocus
          }, deactivateOptions);
          clearTimeout(state.delayInitialFocusTimer);
          state.delayInitialFocusTimer = void 0;
          removeListeners();
          state.active = false;
          state.paused = false;
          updateObservedNodes();
          activeFocusTraps.deactivateTrap(trapStack, trap);
          var onDeactivate = getOption(options, "onDeactivate");
          var onPostDeactivate = getOption(options, "onPostDeactivate");
          var checkCanReturnFocus = getOption(options, "checkCanReturnFocus");
          var returnFocus = getOption(options, "returnFocus", "returnFocusOnDeactivate");
          onDeactivate === null || onDeactivate === void 0 || onDeactivate();
          var finishDeactivation = function finishDeactivation2() {
            delay(function() {
              if (returnFocus) {
                _tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
              }
              onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
            });
          };
          if (returnFocus && checkCanReturnFocus) {
            checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
            return this;
          }
          finishDeactivation();
          return this;
        },
        pause: function pause(pauseOptions) {
          if (state.paused || !state.active) {
            return this;
          }
          var onPause = getOption(pauseOptions, "onPause");
          var onPostPause = getOption(pauseOptions, "onPostPause");
          state.paused = true;
          onPause === null || onPause === void 0 || onPause();
          removeListeners();
          updateObservedNodes();
          onPostPause === null || onPostPause === void 0 || onPostPause();
          return this;
        },
        unpause: function unpause(unpauseOptions) {
          if (!state.paused || !state.active) {
            return this;
          }
          var onUnpause = getOption(unpauseOptions, "onUnpause");
          var onPostUnpause = getOption(unpauseOptions, "onPostUnpause");
          state.paused = false;
          onUnpause === null || onUnpause === void 0 || onUnpause();
          updateTabbableNodes();
          addListeners();
          updateObservedNodes();
          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
          return this;
        },
        updateContainerElements: function updateContainerElements(containerElements) {
          var elementsAsArray = [].concat(containerElements).filter(Boolean);
          state.containers = elementsAsArray.map(function(element) {
            return typeof element === "string" ? doc.querySelector(element) : element;
          });
          if (state.active) {
            updateTabbableNodes();
          }
          updateObservedNodes();
          return this;
        }
      };
      trap.updateContainerElements(elements);
      return trap;
    };
    exports2.createFocusTrap = createFocusTrap2;
  }
});

// src/abstracts/Composer.ts
var Composer = class {
  constructor(game) {
    this.game = game;
    // Assets to be loaded
    this.assetsToLoad = [];
    this.buttons = [];
    game.setComposer(this);
    this.createContainers();
    this.layoutContainers();
  }
  layoutContainers() {
    document.body.appendChild(this.topLeft);
    document.body.appendChild(this.bottomRight);
  }
  /**
   * Add control button
   * @param button 
   */
  addButton(button) {
    this.buttons.push(button);
  }
  /**
   * Add zoom control to the composer
   * @param zoomControl 
   */
  addZoomControl(zoomControl) {
    this.zoomControl = zoomControl;
  }
  createContainers() {
    this.topLeft = this.createCornerContainer();
    this.topLeft.classList.add("top");
    this.topLeft.classList.add("left");
    this.topRight = this.createCornerContainer();
    this.topRight.classList.add("top");
    this.topRight.classList.add("right");
    this.bottomLeft = this.createCornerContainer();
    this.bottomLeft.classList.add("bottom");
    this.bottomLeft.classList.add("left");
    this.bottomRight = this.createCornerContainer();
    this.bottomRight.classList.add("bottom");
    this.bottomLeft.classList.add("right");
  }
  createCornerContainer() {
    const container = document.createElement("div");
    container.classList.add("f-c");
    return container;
  }
};

// src/abstracts/Button.ts
var Button = class {
  constructor(text, fontAwesomeIcon = "", attrs = { onclick: () => 0 }) {
    this.text = text;
    this.fontAwesomeIcon = fontAwesomeIcon;
    this.element = document.createElement("button");
    this.element.textContent = text;
    Object.assign(this.element, attrs);
    this.element.classList.add("button");
    if (fontAwesomeIcon) {
      const iconElement = document.createElement("i");
      iconElement.className = `fas ${fontAwesomeIcon}`;
      this.element.insertBefore(iconElement, this.element.firstChild);
    }
  }
  getHTMLElement() {
    return this.element;
  }
  setText(text) {
    this.text = text;
    this.element.textContent = text;
    if (this.fontAwesomeIcon) {
      const iconElement = document.createElement("i");
      iconElement.className = `fas ${this.fontAwesomeIcon}`;
      this.element.insertBefore(iconElement, this.element.firstChild);
    }
  }
  destroy() {
    this.element.onclick = null;
  }
};

// src/abstracts/Game.ts
var Game = class {
  constructor() {
    this.state = "INITIALIZING";
  }
  /**
   * Accept `Mv.Composer` instance.
   * This will allow object to communicate with the composer
   */
  setComposer(composer) {
    this.composer = composer;
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
};

// src/abstracts/Modal.ts
var import_focus_trap = __toESM(require_focus_trap());
var Modal = class {
  constructor(attrs = {}, buttonsAndBehaviour) {
    this.buttons = [];
    // focus-trap instance
    // If `closeable` is true, will add a close button on top and at the bottom
    this.closeable = true;
    this.element = document.createElement("div");
    this.overlay = document.createElement("div");
    this.headerElement = document.createElement("div");
    this.contentElement = document.createElement("div");
    this.titleElement = document.createElement("h1");
    this.closeButton = document.createElement("button");
    this.footerElement = document.createElement("footer");
    this.overlay.className = "modal-overlay";
    this.overlay.onclick = (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    };
    Object.assign(this.element, attrs);
    this.element.setAttribute("role", "dialog");
    this.element.setAttribute("aria-modal", "true");
    if (attrs.title) {
      this.element.setAttribute("aria-labelledby", "modal-title");
      this.titleElement.id = "modal-title";
    }
    this.focusTrap = (0, import_focus_trap.createFocusTrap)(this.element, {
      escapeDeactivates: true,
      allowOutsideClick: true,
      returnFocusOnDeactivate: true,
      fallbackFocus: this.element
    });
    this.headerElement.className = "modal-header";
    this.initTitleElement(attrs);
    if (this.closeable) {
      this.addTopCloseButton();
    }
    this.setContentElement(attrs);
    this.setButtons(buttonsAndBehaviour);
    this.initFooterElement();
    this.assembleModal();
  }
  assembleModal() {
    this.headerElement.appendChild(this.titleElement);
    if (this.closeable) {
      this.headerElement.appendChild(this.closeButton);
    }
    this.element.appendChild(this.headerElement);
    this.element.appendChild(this.contentElement);
    this.element.appendChild(this.footerElement);
  }
  setContentElement(attrs) {
    this.contentElement.className = "modal-content";
    if (attrs.content) {
      this.contentElement.innerHTML = attrs.content;
    }
  }
  addTopCloseButton() {
    this.closeButton.className = "modal-close red";
    this.closeButton.innerHTML = "&times;";
    this.closeButton.setAttribute("aria-label", "Close Modal");
    this.closeButton.onclick = () => this.close();
  }
  initTitleElement(attrs) {
    this.titleElement.className = "modal-title";
    if (attrs.title) {
      this.titleElement.textContent = attrs.title;
    }
  }
  setButtons(buttonsAndBehaviour) {
    if (this.closeable) {
      let closeButton = Buttons.close({
        onclick: this.close.bind(this)
      });
      this.buttons.push(closeButton);
    }
    buttonsAndBehaviour.forEach(([button, behaviour]) => {
      switch (behaviour) {
        case 0 /* callbackAndClose */:
          if (button.getHTMLElement() && button.getHTMLElement().onclick != null) {
            const originalOnClick = button.getHTMLElement().onclick;
            button.getHTMLElement().onclick = () => {
              if (originalOnClick) {
                originalOnClick.call(button.getHTMLElement());
              }
              this.close();
            };
          }
          ;
          break;
        default:
          break;
      }
      this.buttons.push(button);
    });
    this.buttons.forEach(
      (button) => this.footerElement.appendChild(button.getHTMLElement())
    );
  }
  show() {
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.element);
    this.setSiblingsAccessibility(true);
    this.focusTrap.activate();
    requestAnimationFrame(() => {
      this.overlay.classList.add("visible");
      this.element.classList.add("visible");
    });
  }
  close() {
    this.focusTrap.deactivate();
    this.setSiblingsAccessibility(false);
    this.overlay.classList.remove("visible");
    this.element.classList.remove("visible");
    setTimeout(() => {
      document.body.removeChild(this.overlay);
      document.body.removeChild(this.element);
    }, 300);
  }
  setSiblingsAccessibility(hideOthers) {
    const siblings = Array.from(document.body.children).filter(
      (el) => el !== this.element && el !== this.overlay
    );
    siblings.forEach((sibling) => {
      if (hideOthers) {
        sibling.setAttribute("aria-hidden", "true");
      } else {
        if (!sibling.hasAttribute("aria-modal")) {
          sibling.removeAttribute("aria-hidden");
        }
      }
    });
    this.element.setAttribute("aria-hidden", hideOthers ? "false" : "true");
    this.overlay.setAttribute("aria-hidden", "true");
  }
  setContent(content) {
    this.contentElement.innerHTML = content;
  }
  getElement() {
    return this.element;
  }
  /**
   * Init footer element and all children elements
   */
  initFooterElement() {
    this.footerElement = document.createElement("footer");
    this.buttons.forEach((button) => {
      this.footerElement.appendChild(button.getHTMLElement());
    });
  }
  destroy() {
    if (this.focusTrap) {
      this.focusTrap.deactivate();
    }
    this.close();
    this.overlay.onclick = null;
    this.closeButton.onclick = null;
  }
};

// src/abstracts/Loader.ts
var Loader = class {
  constructor() {
    this.toLoad = [];
    this.toLoadOnBackgrund = [];
  }
  setToLoad(src) {
    this.toLoad.push(src);
  }
  setToLoadOnBackground(src) {
    this.toLoadOnBackgrund.push(src);
  }
  load() {
    return __async(this, null, function* () {
      let promises = this.toLoad.map((src) => {
        return this.mapTypeAndLoad(src);
      });
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => {
          resolve();
        }).catch((error) => reject(error));
      });
    });
  }
  loadOnBackground() {
    return __async(this, null, function* () {
      let promises = this.toLoadOnBackgrund.map((src) => {
        return this.mapTypeAndLoad(src);
      });
      return new Promise((resolve, reject) => {
        Promise.all(promises).then(() => resolve()).catch((error) => reject(error));
      });
    });
  }
  mapTypeAndLoad(src) {
    var _a;
    const fileExtension = (_a = src.split(".").pop()) == null ? void 0 : _a.toLowerCase();
    switch (fileExtension) {
      case "css":
        return this.loadCss(src);
      case "js":
        return this.loadScript(src);
      default:
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }
  }
  // Append to head
  loadCss(src) {
    return __async(this, null, function* () {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = src;
      cssLink.crossOrigin = "anonymous";
      cssLink.referrerPolicy = "no-referrer";
      document.head.appendChild(cssLink);
      return new Promise((resolve) => {
        cssLink.onload = () => {
          resolve();
        };
      });
    });
  }
  loadScript(src) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.defer = true;
        script.onload = () => {
          resolve();
        };
        script.onerror = (error) => {
          reject(error);
        };
        document.head.appendChild(script);
      });
    });
  }
};

// src/loaders/LoaderAlpha.ts
var LoaderAlpha = class _LoaderAlpha extends Loader {
  constructor(query) {
    super();
    this.element = null;
    this.infoAlert = null;
    this.infoStatus = null;
    this.element = document.querySelector(query);
    if (!this.element) {
      throw new Error(`Element with query "${query}" not found`);
    }
    this.infoAlert = this.element.querySelector("#info-alert");
    if (!this.infoAlert) {
      throw new Error('Element with id "info-alert" not found');
    }
    this.infoStatus = this.element.querySelector("#info-status");
    if (!this.infoStatus) {
      throw new Error('Element with id "info-status" not found');
    }
  }
  load() {
    return __async(this, null, function* () {
      var _a;
      yield __superGet(_LoaderAlpha.prototype, this, "load").call(this);
      ((_a = this.infoAlert) == null ? void 0 : _a.textContent) ? this.infoAlert.textContent = "assets loaded" : null;
      yield new Promise((r) => setTimeout(r, 400));
      yield this.hideElement();
    });
  }
  hideElement() {
    return __async(this, null, function* () {
      return new Promise((resolve) => {
        if (this.element) {
          this.element.classList.add("pop-out");
          this.element.setAttribute("aria-hidden", "true");
          console.log("set aria-hidden to true");
          this.element.addEventListener("animationend", () => {
            resolve();
          });
        } else {
          resolve();
        }
      });
    });
  }
};

// src/buttons/Home.ts
var HomeButton = class extends Button {
  constructor() {
    super("", "fa-home", {
      id: "home-button",
      "ariaLabel": "MindView home",
      onclick: () => this.onClick
    });
  }
  onClick() {
    window.location.href = "/";
  }
};

// src/buttons/Info.ts
var InfoButton = class extends Button {
  constructor(attrs) {
    const newAttrs = __spreadValues({
      id: "info-button",
      ariaLabel: "Show information"
    }, attrs);
    super("", "fa-info-circle", newAttrs);
  }
};

// src/buttons/Result.ts
var ResultButton = class extends Button {
  constructor(attrs) {
    super("", "fa-check-circle", __spreadValues({
      id: "result-button",
      ariaLabel: "Show result"
    }, attrs));
  }
};

// src/buttons/Refresh.ts
var RefreshButton = class extends Button {
  constructor(attrs) {
    super("Refresh", "fa-sync", __spreadValues({
      id: "refresh-button",
      ariaLabel: "Refresh page"
    }, attrs));
  }
};

// src/composers/Alpha.ts
var Alpha = class extends Composer {
  /**
   * Start everything
   */
  start() {
    const loader = new LoaderAlpha("#loader");
    loader.setToLoad("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
    loader.setToLoad("https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css");
    loader.setToLoad("/assets/styles/generic.css");
    loader.setToLoad("https://code.jquery.com/jquery-3.6.0.min.js");
    loader.setToLoad("https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/js/foundation.min.js");
    this.game.getAssetsToLoad().forEach((asset) => {
      loader.setToLoad(asset);
    });
    loader.load().then(() => {
      this.layoutButtons();
      this.layoutZoomControl();
      this.game.start();
    }).catch((error) => {
      console.error("Failed to load resources:", error);
    });
  }
  layoutButtons() {
    return __async(this, null, function* () {
      let buttonsOrder = [HomeButton, InfoButton, RefreshButton, ResultButton];
      for (const ButtonType of buttonsOrder) {
        const button = this.buttons.find((b) => b instanceof ButtonType);
        if (button) {
          this.topLeft.appendChild(button.getHTMLElement());
          button.getHTMLElement().classList.add("pop-in");
          yield new Promise((resolve) => setTimeout(resolve, 100));
          setTimeout(() => {
            button.getHTMLElement().classList.remove("pop-in");
          }, 2e3);
        }
      }
    });
  }
  layoutZoomControl() {
    return __async(this, null, function* () {
      if (this.zoomControl) {
        this.bottomRight.appendChild(this.zoomControl.getElement());
        alert("fnisih adding zoom control");
      }
    });
  }
  constructor(game) {
    super(game);
  }
  compose() {
  }
  destroy() {
  }
};

// src/composers/Beta.ts
var Beta = class extends Composer {
  start() {
    throw new Error("Method not implemented.");
  }
  onGameReady() {
    throw new Error("Method not implemented.");
  }
  constructor(game) {
    super(game);
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
  }
  compose() {
    this.destroy();
  }
  destroy() {
    if (this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
  }
};

// src/composers/index.ts
var Composers = {
  Alpha(game) {
    return new Alpha(game);
  },
  Beta(game) {
    return new Beta(game);
  }
};

// src/buttons/Close.ts
var CloseButton = class extends Button {
  constructor(attrs) {
    super(
      "Close",
      "fa-times",
      __spreadValues({
        id: "close-button",
        "ariaLabel": "Close",
        "className": "red"
      }, attrs)
    );
  }
};

// src/buttons/Next.ts
var NextButton = class extends Button {
  constructor(attrs) {
    super("Next", "fa-arrow-right", __spreadValues({
      id: "next-button",
      className: "orange",
      "ariaLabel": "Next"
    }, attrs));
  }
};

// src/buttons/Hint.ts
var HintButton = class extends Button {
  constructor(attrs) {
    super("Hint", "fa-lightbulb", __spreadValues({
      id: "hint-button",
      "ariaLabel": "Show hint"
    }, attrs));
  }
};

// src/buttons/Plus.ts
var PlusButton = class extends Button {
  constructor() {
    super("", "fa-plus", {
      id: "plus-button",
      "ariaLabel": "Zoom in",
      onclick: () => this.onClick()
    });
  }
  onClick() {
  }
};

// src/buttons/Minus.ts
var MinusButton = class extends Button {
  constructor() {
    super("", "fa-minus", {
      id: "minus-button",
      "ariaLabel": "Zoom out",
      onclick: () => this.onClick()
    });
  }
  onClick() {
  }
};

// src/buttons/index.ts
var Buttons = {
  home() {
    return new HomeButton();
  },
  refresh(attrs) {
    return new RefreshButton(attrs);
  },
  info(attrs) {
    return new InfoButton(attrs);
  },
  result(attrs) {
    return new ResultButton(attrs);
  },
  // Close buttons. The click handler will automatically provided based on context, e.g.: in modal.
  close(attrs) {
    return new CloseButton(attrs);
  },
  next(attrs) {
    return new NextButton(attrs);
  },
  hint(attrs) {
    return new HintButton(attrs);
  },
  plus(attrs) {
    return new PlusButton();
  },
  minus(attrs) {
    return new MinusButton();
  }
};

// src/modals/Alpha.ts
var ModalAlpha = class extends Modal {
  constructor(attrs = {}, buttonsAndBehaviour = []) {
    const defaultAttrs = __spreadValues({
      title: "Information",
      className: "modal-alpha"
    }, attrs);
    super(defaultAttrs, buttonsAndBehaviour);
  }
};

// src/modals/index.ts
var Modals = {
  alpha(attrs = {}, buttonsAndBehaviour) {
    return new ModalAlpha(attrs, buttonsAndBehaviour);
  }
};

// src/abstracts/ZoomControl.ts
var ZoomControl = class {
  constructor(attrs) {
    this.attrs = attrs;
    this.element = document.createElement("div");
    this.element.classList.add("zoom-control");
  }
  destroy() {
    this.element.remove();
  }
};

// src/zoom-controls/alpha.ts
var ZoomControlAlpha = class extends ZoomControl {
  constructor(attrs) {
    super(attrs);
    this.plusButton = Buttons.plus({
      onclick: () => attrs.onZoomIn()
    });
    this.plusButton.getHTMLElement().classList.add("zoom-in");
    this.minusButton = Buttons.minus({
      onclick: () => attrs.onZoomOut()
    });
    this.minusButton.getHTMLElement().classList.add("zoom-out");
    this.element.appendChild(this.plusButton.getHTMLElement());
    this.element.appendChild(this.minusButton.getHTMLElement());
  }
  getElement() {
    return this.element;
  }
  destroy() {
    this.plusButton.destroy();
    this.minusButton.destroy();
    super.destroy();
  }
};

// src/zoom-controls/index.ts
var ZoomControls = {
  alpha: (attrs) => new ZoomControlAlpha(attrs)
};

// simple-word/src/simple-word.ts
document.addEventListener("DOMContentLoaded", () => {
  let game = new SimpleWord();
  window.addEventListener("resize", () => {
    game.redrawCanvas();
  });
});
var _SimpleWord = class _SimpleWord extends Game {
  // The minimum font size
  constructor() {
    super();
    this.currentZoomLevel = 10;
    this.minZoomLevel = 1;
    // Words will be the smallest
    this.maxZoomLevel = 10;
    this.composer = Composers.Alpha(this);
    let infoButton = Buttons.info({
      onclick: this.infoButtonOnclick.bind(this)
    });
    let resultButton = Buttons.result({
      onclick: this.resultButtonOnclick.bind(this)
    });
    this.composer.addButton(Buttons.home());
    this.composer.addButton(infoButton);
    this.composer.addButton(resultButton);
    let zoomControls = ZoomControls.alpha({
      onZoomIn: this.increaseZoomLevel.bind(this),
      onZoomOut: this.decreaseZoomLevel.bind(this)
    });
    this.composer;
    this.composer.start();
    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    document.body.appendChild(this.canvas);
    this.resizeCanvas();
    this.initInfoModal();
    this.initResultModal();
  }
  initResultModal() {
    let nextButton = Buttons.next({
      onclick: this.onclickNextButton.bind(this)
    });
    this.resultModal = Modals.alpha({
      title: "Current Word",
      content: this.createResultModalContent()
    }, [[nextButton, 0 /* callbackAndClose */]]);
  }
  createResultModalContent() {
    return `The current word displayed on screen is "${this.currentWord}".`;
  }
  initInfoModal() {
    this.infoModal = Modals.alpha({
      title: "Simple Word Game",
      content: '<p>Objective of this game is to guess the word on the screen.</p><p>If screen reader is activated, click on the "Result" button to let screen reader reads the current word.</p>'
    }, []);
  }
  init() {
    throw new Error("Method init not implemented.");
  }
  start() {
    this.infoModal.show();
    this.newGame();
  }
  newGame() {
    this.currentWord = _SimpleWord.words[Math.floor(Math.random() * _SimpleWord.words.length)];
    this.redrawCanvas();
  }
  pause() {
    throw new Error("Method pause not implemented.");
  }
  resume() {
    throw new Error("Method resume not implemented.");
  }
  end() {
    if (this.canvas) {
      document.body.removeChild(this.canvas);
    }
  }
  getAssetsToLoad() {
    return [];
  }
  infoButtonOnclick() {
    this.infoModal.show();
  }
  resultButtonOnclick() {
    this.resultModal.titleElement.textContent = this.createResultModalTitle();
    this.resultModal.contentElement.textContent = this.createResultModalContent();
    this.resultModal.show();
  }
  createResultModalTitle() {
    return `Current Word: ${this.currentWord}`;
  }
  onclickNextButton() {
    this.newGame();
  }
  increaseZoomLevel() {
    if (this.currentZoomLevel < this.maxZoomLevel) {
      this.currentZoomLevel++;
      this.redrawCanvas();
    }
  }
  decreaseZoomLevel() {
    if (this.currentZoomLevel > this.minZoomLevel) {
      this.currentZoomLevel--;
      this.redrawCanvas();
    }
  }
  redrawCanvas() {
    if (!this.canvas || !this.currentWord) return;
    const context = this.canvas.getContext("2d");
    if (!context) return;
    this.resizeCanvas();
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let fontSize = 1900;
    context.font = `bold ${fontSize}px Arial`;
    let textMetrics = context.measureText(this.currentWord);
    const canvasWidth = this.canvas.width - 20;
    const maxWidth = canvasWidth - (this.currentZoomLevel - 1) * canvasWidth / 8;
    while (textMetrics.width > maxWidth && fontSize - 20 > _SimpleWord.minFontSize) {
      fontSize -= 20;
      context.font = `bold ${fontSize}px Arial`;
      textMetrics = context.measureText(this.currentWord);
    }
    const x = (this.canvas.width - textMetrics.width) / 2;
    const y = this.canvas.height / 2 + (textMetrics.actualBoundingBoxAscent - textMetrics.actualBoundingBoxDescent) / 2;
    context.fillStyle = "black";
    context.fillText(this.currentWord, x, y);
  }
  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
};
// Define words to be shuffled
_SimpleWord.words = ["cat", "dog", "sun", "moon", "tree", "book", "fish", "bird", "star", "home"];
// Words, will be the largest
_SimpleWord.minFontSize = 8;
var SimpleWord = _SimpleWord;
/*! Bundled license information:

tabbable/dist/index.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.js:
  (*!
  * focus-trap 7.6.2
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
