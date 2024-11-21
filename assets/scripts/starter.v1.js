"use strict";

// src/abstracts/Composer.ts
var Composer = class {
  constructor(game) {
    this.game = game;
    this.elements = [];
  }
  /**
   * 
   */
  addElement(element) {
    this.elements.push(element);
    document.body.appendChild(element);
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
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
};

// src/composers/index.ts
var ComposerA = class extends Composer {
  onGameReady() {
    throw new Error("Method not implemented.");
  }
  constructor(game) {
    super(game);
    this.topLeft = this.createCornerContainer();
    this.topRight = this.createCornerContainer();
    this.bottomLeft = this.createCornerContainer();
    this.bottomRight = this.createCornerContainer();
  }
  createCornerContainer() {
    const container = document.createElement("div");
    this.addElement(container);
    return container;
  }
  start() {
    this.destroy();
  }
  destroy() {
    this.elements.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.elements = [];
  }
  addButton(button) {
    this.topRight.appendChild(button.getHTMLElement());
  }
};
var ComposerB = class extends Composer {
  onGameReady() {
    throw new Error("Method not implemented.");
  }
  constructor(game) {
    super(game);
    this.container = document.createElement("div");
    this.addElement(this.container);
  }
  start() {
    this.destroy();
  }
  destroy() {
    this.elements.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    this.elements = [];
  }
  addButton(button) {
    this.container.appendChild(button.getHTMLElement());
  }
};
var Composers = {
  A(game) {
    return new ComposerA(game);
  },
  B(game) {
    return new ComposerB(game);
  }
};

// src/buttons/Home.ts
var HomeButton = class extends Button {
  constructor() {
    super("Home", "fa-home", {
      id: "home-button",
      "ariaLabel": "MindView home"
    });
    this.element.onclick = () => this.onClick();
  }
  onClick() {
    window.location.href = "/";
  }
};
Button.HOME = () => {
  return new HomeButton();
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
  /**
   * Accept `Mv.Composer` instance.
   * This will allow object to communicate with the composer
   */
  setComposer(composer) {
    this.composer = composer;
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
  let composer = Composers.A(mvGame);
  composer.addButton(Buttons.home());
  composer.addButton(Buttons.info());
  composer.start();
});
