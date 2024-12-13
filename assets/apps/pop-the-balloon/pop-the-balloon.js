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

// src/abstracts/ScoreComponent.ts
var ScoreComponent = class {
  constructor() {
    this.score = 0;
    this.element = document.createElement("div");
    this.element.textContent = this.score.toString();
  }
  getScore() {
    return this.score;
  }
  addScore(score = 1) {
    this.score++;
    this.animateScoreUpdate();
  }
  setScore(score) {
    this.score = score;
  }
};

// src/score-components/ScoreComponentAlpha.ts
var ScoreAlpha = class extends ScoreComponent {
  constructor() {
    super();
  }
  animateShow() {
    return Promise.resolve();
  }
  animateScoreUpdate() {
    this.element.textContent = this.score.toString();
    this.element.classList.add("pop-in");
    return new Promise((resolve) => {
      this.element.addEventListener("animationend", () => {
        this.element.classList.remove("pop-in");
        resolve();
      });
    });
  }
};

// src/score-components/index.ts
var ScoreComponents = {
  alpha() {
    return new ScoreAlpha();
  }
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
    if (this.topLeft)
      document.body.appendChild(this.topLeft);
    if (this.topCenter)
      document.body.appendChild(this.topCenter);
    if (this.topRight)
      document.body.appendChild(this.topRight);
    if (this.bottomRight)
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
    this.topLeft = this.createElementsContainer();
    this.topLeft.classList.add("top");
    this.topLeft.classList.add("left");
    this.topCenter = this.createElementsContainer();
    this.topCenter.classList.add("top");
    this.topCenter.classList.add("center");
    this.topRight = this.createElementsContainer();
    this.topRight.classList.add("top");
    this.topRight.classList.add("right");
    this.bottomLeft = this.createElementsContainer();
    this.bottomLeft.classList.add("bottom");
    this.bottomLeft.classList.add("left");
    this.bottomRight = this.createElementsContainer();
    this.bottomRight.classList.add("bottom");
    this.bottomRight.classList.add("right");
  }
  createElementsContainer() {
    const container = document.createElement("div");
    container.classList.add("f-c");
    return container;
  }
  initScoreComponentIfNeeded() {
    if (!this.scoreComponent) {
      this.scoreComponent = ScoreComponents.alpha();
      this.scoreComponent.setScore(0);
    }
  }
  setScore(score) {
    var _a;
    this.initScoreComponentIfNeeded();
    (_a = this.scoreComponent) == null ? void 0 : _a.setScore(score);
  }
  addScore(increase = 1) {
    var _a;
    this.initScoreComponentIfNeeded();
    (_a = this.scoreComponent) == null ? void 0 : _a.addScore(increase);
  }
  getScore() {
    var _a, _b;
    this.initScoreComponentIfNeeded();
    return (_b = (_a = this.scoreComponent) == null ? void 0 : _a.getScore()) != null ? _b : 0;
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

// src/abstracts/Loader.ts
var Loader = class {
  constructor(query) {
    this.toLoad = [];
    this.toLoadOnBackgrund = [];
    this.element = null;
    this.element = document.querySelector(query);
    if (!this.element) {
      throw new Error(`Element with query "${query}" not found. Element need to be already existed in DOM to be used as Loader container.`);
    }
  }
  setToLoad(src) {
    this.toLoad.push(src);
  }
  setToLoadOnBackground(src) {
    this.toLoadOnBackgrund.push(src);
  }
  load() {
    return __async(this, null, function* () {
      var _a;
      if (this.element && ((_a = this.element) == null ? void 0 : _a.parentNode) !== document.body) {
        document.body.appendChild(this.element);
      }
      let promises = this.toLoad.map((src) => {
        return this.mapTypeAndLoad(src);
      });
      console.log(`is promises array : ${Array.isArray(promises)}`);
      Promise.all(promises).then((r) => {
        console.log("success");
        console.log(r);
      }).catch((e) => {
        console.log(`${Array.isArray(e)}`);
        console.log("promise all");
        console.error(e);
      });
      return [];
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
      case "mp3":
      case "wav":
      case "ogg":
        return this.loadAudio(src);
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
  loadAudio(src) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const audio = new Audio(src);
        audio.oncanplaythrough = () => {
          resolve();
        };
        audio.onerror = (error) => {
          reject(error);
        };
      });
    });
  }
  hide() {
    return __async(this, null, function* () {
      yield this.hideAnimation();
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    });
  }
};

