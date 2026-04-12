export function setupTool() {
  const tabId = "tab-calc";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML = `
        <div class="text-center mb-8">
            <span class="bg-yellow-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase text-yellow-900">Công cụ tính toán</span>
            <h2 class="text-4xl font-bold mt-3 text-gray-800">Tính <span class="text-red-500">Phần Trăm</span></h2>
            <p class="text-sm text-gray-500 mt-2 italic">Nhập 2 ô bất kỳ, ô còn lại sẽ tự động tính!</p>
        </div>

        <div class="max-w-5xl mx-auto pb-10 px-2 lg:px-4">
            <div class="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                
                <div class="w-full max-w-md mx-auto space-y-6">
                    
                    <div class="glass-card bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400 shadow-sm border border-orange-50">
                        
                        <div class="flex bg-slate-100 p-1.5 rounded-xl w-full mb-6">
                            <button id="mode-1-btn" class="flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-orange-500 shadow-sm transition">X% của Y</button>
                            <button id="mode-2-btn" class="flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold text-slate-500 hover:text-orange-500 transition">X là % của Y</button>
                            <button id="mode-3-btn" class="flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold text-slate-500 hover:text-orange-500 transition">Tăng/Giảm</button>
                        </div>

                        <div id="calc-mode-1" class="block animate-[fadeIn_0.3s_ease]">
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="font-bold text-gray-700 text-sm">X phần trăm của Y là bao nhiêu?</h3>
                            </div>
                            <div class="flex flex-wrap items-end gap-2 md:gap-4">
                                <div class="flex-1 min-w-[100px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                                    <input type="number" id="c1-p" placeholder="30" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-sm">% của</div>
                                <div class="flex-1 min-w-[120px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị</label>
                                    <input type="number" id="c1-v" placeholder="250000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                                <div class="flex-1 min-w-[120px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Kết quả</label>
                                    <input type="number" id="c1-res" placeholder="75000" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                                </div>
                            </div>
                            <div class="text-right mt-5 flex justify-end space-x-4 pt-4 border-t border-slate-100">
                                <button id="c1-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition px-2 py-1.5">Xoá ô</button>
                                <button id="c1-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full">Lưu KQ</button>
                            </div>
                        </div>

                        <div id="calc-mode-2" class="hidden animate-[fadeIn_0.3s_ease]">
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="font-bold text-gray-700 text-sm">X là bao nhiêu phần trăm của Y?</h3>
                            </div>
                            <div class="flex flex-wrap items-end gap-2 md:gap-4">
                                <div class="flex-1 min-w-[100px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị X</label>
                                    <input type="number" id="c2-x" placeholder="45000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-xs text-center">là % của</div>
                                <div class="flex-1 min-w-[100px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá trị Y</label>
                                    <input type="number" id="c2-y" placeholder="180000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                                <div class="flex-[0.8] min-w-[80px] flex items-end">
                                    <div class="w-full">
                                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phần trăm</label>
                                        <input type="number" id="c2-res" placeholder="25" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                                    </div>
                                    <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                                </div>
                            </div>
                            <div class="text-right mt-5 flex justify-end space-x-4 pt-4 border-t border-slate-100">
                                <button id="c2-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition px-2 py-1.5">Xoá ô</button>
                                <button id="c2-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full">Lưu KQ</button>
                            </div>
                        </div>

                        <div id="calc-mode-3" class="hidden animate-[fadeIn_0.3s_ease]">
                            <div class="flex items-center gap-2 mb-4">
                                <h3 class="font-bold text-gray-700 text-sm">Thay đổi phần trăm giữa hai giá trị</h3>
                            </div>
                            <div class="flex flex-wrap items-end gap-2 md:gap-4">
                                <div class="flex-1 min-w-[110px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá cũ / gốc</label>
                                    <input type="number" id="c3-old" placeholder="200000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-sm">→</div>
                                <div class="flex-1 min-w-[110px]">
                                    <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Giá mới</label>
                                    <input type="number" id="c3-new" placeholder="150000" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                                </div>
                                <div class="pb-3 font-bold text-gray-400 text-sm">=</div>
                                <div class="flex-[0.8] min-w-[80px] flex items-end">
                                    <div class="w-full">
                                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Tăng/Giảm</label>
                                        <input type="number" id="c3-res" placeholder="-25" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500">
                                    </div>
                                    <span class="ml-2 pb-3 font-bold text-gray-800">%</span>
                                </div>
                            </div>
                            <div class="text-right mt-5 flex justify-end space-x-4 pt-4 border-t border-slate-100">
                                <button id="c3-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition px-2 py-1.5">Xoá ô</button>
                                <button id="c3-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full">Lưu KQ</button>
                            </div>
                        </div>

                    </div>

                    <div class="glass-card bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-[2rem] relative border-l-4 border-l-orange-400 shadow-sm border border-orange-50">
                        <div class="flex items-center gap-2 mb-5">
                            <h3 class="font-bold text-gray-700 text-sm">Chuyển đổi Số La Mã (1 - 3999)</h3>
                        </div>
                        <div class="flex flex-wrap items-end gap-2 md:gap-4">
                            <div class="flex-1 min-w-[140px]">
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số Thường (Ả Rập)</label>
                                <input type="number" id="ro-arabic" placeholder="2026" class="w-full bg-orange-50/50 border border-orange-100 rounded-xl p-3 outline-none focus:ring-2 ring-orange-200 text-center font-semibold text-orange-600">
                            </div>
                            <div class="pb-3 font-bold text-gray-400 text-xl text-center flex items-center">↔</div>
                            <div class="flex-1 min-w-[140px]">
                                <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số La Mã</label>
                                <input type="text" id="ro-roman" placeholder="MMXXVI" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-center font-bold text-red-500 uppercase">
                            </div>
                        </div>
                        <div class="text-right mt-5 flex justify-end space-x-4 pt-4 border-t border-slate-100">
                            <button id="ro-clear" class="text-[11px] font-bold text-gray-400 hover:text-orange-500 transition px-2 py-1.5">Xoá ô</button>
                            <button id="ro-save" class="text-[11px] font-bold text-blue-500 hover:text-blue-700 transition px-4 py-1.5 bg-blue-50 hover:bg-blue-100 rounded-full">Lưu KQ</button>
                        </div>
                    </div>

                </div>

                <div class="w-full max-w-md mx-auto">
                    <div class="bg-white/90 backdrop-blur-md p-6 rounded-[2rem] border border-orange-100 shadow-xl shadow-orange-100/50">
                        <div class="flex justify-between items-center mb-4 pb-3 border-b border-orange-50">
                            <h3 class="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wider text-slate-600">Lịch sử tính toán</h3>
                            <button id="clear-history" class="text-[10px] font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg transition uppercase tracking-widest border border-red-100">Xoá sạch</button>
                        </div>
                        <ul id="history-list" class="space-y-3 text-sm text-gray-600 h-[380px] lg:h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  // --- BẮT ĐẦU LOGIC ---

  // Chuyển đổi Tab (Modes)
  const btnM1 = document.getElementById("mode-1-btn");
  const btnM2 = document.getElementById("mode-2-btn");
  const btnM3 = document.getElementById("mode-3-btn");

  const secM1 = document.getElementById("calc-mode-1");
  const secM2 = document.getElementById("calc-mode-2");
  const secM3 = document.getElementById("calc-mode-3");

  const activeClass =
    "flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold bg-white text-orange-500 shadow-sm transition";
  const inactiveClass =
    "flex-1 py-2 rounded-lg text-[10px] sm:text-xs font-bold text-slate-500 hover:text-orange-500 hover:bg-white/50 transition";

  const switchMode = (mode) => {
    btnM1.className = mode === 1 ? activeClass : inactiveClass;
    btnM2.className = mode === 2 ? activeClass : inactiveClass;
    btnM3.className = mode === 3 ? activeClass : inactiveClass;

    secM1.classList.toggle("hidden", mode !== 1);
    secM2.classList.toggle("hidden", mode !== 2);
    secM3.classList.toggle("hidden", mode !== 3);
  };

  btnM1.onclick = () => switchMode(1);
  btnM2.onclick = () => switchMode(2);
  btnM3.onclick = () => switchMode(3);

  // Tính toán Logic
  const fmt = (num) =>
    Number.isInteger(num)
      ? num.toLocaleString("vi-VN")
      : Number(num.toFixed(2)).toLocaleString("vi-VN");
  const clean = (num) => parseFloat(num.toFixed(2));

  const getTarget = (i1, i2, i3) => {
    const arr = [i1, i2, i3].map((el) => ({
      el,
      time: parseInt(el.dataset.last || 0),
    }));
    arr.sort((a, b) => a.time - b.time);
    return arr[0].el;
  };

  const attachLogic = (inputs, calcFunc) => {
    inputs.forEach((input) => {
      input.addEventListener("input", (e) => {
        e.target.dataset.last = Date.now();
        calcFunc();
      });
    });
  };

  const c1P = document.getElementById("c1-p"),
    c1V = document.getElementById("c1-v"),
    c1Res = document.getElementById("c1-res");
  const calc1 = () => {
    const target = getTarget(c1P, c1V, c1Res);
    const p = parseFloat(c1P.value),
      v = parseFloat(c1V.value),
      r = parseFloat(c1Res.value);
    if (target === c1Res && !isNaN(p) && !isNaN(v))
      c1Res.value = clean((p * v) / 100);
    else if (target === c1V && !isNaN(p) && !isNaN(r) && p !== 0)
      c1V.value = clean((r * 100) / p);
    else if (target === c1P && !isNaN(v) && !isNaN(r) && v !== 0)
      c1P.value = clean((r / v) * 100);
  };
  attachLogic([c1P, c1V, c1Res], calc1);

  const c2X = document.getElementById("c2-x"),
    c2Y = document.getElementById("c2-y"),
    c2Res = document.getElementById("c2-res");
  const calc2 = () => {
    const target = getTarget(c2X, c2Y, c2Res);
    const x = parseFloat(c2X.value),
      y = parseFloat(c2Y.value),
      r = parseFloat(c2Res.value);
    if (target === c2Res && !isNaN(x) && !isNaN(y) && y !== 0)
      c2Res.value = clean((x / y) * 100);
    else if (target === c2X && !isNaN(r) && !isNaN(y))
      c2X.value = clean((r * y) / 100);
    else if (target === c2Y && !isNaN(x) && !isNaN(r) && r !== 0)
      c2Y.value = clean((x / r) * 100);
  };
  attachLogic([c2X, c2Y, c2Res], calc2);

  const c3Old = document.getElementById("c3-old"),
    c3New = document.getElementById("c3-new"),
    c3Res = document.getElementById("c3-res");
  const calc3 = () => {
    const target = getTarget(c3Old, c3New, c3Res);
    const o = parseFloat(c3Old.value),
      n = parseFloat(c3New.value),
      r = parseFloat(c3Res.value);
    if (target === c3Res && !isNaN(o) && !isNaN(n) && o !== 0)
      c3Res.value = clean(((n - o) / o) * 100);
    else if (target === c3New && !isNaN(o) && !isNaN(r))
      c3New.value = clean(o * (1 + r / 100));
    else if (target === c3Old && !isNaN(n) && !isNaN(r) && r !== -100)
      c3Old.value = clean(n / (1 + r / 100));
  };
  attachLogic([c3Old, c3New, c3Res], calc3);

  const historyList = document.getElementById("history-list");
  const STORAGE_KEY = "my_calc_history";

  const loadHistory = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    let historyArr = savedData ? JSON.parse(savedData) : [];

    historyList.innerHTML = "";

    if (historyArr.length > 0) {
      historyArr.forEach((item) => {
        const li = document.createElement("li");
        // Thay dấu tick (✓) bằng chấm tròn (•) cho tối giản
        li.className =
          'bg-slate-50/80 p-3 rounded-xl border border-slate-100 shadow-sm flex items-center before:content-["•"] before:text-orange-500 before:mr-2 before:font-bold before:text-lg text-gray-700 font-medium animate-[fadeIn_0.3s_ease]';
        li.innerHTML = item;
        historyList.appendChild(li);
      });
    } else {
      historyList.innerHTML =
        '<li class="italic text-gray-400 text-center py-10 empty-msg text-xs">Chưa có lịch sử nào.<br>Hãy bấm "Lưu KQ" ở các bảng tính!</li>';
    }
  };

  const addHistory = (textHTML) => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    let historyArr = savedData ? JSON.parse(savedData) : [];

    historyArr.unshift(textHTML);

    if (historyArr.length > 30) {
      historyArr.pop();
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(historyArr));
    loadHistory();
  };

  document.getElementById("c1-save").onclick = () => {
    if (c1P.value && c1V.value && c1Res.value)
      addHistory(
        `<span class="text-orange-500">${fmt(parseFloat(c1P.value))}%</span> của ${fmt(parseFloat(c1V.value))} = <span class="text-red-500">${fmt(parseFloat(c1Res.value))}</span>`,
      );
  };
  document.getElementById("c2-save").onclick = () => {
    if (c2X.value && c2Y.value && c2Res.value)
      addHistory(
        `${fmt(parseFloat(c2X.value))} là <span class="text-orange-500">${fmt(parseFloat(c2Res.value))}%</span> của ${fmt(parseFloat(c2Y.value))}`,
      );
  };
  document.getElementById("c3-save").onclick = () => {
    if (c3Old.value && c3New.value && c3Res.value) {
      const r = parseFloat(c3Res.value);
      const txt = r > 0 ? "Tăng" : "Giảm";
      addHistory(
        `Từ ${fmt(parseFloat(c3Old.value))} → ${fmt(parseFloat(c3New.value))} là <span class="text-${r > 0 ? "green" : "red"}-500">${txt} ${fmt(Math.abs(r))}%</span>`,
      );
    }
  };

  document.getElementById("c1-clear").onclick = () => {
    c1P.value = c1V.value = c1Res.value = "";
    c1P.dataset.last = c1V.dataset.last = c1Res.dataset.last = 0;
  };
  document.getElementById("c2-clear").onclick = () => {
    c2X.value = c2Y.value = c2Res.value = "";
    c2X.dataset.last = c2Y.dataset.last = c2Res.dataset.last = 0;
  };
  document.getElementById("c3-clear").onclick = () => {
    c3Old.value = c3New.value = c3Res.value = "";
    c3Old.dataset.last = c3New.dataset.last = c3Res.dataset.last = 0;
  };

  document.getElementById("clear-history").onclick = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      localStorage.removeItem(STORAGE_KEY);
      loadHistory();
    }
  };

  const inArabic = document.getElementById("ro-arabic");
  const inRoman = document.getElementById("ro-roman");

  const romanMap = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  const toRoman = (num) => {
    if (num < 1 || num > 3999) return "LỖI";
    let str = "";
    for (let i of Object.keys(romanMap)) {
      let q = Math.floor(num / romanMap[i]);
      num -= q * romanMap[i];
      str += i.repeat(q);
    }
    return str;
  };

  const toArabic = (str) => {
    str = str.toUpperCase();
    let num = 0;
    if (!/^[IVXLCDM]+$/.test(str)) return NaN;
    for (let i of Object.keys(romanMap)) {
      while (str.indexOf(i) === 0) {
        num += romanMap[i];
        str = str.replace(i, "");
      }
    }
    return num;
  };

  inArabic.addEventListener("input", () => {
    const val = parseInt(inArabic.value);
    if (!isNaN(val)) {
      const result = toRoman(val);
      inRoman.value = result === "LỖI" ? "" : result;
    } else {
      inRoman.value = "";
    }
  });

  inRoman.addEventListener("input", () => {
    const val = inRoman.value.trim().toUpperCase();
    if (val) {
      const result = toArabic(val);
      inArabic.value = isNaN(result) ? "" : result;
    } else {
      inArabic.value = "";
    }
  });

  document.getElementById("ro-save").onclick = () => {
    if (inArabic.value && inRoman.value && inRoman.value !== "LỖI") {
      addHistory(
        `Số <span class="text-orange-500 font-bold">${inArabic.value}</span> = La Mã <span class="text-red-500 font-bold">${inRoman.value}</span>`,
      );
    }
  };

  document.getElementById("ro-clear").onclick = () => {
    inArabic.value = "";
    inRoman.value = "";
  };

  loadHistory();
}
