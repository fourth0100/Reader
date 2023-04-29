// ==UserScript==
// @name         Scroll Buttons for Firefox
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds two semi-transparent buttons for scrolling up and down a screen in Firefox
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = `
        .scroll-btn {
            position: fixed;
            z-index: 9999;
            font-size: 24px;
            border: none;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            padding: 10px 15px;
            cursor: pointer;
            opacity: 0.5;
            transition: opacity 0.2s;
        }

        .scroll-btn:hover {
            opacity: 1;
        }

        #scroll-up-btn {
            top: calc(55% - 50px);
            right: 10px;
        }

        #scroll-down-btn {
            top: calc(55% + 10px);
            right: 10px;
        }
    `;

    function createScrollButtons() {
        const scrollUpBtn = document.createElement('button');
        scrollUpBtn.id = 'scroll-up-btn';
        scrollUpBtn.className = 'scroll-btn';
        scrollUpBtn.innerHTML = '▲';
        scrollUpBtn.onclick = () => window.scrollBy(0, -window.innerHeight);

        const scrollDownBtn = document.createElement('button');
        scrollDownBtn.id = 'scroll-down-btn';
        scrollDownBtn.className = 'scroll-btn';
        scrollDownBtn.innerHTML = '▼';
        scrollDownBtn.onclick = () => window.scrollBy(0, window.innerHeight);

        return { scrollUpBtn, scrollDownBtn };
    }

    const styleElement = document.createElement('style');
    styleElement.innerHTML = style;
    document.head.appendChild(styleElement);

    function checkAndAddButtons() {
        let scrollUpBtn = document.getElementById('scroll-up-btn');
        let scrollDownBtn = document.getElementById('scroll-down-btn');

        if (!scrollUpBtn || !scrollDownBtn) {
            const buttons = createScrollButtons();
            if (!scrollUpBtn) {
                document.body.appendChild(buttons.scrollUpBtn);
            }
            if (!scrollDownBtn) {
                document.body.appendChild(buttons.scrollDownBtn);
            }
        }
    }

    setInterval(checkAndAddButtons, 1000);
})();
