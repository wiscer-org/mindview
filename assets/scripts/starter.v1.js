"use strict";
var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
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
  constructor(text, fontAwesomeIcon = "", attrs = {}) {
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

// src/buttons/Home.ts
var HomeButton = class extends Button {
  constructor() {
    super("", "fa-home", {
      id: "home-button",
      "ariaLabel": "MindView home"
    });
    this.element.onclick = () => this.onClick();
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
          console.log("Resolve: all assets are loaded");
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
      return __superGet(_LoaderAlpha.prototype, this, "load").call(this).then(() => {
        var _a;
        ((_a = this.infoAlert) == null ? void 0 : _a.textContent) ? this.infoAlert.textContent = "assets loaded" : null;
        setTimeout(() => {
          console.log("hide loader element");
          this.hideElement();
        }, 700);
      });
    });
  }
  hideElement() {
    var _a;
    (_a = this.element) == null ? void 0 : _a.classList.add("pop-out");
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
  constructor() {
    super("", "fa-info-circle", {
      id: "info-button",
      ariaLabel: "Show information"
    });
    this.element.onclick = () => this.onClick();
  }
  onClick() {
    console.log("Info clicked");
  }
};

// src/buttons/Result.ts
var ResultButton = class extends Button {
  constructor() {
    super("", "fa-check-circle", {
      id: "result-button",
      ariaLabel: "Show result"
    });
    this.element.onclick = () => this.onClick();
  }
  onClick() {
    console.log("Result clicked");
  }
};

// src/buttons/Refresh.ts
var RefreshButton = class extends Button {
  constructor() {
    super("Refresh", "fa-sync", {
      id: "refresh-button",
      ariaLabel: "Refresh page"
    });
    this.element.onclick = () => this.onClick();
  }
  onClick() {
    window.location.reload();
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

// src/buttons/index.ts
var Buttons = {
  home() {
    return new HomeButton();
  },
  refresh() {
    return new RefreshButton();
  },
  info() {
    return new InfoButton();
  },
  result() {
    return new ResultButton();
  }
};

// tests/templates/starter.v1/src/SampleGame.ts
var SampleGame = class extends Game {
  getAssetsToLoad() {
    return [];
  }
  init() {
    throw new Error("Method not implemented.");
  }
  /**
   * Start everything, take over whole control. Different meaning than `pl`
   */
  start() {
    console.log("Sample Game started");
  }
  pause() {
    throw new Error("Method not implemented.");
  }
  resume() {
    throw new Error("Method not implemented.");
  }
  end() {
    throw new Error("Method not implemented.");
  }
};

// tests/templates/starter.v1/src/starter.v1.ts
document.addEventListener("DOMContentLoaded", function() {
  let mvGame = new SampleGame();
  let composer = Composers.Alpha(mvGame);
  composer.addButton(Buttons.home());
  composer.addButton(Buttons.info());
  composer.addButton(Buttons.result());
  composer.start();
});
