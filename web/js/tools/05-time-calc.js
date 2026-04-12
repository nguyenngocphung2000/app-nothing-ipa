export function setupTool() {
  const tabId = "tab-time-calc";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML =
    "<style>" +
    "body.dark-mode .tc-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } " +
    "body.dark-mode .tc-inner-card { background-color: rgba(15, 23, 42, 0.6) !important; border-color: rgba(45, 212, 191, 0.2) !important; } " +
    "body.dark-mode .tc-history-item { background-color: rgba(30, 41, 59, 0.8) !important; border-color: rgba(255, 255, 255, 0.05) !important; }" +
    "body.dark-mode select, body.dark-mode input { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; }" +
    "body.dark-mode span.text-slate-300 { color: #475569 !important; }" +
    "body.dark-mode #tc-result .tc-card, body.dark-mode #mod2-result { background-color: rgba(15, 23, 42, 0.4) !important; border-color: #334155 !important; }" +
    "</style>" +
    '<div class="text-center mb-8">' +
    '<span class="bg-teal-100 text-teal-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-teal-200">Công thức & Thực tế</span>' +
    '<h2 class="text-3xl font-bold mt-2 text-slate-800">Tính Khoảng Cách <span class="text-teal-500">Thời Gian</span></h2>' +
    '<p class="text-[11px] text-slate-500 italic mt-2 max-w-2xl mx-auto px-4">Công cụ hỗ trợ tính toán thời gian đa chiều và khoảng cách chính xác.</p>' +
    "</div>" +
    // BỌC GIAO DIỆN 3 CỘT TRÀN VIỀN
    '<div class="w-full max-w-[1600px] mx-auto pb-10 px-4 lg:px-8 xl:px-12">' +
    '<div class="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6 lg:gap-8">' +
    // ================= CỘT 1 (CỘT TRỤ - QUYẾT ĐỊNH CHIỀU CAO TOÀN LƯỚI) =================
    '<div class="w-full flex flex-col gap-6">' +
    // Thẻ 1.1: Nhập liệu
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-teal-100 flex flex-col tc-card shrink-0">' +
    '<div class="border-b border-slate-200 pb-3"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Khoảng cách 2 mốc ngày</h3></div>' +
    '<div class="mt-4 space-y-5">' +
    "<div>" +
    '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Từ ngày (Bắt đầu)</label>' +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<select id="tc-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="tc-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="tc-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    "</div></div>" +
    "<div>" +
    '<label class="text-[10px] font-bold text-slate-400 uppercase mb-2 block ml-1">Đến ngày (Kết thúc)</label>' +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<select id="tc-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="tc-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="tc-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-teal-200 cursor-pointer"></select>' +
    "</div></div>" +
    "</div>" +
    '<div class="mt-4 flex gap-2 w-full">' +
    '<button id="tc-btn-conv" class="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
    '<span class="text-sm uppercase tracking-wide">CÔNG THỨC</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Quy ước 30 ngày)</span></button>' +
    '<button id="tc-btn-real" class="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex flex-col items-center justify-center">' +
    '<span class="text-sm uppercase tracking-wide">THEO LỊCH</span><span class="text-[9px] font-medium opacity-90 mt-0.5">(Thực tế)</span></button>' +
    "</div>" +
    "</div>" +
    // Thẻ 1.2: Kết quả (Tự giãn để đẩy thẻ dưới bằng Cột 2 & 3 nếu cần)
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col tc-card flex-1">' +
    '<div class="border-b border-slate-200 pb-3"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Kết quả mốc ngày</h3></div>' +
    '<div id="tc-empty-state" class="flex-1 flex items-center justify-center text-[11px] text-slate-400 italic text-center py-6">Kết quả tính toán sẽ hiển thị tại đây...</div>' +
    '<div id="tc-result" class="hidden mt-4 tc-card bg-[#e0f2fe] rounded-[1.5rem] p-5 shadow-sm border border-white relative overflow-hidden">' +
    '<div class="flex justify-between items-end border-b border-teal-200/50 pb-2 mb-3">' +
    '<div class="text-teal-600 font-bold text-xs tracking-widest uppercase">KHOẢNG CÁCH</div>' +
    '<div id="tc-res-type" class="text-[10px] font-bold text-teal-700/60 uppercase bg-teal-50/50 px-2 py-0.5 rounded border border-teal-100">--</div>' +
    "</div>" +
    '<div class="space-y-2">' +
    '<div class="tc-inner-card bg-white/70 p-3 rounded-xl border border-teal-200 shadow-sm flex flex-col">' +
    '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Chuẩn Năm - Tháng - Ngày</span>' +
    '<span class="text-base font-black text-slate-800" id="tc-res-1">--</span></div>' +
    '<div class="tc-inner-card bg-white/70 p-3 rounded-xl border border-teal-200 shadow-sm flex flex-col">' +
    '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Quý (1 Quý = 3 Tháng)</span>' +
    '<span class="text-sm font-bold text-slate-700" id="tc-res-2">--</span></div>' +
    '<div class="tc-inner-card bg-white/70 p-3 rounded-xl border border-teal-200 shadow-sm flex flex-col">' +
    '<span class="text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-1">Tổng Tháng</span>' +
    '<span class="text-sm font-bold text-slate-700" id="tc-res-3">--</span></div>' +
    '<div class="tc-inner-card bg-teal-500 p-3 rounded-xl border border-teal-600 shadow-md flex flex-col">' +
    '<span class="text-[9px] text-teal-100 font-bold uppercase tracking-wider mb-1">Tổng Ngày Tuyệt Đối</span>' +
    '<span class="text-xl font-black text-white" id="tc-res-4">--</span></div>' +
    "</div></div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 1
    // ================= CỘT 2: TÍNH THỜI GIAN ĐA CHIỀU =================
    '<div class="w-full flex flex-col h-full">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-orange-100 flex flex-col flex-1 tc-card h-full">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Tính thời gian đa chiều</h3></div>' +
    '<div class="mt-4 space-y-4 shrink-0">' + // Bao bọc phần nhập liệu cố định
    "<div>" +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase block ml-1">1. Ngày Bắt Đầu</label>' +
    '<button id="m2-btn-clear-start" class="text-[9px] bg-slate-100 text-slate-500 hover:bg-slate-200 px-3 py-1 rounded font-bold transition shadow-sm border border-slate-200 tracking-wider">XÓA</button>' +
    "</div>" +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<select id="m2-start-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="m2-start-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="m2-start-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 cursor-pointer"></select>' +
    "</div></div>" +
    "<div>" +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase block ml-1">2. Ngày Đích Đến</label>' +
    '<button id="m2-btn-clear-end" class="text-[9px] bg-slate-100 text-slate-500 hover:bg-slate-200 px-3 py-1 rounded font-bold transition shadow-sm border border-slate-200 tracking-wider">XÓA</button>' +
    "</div>" +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<select id="m2-end-d" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="m2-end-m" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
    '<span class="text-slate-300 font-black">/</span>' +
    '<select id="m2-end-y" style="text-align-last: center; direction: ltr;" class="w-1/3 bg-orange-50 border border-orange-200 rounded-xl text-center font-bold text-orange-600 py-3 outline-none focus:ring-2 ring-orange-400 cursor-pointer"></select>' +
    "</div></div>" +
    "<div>" +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase block ml-1">3. Tổng Thời Gian</label>' +
    '<button id="m2-btn-clear-wait" class="text-[9px] bg-slate-100 text-slate-500 hover:bg-slate-200 px-3 py-1 rounded font-bold transition shadow-sm border border-slate-200 tracking-wider">XÓA</button>' +
    "</div>" +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-y" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Năm</span></div>' +
    '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-m" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Tháng</span></div>' +
    '<div class="flex-1 flex flex-col items-center"><input id="m2-wait-d" type="number" min="0" placeholder="#" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-2.5 outline-none focus:ring-2 ring-orange-200"><span class="text-[9px] font-bold text-slate-400 mt-1 uppercase">Ngày</span></div>' +
    "</div></div>" +
    "<div>" +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase block ml-1">4. Tỷ Lệ</label>' +
    '<button id="m2-btn-clear-ratio" class="text-[9px] bg-slate-100 text-slate-500 hover:bg-slate-200 px-3 py-1 rounded font-bold transition shadow-sm border border-slate-200 tracking-wider">XÓA</button>' +
    "</div>" +
    '<div class="flex flex-wrap justify-center gap-1.5 mb-3 px-1">' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="1" data-den="5">1/5</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="1" data-den="4">1/4</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="1" data-den="3">1/3</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="1" data-den="2">1/2</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="2" data-den="3">2/3</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="3" data-den="4">3/4</button>' +
    '<button class="m2-quick-ratio text-[10px] font-bold text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 px-2.5 py-1.5 rounded-lg transition shadow-sm active:scale-95" data-num="2" data-den="5">2/5</button>' +
    "</div>" +
    '<div class="flex justify-center items-center gap-3 w-full px-16">' +
    '<input id="m2-ratio-num" type="number" placeholder="Tử" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-slate-700 text-base py-2 outline-none focus:ring-2 ring-orange-200">' +
    '<span class="text-xl font-black text-slate-300">/</span>' +
    '<input id="m2-ratio-den" type="number" placeholder="Mẫu" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-black text-slate-700 text-base py-2 outline-none focus:ring-2 ring-orange-200">' +
    "</div></div>" +
    "</div>" +
    '<div class="flex gap-2 w-full mt-4 shrink-0">' +
    '<button id="mod2-btn-reset" class="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3.5 rounded-xl shadow-sm border border-slate-200 transition active:scale-95 text-[11px] uppercase">' +
    "LÀM MỚI" +
    "</button>" +
    '<button id="mod2-btn-calc" class="w-2/3 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center text-[13px] uppercase tracking-wide">' +
    "TÍNH TOÁN" +
    "</button>" +
    "</div>" +
    // Phần Mẹo bọc Flex-1 hút trọn không gian trống để ép nút bấm sát lên trên
    '<div class="mt-6 flex-1 bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50 flex flex-col justify-center">' +
    '<p class="text-[12px] text-slate-600 font-medium">Nhập dữ kiện <strong class="text-slate-700">đã biết</strong>, nhấn <strong class="text-orange-600">XÓA</strong> ở ô ẩn số cần tìm. Chuẩn 1 tháng = 30 ngày.</p>' +
    "</div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 2
    // ================= CỘT 3: KẾT QUẢ ĐA CHIỀU + LỊCH SỬ =================
    '<div class="w-full flex flex-col gap-6 h-full">' +
    // Thẻ 3.1: Kết quả đa chiều
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-200 flex flex-col tc-card shrink-0">' +
    '<div class="border-b border-slate-200 pb-3"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Kết quả đa chiều</h3></div>' +
    '<div id="mod2-empty-state" class="flex items-center justify-center text-[11px] text-slate-400 italic text-center py-6">Kết quả tính toán sẽ hiển thị tại đây...</div>' +
    '<div id="mod2-result" class="hidden tc-card bg-[#fff7ed] rounded-[1.5rem] p-5 shadow-sm border border-orange-100 mt-4">' +
    '<div class="text-orange-600 font-bold text-[10px] tracking-widest uppercase border-b border-orange-200/50 pb-2 mb-1">ĐA CHIỀU</div>' +
    '<div id="mod2-dynamic-res" class="w-full"></div>' +
    "</div>" +
    "</div>" +
    // Thẻ 3.2: Lịch sử (Sử dụng absolute inset-0 để tự cuộn, không ép giãn Grid)
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col tc-card flex-1 min-h-[200px]">' +
    '<div class="flex justify-between items-center border-b border-slate-200 pb-3 shrink-0">' +
    '<h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Lịch sử tính toán</h3>' +
    '<button id="tc-btn-clear" class="text-[9px] bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-bold hover:bg-red-100 transition shadow-sm border border-red-100 uppercase tracking-wider">XÓA</button>' +
    "</div>" +
    '<div class="relative flex-1 mt-4">' + // Khung bọc tương đối
    '<div id="tc-history-list" class="absolute inset-0 overflow-y-auto custom-scrollbar pr-1 space-y-2"></div>' + // Danh sách tuyệt đối nội bộ
    "</div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 3
    "</div>" + // KẾT THÚC LƯỚI GRID
    "</div>"; // KẾT THÚC BỌC TRÀN VIỀN

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // LOGIC CHUYỂN ĐỔI SANG MODULE
  // ==========================================
  var sD = document.getElementById("tc-start-d"),
    sM = document.getElementById("tc-start-m"),
    sY = document.getElementById("tc-start-y");
  var eD = document.getElementById("tc-end-d"),
    eM = document.getElementById("tc-end-m"),
    eY = document.getElementById("tc-end-y");
  var btnConv = document.getElementById("tc-btn-conv"),
    btnReal = document.getElementById("tc-btn-real");

  var m2sD = document.getElementById("m2-start-d"),
    m2sM = document.getElementById("m2-start-m"),
    m2sY = document.getElementById("m2-start-y");
  var m2eD = document.getElementById("m2-end-d"),
    m2eM = document.getElementById("m2-end-m"),
    m2eY = document.getElementById("m2-end-y");
  var m2wY = document.getElementById("m2-wait-y"),
    m2wM = document.getElementById("m2-wait-m"),
    m2wD = document.getElementById("m2-wait-d");
  var m2rNum = document.getElementById("m2-ratio-num"),
    m2rDen = document.getElementById("m2-ratio-den");
  var btnMod2 = document.getElementById("mod2-btn-calc");

  var tcEmptyState = document.getElementById("tc-empty-state");
  var mod2EmptyState = document.getElementById("mod2-empty-state");
  var resDiv1 = document.getElementById("tc-result");
  var resDiv2 = document.getElementById("mod2-result");

  var btnClear = document.getElementById("tc-btn-clear"),
    historyList = document.getElementById("tc-history-list");

  var tcHistory = [];
  try {
    var stored = localStorage.getItem("nothing_tc_history");
    if (stored) tcHistory = JSON.parse(stored);
  } catch (e) {
    tcHistory = [];
  }
  var saveHistory = function () {
    localStorage.setItem("nothing_tc_history", JSON.stringify(tcHistory));
  };

  var renderHistory = function () {
    historyList.innerHTML = "";
    if (tcHistory.length === 0) {
      historyList.innerHTML =
        '<div class="text-[11px] text-slate-400 italic text-center py-4">Chưa có lịch sử tính toán nào.</div>';
      return;
    }
    for (var i = 0; i < tcHistory.length; i++) {
      var h = tcHistory[i];
      var colorType = "text-teal-600";
      if (h.typeLabel === "Thực tế (Theo Lịch)") colorType = "text-indigo-600";
      if (h.typeLabel === "Thời Gian Đa Chiều") colorType = "text-orange-600";

      var itemHtml =
        '<div class="tc-history-item bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col gap-1 shadow-sm">';
      itemHtml +=
        '<div class="flex justify-between items-center"><div class="text-[10px] font-bold text-slate-500">' +
        h.dateStart +
        '</div><div class="text-[9px] font-bold ' +
        colorType +
        ' uppercase bg-white px-1.5 py-0.5 rounded border border-slate-200">' +
        h.typeLabel +
        "</div></div>";
      itemHtml +=
        '<div class="text-sm font-black text-slate-700 mt-1">' +
        h.resText1 +
        "</div>";
      itemHtml +=
        '<div class="text-[11px] font-medium text-slate-500">' +
        h.resText4 +
        "</div></div>";
      historyList.innerHTML += itemHtml;
    }
  };

  renderHistory();
  btnClear.onclick = function () {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      tcHistory = [];
      saveHistory();
      renderHistory();
    }
  };

  var updateDays = function (dElem, mElem, yElem) {
    var currentD = parseInt(dElem.value) || new Date().getDate();
    var m = parseInt(mElem.value) || new Date().getMonth() + 1;
    var y = parseInt(yElem.value) || new Date().getFullYear();
    var maxD = new Date(y, m, 0).getDate();
    if (currentD > maxD) currentD = maxD;
    var dOpts = "";
    for (var i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i === currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    dElem.innerHTML = dOpts;
  };

  var mOpts = "";
  for (var i = 1; i <= 12; i++)
    mOpts += '<option value="' + i + '">' + i + "</option>";
  sM.innerHTML = mOpts;
  eM.innerHTML = mOpts;

  var yOpts = "";
  var curY = new Date().getFullYear();
  for (var i = curY - 50; i <= curY + 50; i++)
    yOpts += '<option value="' + i + '">' + i + "</option>";
  sY.innerHTML = yOpts;
  eY.innerHTML = yOpts;

  // Hàm cập nhật ngày riêng cho Khối Đa Chiều (Cho phép rỗng)
  var updateDaysM2Start = function () {
    var currentD = m2sD.value;
    var m = parseInt(m2sM.value);
    var y = parseInt(m2sY.value);
    var dOpts = '<option value=""># Ngày</option>';
    var maxD = !isNaN(m) && !isNaN(y) ? new Date(y, m, 0).getDate() : 31;
    for (var i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i == currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    m2sD.innerHTML = dOpts;
  };
  var mOptsM2S = '<option value=""># Tháng</option>';
  for (var i = 1; i <= 12; i++)
    mOptsM2S += '<option value="' + i + '">' + i + "</option>";
  m2sM.innerHTML = mOptsM2S;
  var yOptsM2S = '<option value=""># Năm</option>';
  for (var i = curY - 50; i <= curY + 50; i++)
    yOptsM2S += '<option value="' + i + '">' + i + "</option>";
  m2sY.innerHTML = yOptsM2S;

  var setupDateListeners = function (d, m, y) {
    m.addEventListener("change", function () {
      updateDays(d, m, y);
    });
    y.addEventListener("change", function () {
      updateDays(d, m, y);
    });
  };
  setupDateListeners(sD, sM, sY);
  setupDateListeners(eD, eM, eY);
  m2sM.addEventListener("change", updateDaysM2Start);
  m2sY.addEventListener("change", updateDaysM2Start);

  var today = new Date();
  sM.value = today.getMonth() + 1;
  sY.value = today.getFullYear();
  updateDays(sD, sM, sY);
  sD.value = today.getDate();
  eM.value = today.getMonth() + 1;
  eY.value = today.getFullYear();
  updateDays(eD, eM, eY);
  eD.value = today.getDate();
  m2sM.value = today.getMonth() + 1;
  m2sY.value = today.getFullYear();
  updateDaysM2Start();
  m2sD.value = today.getDate();

  var updateEndDays = function () {
    var currentD = m2eD.value;
    var m = parseInt(m2eM.value);
    var y = parseInt(m2eY.value);
    var dOpts = '<option value=""># Ngày</option>';
    var maxD = !isNaN(m) && !isNaN(y) ? new Date(y, m, 0).getDate() : 31;
    for (var i = 1; i <= maxD; i++)
      dOpts +=
        '<option value="' +
        i +
        '" ' +
        (i == currentD ? "selected" : "") +
        ">" +
        i +
        "</option>";
    m2eD.innerHTML = dOpts;
  };
  var mOptsE = '<option value=""># Tháng</option>';
  for (var i = 1; i <= 12; i++)
    mOptsE += '<option value="' + i + '">' + i + "</option>";
  m2eM.innerHTML = mOptsE;
  var yOptsE = '<option value=""># Năm</option>';
  for (var i = curY - 50; i <= curY + 50; i++)
    yOptsE += '<option value="' + i + '">' + i + "</option>";
  m2eY.innerHTML = yOptsE;
  updateEndDays();
  m2eM.addEventListener("change", updateEndDays);
  m2eY.addEventListener("change", updateEndDays);

  m2eM.value = today.getMonth() + 1;
  m2eY.value = today.getFullYear();
  updateEndDays();
  m2eD.value = today.getDate();

  // Các tính năng nút XÓA
  document.getElementById("m2-btn-clear-start").onclick = function () {
    m2sD.value = "";
    m2sM.value = "";
    m2sY.value = "";
    updateDaysM2Start();
  };
  document.getElementById("m2-btn-clear-end").onclick = function () {
    m2eD.value = "";
    m2eM.value = "";
    m2eY.value = "";
    updateEndDays();
  };
  document.getElementById("m2-btn-clear-wait").onclick = function () {
    m2wY.value = "";
    m2wM.value = "";
    m2wD.value = "";
  };
  document.getElementById("m2-btn-clear-ratio").onclick = function () {
    m2rNum.value = "";
    m2rDen.value = "";
  };

  document.getElementById("mod2-btn-reset").onclick = function () {
    var td = new Date();
    m2sM.value = td.getMonth() + 1;
    m2sY.value = td.getFullYear();
    updateDaysM2Start();
    m2sD.value = td.getDate();
    m2eM.value = td.getMonth() + 1;
    m2eY.value = td.getFullYear();
    updateEndDays();
    m2eD.value = td.getDate();
    m2wY.value = "";
    m2wM.value = "";
    m2wD.value = "";
    m2rNum.value = "";
    m2rDen.value = "";

    resDiv2.classList.add("hidden");
    mod2EmptyState.classList.remove("hidden");
  };

  var ratioBtns = document.querySelectorAll(".m2-quick-ratio");
  for (var k = 0; k < ratioBtns.length; k++) {
    ratioBtns[k].onclick = function () {
      m2rNum.value = this.getAttribute("data-num");
      m2rDen.value = this.getAttribute("data-den");
    };
  }

  var processCalcModule1 = function (isReal) {
    var d1 = parseInt(sD.value),
      m1 = parseInt(sM.value),
      y1 = parseInt(sY.value);
    var d2 = parseInt(eD.value),
      m2 = parseInt(eM.value),
      y2 = parseInt(eY.value);
    var startDate = new Date(y1, m1 - 1, d1),
      endDate = new Date(y2, m2 - 1, d2);
    if (endDate < startDate) {
      alert("Lỗi: Ngày kết thúc phải lớn hơn ngày bắt đầu!");
      return;
    }

    var str1 = "",
      str2 = "",
      str3 = "",
      str4 = "",
      typeLabel = "";
    if (!isReal) {
      typeLabel = "Công thức (30đ/tháng)";
      var yearRes = 0,
        monthRes = 0,
        dayRes = 0,
        tempD2 = d2,
        tempM2 = m2,
        tempY2 = y2;
      if (tempD2 >= d1) {
        dayRes = tempD2 - d1;
      } else {
        dayRes = tempD2 + 30 - d1;
        tempM2 = tempM2 - 1;
      }
      if (tempM2 >= m1) {
        monthRes = tempM2 - m1;
      } else {
        monthRes = tempM2 + 12 - m1;
        tempY2 = tempY2 - 1;
      }
      yearRes = tempY2 - y1;
      str1 = yearRes + " năm " + monthRes + " tháng " + dayRes + " ngày";
      var totalMonths = yearRes * 12 + monthRes;
      str2 =
        Math.floor(totalMonths / 3) +
        " quý " +
        ((totalMonths % 3) * 30 + dayRes) +
        " ngày";
      str3 = totalMonths + " tháng " + dayRes + " ngày";
      str4 = yearRes * 360 + monthRes * 30 + dayRes + " ngày";
    } else {
      typeLabel = "Thực tế (Theo Lịch)";
      var totalDaysReal = Math.round(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      var totalMonthsReal = (y2 - y1) * 12 + (m2 - m1);
      if (d2 < d1) totalMonthsReal--;
      var yearResReal = Math.floor(totalMonthsReal / 12),
        monthResReal = totalMonthsReal % 12;
      var tempDate = new Date(y1, m1 - 1, d1);
      var originalDay = tempDate.getDate();
      tempDate.setMonth(tempDate.getMonth() + totalMonthsReal);
      if (tempDate.getDate() !== originalDay) {
        tempDate.setDate(0);
      }
      var dayResReal = Math.round(
        (endDate.getTime() - tempDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      str1 =
        yearResReal + " năm " + monthResReal + " tháng " + dayResReal + " ngày";
      str2 =
        Math.floor(totalMonthsReal / 3) +
        " quý " +
        (totalMonthsReal % 3) +
        " tháng " +
        dayResReal +
        " ngày";
      str3 = totalMonthsReal + " tháng " + dayResReal + " ngày";
      str4 = totalDaysReal + " ngày";
    }

    document.getElementById("tc-res-1").innerText = str1;
    document.getElementById("tc-res-2").innerText = str2;
    document.getElementById("tc-res-3").innerText = str3;
    document.getElementById("tc-res-4").innerText = str4;
    document.getElementById("tc-res-type").innerText = typeLabel;

    tcEmptyState.classList.add("hidden");
    resDiv1.classList.remove("hidden");

    var startStr = ("0" + d1).slice(-2) + "/" + ("0" + m1).slice(-2) + "/" + y1;
    var endStr = ("0" + d2).slice(-2) + "/" + ("0" + m2).slice(-2) + "/" + y2;
    var isDup =
      tcHistory.length > 0 &&
      tcHistory[0].dateStart === startStr + " ➔ " + endStr &&
      tcHistory[0].typeLabel === typeLabel;
    if (!isDup) {
      tcHistory.unshift({
        dateStart: startStr + " ➔ " + endStr,
        resText1: str1,
        resText4: "Tổng: " + str4,
        typeLabel: typeLabel,
      });
      if (tcHistory.length > 30) tcHistory.pop();
      saveHistory();
      renderHistory();
    }
  };

  btnConv.onclick = function () {
    processCalcModule1(false);
  };
  btnReal.onclick = function () {
    processCalcModule1(true);
  };

  var getDays360 = function (d1, m1, y1, d2, m2, y2) {
    return (y2 - y1) * 360 + (m2 - m1) * 30 + (d2 - d1);
  };
  var daysToYMD = function (days) {
    return {
      y: Math.floor(days / 360),
      m: Math.floor((days % 360) / 30),
      d: (days % 360) % 30,
    };
  };
  var gcd = function (a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) return a;
    return gcd(b, a % b);
  };

  var makeRow = function (label, value, isHighlight) {
    if (isHighlight) {
      return (
        '<div class="flex flex-col items-center bg-orange-500 p-4 mt-2 rounded-xl border border-orange-600 shadow-md"><span class="text-[10px] font-bold text-orange-100 uppercase tracking-wider mb-1">' +
        label +
        '</span><span class="font-black text-white text-xl md:text-2xl text-center">' +
        value +
        "</span></div>"
      );
    }
    return (
      '<div class="flex flex-col bg-white/70 p-3 rounded-lg border border-orange-100 shadow-sm mt-3"><span class="text-[9px] font-bold text-slate-500 uppercase">' +
      label +
      '</span><span class="font-black text-slate-700 text-sm mt-0.5">' +
      value +
      "</span></div>"
    );
  };

  btnMod2.onclick = function () {
    var sD = parseInt(m2sD.value),
      sM = parseInt(m2sM.value),
      sY = parseInt(m2sY.value);
    if (isNaN(sD) || isNaN(sM) || isNaN(sY)) {
      alert(
        "Lỗi: Vui lòng nhập đầy đủ Ngày Bắt Đầu (Được dùng làm mốc quy chiếu).",
      );
      return;
    }

    var eD = m2eD.value,
      eM = m2eM.value,
      eY = m2eY.value;
    var wYv = parseInt(m2wY.value) || 0,
      wMv = parseInt(m2wM.value) || 0,
      wDv = parseInt(m2wD.value) || 0;
    var rNv = parseInt(m2rNum.value) || 0,
      rDv = parseInt(m2rDen.value) || 0;

    var hasEnd = eD !== "" && eM !== "" && eY !== "";
    var hasWait = m2wY.value !== "" || m2wM.value !== "" || m2wD.value !== "";
    var hasRatio = m2rNum.value !== "" && m2rDen.value !== "";

    var waitDays = wYv * 360 + wMv * 30 + wDv;
    var resPassed = "",
      historyMain = "",
      historySub = "",
      dynamicHtml = "";

    if (hasEnd && !hasWait && !hasRatio) {
      var passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      var p = daysToYMD(passDays);
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml = makeRow("Tổng thời gian quy đổi", resPassed, true);
      historyMain = "Tổng: " + resPassed;
      historySub = "Đã tính khoảng cách";
    } else if (hasWait && hasRatio && !hasEnd) {
      var passDays = Math.floor((waitDays * rNv) / rDv);
      var p = daysToYMD(passDays);
      var temp = new Date(sY + p.y, sM - 1 + p.m, sD + p.d);
      var resEnd =
        ("0" + temp.getDate()).slice(-2) +
        "/" +
        ("0" + (temp.getMonth() + 1)).slice(-2) +
        "/" +
        temp.getFullYear();
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Ngày Đích Đến (Chạm mốc)", resEnd, true) +
        makeRow("Thời gian quy đổi (Cộng thêm)", resPassed, false);
      historyMain = "Đích: " + resEnd;
      historySub = "Cộng thêm: " + resPassed;
    } else if (hasEnd && hasRatio && !hasWait) {
      var passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      var calcWaitDays = Math.floor((passDays * rDv) / rNv);
      var w = daysToYMD(calcWaitDays);
      var p = daysToYMD(passDays);
      var resWait = w.y + " năm " + w.m + " tháng " + w.d + " ngày";
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Tổng thời gian", resWait, true) +
        makeRow("Thời gian đã quy đổi", resPassed, false);
      historyMain = "Tổng: " + resWait;
      historySub = "Đã qua: " + resPassed;
    } else if (hasEnd && hasWait && !hasRatio) {
      var passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }

      var divisor = gcd(passDays, waitDays);
      var simpNum = passDays / divisor;
      var simpDen = waitDays / divisor;
      var p = daysToYMD(passDays);
      var resRatio = simpNum + " / " + simpDen;
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml =
        makeRow("Tỷ lệ đạt được", resRatio, true) +
        makeRow("Thời gian đã quy đổi", resPassed, false);
      historyMain = "Tỷ lệ: " + resRatio;
      historySub = "Đã qua: " + resPassed;
    } else if (hasEnd && hasWait && hasRatio) {
      var passDays = getDays360(
        sD,
        sM,
        sY,
        parseInt(eD),
        parseInt(eM),
        parseInt(eY),
      );
      if (passDays < 0) {
        alert("Ngày đích đến phải lớn hơn ngày bắt đầu!");
        return;
      }
      var p = daysToYMD(passDays);
      resPassed = p.y + " năm " + p.m + " tháng " + p.d + " ngày";

      dynamicHtml = makeRow("Thời gian thực tế đã qua", resPassed, true);
      historyMain = "Đã qua: " + resPassed;
      historySub = "Số liệu đầy đủ";
    } else {
      alert(
        "Vui lòng cung cấp đủ thông tin. VD: (Ngày Bắt Đầu + Đích) HOẶC (2 trong 3 dữ kiện còn lại).",
      );
      return;
    }

    document.getElementById("mod2-dynamic-res").innerHTML = dynamicHtml;

    mod2EmptyState.classList.add("hidden");
    resDiv2.classList.remove("hidden");

    var resStart = ("0" + sD).slice(-2) + "/" + ("0" + sM).slice(-2) + "/" + sY;
    var isDup =
      tcHistory.length > 0 &&
      tcHistory[0].dateStart === "Từ: " + resStart &&
      tcHistory[0].resText1 === historyMain &&
      tcHistory[0].typeLabel === "Thời Gian Đa Chiều";
    if (!isDup) {
      tcHistory.unshift({
        dateStart: "Từ: " + resStart,
        resText1: historyMain,
        resText4: historySub,
        typeLabel: "Thời Gian Đa Chiều",
      });
      if (tcHistory.length > 30) tcHistory.pop();
      saveHistory();
      renderHistory();
    }
  };
}
