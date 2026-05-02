// ==UserScript==
// @name         Waste Professional
// @namespace    http://tampermonkey.net/
// @version      26.17.0-1.0.1
// @description  try to take over the world!
// @author       You
// @match        https://waste.muah.top/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=muah.top
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector(".manual-table tbody tr:nth-child(9)").innerHTML = "<td><code>0~9</code><sup>Pro</sup></td><td>切换指针地址</td>"
    document.querySelector(".manual-table tbody tr:nth-child(10)").innerHTML = "<td><code>;</code><sup>Pro</sup></td><td>概率自增</td>"

    class WasteProfessional {
        constructor(){
            this.ptr=[0,0,0,0,0,0,0,0,0,0];
            this.cursor=0;
            this.saved=0;
        }
        clearHistory() {
            this.ptr=[0,0,0,0,0,0,0,0,0,0];
            this.cursor=0;
            this.saved=0;
        }
        async waste(code) {
            let saved = this.saved, out = '';
            let bracketStack = [];

            for (let i = 0; i < code.length; i++) {
                let char = code[i];
                switch (char) {
                    case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                        this.cursor = parseInt(char);
                        break;
                    case '<': case '＜': saved = this.ptr[this.cursor]; break;
                    case '>': case '＞': this.ptr[this.cursor] = saved; break;
                    case '^': case '＾': this.ptr[this.cursor] = Math.random() < 0.5 ? 0 : 1; break;
                    case ';': case '；': this.ptr[this.cursor] += Math.random() < 0.5 ? 0 : 1; break;
                    case '@': case '＠': out = ''; break;
                    case '#': case '＃': this.ptr[this.cursor] = 0; break;
                    case '+': case '＋': if (!isNaN(this.ptr[this.cursor])) this.ptr[this.cursor]++; break;
                    case '-': case '－': if (!isNaN(this.ptr[this.cursor])) this.ptr[this.cursor]--; break;
                    case '*': case '＊': if (!isNaN(this.ptr[this.cursor])) this.ptr[this.cursor] *= 2; break;
                    case '/': case '／': if (!isNaN(this.ptr[this.cursor])) this.ptr[this.cursor] = Math.floor(this.ptr[this.cursor] / 2); break;
                    case '%': case '％': out += this.ptr[this.cursor]; break;
                    case '&': case '＆': alert('Breakpoint'); break;
                    case '.': case '．': out += String.fromCharCode(this.ptr[this.cursor]); break;
                    case ':': case '：': out += '\n'; break;
                    case '?': case '？': await new Promise(r => setTimeout(r, 1000)); break;
                    case '!': case '！': return {status: 1, output: out}; break;
                    case '[': case '［':
                        bracketStack.push({ type: ']', position: i, currranges: 0 });
                        break;
                    case ']': case '］':
                        if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== ']') {
                            return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                        } else {
                            if (bracketStack[bracketStack.length - 1].currranges > 0) {
                                bracketStack.pop();
                            } else {
                                bracketStack[bracketStack.length - 1].currranges++;
                                i = bracketStack[bracketStack.length - 1].position;
                            }
                        }
                        break;
                    case '(': case '（':
                        bracketStack.push({ type: ')', position: i });
                        if (Math.random() < 0.5) {
                            let innerBrackets = [{ type: '(', position: i }];
                            while (innerBrackets.length > 0) {
                                switch (code[++i]) {
                                    case '(': case '（':
                                        innerBrackets.push({ type: '(', position: i });
                                        break;
                                    case '{': case '｛':
                                        innerBrackets.push({ type: '}', position: i });
                                        break;
                                    case '[': case '［':
                                        innerBrackets.push({ type: ']', position: i });
                                        break;
                                    case ')': case '）': case ']': case '］': case '}': case '｝':
                                        let lb = innerBrackets.pop();
                                        if (innerBrackets.length === 0) {
                                            if (lb.type !== ')') {
                                                return {status: -1, message: 'Mismatched brackets at position ' + i};
                                            }
                                        }
                                        break;

                                }
                            }
                        };
                        break;
                    case ')': case '）':
                        if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== ')') {
                            return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                        }
                        break;
                    case '{': case '｛':
                        let innerBrackets = [{ type: '}', position: i }];
                        while (innerBrackets.length > 0) {
                            switch (code[++i]) {
                                case '(': case '（':
                                    innerBrackets.push({ type: '(', position: i });
                                    break;
                                case '{': case '｛':
                                    innerBrackets.push({ type: '}', position: i });
                                    break;
                                case '[': case '［':
                                    innerBrackets.push({ type: ']', position: i });
                                    break;
                                case ')': case '）': case ']': case '］': case '}': case '｝':
                                    let lb = innerBrackets.pop();
                                    if (innerBrackets.length === 0) {
                                        if (lb.type !== '}') {
                                            return {status: -1, message: 'Mismatched brackets at position ' + i};
                                        }
                                    }
                                    break;

                            }
                        }
                        break;
                    case '}': case '｝':
                        if (bracketStack.length === 0 || bracketStack[bracketStack.length - 1].type !== '}') {
                            return {status: -1, message: 'Unmatched closing bracket at position ' + i};
                        }
                        break;
                }

            }

            this.saved=saved;
            return {status: 0, output: out};
        }
    }

    // Your code here...

    const executorprof = new WasteProfessional();
    const src = document.getElementById('src');
    const out = document.getElementById('out');
    src.textContent="{Generated By Unwaste Compiler} [[[[[[+]]]+]]].[[[[+]+]+]]+.[[+]+]+..[+]+.1[[[[[+]]+]+]].[[[-]-]].0[[[+]]].[[[-]]].[+]+.[[-]-].[[[-]]].1+."


    document.getElementById('runBtn').addEventListener('click', async () => {
        try {
            out.textContent = 'Running...';
            let result = await executorprof.waste(src.value);
            if (result.status === 0) {
                out.textContent = result.output || '（无输出）';
                out.style.color = 'var(--text)';
            } else if (result.status === 1) {
                out.textContent = result.output;
                out.style.color = 'orange';
            } else {
                out.textContent = '错误: ' + result.message;
                out.style.color = '#d32f2f';
            }
        } catch (e) {
            out.textContent = '错误: ' + e.message;
            out.style.color = '#d32f2f';
        }
    });

    document.getElementById('clBtn').addEventListener('click', () => {
        executorprof.clearHistory();
        out.innerHTML = '<span class="empty">历史数据已清除</span>';
        out.style.color = '';
    });
})();