"use strict";
var __defProp = Object.defineProperty;
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
  }
  /**
   * Add control button
   * @param button 
   */
  addButton(button) {
    this.buttons.push(button);
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
    this.element.className = "button";
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
var Modal = class {
  constructor(attrs = {}, buttons) {
    this.buttons = [];
    // If `closeable` is true, will add a close button on top and at the bottom
    this.closeable = true;
    this.element = document.createElement("div");
    this.overlay = document.createElement("div");
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
    this.initTitleElement(attrs);
    if (this.closeable) {
      this.addTopCloseButton();
    }
    this.setContentElement(attrs);
    this.setButtons();
    this.initFooterElement();
    this.assembleModal();
  }
  assembleModal() {
    this.element.appendChild(this.titleElement);
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
    this.closeButton.className = "modal-close";
    this.closeButton.innerHTML = "&times;";
    this.closeButton.onclick = () => this.close();
    this.titleElement.appendChild(this.closeButton);
  }
  initTitleElement(attrs) {
    this.titleElement.className = "modal-title";
    if (attrs.title) {
      this.titleElement.textContent = attrs.title;
    }
  }
  setButtons() {
    if (this.closeable) {
      let closeButton = Buttons.close({
        onclick: this.close.bind(this)
      });
      this.buttons.push(closeButton);
    }
  }
  show() {
    document.body.appendChild(this.overlay);
    document.body.appendChild(this.element);
    setTimeout(() => {
      this.overlay.classList.add("visible");
      this.element.classList.add("visible");
    }, 10);
  }
  close() {
    this.overlay.classList.remove("visible");
    this.element.classList.remove("visible");
    setTimeout(() => {
      this.overlay.remove();
      this.element.remove();
    }, 300);
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
    this.close();
    this.overlay.onclick = null;
    this.closeButton.onclick = null;
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

// src/loaders/index.ts
var Loaders = {
  LoaderAlpha(query) {
    return new LoaderAlpha(query);
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
    const loader = Loaders.LoaderAlpha("#loader");
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
        "ariaLabel": "Close"
      }, attrs)
    );
  }
};

// src/buttons/Next.ts
var NextButton = class extends Button {
  constructor(attrs) {
    super("Next", "fa-arrow-right", __spreadValues({
      id: "next-button",
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
  }
};

// src/modals/Alpha.ts
var ModalAlpha = class extends Modal {
  constructor(attrs = {}) {
    const defaultAttrs = __spreadValues({
      title: "Information",
      className: "modal-alpha"
    }, attrs);
    super(defaultAttrs);
  }
};

// src/modals/index.ts
var Modals = {
  alpha(attrs = {}) {
    return new ModalAlpha(attrs);
  }
};

// random-color/src/random-color.ts
document.addEventListener("DOMContentLoaded", () => {
  let game = new RandomColor();
});
var _RandomColor = class _RandomColor extends Game {
  constructor() {
    super();
    this.composer = Composers.Alpha(this);
    let infoButton = Buttons.info({
      onclick: this.infoButtonOnclick.bind(this)
    });
    let resultButton = Buttons.result({
      onclick: this.hintButtonOnclick.bind(this)
    });
    this.composer.addButton(Buttons.home());
    this.composer.addButton(infoButton);
    this.composer.addButton(resultButton);
    this.composer.start();
    this.initInfoModal();
  }
  initInfoModal() {
    this.infoModal = Modals.alpha({
      title: "Random Color",
      content: '<p>Guess the color on the screen.</p><p>Activate screen reader,  and click on the "Result" button to know the current color.</p>'
    });
  }
  init() {
    throw new Error("Method init not implemented.");
  }
  start() {
    this.infoModal.show();
    this.newGame();
  }
  newGame() {
    let randomColor = _RandomColor.colors[Math.floor(Math.random() * _RandomColor.colors.length)];
    document.body.style.backgroundColor = randomColor;
  }
  pause() {
    throw new Error("Method pause not implemented.");
  }
  resume() {
    throw new Error("Method resume not implemented.");
  }
  end() {
    throw new Error("Method end not implemented.");
  }
  getAssetsToLoad() {
    return [];
  }
  infoButtonOnclick() {
    this.infoModal.show();
  }
  hintButtonOnclick() {
    throw new Error("Method resultButtonOnClick not implemented.");
  }
};
// Define colors to be shuffled
_RandomColor.colors = ["red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "gray", "black", "white"];
var RandomColor = _RandomColor;
