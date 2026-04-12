export function setupTool() {
  const tabId = "tab-wheel";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML = `
        <style>
            .wheel-modal-enter { animation: wheelPopIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            @keyframes wheelPopIn {
                0% { opacity: 0; transform: scale(0.7) translateY(20px); }
                100% { opacity: 1; transform: scale(1) translateY(0); }
            }
            
            .sunburst {
                position: absolute; top: -50%; left: -50%; width: 200%; height: 200%;
                background: repeating-conic-gradient(from 0deg, rgba(255,255,255,0) 0deg 15deg, rgba(255,255,255,0.3) 15deg 30deg);
                animation: spinBurst 10s linear infinite; z-index: 0; pointer-events: none;
            }
            @keyframes spinBurst { 100% { transform: rotate(360deg); } }

            .btn-spin-pulse { animation: spinPulse 2s infinite; }
            @keyframes spinPulse {
                0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
                70% { box-shadow: 0 0 0 20px rgba(245, 158, 11, 0); }
                100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
            }
            
            .wheel-scroll::-webkit-scrollbar { width: 6px; }
            .wheel-scroll::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        </style>

        <div class="text-center mb-6">
            <span class="bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">Tiện ích</span>
            <h2 class="text-3xl font-black mt-2 text-gray-800 tracking-tight">Vòng Quay <span class="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">May Mắn</span></h2>
        </div>

        <div class="max-w-6xl mx-auto pb-10 px-2 lg:px-6">
            <div class="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 lg:gap-12">
                
                <div class="w-full lg:w-3/5 flex flex-col items-center pt-2">
                    <div class="relative w-full aspect-square max-w-[360px] md:max-w-[450px] lg:max-w-[550px] mx-auto mt-2">
                        <div class="absolute top-1/2 right-[-25px] transform -translate-y-1/2 z-40 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]">
                            <svg width="55" height="55" viewBox="0 0 24 24" fill="#fbbf24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 12L22 2L17 12L22 22L4 12Z" stroke="#78350f" stroke-width="2" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        
                        <div class="w-full h-full rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.3)] relative overflow-hidden bg-slate-900 border-4 border-slate-300 flex items-center justify-center">
                            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-60">
                                <div style="transform: scale(0.65); white-space: nowrap;">
                                    <div class="flex items-center space-x-2">
                                        <div class="bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-sm">NOTHING</div>
                                        <span class="font-bold text-white drop-shadow-md uppercase text-[10px] tracking-widest mt-1">YET EVERYTHING</span>
                                    </div>
                                </div>
                            </div>
                            <canvas id="wheel-canvas" width="1000" height="1000" class="w-full h-full relative z-0"></canvas>
                        </div>

                        <button type="button" id="btn-spin-center" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full w-[22%] h-[22%] shadow-[0_8px_20px_rgba(0,0,0,0.5),_inset_0_-5px_10px_rgba(180,83,9,0.5),_inset_0_5px_10px_rgba(255,255,255,0.8)] font-black text-amber-900 border-[5px] border-white flex flex-col items-center justify-center active:scale-90 transition-transform z-30 cursor-pointer select-none btn-spin-pulse text-lg md:text-xl tracking-widest uppercase">
                            QUAY
                        </button>
                    </div>
                </div>

                <div class="w-full lg:w-2/5 max-w-md mx-auto">
                    <div class="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white overflow-hidden flex flex-col">
                        
                        <div class="flex gap-2 p-3 md:p-4 bg-slate-50/80 border-b border-slate-200/60">
                            <button type="button" id="btn-wheel-reset-all" data-confirm="false" class="flex-1 bg-white hover:bg-red-50 text-red-600 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-red-200 whitespace-nowrap uppercase tracking-wider">
                                XÓA SẠCH
                            </button>
                            <button type="button" id="btn-wheel-shuffle" class="flex-1 bg-white hover:bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-slate-200 whitespace-nowrap uppercase tracking-wider">
                                TRÁO ĐỔI
                            </button>
                            <button type="button" id="btn-wheel-sort" class="flex-1 bg-white hover:bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-slate-200 whitespace-nowrap uppercase tracking-wider">
                                SẮP XẾP
                            </button>
                        </div>

                        <div class="flex border-b border-slate-200/60 bg-white">
                            <button type="button" id="tab-btn-list" class="flex-1 py-4 text-sm font-black text-indigo-600 border-b-2 border-indigo-500 transition-colors uppercase tracking-wide">
                                MỤC (<span id="wheel-count">0</span>)
                            </button>
                            <button type="button" id="tab-btn-results" class="flex-1 py-4 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:bg-slate-50 transition-colors uppercase tracking-wide">
                                KẾT QUẢ (<span id="wheel-result-count">0</span>)
                            </button>
                        </div>

                        <div id="tab-content-list" class="p-4 block">
                            <textarea id="wheel-input" class="w-full h-[400px] lg:h-[450px] bg-slate-50/50 border border-slate-200 rounded-2xl p-4 text-sm font-semibold text-slate-700 outline-none focus:ring-2 ring-indigo-300 resize-none wheel-scroll leading-relaxed shadow-inner" placeholder="Nhập danh sách vào đây...&#10;Mỗi tên nằm trên một dòng nhé!"></textarea>
                        </div>

                        <div id="tab-content-results" class="p-4 hidden">
                            <div id="wheel-results-list" class="h-[400px] lg:h-[450px] overflow-y-auto wheel-scroll bg-slate-50/50 border border-slate-200 rounded-2xl p-2 shadow-inner">
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <div id="wheel-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-slate-900/70 backdrop-blur-md px-4">
            <div id="wheel-modal-content" class="bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform scale-0">
                <div class="bg-gradient-to-r from-amber-400 to-orange-500 py-8 px-6 text-center relative overflow-hidden flex flex-col items-center justify-center">
                    <div class="sunburst"></div>
                    <h3 class="font-black text-white text-xl relative z-10 drop-shadow-md uppercase tracking-wider">Người chiến thắng!</h3>
                </div>
                <div class="p-8 text-center bg-white relative">
                    <div class="absolute inset-0 opacity-10 pointer-events-none" style="background-image: radial-gradient(#f59e0b 2px, transparent 2px), radial-gradient(#3b82f6 2px, transparent 2px); background-size: 30px 30px; background-position: 0 0, 15px 15px;"></div>
                    <p id="wheel-winner-name" class="text-4xl font-black text-slate-800 break-words drop-shadow-sm relative z-10"></p>
                </div>
                <div class="p-4 bg-slate-50 flex justify-between gap-3 border-t border-slate-100">
                    <button type="button" id="btn-modal-close" class="flex-1 py-3.5 font-bold text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition active:scale-95 text-[13px] shadow-sm uppercase tracking-wider">
                        ĐÓNG
                    </button>
                    <button type="button" id="btn-modal-remove" class="flex-1 py-3.5 font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 shadow-md transition active:scale-95 text-[13px] border border-transparent uppercase tracking-wider">
                        XÓA TÊN NÀY
                    </button>
                </div>
            </div>
        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // 🛡️ HÀM BẢO VỆ BỘ NHỚ TRÌNH DUYỆT (ANTI-BUG)
  // ==========================================
  const safeSave = (key, val) => {
    try {
      window.localStorage.setItem(key, val);
    } catch (e) {}
  };
  const safeGet = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  };
  const safeRemove = (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
  };

  // ==========================================
  // LOGIC XỬ LÝ
  // ==========================================
  const canvas = document.getElementById("wheel-canvas");
  const ctx = canvas.getContext("2d");
  const inputArea = document.getElementById("wheel-input");
  const countDisplay = document.getElementById("wheel-count");
  const resultCountDisplay = document.getElementById("wheel-result-count");
  const btnSpin = document.getElementById("btn-spin-center");
  const resultListDiv = document.getElementById("wheel-results-list");

  const modal = document.getElementById("wheel-modal");
  const modalContent = document.getElementById("wheel-modal-content");
  const winnerNameDisplay = document.getElementById("wheel-winner-name");
  const btnClose = document.getElementById("btn-modal-close");
  const btnRemove = document.getElementById("btn-modal-remove");

  const tabListBtn = document.getElementById("tab-btn-list");
  const tabResBtn = document.getElementById("tab-btn-results");
  const tabListContent = document.getElementById("tab-content-list");
  const tabResContent = document.getElementById("tab-content-results");

  const colors = [
    "#ef4444",
    "#f59e0b",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#d946ef",
  ];

  let names = [];
  let results = [];
  let totalSpinsCounter = 0;
  let currentRotation = 0;
  let isSpinning = false;
  let currentWinner = "";

  const savedSpins = safeGet("wheel_spins");
  if (savedSpins) totalSpinsCounter = parseInt(savedSpins);

  const savedResults = safeGet("wheel_results");
  if (savedResults) {
    try {
      let parsed = JSON.parse(savedResults);
      if (parsed.length > 0 && typeof parsed[0] === "string") {
        results = parsed.map((name, idx) => ({
          text: name,
          label: "LẦN " + (parsed.length - idx),
        }));
      } else {
        results = parsed;
      }
      if (totalSpinsCounter === 0) totalSpinsCounter = results.length;
    } catch (e) {}
  }

  // ==========================================
  // 💡 KHỞI TẠO DỮ LIỆU HOẶC DÙNG TÊN MẶC ĐỊNH
  // ==========================================
  const savedData = safeGet("wheel_names");
  if (savedData !== null && savedData.trim() !== "") {
    inputArea.value = savedData;
  } else {
    inputArea.value = "Hà Nội\nHồ Chí Minh\nĐà Nẵng\nCần Thơ";
  }

  // --- TABS CHUYỂN ĐỔI ---
  tabListBtn.addEventListener("click", () => {
    tabListBtn.className =
      "flex-1 py-4 text-sm font-black text-indigo-600 border-b-2 border-indigo-500 transition-colors uppercase tracking-wide";
    tabResBtn.className =
      "flex-1 py-4 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:bg-slate-50 transition-colors uppercase tracking-wide";
    tabListContent.classList.remove("hidden");
    tabResContent.classList.add("hidden");
  });

  tabResBtn.addEventListener("click", () => {
    tabResBtn.className =
      "flex-1 py-4 text-sm font-black text-indigo-600 border-b-2 border-indigo-500 transition-colors uppercase tracking-wide";
    tabListBtn.className =
      "flex-1 py-4 text-sm font-bold text-slate-500 border-b-2 border-transparent hover:bg-slate-50 transition-colors uppercase tracking-wide";
    tabResContent.classList.remove("hidden");
    tabListContent.classList.add("hidden");
    renderResults();
  });

  // --- UPDATE & RENDER ---
  const updateNames = () => {
    const rawText = inputArea.value;
    names = rawText
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n !== "");
    countDisplay.innerText = names.length;
    safeSave("wheel_names", rawText);
    drawWheel();
  };

  const renderResults = () => {
    resultCountDisplay.innerText = results.length;
    if (results.length === 0) {
      resultListDiv.innerHTML =
        '<div class="text-center text-slate-400 text-sm font-medium py-10 uppercase tracking-widest">Chưa có kết quả</div>';
      return;
    }
    resultListDiv.innerHTML = results
      .map(
        (res) => `
            <div class="flex items-center justify-between p-2 border-b border-slate-100 bg-white mb-0.5 rounded shadow-sm hover:bg-slate-50 transition">
                <span class="font-bold text-slate-700 text-xs truncate max-w-[80%] pl-1">${res.text}</span>
                <span class="text-[9px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded whitespace-nowrap uppercase">${res.label}</span>
            </div>
        `,
      )
      .join("");
  };

  const drawWheel = () => {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const outerRadius = cx;
    const rimThickness = 45;
    const innerRadius = cx - rimThickness;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (names.length === 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
      ctx.fillStyle = "#f1f5f9";
      ctx.fill();
      ctx.fillStyle = "#cbd5e1";
      ctx.font = "bold 50px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("TRỐNG", cx, cy);
    } else {
      const arcSize = (2 * Math.PI) / names.length;
      const offsetAngle = -arcSize / 2;

      for (let i = 0; i < names.length; i++) {
        const angle = offsetAngle + i * arcSize;

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, innerRadius, angle, angle + arcSize);
        ctx.lineTo(cx, cy);
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();

        ctx.stroke();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "rgba(255,255,255,0.6)";

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";

        let fontSize = Math.max(28, 70 - names.length * 1.8);
        ctx.font = `900 ${fontSize}px system-ui, sans-serif`;

        ctx.shadowColor = "rgba(0,0,0,0.6)";
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;

        let text = names[i];
        if (text.length > 20) text = text.substring(0, 20) + "...";
        ctx.fillText(text, innerRadius - 50, 0);
        ctx.restore();
      }
    }

    ctx.beginPath();
    ctx.arc(cx, cy, outerRadius - rimThickness / 2, 0, 2 * Math.PI);
    ctx.lineWidth = rimThickness;
    ctx.strokeStyle = "#1e293b";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, innerRadius, 0, 2 * Math.PI);
    ctx.lineWidth = 8;
    ctx.strokeStyle = "#fbbf24";
    ctx.stroke();

    const pegCount = 24;
    const pegAngle = (2 * Math.PI) / pegCount;
    for (let i = 0; i < pegCount; i++) {
      let angle = i * pegAngle;
      let px = cx + Math.cos(angle) * (outerRadius - rimThickness / 2);
      let py = cy + Math.sin(angle) * (outerRadius - rimThickness / 2);

      ctx.beginPath();
      ctx.arc(px, py, 12, 0, 2 * Math.PI);

      let isGold = i % 2 === 0;
      ctx.fillStyle = isGold ? "#fef08a" : "#ffffff";
      ctx.fill();

      ctx.lineWidth = 4;
      ctx.strokeStyle = "#b45309";
      ctx.stroke();

      ctx.shadowColor = isGold ? "#eab308" : "#ffffff";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  };

  const spinWheel = () => {
    if (isSpinning || names.length === 0) return;
    isSpinning = true;

    btnSpin.classList.remove("btn-spin-pulse");

    const extraDegrees = Math.floor(Math.random() * 360);
    const totalDegrees =
      360 * (Math.floor(Math.random() * 6) + 7) + extraDegrees;
    currentRotation += totalDegrees;

    canvas.style.transition = "transform 7s cubic-bezier(0.1, 0.9, 0.15, 1)";
    canvas.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
      isSpinning = false;
      btnSpin.classList.add("btn-spin-pulse");
      calculateWinner();
    }, 7000);
  };

  const calculateWinner = () => {
    const sliceAngle = 360 / names.length;
    const normalizedRotation = currentRotation % 360;

    let winningDegree = (360 - normalizedRotation) % 360;
    let index = Math.floor(
      ((winningDegree + sliceAngle / 2) % 360) / sliceAngle,
    );

    currentWinner = names[index];

    totalSpinsCounter++;
    safeSave("wheel_spins", totalSpinsCounter);

    results.unshift({ text: currentWinner, label: "LẦN " + totalSpinsCounter });
    safeSave("wheel_results", JSON.stringify(results));
    renderResults();

    winnerNameDisplay.innerText = currentWinner;
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    setTimeout(() => {
      modalContent.classList.remove("scale-0");
      modalContent.classList.add("wheel-modal-enter");
    }, 10);
  };

  const closeModal = () => {
    modalContent.classList.remove("wheel-modal-enter");
    modalContent.classList.add("scale-0");
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }, 300);
  };

  const removeWinner = () => {
    let lines = inputArea.value.split("\n");
    const idx = lines.findIndex((l) => l.trim() === currentWinner);
    if (idx !== -1) {
      lines.splice(idx, 1);
      inputArea.value = lines.join("\n");
      updateNames();
    }
    closeModal();
  };

  inputArea.addEventListener("input", updateNames);
  btnSpin.addEventListener("click", spinWheel);
  btnClose.addEventListener("click", closeModal);
  btnRemove.addEventListener("click", removeWinner);

  // ==========================================
  // TRÁO ĐỔI & SẮP XẾP
  // ==========================================
  document.getElementById("btn-wheel-shuffle").addEventListener("click", () => {
    if (names.length > 0) {
      names.sort(() => Math.random() - 0.5);
      inputArea.value = names.join("\n");
      updateNames();
    }
  });

  document.getElementById("btn-wheel-sort").addEventListener("click", () => {
    if (names.length > 0) {
      names.sort((a, b) => a.localeCompare(b, "vi"));
      inputArea.value = names.join("\n");
      updateNames();
    }
    if (results.length > 0) {
      results.sort((a, b) => a.text.localeCompare(b.text, "vi"));
      safeSave("wheel_results", JSON.stringify(results));
      renderResults();
    }
  });

  // ==========================================
  // THUẬT TOÁN HỦY DIỆT MỚI: BẤM 2 LẦN ĐỂ XÓA
  // ==========================================
  const btnResetAll = document.getElementById("btn-wheel-reset-all");
  let resetTimeout;

  btnResetAll.addEventListener("click", function (e) {
    e.preventDefault();

    if (
      names.length === 0 &&
      results.length === 0 &&
      inputArea.value.trim() === ""
    )
      return;

    if (btnResetAll.dataset.confirm !== "true") {
      btnResetAll.dataset.confirm = "true";
      btnResetAll.innerHTML = "CHẮC CHƯA?";
      btnResetAll.className =
        "flex-1 bg-red-500 text-white text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-md transition-colors flex justify-center items-center gap-1 active:scale-95 whitespace-nowrap uppercase tracking-wider";

      resetTimeout = setTimeout(() => {
        btnResetAll.dataset.confirm = "false";
        btnResetAll.innerHTML = "XÓA SẠCH";
        btnResetAll.className =
          "flex-1 bg-white hover:bg-red-50 text-red-600 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-red-200 whitespace-nowrap uppercase tracking-wider";
      }, 3000);
    } else {
      clearTimeout(resetTimeout);

      btnResetAll.dataset.confirm = "false";
      btnResetAll.innerHTML = "XÓA SẠCH";
      btnResetAll.className =
        "flex-1 bg-white hover:bg-red-50 text-red-600 text-[10px] sm:text-[11px] font-bold py-3 rounded-xl shadow-sm transition-colors flex justify-center items-center gap-1 active:scale-95 border border-red-200 whitespace-nowrap uppercase tracking-wider";

      inputArea.value = "";
      names = [];
      results = [];
      totalSpinsCounter = 0;
      countDisplay.innerText = "0";

      safeRemove("wheel_names");
      safeRemove("wheel_results");
      safeRemove("wheel_spins");

      currentRotation = 0;
      canvas.style.transition = "none";
      canvas.style.transform = "rotate(0deg)";

      drawWheel();
      renderResults();
    }
  });

  // Khởi tạo lần đầu
  updateNames();
  renderResults();
}
