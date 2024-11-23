"use strict";
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

// src/composers/Alpha.ts
var Alpha = class extends Composer {
  /**
   * Start everything
   */
  start() {
    let thingsToWait = [];
    thingsToWait.push(this.loadCss("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"));
    thingsToWait.push(this.loadCss("https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css"));
    thingsToWait.push(this.loadCss("/assets/styles/generic.css"));
    thingsToWait.push(this.loadScript("https://code.jquery.com/jquery-3.6.0.min.js"));
    thingsToWait.push(this.loadScript("https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/js/foundation.min.js"));
    this.layoutButtons();
  }
  loadCss(path) {
    return __async(this, null, function* () {
      const cssLink = document.createElement("link");
      cssLink.rel = "stylesheet";
      cssLink.href = path;
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
  /**
  * Load script async
  */
  loadScript(path) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
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
  layoutButtons() {
    let buttonsOrder = [HomeButton];
    buttonsOrder.forEach((ButtonType) => {
      const button = this.buttons.find((b) => b instanceof ButtonType);
      if (button) {
        this.topLeft.appendChild(button.getHTMLElement());
      }
    });
  }
  onGameReady() {
    throw new Error("Method not implemented.");
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

// src/buttons/Info.ts
var InfoButton = class extends Button {
  constructor() {
    super("Info", "fa-info-circle", {
      id: "info-button",
      ariaLabel: "Show information"
    });
    this.element.onclick = () => this.onClick();
  }
  onClick() {
    console.log("Info clicked");
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
  }
};

// tests/templates/starter.v1/src/SampleGame.ts
var SampleGame = class extends Game {
  init() {
    throw new Error("Method not implemented.");
  }
  start() {
    throw new Error("Method not implemented.");
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
  composer.start();
});
