// ==UserScript==
// @name         Muah.top Plus
// @namespace    http://tampermonkey.net/
// @version      26.18.5
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
        .icons svg {
            stroke: #0ff
        }
    }
    `);

    const title = document.querySelector("#top h1");
    title.textContent = "";

    function typing(elem, text, delay, index) {
        if (text.split('')[index]) {
            setTimeout(() => {
                elem.textContent += text.split('')[index];
                typing(elem, text, delay, index+1)
            }, delay)
        }
    }
    document.querySelector("#nav").style.backgroundColor = "none";

    let hcl = 212;
    function addHoverEffect() {
        const main = document.querySelector("#main #content");
        if (document.querySelector("#关于本插件")) return;

        main.insertAdjacentHTML('beforeend',
                                '<h2 id="关于本插件">关于本插件</h2>' +
                                '<ul><li><a href="https://docs.liaoxyucm.top/muahTopPlus" target="_blank">Muah.top Plus</a></li><li><a href="https://www.tampermonkey.net/" target="_blank">插件依赖 - 油猴</a></li></ul>'
                               );
        main.querySelector("ul").innerHTML += `
        <li><a href="https://ms.muah.top" target="_blank">扫雷</a></li>
        <li><a href="https://cb.muah.top" target="_blank">密码破译</a></li>
        <li><a href="https://faka.muah.top" target="_blank">购物</a></li>
        <li><a href="https://smp.muah.top" target="_blank">SMP Client</a></li>
        <li><a href="https://knife.muah.top" target="_blank">Knife Mod</a></li>
        `
        const cards = document.querySelectorAll("#main #content ul li");

        let sec_navbars = document.querySelectorAll("#nav a");
        sec_navbars.forEach((snb) => {
            snb.style.padding = "12px";
            snb.addEventListener("mouseenter", () => {
                snb.style.borderRight = "2px solid var(--color-primary)"
            })
            snb.addEventListener("mouseleave", () => {
                snb.style.borderRight = "2px solid transparent"

            })
        })


        cards.forEach((card) => {
            // 避免重复绑定
            if (card.dataset.hoverBound) return;
            card.dataset.hoverBound = "true";

            let currHue = hcl;
            card.querySelector("a").style.color = `lch(70% 76% ${currHue})`;

            card.style.borderLeft = "2px solid var(--bg-card)";
            card.style.transition = ".15s all ease-out";
            card.addEventListener("mouseenter", () => {
                card.style.borderLeft = `2px solid lch(80% 76% ${currHue})`;
                let newElem = document.createElement("small")
                newElem.textContent = " - "+card.querySelector("a").getAttribute("href");
                newElem.style.color = "var(--color-placeholder)";
                card.querySelector("a").appendChild(newElem)
            });
            card.addEventListener("mouseleave", () => {
                card.style.borderLeft = "2px solid var(--bg-card)";
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
    typing(title, "ChenQingMua", 50, 0)
})();