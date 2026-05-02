// ==UserScript==
// @name         Muah Minesweeper+
// @namespace    http://tampermonkey.net/
// @version      26.18.0
// @description  try to take over the world!
// @author       LiaoxyuCM
// @match        https://ms.muah.top/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=muah.top
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';


    function darkApply() {
        let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.style.setProperty('--unrevealed', '#588bbd');

        document.documentElement.style.setProperty('--revealed', '#1e2223');
        GM_addStyle(`
        .cell[data-count="1"] { color: #3498db; }
.cell[data-count="2"] { color: #2ecc71; }
.cell[data-count="3"] { color: #e74c3c; }
.cell[data-count="4"] { color: #9b59b6; }
.cell[data-count="5"] { color: #e67e22; }
.cell[data-count="6"] { color: #1abc9c; }
.cell[data-count="7"] { color: #b8c7d5; }
.cell[data-count="8"] { color: #7f8c8d; }
        `)
    }

    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    document.querySelector(".btn").addEventListener('click', () => {
        setTimeout(() => {
            if (isDarkMode) {
                darkApply();
            }
            let cellcnt = 0
            GM_addStyle(`
  .cell:nth-child(1) {
    border-top-left-radius: 4px !important;
  }
  .cell:nth-child(9) {
    border-top-right-radius: 4px !important;
  }
  .cell:nth-child(73) {
    border-bottom-left-radius: 4px !important;
  }
  .cell:nth-child(81) {
    border-bottom-right-radius: 4px !important;
  }
  .cell {
    border-radius: 0;
  }
`);
        }, 0)
    });
    // Your code here...
})();