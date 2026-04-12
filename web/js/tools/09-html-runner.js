export function setupTool() {
  const tabId = "tab-html-runner";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML = `
        <style>
            .cobalt-ui-wrapper {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: transparent; 
                color: #18181b;
                transition: color 0.3s;
            }

            .cb-btn {
                background-color: #e4e4e7;
                border: none;
                border-radius: 0.75rem;
                padding: 0.5rem 1rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.4rem;
                cursor: pointer;
                transition: background 0.2s, transform 0.1s;
                color: #18181b;
                font-weight: 600;
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .cb-btn:active { background-color: #d4d4d8; transform: scale(0.96); }
            .cb-btn svg { width: 18px; height: 18px; stroke-width: 2; }

            .cb-btn-black {
                background-color: #000000;
                color: #ffffff;
                border: none;
                border-radius: 0.75rem;
                padding: 0.5rem 1.5rem;
                font-size: 0.9rem;
                font-weight: 700;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                transition: transform 0.1s, background-color 0.3s, color 0.3s;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .cb-btn-black:active { transform: scale(0.96); }

            .cb-editor-box {
                display: flex;
                background-color: #ffffff;
                border: 1px solid #e4e4e7;
                border-radius: 1rem;
                overflow: hidden;
                height: 600px; /* Tăng chiều cao để code thoải mái hơn */
                position: relative;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                transition: background-color 0.3s, border-color 0.3s;
            }

            .cb-lines {
                width: 45px;
                background-color: #f8fafc;
                border-right: 1px solid #f1f5f9;
                text-align: right;
                padding-right: 12px;
                color: #94a3b8;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 14px;
                line-height: 24px;
                padding-top: 16px;
                padding-bottom: 16px;
                overflow: hidden;
                user-select: none;
                transition: background-color 0.3s, border-color 0.3s;
            }

            .cb-code-area {
                flex: 1;
                position: relative;
                overflow: hidden;
            }

            .cb-textarea {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                margin: 0;
                padding: 16px;
                border: none;
                font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
                font-size: 14px;
                line-height: 24px;
                white-space: pre;
                overflow: auto;
                tab-size: 4;
                color: #1e293b;
                background: transparent;
                resize: none;
                outline: none;
            }
            
            .cb-textarea::selection { background: rgba(0, 100, 255, 0.2); }

            .scroll-hide::-webkit-scrollbar { width: 6px; height: 6px; }
            .scroll-hide::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 6px; }

            /* DARK MODE */
            html.dark .cobalt-ui-wrapper, body.dark .cobalt-ui-wrapper { color: #f4f4f5; }
            html.dark .cb-btn, body.dark .cb-btn { background-color: #27272a; color: #e4e4e7; }
            html.dark .cb-btn:active, body.dark .cb-btn:active { background-color: #3f3f46; }
            html.dark .cb-btn-black, body.dark .cb-btn-black { background-color: #3b82f6; color: #ffffff; }
            html.dark .cb-editor-box, body.dark .cb-editor-box { background-color: #0d1117; border-color: #30363d; }
            html.dark .cb-lines, body.dark .cb-lines { background-color: #0d1117; border-color: #30363d; color: #6e7681; }
            html.dark .cb-textarea, body.dark .cb-textarea { color: #c9d1d9; caret-color: #ffffff; }
            html.dark .cb-textarea::selection, body.dark .cb-textarea::selection { background: rgba(255, 255, 255, 0.2); }
            html.dark .scroll-hide::-webkit-scrollbar-thumb, body.dark .scroll-hide::-webkit-scrollbar-thumb { background: #3f3f46; }
        </style>

        <div class="cobalt-ui-wrapper w-full max-w-[1600px] mx-auto pb-10 px-4 lg:px-8 xl:px-12 pt-6">
            
            <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                <div class="flex items-center gap-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    <h2 class="font-black text-2xl tracking-tight uppercase text-slate-800 dark:text-slate-100">HTML RUNNER</h2>
                </div>

                <div class="flex flex-wrap lg:flex-nowrap gap-2 w-full lg:w-auto">
                    <button class="cb-btn flex-1 lg:flex-none" id="cb-clear">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span>Xóa</span>
                    </button>
                    <button class="cb-btn flex-1 lg:flex-none" id="cb-copy">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copy</span>
                    </button>
                    <button class="cb-btn flex-1 lg:flex-none" id="cb-paste">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                        <span>Dán</span>
                    </button>
                    <button class="cb-btn-black flex-[2] lg:flex-none ml-0 lg:ml-2 shadow-md shadow-blue-500/20" id="cb-run">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        Chạy Code
                    </button>
                </div>
            </div>

            <div class="cb-editor-box">
                <div class="cb-lines" id="cb-lines">1</div>
                <div class="cb-code-area">
                    <textarea class="cb-textarea scroll-hide" id="cb-input" spellcheck="false" wrap="off"></textarea>
                </div>
            </div>

        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  const codeInput = document.getElementById("cb-input");
  const lineNumbers = document.getElementById("cb-lines");

  const runBtn = document.getElementById("cb-run");
  const clearBtn = document.getElementById("cb-clear");
  const copyBtn = document.getElementById("cb-copy");
  const pasteBtn = document.getElementById("cb-paste");

  function updateLineNumbers() {
    const linesCount = codeInput.value.split("\n").length;
    let numbersHTML = "";
    for (let i = 1; i <= linesCount; i++) {
      numbersHTML += i + "<br>";
    }
    lineNumbers.innerHTML = numbersHTML;
  }

  codeInput.addEventListener("input", () => {
    updateLineNumbers();
  });

  codeInput.addEventListener("scroll", () => {
    lineNumbers.scrollTop = codeInput.scrollTop;
  });

  clearBtn.addEventListener("click", () => {
    codeInput.value = "";
    codeInput.dispatchEvent(new Event("input"));
    codeInput.focus();
  });

  copyBtn.addEventListener("click", () => {
    if (!codeInput.value) return;
    navigator.clipboard.writeText(codeInput.value);
    const originalText = copyBtn.querySelector("span").innerText;
    copyBtn.querySelector("span").innerText = "ĐÃ COPY";
    copyBtn.classList.add("text-green-600");
    setTimeout(() => {
      copyBtn.querySelector("span").innerText = originalText;
      copyBtn.classList.remove("text-green-600");
    }, 1500);
  });

  pasteBtn.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;
        codeInput.value =
          codeInput.value.substring(0, start) +
          text +
          codeInput.value.substring(end);
        codeInput.selectionStart = codeInput.selectionEnd = start + text.length;
        codeInput.dispatchEvent(new Event("input"));
      }
      codeInput.focus();
    } catch (err) {
      alert(
        "Trình duyệt chặn Clipboard. Dùng Ctrl+V hoặc Nhấn Giữ -> Dán nhé!",
      );
    }
  });

  // --- LOGIC XUẤT CODE + CHÈN MINI CONSOLE ---
  runBtn.addEventListener("click", function () {
    const code = codeInput.value;
    if (!code.trim()) {
      alert("Vui lòng gõ mã code trước khi chạy nhé bạn yêu!");
      return;
    }

    const prependConsoleLogic = `
        <script>
            window.__devLogs = [];
            const ogLog = console.log, ogErr = console.error, ogWarn = console.warn;
            function _fmtArgs(a) { return Array.from(a).map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' '); }
            console.log = function() { ogLog.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'log'}); };
            console.error = function() { ogErr.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'err'}); };
            console.warn = function() { ogWarn.apply(console, arguments); window.__devLogs.push({msg: _fmtArgs(arguments), type: 'warn'}); };
            window.onerror = function(msg, url, line) { window.__devLogs.push({msg: msg + ' (Lỗi ở dòng ' + line + ')', type: 'err'}); return false; };
        <\/script>
        `;

    const appendConsoleUI = `
        <div id="sys-console-ui" style="position:fixed; bottom:0; left:0; width:100%; height:22vh; min-height:160px; background:rgba(24,24,27,0.95); backdrop-filter:blur(10px); -webkit-backdrop-filter:blur(10px); border-top:1px solid #3f3f46; color:#e4e4e7; font-family:monospace; z-index:2147483645; display:flex; flex-direction:column; box-shadow: 0 -10px 30px rgba(0,0,0,0.3); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
            <div style="background:#27272a; padding:8px 15px; font-size:12px; font-weight:bold; color:#a1a1aa; border-bottom:1px solid #3f3f46; display:flex; justify-content:space-between; align-items:center; font-family:-apple-system, sans-serif; text-transform:uppercase;">
                <span style="display:flex; align-items:center; gap:6px;"><span style="display:inline-block; width:8px; height:8px; background-color:#10b981; border-radius:50%;"></span> Terminal Logs</span>
                <div style="display: flex; gap: 8px;">
                    <span id="sys-console-toggle" style="cursor:pointer; color:#60a5fa; padding:4px 8px; border-radius:4px; background:rgba(59,130,246,0.1); transition: 0.2s;" onclick="_toggleConsole()">▼ Thu gọn</span>
                    <span style="cursor:pointer; color:#ef4444; padding:4px 8px; border-radius:4px; background:rgba(239,68,68,0.1);" onclick="document.getElementById('sys-console-ui').style.display='none'">✕ Đóng</span>
                </div>
            </div>
            <div id="sys-console-body" style="flex:1; overflow-y:auto; padding:12px; font-size:13px; line-height:1.6; transition: opacity 0.2s;"></div>
        </div>
        <script>
            let isExp = true;

            function _toggleConsole() {
                const cbUI = document.getElementById('sys-console-ui');
                const cbBody = document.getElementById('sys-console-body');
                const cbToggle = document.getElementById('sys-console-toggle');
                const wmLogo = document.getElementById('nothing-watermark');
                
                isExp = !isExp;
                if(isExp) {
                    cbUI.style.height = '22vh';
                    cbUI.style.minHeight = '160px';
                    cbBody.style.display = 'block';
                    cbToggle.innerText = '▼ Thu gọn';
                    if(wmLogo) wmLogo.style.bottom = 'calc(22vh + 15px)';
                } else {
                    cbUI.style.height = '35px';
                    cbUI.style.minHeight = '0';
                    cbBody.style.display = 'none';
                    cbToggle.innerText = '▲ Mở rộng';
                    if(wmLogo) wmLogo.style.bottom = '45px';
                }
            }
            
            const cbBodyStatic = document.getElementById('sys-console-body');
            function _printUI(item) {
                const d = document.createElement('div');
                d.style.borderBottom = '1px dashed rgba(255,255,255,0.05)'; d.style.padding = '6px 0'; d.style.wordBreak = 'break-all';
                if(item.type === 'err') d.style.color = '#f87171'; 
                else if(item.type === 'warn') d.style.color = '#fbe331'; 
                else d.style.color = '#e4e4e7';
                d.innerHTML = '<strong style="opacity:0.5; margin-right:5px;">❯</strong> ' + item.msg;
                if(cbBodyStatic) cbBodyStatic.appendChild(d);
            }
            
            window.__devLogs.forEach(_printUI);
            
            console.log = function() { ogLog.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'log'}); if(cbBodyStatic) cbBodyStatic.scrollTop = cbBodyStatic.scrollHeight; };
            console.error = function() { ogErr.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'err'}); if(cbBodyStatic) cbBodyStatic.scrollTop = cbBodyStatic.scrollHeight; };
            console.warn = function() { ogWarn.apply(console, arguments); _printUI({msg: _fmtArgs(arguments), type: 'warn'}); if(cbBodyStatic) cbBodyStatic.scrollTop = cbBodyStatic.scrollHeight; };
        <\/script>
        `;

    const orangeLogoWatermark = `
            <div id="nothing-watermark" style="position: fixed; bottom: calc(22vh + 15px); right: 20px; z-index: 2147483647; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 8px 18px; border-radius: 999px; box-shadow: 0 10px 25px rgba(249, 115, 22, 0.25); border: 1.5px solid rgba(249, 115, 22, 0.3); font-family: sans-serif; pointer-events: none; transition: bottom 0.3s cubic-bezier(0.4, 0, 0.2, 1);">
                <span style="background: linear-gradient(90deg, #f97316, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 900; font-size: 14px; letter-spacing: 1px;">NOTHING</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 4px rgba(249,115,22,0.4));"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            </div>
        `;

    const fullHTML =
      prependConsoleLogic + code + appendConsoleUI + orangeLogoWatermark;
    const blob = new Blob([fullHTML], { type: "text/html;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  });

  codeInput.value = `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; display: grid; place-items: center; height: 80vh; background: #18181b; color: #fff; margin: 0; }
    .box { text-align: center; padding: 2.5rem; border-radius: 1.5rem; background: #27272a; box-shadow: 0 20px 50px rgba(0,0,0,0.5); border: 1px solid #3f3f46; transition: transform 0.3s; }
    .box:hover { transform: translateY(-5px); }
    h2 { margin: 0 0 10px 0; font-size: 1.8rem; font-weight: 800; }
    #cb-num-display { font-size: 4rem; font-weight: 900; color: #60a5fa; margin: 20px 0; text-shadow: 0 0 15px rgba(96, 165, 250, 0.5); }
    .cb-btn-group { display: flex; gap: 10px; justify-content: center; margin-top: 20px; }
    button { padding: 12px 24px; border: none; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s ease; }
    .btn-spin { background: #3b82f6; color: white; }
    .btn-spin:hover { background: #2563eb; }
    .btn-bug { background: #ef4444; color: white; opacity: 0.8; }
    .btn-bug:hover { opacity: 1; }
    button:active { transform: scale(0.95); }
    @keyframes pulse { 0% { text-shadow: 0 0 15px rgba(96, 165, 250, 0.5); } 50% { text-shadow: 0 0 25px rgba(96, 165, 250, 0.8); } 100% { text-shadow: 0 0 15px rgba(96, 165, 250, 0.5); } }
    .spinning { animation: pulse 0.5s infinite; }
  </style>
</head>
<body>
  <div class="box">
    <h2>Random Spinner</h2>
    <div id="cb-num-display">00</div>
    <div class="cb-btn-group">
      <button class="btn-spin" onclick="spinNumber()">Quay Số</button>
    </div>
  </div>
  
  <script>
    function spinNumber() {
      console.log("Đang quay số ngẫu nhiên...");
      const display = document.getElementById('cb-num-display');
      display.classList.add('spinning');
      
      setTimeout(() => {
        display.classList.remove('spinning');
        const num = Math.floor(Math.random() * 100).toString().padStart(2, '0');
        display.innerText = num;
        console.log("Chúc mừng! Số may mắn là: " + num);
      }, 1500);
    }
  </script>
</body>
</html>`;
  codeInput.dispatchEvent(new Event("input"));
}