// src/loaders/LoaderAlpha.ts
var LoaderAlpha = class _LoaderAlpha extends Loader {
  constructor(query) {
    super(query);
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
      yield __superGet(_LoaderAlpha.prototype, this, "load").call(this).catch((e) => {
        var _a2;
        console.log(e);
        let errorMsg = `Error loading ${e.target.tagName} from ${e.target.src}`;
        console.error(errorMsg);
        ((_a2 = this.infoAlert) == null ? void 0 : _a2.textContent) ? this.infoAlert.textContent = errorMsg : null;
      });
      ((_a = this.infoAlert) == null ? void 0 : _a.textContent) ? this.infoAlert.textContent = "assets loaded" : null;
      yield new Promise((r) => setTimeout(r, 400));
      yield this.hide();
      return [];
    });
  }
  hideAnimation() {
    return __async(this, null, function* () {
      return new Promise((resolve) => {
        if (this.element) {
          this.element.classList.add("pop-out");
          this.element.setAttribute("aria-hidden", "true");
          console.log("set aria-hidden to true");
          this.element.addEventListener("animationend", () => {
            var _a, _b;
            (_b = (_a = this.element) == null ? void 0 : _a.parentNode) == null ? void 0 : _b.removeChild(this.element);
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

// src/alerts/Toaster.ts
var Toaster = class {
  constructor(customStyles = {}) {
    // Default timeout
    this.defaultTimeout = 17e3;
    this.element = document.createElement("div");
    this.element.setAttribute("role", "alert");
    this.element.setAttribute("aria-live", "assertive");
    const defaultStyles = {
      position: "fixed",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: "12px 24px",
      borderRadius: "4px",
      fontSize: "16px",
      opacity: "0",
      transition: "opacity 0.3s ease-in-out",
      zIndex: "1000",
      textAlign: "center",
      maxWidth: "80%",
      wordWrap: "break-word"
    };
    const finalStyles = __spreadValues(__spreadValues({}, defaultStyles), customStyles);
    Object.assign(this.element.style, finalStyles);
    document.body.appendChild(this.element);
  }
  /**
   * Show toast message
   * @param {string} message 
   */
  show(message) {
    if (this.timeoutObject) {
      clearTimeout(this.timeoutObject);
    }
    this.element.textContent = message;
    this.element.style.opacity = "1";
    this.timeoutObject = setTimeout(() => {
      this.element.style.opacity = "0";
    }, this.defaultTimeout);
  }
};
var Toaster_default = Toaster;

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
      this.layoutScoreComponent();
      this.layoutZoomControl();
      this.game.start();
    }).catch((error) => {
      console.error("Failed to load resources:", error);
    });
  }
  layoutScoreComponent() {
    if (this.scoreComponent && this.topCenter) {
      this.topCenter.appendChild(this.scoreComponent.element);
      this.scoreComponent.animateShow();
    }
  }
  layoutButtons() {
    return __async(this, null, function* () {
      let buttonsOrder = [HomeButton, InfoButton, RefreshButton, ResultButton];
      for (const ButtonType of buttonsOrder) {
        const button = this.buttons.find((b) => b instanceof ButtonType);
        if (button && this.topLeft) {
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
  /**
   * Add zoom control to the bottom right
   */
  layoutZoomControl() {
    return __async(this, null, function* () {
      if (this.zoomControl && this.bottomRight) {
        this.bottomRight.appendChild(this.zoomControl.getElement());
      }
    });
  }
  alert(message) {
    if (!this.toaster) {
      this.toaster = new Toaster_default();
    }
    this.toaster.show(message);
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
  constructor(attrs) {
    super("", "fa-plus", __spreadValues({
      id: "plus-button",
      "ariaLabel": "Zoom in"
    }, attrs));
  }
};

// src/buttons/Minus.ts
var MinusButton = class extends Button {
  constructor(attrs) {
    super("", "fa-minus", __spreadValues({
      id: "minus-button",
      "ariaLabel": "Zoom out"
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
  },
  plus(attrs) {
    return new PlusButton(attrs);
  },
  minus(attrs) {
    return new MinusButton(attrs);
  }
};

// pop-the-balloon/src/pop-the-balloon.ts
document.addEventListener("DOMContentLoaded", () => {
  let game = new PopTheBalloon();
});
var _PopTheBalloon = class _PopTheBalloon extends Game {
  constructor() {
    super();
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.balloonWidth = 0;
    this.balloonHeight = 0;
    this.balloonCenter = { x: 0, y: 0 };
    this.balloonColor = "#ff0000";
    // Default red color
    this.balloonSize = 3;
    // Default size
    this.lives = 5;
    // Default number of lives
    this.isGameActive = false;
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "fixed";
    this.canvas.style.top = "0";
    this.canvas.style.left = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.zIndex = "1";
    this.ctx = this.canvas.getContext("2d");
    document.body.appendChild(this.canvas);
    this.popSound = document.createElement("audio");
    this.popSound.src = _PopTheBalloon.popSoundSrc;
    this.popSound.preload = "auto";
    const style = document.createElement("style");
    style.textContent = `
            @keyframes popAnimation {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(2); opacity: 0; }
            }
            .pop-animation {
                position: fixed;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                animation: popAnimation 0.3s ease-out forwards;
                pointer-events: none;
                z-index: 1000;
            }
        `;
    document.head.appendChild(style);
    window.addEventListener("resize", this.onCanvasResize.bind(this));
    this.setupAndStartComposer();
    this.initInfoModal();
    this.initResultModal();
  }
  setupAndStartComposer() {
    return __async(this, null, function* () {
      this.composer = Composers.Alpha(this);
      const infoButton = Buttons.info({
        onclick: this.infoButtonOnclick.bind(this)
      });
      this.composer.addButton(Buttons.home());
      this.composer.addButton(infoButton);
      this.composer.setScore(0);
      this.composer.start();
    });
  }
  newGame() {
    this.isGameActive = true;
    this.lives = 5;
    const boundHandler = this.handleCanvasInteraction.bind(this);
    this.canvas.addEventListener("click", (e) => {
      boundHandler(e);
    });
    this.canvas.addEventListener("touchstart", boundHandler);
    this._boundHandler = boundHandler;
    this.newRound();
  }
  newRound() {
    this.moveBalloonRandomly();
  }
  onCanvasResize() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.measureUnits();
    this.drawCanvas();
  }
  drawCanvas() {
    this.redrawBalloon();
  }
  measureUnits() {
    const baseUnit = Math.min(this.canvasWidth, this.canvasHeight) / 10;
    this.balloonWidth = baseUnit * 2;
    this.balloonHeight = baseUnit * 2.2;
  }
  randomizeBalloonCenter() {
    const widthRadius = this.balloonWidth * 0.9;
    const heightRadius = this.balloonHeight * 1.1;
    const x = Math.random() * (this.canvasWidth - 2 * widthRadius) + widthRadius;
    const y = Math.random() * (this.canvasHeight - 2 * heightRadius) + heightRadius;
    this.balloonCenter = { x, y };
  }
  redrawBalloon() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    const widthRadius = this.balloonWidth * 0.9;
    const heightRadius = this.balloonHeight * 1.1;
    this.ctx.beginPath();
    this.ctx.ellipse(this.balloonCenter.x, this.balloonCenter.y, widthRadius, heightRadius, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = this.balloonColor;
    this.ctx.fill();
    this.ctx.closePath();
    const knotHeight = heightRadius * 0.05;
    const knotWidth = heightRadius * 0.05;
    const triangleCenterX = this.balloonCenter.x;
    const triangleTopY = this.balloonCenter.y + heightRadius;
    const triangleLeftX = triangleCenterX - knotWidth / 2;
    const triangleRightX = triangleCenterX + knotWidth / 2;
    const triangleBottomY = triangleTopY + knotHeight;
    this.ctx.beginPath();
    this.ctx.moveTo(triangleCenterX, triangleTopY);
    this.ctx.lineTo(triangleLeftX, triangleBottomY);
    this.ctx.lineTo(triangleRightX, triangleBottomY);
    this.ctx.closePath();
    this.ctx.fillStyle = this.balloonColor;
    this.ctx.fill();
    const stringStartX = triangleCenterX;
    const stringStartY = triangleBottomY;
    const stringLength = heightRadius * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(stringStartX, stringStartY);
    this.ctx.bezierCurveTo(
      stringStartX - 20,
      stringStartY + 60,
      stringStartX + 20,
      stringStartY + 120,
      stringStartX,
      stringStartY + stringLength
    );
    this.ctx.strokeStyle = "#555";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }
  moveBalloonRandomly() {
    if (this.lives > 0) {
      this.randomizeBalloonCenter();
      this.redrawBalloon();
    }
  }
  isPointInBalloon(x, y) {
    const widthRadius = this.balloonWidth * 0.9;
    const heightRadius = this.balloonHeight * 1.1;
    const dx = (x - this.balloonCenter.x) / widthRadius;
    const dy = (y - this.balloonCenter.y) / heightRadius;
    const isInOval = dx * dx + dy * dy <= 1;
    const triangleTopY = this.balloonCenter.y + heightRadius;
    const knotHeight = heightRadius * 0.05;
    const knotWidth = heightRadius * 0.05;
    const triangleLeftX = this.balloonCenter.x - knotWidth / 2;
    const triangleRightX = this.balloonCenter.x + knotWidth / 2;
    const triangleBottomY = triangleTopY + knotHeight;
    const isInTriangle = y >= triangleTopY && y <= triangleBottomY && x >= triangleLeftX && x <= triangleRightX;
    return isInOval || isInTriangle;
  }
  handleCanvasInteraction(event) {
    var _a, _b;
    event.preventDefault();
    event.stopPropagation();
    if (!this.isGameActive) return;
    const rect = this.canvas.getBoundingClientRect();
    let x, y;
    if (event.type === "touchstart") {
      const touchEvent = event;
      x = touchEvent.touches[0].clientX - rect.left;
      y = touchEvent.touches[0].clientY - rect.top;
    } else {
      const mouseEvent = event;
      x = mouseEvent.clientX - rect.left;
      y = mouseEvent.clientY - rect.top;
    }
    if (this.isPointInBalloon(x, y)) {
      this.addScore();
      this.popSound.play();
      this.showPoppedBalloon(x, y);
      (_a = this.composer) == null ? void 0 : _a.alert(`Great shot!`);
      this.newRound();
    } else {
      this.lives--;
      if (this.lives <= 0) {
        this.gameOver();
      } else {
        (_b = this.composer) == null ? void 0 : _b.alert(`Missed! Lives remaining: ${this.lives}`);
        this.newRound();
      }
    }
  }
  addScore() {
    var _a;
    (_a = this.composer) == null ? void 0 : _a.addScore(1);
  }
  showPoppedBalloon(x, y) {
    const popElement = document.createElement("div");
    popElement.style.position = "fixed";
    popElement.style.left = `${x - 25}px`;
    popElement.style.top = `${y - 25}px`;
    popElement.style.backgroundColor = this.balloonColor;
    popElement.style.zIndex = "1000";
    popElement.className = "pop-animation";
    document.body.appendChild(popElement);
    popElement.addEventListener("animationend", () => {
      if (popElement.parentNode) {
        document.body.removeChild(popElement);
      }
    }, { once: true });
  }
  gameOver() {
    this.isGameActive = false;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.resultModal.setContent(this.createResultModalContent());
    this.resultModal.show();
    if (this._boundHandler) {
      this.canvas.removeEventListener("click", this._boundHandler);
      this.canvas.removeEventListener("touchstart", this._boundHandler);
    }
  }
  startAgain() {
    this.newGame();
  }
  init() {
    throw new Error("Method not implemented.");
  }
  start() {
    this.onCanvasResize();
    this.newGame();
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
  getAssetsToLoad() {
    return [_PopTheBalloon.popSoundSrc];
  }
  initInfoModal() {
  }
  initResultModal() {
  }
  createResultModalContent() {
    return `
            <div class="result-content">
                <h2>Game Over!</h2>
                <button onclick="game.startAgain()">Play Again</button>
            </div>
        `;
  }
  infoButtonOnclick() {
  }
  resultButtonOnclick() {
  }
  onclickNextButton() {
  }
};
_PopTheBalloon.popSoundSrc = "https://www.soundjay.com/buttons/sounds/button-16.mp3";
var PopTheBalloon = _PopTheBalloon;
