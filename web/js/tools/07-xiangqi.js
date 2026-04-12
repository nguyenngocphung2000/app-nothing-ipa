export function setupTool() {
  const tabId = "tab-xiangqi";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML =
    "<style>" +
    "#xq-board-wrapper { width: 100%; max-width: 450px; margin: 0 auto; position: relative; font-family: system-ui, -apple-system, sans-serif; }" +
    "#xq-board-container { width: 100%; position: relative; aspect-ratio: 9/10; border: 2px solid #cbd5e1; border-radius: 20px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25), inset 0 0 30px rgba(0,0,0,0.1); background: linear-gradient(135deg, #f8fafc, #e2e8f0); overflow: hidden; }" +
    ".xq-svg-board { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 1; pointer-events: none; }" +
    "#xq-pieces-layer { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 10; }" +
    '.xq-piece { position: absolute; width: 9.5%; aspect-ratio: 1/1; transform: translate(-50%, -50%); display: flex; align-items: center; justify-content: center; font-family: "KaiTi", "Georgia", serif; font-weight: 900; font-size: clamp(16px, 5.5vw, 26px); border-radius: 50%; cursor: pointer; transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); user-select: none; background: radial-gradient(circle at 30% 30%, #ffffff, #f8fafc); z-index: 20; border: 1.5px solid #e2e8f0; }' +
    ".xq-piece.red { color: #dc2626; border-color: #fecaca; box-shadow: 0 8px 15px -2px rgba(220,38,38,0.3), inset -2px -4px 6px rgba(0,0,0,0.06), inset 2px 2px 4px rgba(255,255,255,1); }" +
    ".xq-piece.black { color: #0f172a; border-color: #cbd5e1; box-shadow: 0 8px 15px -2px rgba(15,23,42,0.3), inset -2px -4px 6px rgba(0,0,0,0.06), inset 2px 2px 4px rgba(255,255,255,1); }" +
    ".xq-piece.rotated { transform: translate(-50%, -50%) rotate(180deg); }" +
    ".xq-piece.selected { border-color: #0ea5e9; box-shadow: 0 0 0 4px rgba(14,165,233,0.4), 0 15px 25px rgba(14,165,233,0.5), inset -2px -4px 6px rgba(0,0,0,0.05) !important; z-index: 30; transform: translate(-50%, -50%) scale(1.18); color: #0ea5e9; text-shadow: 0 0 8px rgba(14,165,233,0.4); }" +
    ".xq-piece.selected.rotated { transform: translate(-50%, -50%) rotate(180deg) scale(1.18); }" +
    ".xq-dot { position: absolute; width: 3.5%; aspect-ratio: 1/1; background: #0ea5e9; border-radius: 50%; transform: translate(-50%, -50%); cursor: pointer; z-index: 15; opacity: 0.6; box-shadow: 0 0 10px #0ea5e9; transition: all 0.2s; }" +
    ".xq-dot:hover { transform: translate(-50%, -50%) scale(1.6); opacity: 1; }" +
    "#xq-overlay { position: absolute; inset: 0; background: rgba(248,250,252,0.6); z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; backdrop-filter: blur(10px); transition: opacity 0.3s; }" +
    "#xq-check-alert { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 100; font-weight: 800; background: rgba(220, 38, 38, 0.95); color: white; padding: 12px 35px; border-radius: 9999px; box-shadow: 0 10px 30px rgba(220,38,38,0.4); backdrop-filter: blur(5px); pointer-events: none; opacity: 0; transition: opacity 0.3s, transform 0.3s; letter-spacing: 3px; white-space: nowrap; display: flex; align-items: center; justify-content: center; }" +
    ".xq-anim-check { animation: xqPop 2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }" +
    "@keyframes xqPop { 0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; } 10% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; } 20% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 80% { transform: translate(-50%, -50%) scale(1); opacity: 1; } 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; } }" +
    ".xq-timer-active { transform: scale(1.05); }" +
    "</style>" +
    '<div class="flex flex-col h-full w-full max-w-md mx-auto relative">' +
    '<div id="xq-top-panel" class="mb-3 transition-all duration-300"></div>' +
    '<div id="xq-board-wrapper">' +
    '  <div id="xq-board-container">' +
    '    <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-40">' +
    '       <div style="transform: scale(0.60); white-space: nowrap;">' +
    '           <div class="flex items-center space-x-2">' +
    '               <div class="bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-sm hover:bg-orange-600 transition">NOTHING</div>' +
    '               <span class="font-bold text-gray-500 uppercase text-[10px] tracking-widest mt-1">YET EVERYTHING</span>' +
    "           </div>" +
    "       </div>" +
    "    </div>" +
    '    <div id="xq-svg-container"></div>' +
    '    <div id="xq-pieces-layer"></div>' +
    '    <div id="xq-check-alert" class="text-base md:text-lg uppercase">CHIẾU TƯỚNG!</div>' +
    '    <div id="xq-overlay">' +
    '      <h2 id="xq-winner-msg" class="text-indigo-600 text-lg font-bold mb-4 hidden text-center px-4"></h2>' +
    '      <h3 class="text-slate-800 text-lg font-black mb-4 uppercase tracking-widest drop-shadow-sm">Cài đặt ván đấu</h3>' +
    '      <div class="flex items-center gap-3 bg-white/80 p-3 rounded-2xl shadow-sm border border-white">' +
    '        <span class="text-slate-600 font-bold text-sm pl-2">Thời gian:</span>' +
    '        <input id="xq-time-input" type="number" value="10" min="1" max="90" class="w-16 bg-white border border-slate-200 rounded-xl py-2 text-center font-black text-indigo-600 outline-none focus:ring-2 ring-indigo-300 shadow-inner">' +
    '        <span class="text-slate-600 font-bold text-sm pr-2">Phút</span>' +
    "      </div>" +
    '      <button id="xq-btn-start" class="mt-6 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-2xl shadow-xl transition active:scale-95">Bắt Đầu Chơi</button>' +
    "    </div>" +
    "  </div>" +
    "</div>" +
    '<div id="xq-bottom-panel" class="mt-3 transition-all duration-300"></div>' +
    '<div class="flex gap-3 mt-4">' +
    '  <button id="xq-btn-reset" class="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold py-3.5 rounded-2xl shadow-sm transition active:scale-95 text-xs uppercase tracking-wide">Làm mới tỷ số</button>' +
    '  <button id="xq-btn-flip" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-bold py-3.5 rounded-2xl shadow-sm transition active:scale-95 text-xs uppercase tracking-wide">Đảo bàn cờ</button>' +
    "</div>" +
    "</div>";

  document.getElementById("app-container").appendChild(panel);

  // --- BẮT ĐẦU LOGIC CỜ TƯỚNG ---
  const PIECES = {
    R_G: { label: "帥", color: "red" },
    R_A: { label: "仕", color: "red" },
    R_E: { label: "相", color: "red" },
    R_H: { label: "傌", color: "red" },
    R_R: { label: "俥", color: "red" },
    R_C: { label: "炮", color: "red" },
    R_S: { label: "兵", color: "red" },
    B_G: { label: "將", color: "black" },
    B_A: { label: "士", color: "black" },
    B_E: { label: "象", color: "black" },
    B_H: { label: "馬", color: "black" },
    B_R: { label: "車", color: "black" },
    B_C: { label: "砲", color: "black" },
    B_S: { label: "卒", color: "black" },
  };

  const INIT_BOARD = [
    ["B_R", "B_H", "B_E", "B_A", "B_G", "B_A", "B_E", "B_H", "B_R"],
    [null, null, null, null, null, null, null, null, null],
    [null, "B_C", null, null, null, null, null, "B_C", null],
    ["B_S", null, "B_S", null, "B_S", null, "B_S", null, "B_S"],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    ["R_S", null, "R_S", null, "R_S", null, "R_S", null, "R_S"],
    [null, "R_C", null, null, null, null, null, "R_C", null],
    [null, null, null, null, null, null, null, null, null],
    ["R_R", "R_H", "R_E", "R_A", "R_G", "R_A", "R_E", "R_H", "R_R"],
  ];

  let board = [],
    turn = "red",
    selected = null,
    isFlipped = false;
  let gameState = "SETUP";
  let times = { red: 600, black: 600 },
    timerId = null;
  let scores = { top: 0, bottom: 0 };

  const layer = document.getElementById("xq-pieces-layer");
  const overlay = document.getElementById("xq-overlay");
  const alertCheck = document.getElementById("xq-check-alert");
  const msgWinner = document.getElementById("xq-winner-msg");

  const drawBoardSVG = () => {
    let svg = `<svg viewBox="0 0 900 1000" class="xq-svg-board">`;
    const strokeColor = "#94a3b8";
    for (let r = 0; r <= 9; r++)
      svg += `<line x1="50" y1="${50 + r * 100}" x2="850" y2="${50 + r * 100}" stroke="${strokeColor}" stroke-width="1.5"/>`;
    for (let c = 0; c <= 8; c++) {
      if (c === 0 || c === 8)
        svg += `<line x1="${50 + c * 100}" y1="50" x2="${50 + c * 100}" y2="950" stroke="${strokeColor}" stroke-width="1.5"/>`;
      else {
        svg += `<line x1="${50 + c * 100}" y1="50" x2="${50 + c * 100}" y2="450" stroke="${strokeColor}" stroke-width="1.5"/>`;
        svg += `<line x1="${50 + c * 100}" y1="550" x2="${50 + c * 100}" y2="950" stroke="${strokeColor}" stroke-width="1.5"/>`;
      }
    }
    svg += `<line x1="350" y1="50" x2="550" y2="250" stroke="${strokeColor}" stroke-width="1.5"/><line x1="550" y1="50" x2="350" y2="250" stroke="${strokeColor}" stroke-width="1.5"/>`;
    svg += `<line x1="350" y1="950" x2="550" y2="750" stroke="${strokeColor}" stroke-width="1.5"/><line x1="550" y1="950" x2="350" y2="750" stroke="${strokeColor}" stroke-width="1.5"/>`;

    const drawCross = (r, c) => {
      let cx = 50 + c * 100,
        cy = 50 + r * 100,
        d = 6,
        l = 12,
        res = "";
      if (c > 0)
        res += `<path d="M${cx - d},${cy - d - l} L${cx - d},${cy - d} L${cx - d - l},${cy - d} M${cx - d},${cy + d + l} L${cx - d},${cy + d} L${cx - d - l},${cy + d}" fill="none" stroke="${strokeColor}" stroke-width="1.5"/>`;
      if (c < 8)
        res += `<path d="M${cx + d},${cy - d - l} L${cx + d},${cy - d} L${cx + d + l},${cy - d} M${cx + d},${cy + d + l} L${cx + d},${cy + d} L${cx + d + l},${cy + d}" fill="none" stroke="${strokeColor}" stroke-width="1.5"/>`;
      return res;
    };
    const pts = [
      [2, 1],
      [2, 7],
      [3, 0],
      [3, 2],
      [3, 4],
      [3, 6],
      [3, 8],
      [7, 1],
      [7, 7],
      [6, 0],
      [6, 2],
      [6, 4],
      [6, 6],
      [6, 8],
    ];
    pts.forEach((p) => {
      svg += drawCross(p[0], p[1]);
    });
    svg += `</svg>`;
    document.getElementById("xq-svg-container").innerHTML = svg;
  };

  const formatTime = (s) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  window.xqToggleSurrender = (color, show) => {
    if (gameState !== "PLAYING") return;
    const el = document.getElementById(`xq-surrender-box-${color}`);
    if (el) {
      if (show) {
        el.classList.remove("opacity-0", "pointer-events-none", "scale-95");
        el.classList.add("opacity-100", "scale-100");
      } else {
        el.classList.add("opacity-0", "pointer-events-none", "scale-95");
        el.classList.remove("opacity-100", "scale-100");
      }
    }
  };

  window.xqConfirmSurrender = (color) => {
    window.xqToggleSurrender(color, false);
    const winnerName = color === "red" ? "Phe Đen" : "Phe Đỏ";
    endGame(
      color === "red" ? "black" : "red",
      `Phe ${color === "red" ? "Đỏ" : "Đen"} đã đầu hàng! ${winnerName} chiến thắng!`,
    );
  };

  const updatePanelsUI = () => {
    const topColor = isFlipped ? "red" : "black";
    const botColor = isFlipped ? "black" : "red";

    const getHtml = (color, isTop, scoreVal) => {
      const isRed = color === "red";
      const name = isRed ? "Phe Đỏ" : "Phe Đen";
      const bgCls = isRed
        ? "bg-gradient-to-r from-red-50 to-rose-100 border-red-200"
        : "bg-gradient-to-r from-slate-50 to-slate-200 border-slate-300";
      const txtColor = isRed ? "text-red-600" : "text-slate-800";
      const scoreColor = isRed ? "text-red-700" : "text-slate-900";
      const rotCls = isTop ? "rotate-180" : "";
      const playerName = isTop ? `${name} (Đối diện)` : `${name} (Bạn)`;

      return `
                <div class="relative overflow-hidden flex justify-between items-center ${bgCls} border p-4 rounded-2xl shadow-sm ${rotCls}">
                  <div class="flex flex-col">
                    <span class="text-[10px] font-bold ${txtColor} uppercase tracking-widest">${playerName}</span>
                    <span class="text-xl font-black ${scoreColor}">Điểm: ${scoreVal}</span>
                  </div>
                  <div class="flex items-center gap-3">
                    ${
                      isTop
                        ? `<button onclick="window.xqToggleSurrender('${color}', true)" class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-2 rounded-xl shadow-sm transition active:scale-95">Đầu hàng</button>
                               <div id="xq-time-${color}" class="text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 xq-timer">${formatTime(times[color])}</div>`
                        : `<div id="xq-time-${color}" class="text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 xq-timer">${formatTime(times[color])}</div>
                               <button onclick="window.xqToggleSurrender('${color}', true)" class="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-2 rounded-xl shadow-sm transition active:scale-95">Đầu hàng</button>`
                    }
                  </div>

                  <div id="xq-surrender-box-${color}" class="absolute inset-0 bg-white/90 backdrop-blur-md flex items-center justify-between px-5 opacity-0 scale-95 pointer-events-none transition-all duration-200 z-20">
                      <span class="text-sm font-bold text-slate-800">Xác nhận đầu hàng?</span>
                      <div class="flex gap-2">
                          <button onclick="window.xqToggleSurrender('${color}', false)" class="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl active:scale-95">Hủy</button>
                          <button onclick="window.xqConfirmSurrender('${color}')" class="px-4 py-2 bg-red-500 text-white text-xs font-bold rounded-xl active:scale-95 shadow-md border border-red-600">Đồng ý</button>
                      </div>
                  </div>
                </div>
            `;
    };

    document.getElementById("xq-top-panel").innerHTML = getHtml(
      topColor,
      true,
      scores.top,
    );
    document.getElementById("xq-bottom-panel").innerHTML = getHtml(
      botColor,
      false,
      scores.bottom,
    );
    updateTimeHighlight();
  };

  const updateTimeHighlight = () => {
    const tr = document.getElementById("xq-time-red");
    const tb = document.getElementById("xq-time-black");

    if (tr)
      tr.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-white/60 text-red-400 border border-red-200 shadow-inner`;
    if (tb)
      tb.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-white/60 text-slate-400 border border-slate-300 shadow-inner`;

    if (gameState === "PLAYING") {
      const active = document.getElementById(`xq-time-${turn}`);
      if (active) {
        if (turn === "red") {
          active.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-red-500 text-white border border-red-600 shadow-[0_0_15px_rgba(239,68,68,0.5)] xq-timer-active`;
        } else {
          active.className = `text-2xl font-mono font-bold px-3 py-1.5 rounded-xl w-24 text-center transition-all duration-300 bg-slate-700 text-white border border-slate-800 shadow-[0_0_15px_rgba(51,65,85,0.5)] xq-timer-active`;
        }
      }
    }
  };

  const renderPieces = () => {
    layer.innerHTML = "";
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c]) {
          const piece = PIECES[board[r][c]];
          const div = document.createElement("div");

          const dispR = isFlipped ? 9 - r : r;
          const dispC = isFlipped ? 8 - c : c;
          div.style.left = `${((dispC * 100 + 50) / 900) * 100}%`;
          div.style.top = `${((dispR * 100 + 50) / 1000) * 100}%`;

          const isTopPlayer =
            (!isFlipped && piece.color === "black") ||
            (isFlipped && piece.color === "red");
          let classes = `xq-piece ${piece.color} ${isTopPlayer ? "rotated" : ""}`;
          if (selected && selected.r === r && selected.c === c)
            classes += " selected";

          div.className = classes;
          div.innerText = piece.label;
          div.onclick = (e) => {
            e.stopPropagation();
            if (gameState === "PLAYING") handleSquareClick(r, c);
          };
          layer.appendChild(div);
        }
      }
    }

    if (selected && gameState === "PLAYING") {
      getLegalMoves(selected.r, selected.c).forEach((m) => {
        const dot = document.createElement("div");
        dot.className = "xq-dot";
        const dispR = isFlipped ? 9 - m.r : m.r;
        const dispC = isFlipped ? 8 - m.c : m.c;
        dot.style.left = `${((dispC * 100 + 50) / 900) * 100}%`;
        dot.style.top = `${((dispR * 100 + 50) / 1000) * 100}%`;
        dot.onclick = (e) => {
          e.stopPropagation();
          handleSquareClick(m.r, m.c);
        };
        layer.appendChild(dot);
      });
    }
  };

  const getPseudoMoves = (b, r1, c1) => {
    const piece = b[r1][c1];
    if (!piece) return [];
    const isRed = piece.startsWith("R");
    const type = piece.split("_")[1];
    let moves = [];

    for (let r2 = 0; r2 < 10; r2++) {
      for (let c2 = 0; c2 < 9; c2++) {
        if (r1 === r2 && c1 === c2) continue;
        const target = b[r2][c2];
        if (target && target.startsWith(isRed ? "R" : "B")) continue;

        let v = false,
          dr = Math.abs(r2 - r1),
          dc = Math.abs(c2 - c1);

        switch (type) {
          case "G":
            if (dr + dc === 1 && c2 >= 3 && c2 <= 5) {
              if (isRed && r2 >= 7 && r2 <= 9) v = true;
              if (!isRed && r2 >= 0 && r2 <= 2) v = true;
            }
            break;
          case "A":
            if (dr === 1 && dc === 1 && c2 >= 3 && c2 <= 5) {
              if (isRed && r2 >= 7 && r2 <= 9) v = true;
              if (!isRed && r2 >= 0 && r2 <= 2) v = true;
            }
            break;
          case "E":
            if (dr === 2 && dc === 2) {
              if (isRed && r2 < 5) break;
              if (!isRed && r2 > 4) break;
              if (!b[(r1 + r2) / 2][(c1 + c2) / 2]) v = true;
            }
            break;
          case "H":
            if (dr === 2 && dc === 1) {
              if (!b[r1 + Math.sign(r2 - r1)][c1]) v = true;
            } else if (dr === 1 && dc === 2) {
              if (!b[r1][c1 + Math.sign(c2 - c1)]) v = true;
            }
            break;
          case "R":
            if (dr === 0 || dc === 0) {
              if (countObs(b, r1, c1, r2, c2) === 0) v = true;
            }
            break;
          case "C":
            if (dr === 0 || dc === 0) {
              let obs = countObs(b, r1, c1, r2, c2);
              if (!target && obs === 0) v = true;
              if (target && obs === 1) v = true;
            }
            break;
          case "S":
            if (isRed) {
              if (r2 === r1 - 1 && dc === 0) v = true;
              if (r1 <= 4 && dr === 0 && dc === 1) v = true;
            } else {
              if (r2 === r1 + 1 && dc === 0) v = true;
              if (r1 >= 5 && dr === 0 && dc === 1) v = true;
            }
            break;
        }
        if (v) moves.push({ r: r2, c: c2 });
      }
    }
    return moves;
  };

  const countObs = (b, r1, c1, r2, c2) => {
    let c = 0;
    if (r1 === r2) {
      let min = Math.min(c1, c2),
        max = Math.max(c1, c2);
      for (let i = min + 1; i < max; i++) if (b[r1][i]) c++;
    } else {
      let min = Math.min(r1, r2),
        max = Math.max(r1, r2);
      for (let i = min + 1; i < max; i++) if (b[i][c1]) c++;
    }
    return c;
  };

  const isKingInCheck = (b, color) => {
    let kr = -1,
      kc = -1;
    const kingId = color === "red" ? "R_G" : "B_G",
      enemyPfx = color === "red" ? "B" : "R";

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++)
        if (b[r][c] === kingId) {
          kr = r;
          kc = c;
          break;
        }
    }
    if (kr === -1) return false;

    const enemyKingId = color === "red" ? "B_G" : "R_G";
    let ekr = -1;
    for (let r = 0; r < 10; r++)
      if (b[r][kc] === enemyKingId) {
        ekr = r;
        break;
      }
    if (ekr !== -1) {
      let obs = 0;
      for (let i = Math.min(kr, ekr) + 1; i < Math.max(kr, ekr); i++)
        if (b[i][kc]) obs++;
      if (obs === 0) return true;
    }

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        let p = b[r][c];
        if (p && p.startsWith(enemyPfx)) {
          if (getPseudoMoves(b, r, c).some((m) => m.r === kr && m.c === kc))
            return true;
        }
      }
    }
    return false;
  };

  const getLegalMoves = (r, c) => {
    let pseudo = getPseudoMoves(board, r, c),
      piece = board[r][c],
      color = piece.startsWith("R") ? "red" : "black";
    return pseudo.filter((m) => {
      let targetPiece = board[m.r][m.c];
      board[m.r][m.c] = piece;
      board[r][c] = null;
      let inCheck = isKingInCheck(board, color);
      board[r][c] = piece;
      board[m.r][m.c] = targetPiece;
      return !inCheck;
    });
  };

  const triggerCheckAlert = () => {
    alertCheck.classList.remove("xq-anim-check");
    void alertCheck.offsetWidth;
    alertCheck.classList.add("xq-anim-check");
  };

  const updateGameState = () => {
    const enemy = turn === "red" ? "black" : "red";
    const inCheck = isKingInCheck(board, enemy);
    if (inCheck) triggerCheckAlert();

    let hasMoves = false;
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 9; c++) {
        let p = board[r][c];
        if (p && p.startsWith(enemy === "red" ? "R" : "B")) {
          if (getLegalMoves(r, c).length > 0) {
            hasMoves = true;
            break;
          }
        }
      }
      if (hasMoves) break;
    }

    if (!hasMoves) {
      const winnerName = turn === "red" ? "Phe Đỏ" : "Phe Đen";
      if (inCheck) endGame(turn, `CHIẾU BÍ! ${winnerName} chiến thắng!`);
      else endGame(turn, `HẾT NƯỚC ĐI! ${winnerName} chiến thắng!`);
    } else {
      turn = enemy;
      updateTimeHighlight();
    }
  };

  const handleSquareClick = (r, c) => {
    const p = board[r][c];
    if (p && p.startsWith(turn === "red" ? "R" : "B")) {
      selected = { r, c, id: p };
      renderPieces();
      return;
    }
    if (selected) {
      if (
        getLegalMoves(selected.r, selected.c).some(
          (m) => m.r === r && m.c === c,
        )
      ) {
        board[r][c] = selected.id;
        board[selected.r][selected.c] = null;
        selected = null;
        updateGameState();
        renderPieces();
      } else {
        selected = null;
        renderPieces();
      }
    }
  };

  layer.onclick = () => {
    if (gameState === "PLAYING") {
      selected = null;
      renderPieces();
    }
  };

  const timerTick = () => {
    if (gameState !== "PLAYING") return;
    times[turn]--;
    updateTimeUI();
    if (times[turn] <= 0) {
      const winnerColor = turn === "red" ? "black" : "red";
      const winnerName = turn === "red" ? "Phe Đen" : "Phe Đỏ";
      endGame(winnerColor, `HẾT GIỜ! ${winnerName} giành chiến thắng!`);
    }
  };

  const updateTimeUI = () => {
    const tr = document.getElementById("xq-time-red");
    const tb = document.getElementById("xq-time-black");
    if (tr) tr.innerText = formatTime(times.red);
    if (tb) tb.innerText = formatTime(times.black);
  };

  const endGame = (winnerColor, msg) => {
    gameState = "ENDED";
    clearInterval(timerId);

    if (winnerColor === "red") {
      if (isFlipped) scores.top++;
      else scores.bottom++;
    } else {
      if (isFlipped) scores.bottom++;
      else scores.top++;
    }

    updatePanelsUI();

    msgWinner.innerText = msg;
    msgWinner.classList.remove("hidden");

    setTimeout(() => {
      overlay.style.opacity = "1";
      overlay.style.pointerEvents = "auto";
      document.getElementById("xq-btn-start").innerText = "CHƠI VÁN MỚI";
    }, 1000);
  };

  const setupBoard = () => {
    board = INIT_BOARD.map((row) => [...row]);
    turn = "red";
    selected = null;
    let m = parseInt(document.getElementById("xq-time-input").value) || 10;
    times = { red: m * 60, black: m * 60 };
    updatePanelsUI();
    renderPieces();
  };

  document.getElementById("xq-btn-start").onclick = () => {
    setupBoard();
    gameState = "PLAYING";
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    msgWinner.classList.add("hidden");
    clearInterval(timerId);
    timerId = setInterval(timerTick, 1000);
    updateTimeHighlight();
  };

  document.getElementById("xq-btn-reset").onclick = () => {
    scores = { top: 0, bottom: 0 };
    gameState = "SETUP";
    clearInterval(timerId);
    msgWinner.innerText = "Đã làm mới tỷ số 0 - 0";
    msgWinner.classList.remove("hidden");

    overlay.style.opacity = "1";
    overlay.style.pointerEvents = "auto";
    document.getElementById("xq-btn-start").innerText = "BẮT ĐẦU";
    setupBoard();
  };

  document.getElementById("xq-btn-flip").onclick = () => {
    isFlipped = !isFlipped;
    updatePanelsUI();
    renderPieces();
  };

  drawBoardSVG();
  updatePanelsUI();
  setupBoard();
}
