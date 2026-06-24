// ==UserScript==
// @name         Muah.top Plus
// @namespace    http://tampermonkey.net/
// @version      26.24.0
// @description  try to take over the world!
// @author       LiaoxyuCM
// @match        https://muah.top/
// @icon         https://q.qlogo.cn/g?b=qq&amp;nk=3905086322&amp;s=640
// @grant        GM_addStyle
// ==/UserScript==


(function() {
    'use strict';
    let isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    GM_addStyle(`
    :root {
        --secondary-text:#0f172a;--toast-bg:#fff6;--toast-bg-highlighted:#0009;--toast-info-bg:#3b82f666;--toast-success-bg:#22c55e66;--toast-warn-bg:#f59e0b66;--toast-error-bg:#ef444466;--toast-debug-bg:#6b728066;--toast-info-highlighted:#3b82f6;--toast-success-highlighted:#22c55e;--toast-warn-highlighted:#f59e0b;--toast-error-highlighted:#ef4444;--toast-debug-highlighted:#6b7280
    }

    #main {
        -ms-overflow-style: none;  /* IE 和 Edge */
        scrollbar-width: none;     /* Firefox */
    }
    #main::-webkit-scrollbar {
        display: none;
    }
    #wrap {
        margin-bottom: 0;
        padding-bottom: 0;
    }
    .icons svg {
        stroke: #00f;
    }
    @media(prefers-color-scheme: dark) {
        :root {
            --secondary-text:#e2e8f0;--toast-bg:#0006;--toast-bg-highlighted:#fff9;--toast-info-bg:#3b82f666;--toast-success-bg:#22c55e66;--toast-warn-bg:#f59e0b66;--toast-error-bg:#ef444466;--toast-debug-bg:#4b556366;--toast-info-highlighted:#60a5fa;--toast-success-highlighted:#4ade80;--toast-warn-highlighted:#fbbf24;--toast-error-highlighted:#f87171;--toast-debug-highlighted:#9ca3af
        }
        .icons svg {
            stroke: #0ff
        }
    }

    .toast-notification{background-color:var(--toast-bg);color:var(--secondary-text);z-index:9990;white-space:normal;-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);cursor:pointer;opacity:1;border-radius:8px;padding:15px 20px;font-size:14px;line-height:20px;transition:top .3s,opacity .3s;position:fixed;right:20px;overflow:hidden;box-shadow:0 4px 12px #00000026}.toast-notification.error{background-color:var(--toast-error-bg)}.toast-notification.error:before{background-color:var(--toast-error-highlighted)}.toast-notification.warn{background-color:var(--toast-warn-bg)}.toast-notification.warn:before{background-color:var(--toast-warn-highlighted)}.toast-notification.success{background-color:var(--toast-success-bg)}.toast-notification.success:before{background-color:var(--toast-success-highlighted)}.toast-notification.info{background-color:var(--toast-info-bg)}.toast-notification.info:before{background-color:var(--toast-info-highlighted)}.toast-notification.debug{background-color:var(--toast-debug-bg)}.toast-notification.debug:before{background-color:var(--toast-debug-highlighted)}.toast-notification.toast-enter{animation:.3s forwards toastSlideInRight}.toast-notification.toast-exit{animation:.3s forwards toastFadeOutUp}.toast-notification.toast-exit:before{width:100%}.toast-notification:before{content:"";background-color:var(--toast-bg-highlighted);border-radius:0 0 8px 8px;width:0%;height:3px;position:absolute;bottom:0;left:0}.toast-notification:not(.toast-enter):not(.toast-exit):before{animation:toastHighlight var(--toast-duration,1.7s) ease-in-out forwards}@keyframes toastHighlight{0%{width:0%}to{width:100%}}@keyframes toastSlideInRight{0%{opacity:0;transform:translate(calc(100% + 20px))}to{opacity:1;transform:translate(0)}}@keyframes toastFadeOutUp{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(20px)}}

    @media (prefers-color-scheme: dark) {
        body {
            background: #0a0c10;
        }

        .header {
            background: #1e1f22;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
        }

        .header-left a {
            color: #e8eaed;
        }

        .header-right a {
            color: #8ab4f8;
        }

        .card {
            background: #1e1f22;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .card-header {
            border-bottom-color: #2c2d30;
        }

        .card-header h2 {
            color: #e8eaed;
        }

        .card-arrow {
            color: #9aa0a6;
            transition: transform 0.3s ease;
        }

        .card li {
            border-bottom-color: #2c2d30;
        }

        .card a {
            color: #8ab4f8;
        }

        .card a:active {
            background: #2c2d30;
        }

        .copy-btn {
            color: #9aa0a6;
        }
        .copy-btn:active {
            color: #8ab4f8;
        }

        .error:not(.toast-notification) {
            color: #f28b82;
        }

        .search-input {
            border-color: #3c4043;
            background: #2c2d30;
            color: #e8eaed;
        }
        .search-input:focus {
            border-color: #8ab4f8;
            outline: none;
        }

        .search-btn {
            color: #8ab4f8;
        }
        .search-btn:active {
            color: #aecbfa;
        }

        .time-display {
            color: #e8eaed;
        }
        .time-display .time-label {
            color: #9aa0a6;
        }
        .time-display .time-value {
            color: #e8eaed;
        }

        .ip-info {
            color: #e8eaed;
        }
        .ip-info .ip-label {
            color: #9aa0a6;
        }

        .edit-textarea {
            border-color: #3c4043;
            background: #2c2d30;
            color: #e8eaed;
        }
        .edit-textarea:focus {
            border-color: #8ab4f8;
            outline: none;
        }

        .footer {
            color: #5f6368;
        }
    }
    `);


    const title = document.querySelector(".header .header-left a");
    title.textContent = "";

    // //////// TOAST

    const activeToasts = [];

    const updateToastPositions = () => {
        let accumulatedHeight = 60;
        activeToasts.forEach((toast) => {
            const topPosition = accumulatedHeight;
            toast.element.style.top = `${topPosition}px`;
            accumulatedHeight += toast.height + 10;
        });
    };

    const removeToast = (toastElement) => {
        const index = activeToasts.findIndex(t => t.element === toastElement);
        if (index !== -1) {
            toastElement.classList.add('toast-exit');
            activeToasts.splice(index, 1);

            setTimeout(() => {
                toastElement.remove();
                updateToastPositions();
            }, 300);
        }
    };
    function showToast (
        content,
        type = "success",
        duration = 2000,
    ) {
        const toastElement = document.createElement('div');
        toastElement.className = 'toast-notification';
        const parag = document.createElement("p");
        parag.textContent = content;
        toastElement.appendChild(parag);

        toastElement.style.setProperty('--toast-duration', `${(duration - 300) / 1000}s`);
        toastElement.style.opacity = '0';
        toastElement.style.visibility = 'hidden';
        document.body.appendChild(toastElement);

        const height = toastElement.offsetHeight;

        const toastItem = { element: toastElement, height };
        activeToasts.unshift(toastItem);

        updateToastPositions();

        toastElement.style.opacity = '';
        toastElement.style.visibility = '';
        toastElement.classList.add('toast-enter');
        toastElement.classList.add(type);

        setTimeout(() => {
            toastElement.classList.remove('toast-enter');
        }, 300);

        const timeoutId = setTimeout(() => {
            removeToast(toastElement);
        }, duration);

        toastElement.addEventListener('click', (e) => {
            if ((e.target).closest('.toast-context-menu')) {
                return;
            }

            clearTimeout(timeoutId);
            removeToast(toastElement);
        });

        toastElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            clearTimeout(timeoutId);
            removeToast(toastElement);
        });

        return {
            close: () => {
                clearTimeout(timeoutId);
                removeToast(toastElement);
            }
        };
    };

    toast = {
        success: (text) => showToast(text, "success"),
        error: (text) => showToast(text, "error"),
    }



    function typing(elem, text, delay, index) {
        if (text.split('')[index]) {
            setTimeout(() => {
                elem.textContent += text.split('')[index];
                typing(elem, text, delay, index+1)
            }, delay)
        }
    }
    //    document.querySelector("#nav").style.backgroundColor = "none";

    let hcl = 212;
    function addHoverEffect() {
        const main = document.querySelector("#list .list-cards");
        if (document.querySelector(".关于本插件")) return;
        if (main) {
            main.insertAdjacentHTML('beforeend',`
<div class="card">
    <div class="card-header 关于本插件">
        <h2>关于本插件</h2>
        <svg class="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>
    <div class="card-body">
        <ul><li><a href="https://docs.liaoxyucm.top/muahTopPlus" target="_blank">Muah.top Plus</a><button class="copy-btn" data-url="https://docs.liaoxyucm.top/muahTopPlus"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></button></li></ul>
    </div>
</div>`);
        }
        const cards = document.querySelectorAll("#list .list-cards .card-body ul li");

        cards.forEach((card) => {
            // 避免重复绑定
            if (card.dataset.hoverBound) return;
            card.dataset.hoverBound = "true";

            let currHue = hcl;
            card.querySelector("a").style.color = `lch(70% 76% ${currHue})`;

            card.style.borderLeft = "2px solid " + (isDarkMode ? "#1e1f22" : "#fff");
            card.style.transition = ".15s all ease-out";
            card.addEventListener("mouseenter", () => {
                card.style.borderLeft = `2px solid lch(80% 76% ${currHue})`;
                let newElem = document.createElement("small")
                newElem.textContent = " - "+card.querySelector("a").getAttribute("href");
                newElem.style.color = "#6d6d6d";
                card.querySelector("a").appendChild(newElem)
            });
            card.addEventListener("mouseleave", () => {
                card.style.borderLeft = "2px solid " + (isDarkMode ? "#1e1f22" : "#fff");
                card.querySelector("a").removeChild(card.querySelector("a").lastChild)
            });
            hcl = (hcl + 15) % 361;
        });

    }

    // 监听动态添加的内容
    const observer = new MutationObserver(() => addHoverEffect());
    observer.observe(document.body, { childList: true, subtree: true });

    // 初始执行
    // addHoverEffect();

    console.log(
        '40409940609306093060\n304020404.0402040402.2.4.4.2.4.\n2..2040204060604020202020402020202040\n 040204020406060402060204020602040\n0404.04..408.020604.40604.\n'
        .replace(/\./g, '00')
        .replace(/0/g, '_/')
        .replace(/([123456789])/g, (n) => ' '.repeat(n))
    );
    typing(title, "ChenQingMua", 50, 0);



})();


