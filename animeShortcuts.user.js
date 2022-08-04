// ==UserScript==
// @name         AMQ Anime Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Displays shortest shortcuts for anime (must be first in dropfown) after guessing phase
// @author       Tutti
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/tutti-amq/amq-scripts/main/shortcuts.js
// @grant        none
// ==/UserScript==

/* global Listener */

var infoDiv;

if (window.quiz) {
  setup();
}

function onSongPlayed(data) {
  let currentShortcuts = !shortcuts.hasOwnProperty(data.songInfo.annId)
    ? "Anime isn't in shortcut database yet"
    : shortcuts[data.songInfo.annId] != null
    ? shortcuts[data.songInfo.annId]
    : "Anime doesn't have shortcuts";

  infoDiv.innerHTML = `<h5><b>Anime shortcuts: </b></h5>${currentShortcuts}<br><br>`;
}

function setup() {
  var boxDiv = document.querySelector("div.qpSideContainer > div.row");
  infoDiv = document.createElement("div");

  infoDiv.className = "rowPlayCount";

  boxDiv = boxDiv.parentElement;
  boxDiv.insertBefore(infoDiv, boxDiv.children[4]);

  new Listener("answer results", onSongPlayed).bindListener();
}
