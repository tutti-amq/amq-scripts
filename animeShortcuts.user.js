// ==UserScript==
// @name         AMQ Anime Shortcuts
// @namespace    http://tampermonkey.net/
// @version      1.0.6
// @description  Displays shortest shortcuts for anime (must be first in dropfown) after guessing phase
// @author       Tutti
// @match        https://animemusicquiz.com/*
// @require      https://raw.githubusercontent.com/tutti-amq/amq-scripts/main/shortcuts.js
// @downloadURL  https://github.com/tutti-amq/amq-scripts/raw/main/animeShortcuts.user.js
// @updateURL    https://github.com/tutti-amq/amq-scripts/raw/main/animeShortcuts.user.js
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
    ? formatShortcuts(shortcuts[data.songInfo.annId])
    : "Anime doesn't have shortcuts";

  infoDiv.innerHTML = `<h5><b>Anime shortcuts: </b></h5>${currentShortcuts}<br><br>`;
}

function formatShortcuts(shortcuts) {
  let uniqueShortcuts = shortcuts.filter(onlyUnique);
  let formattedString = "";
  let shortcutsLength = uniqueShortcuts.length;
  uniqueShortcuts.forEach((shortcut, index) => {
    let formattedShortcut = shortcut.includes(" ") ? shortcut.replaceAll(" ", "&nbsp") : shortcut;
    formattedString += `<code style = "color:white;background-color:#2e2c2c;border-width:0.5px;border-style:solid;border-color:white">${formattedShortcut}</code> `;
  });

  return formattedString;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function setup() {
  var boxDiv = document.querySelector("div.qpSideContainer > div.row");
  infoDiv = document.createElement("div");

  infoDiv.className = "rowAnimeShortcuts";
  infoDiv.style.cssText += "line-height: 1.7";

  boxDiv = boxDiv.parentElement;
  boxDiv.insertBefore(infoDiv, boxDiv.children[4]);

  new Listener("answer results", onSongPlayed).bindListener();
}
