// Entry point for starter.v1

import * as Mv from "../../../../src/Mv";
import SampleGame from "./SampleGame";

document.addEventListener("DOMContentLoaded", function () {
    // Init MvGame
    let mvGame: Mv.Game = new SampleGame();

    // Get composer
    let composer: Mv.Composer = Mv.Composers.Alpha(mvGame);
    composer.addButton(Mv.Buttons.home());
    composer.addButton(Mv.Buttons.info());
    composer.addButton(Mv.Buttons.result());

    // Pass the control to composer to start everything
    composer.start();
});

