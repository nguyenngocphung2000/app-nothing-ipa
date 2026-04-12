export function setupTool() {
  const tabId = "tab-calendar";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML =
    "<style>" +
    "body.dark-mode .cal-grid-sel { background-color: rgba(30, 41, 59, 0.8) !important; color: #f97316 !important; border-color: #334155 !important; }" +
    "</style>" +
    '<div class="text-center mb-6">' +
    '<span class="bg-[#eaf0f6] text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-slate-200">Tra Cứu</span>' +
    '<h2 class="text-3xl font-bold mt-2 text-slate-800">Lịch <span class="text-orange-500">Vạn Niên</span></h2>' +
    '<p class="text-sm text-gray-500 mt-2 italic">Tìm ngày âm dương, đắc đạo thành thánh!</p>' +
    "</div>" +
    '<div id="cal-loading" class="text-center py-10 text-slate-400 font-bold flex flex-col items-center justify-center gap-3"><svg class="animate-spin w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>Đang kết nối dữ liệu Thiên Văn...</div>' +
    // BỌC GIAO DIỆN CHÍNH: Hỗ trợ 2 cột trên màn hình ngang
    '<div id="cal-widget" class="hidden max-w-5xl mx-auto pb-10 px-2 lg:px-4">' +
    '<div class="flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-8">' +
    // ================= CỘT TRÁI (HIỂN THỊ CHI TIẾT & TRA CỨU) =================

    '<div class="w-full max-w-md mx-auto space-y-5">' +
    '<div class="bg-[#e3eaf1] rounded-[2rem] p-6 shadow-sm border border-white relative overflow-hidden">' +
    '<div class="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1" id="res-weekday">THỨ ...</div>' +
    '<div class="flex justify-between items-start">' +
    '<div class="flex-1 pr-2 overflow-hidden">' +
    '<div class="text-6xl md:text-7xl font-black text-slate-800 tracking-tighter leading-none mb-2" id="res-main-d">--</div>' +
    '<div class="text-lg font-bold text-slate-600 mt-2" id="res-main-my">Tháng --, ----</div>' +
    '<div class="mt-4 flex items-center gap-2.5 w-full">' +
    '<div class="shrink-0 bg-slate-200/80 text-slate-500 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-300/50 flex items-center justify-center">Âm Lịch</div>' +
    '<div id="res-sub-date" class="text-[13px] md:text-[14px] font-bold text-slate-600 whitespace-nowrap tracking-tight translate-y-[1px]">--/--/----</div>' +
    "</div></div>" +
    '<div class="text-center pt-2 relative z-10 shrink-0">' +
    '<div class="w-12 h-12 rounded-full bg-orange-400 mx-auto relative overflow-hidden shadow-sm border border-orange-300">' +
    '<div id="moon-shadow" class="absolute inset-0 bg-[#e3eaf1] rounded-full w-full h-full transition-transform duration-500"></div>' +
    "</div>" +
    '<div class="text-[10px] font-bold text-slate-500 mt-2 uppercase" id="res-moon-text">Trăng...</div>' +
    "</div></div></div>" +
    // THẺ THÔNG ĐIỆP NGÀY HÔM NAY NẰM Ở CỘT TRÁI
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col">' +
    '<h3 class="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center gap-2 mb-3 pb-2 border-b border-slate-50"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg> Thông điệp ngày hôm nay</h3>' +
    '<div id="res-quote-text" class="text-[13.5px] text-slate-600 font-medium italic leading-relaxed text-justify">Đang kết nối...</div>' +
    '<div id="res-quote-author" class="text-right text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider"></div>' +
    "</div>" +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">' +
    '<div class="text-center w-full pb-3 border-b border-slate-100">' +
    '<div id="live-clock" class="text-3xl font-black text-slate-700 font-mono tracking-tight">00:00:00</div>' +
    '<div id="live-date" class="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Đang tải...</div>' +
    "</div>" +
    '<div class="flex bg-slate-100 p-1 rounded-xl w-full">' +
    '<button id="cal-mode-solar" class="flex-1 py-1.5 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition">Dương Lịch</button>' +
    '<button id="cal-mode-lunar" class="flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition">Âm Lịch</button>' +
    "</div>" +
    '<div class="flex justify-center items-center gap-2 w-full">' +
    '<div class="flex-1"><label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Ngày</label><select id="sel-d" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select></div>' +
    '<span class="text-slate-300 font-black mt-4">/</span>' +
    '<div class="flex-1"><label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Tháng</label><select id="sel-m" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select></div>' +
    '<span class="text-slate-300 font-black mt-4">/</span>' +
    '<div class="flex-1"><label class="text-[9px] font-bold text-slate-400 uppercase mb-1 block text-center">Năm</label><select id="sel-y" style="text-align-last: center; direction: ltr;" class="w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-orange-200 appearance-none cursor-pointer"></select></div>' +
    "</div>" +
    '<button id="btn-lookup" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-sm mt-1">' +
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
    'TÌM NGÀY</button>' +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT TRÁI
    // ================= CỘT PHẢI (LỊCH THÁNG & LỄ HỘI) =================
    '<div class="w-full max-w-md mx-auto space-y-5">' +
    '<div class="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100">' +
    '<div class="flex justify-center items-center gap-2 mb-4">' +
    '<span class="text-sm font-bold text-slate-500 uppercase tracking-widest">THÁNG</span>' +
    '<div class="relative">' +
    '<select id="grid-sel-m" class="cal-grid-sel appearance-none bg-slate-50 border border-slate-200 hover:bg-slate-100 text-orange-500 font-black py-1 pl-3 pr-6 rounded-lg outline-none cursor-pointer transition text-sm"></select>' +
    '<span class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-orange-500 pointer-events-none">▼</span>' +
    "</div>" +
    '<span class="text-sm font-bold text-slate-500 uppercase tracking-widest">-</span>' +
    '<div class="relative">' +
    '<select id="grid-sel-y" class="cal-grid-sel appearance-none bg-slate-50 border border-slate-200 hover:bg-slate-100 text-orange-500 font-black py-1 pl-3 pr-6 rounded-lg outline-none cursor-pointer transition text-sm"></select>' +
    '<span class="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-orange-500 pointer-events-none">▼</span>' +
    "</div>" +
    "</div>" +
    '<div class="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-slate-100">' +
    '<div class="text-[10px] font-bold text-slate-400">T2</div><div class="text-[10px] font-bold text-slate-400">T3</div><div class="text-[10px] font-bold text-slate-400">T4</div><div class="text-[10px] font-bold text-slate-400">T5</div><div class="text-[10px] font-bold text-slate-400">T6</div><div class="text-[10px] font-bold text-orange-400">T7</div><div class="text-[10px] font-bold text-orange-500">CN</div>' +
    "</div>" +
    '<div id="cal-grid" class="grid grid-cols-7 gap-1 text-center"></div>' +
    "</div>" +
    '<div class="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">' +
    '<h3 class="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-3 pb-2 border-b border-slate-50"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> Sự Kiện & Lễ Hội Việt Nam</h3>' +
    '<div id="res-events" class="space-y-2 mt-2"></div>' +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT PHẢI
    "</div></div>"; // KẾT THÚC FLEX & WIDGET WRAPPER

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // LOGIC CHUYỂN ĐỔI SANG MODULE
  // ==========================================
  var loading = document.getElementById("cal-loading");
  var widget = document.getElementById("cal-widget");

  var clockEl = document.getElementById("live-clock");
  var dateEl = document.getElementById("live-date");
  var wdNames = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];

  setInterval(function () {
    var now = new Date();
    var h = ("0" + now.getHours()).slice(-2);
    var m = ("0" + now.getMinutes()).slice(-2);
    var s = ("0" + now.getSeconds()).slice(-2);
    var d = ("0" + now.getDate()).slice(-2);
    var mo = ("0" + (now.getMonth() + 1)).slice(-2);
    var y = now.getFullYear();

    clockEl.innerText = h + ":" + m + ":" + s;
    dateEl.innerText = wdNames[now.getDay()] + ", " + d + "/" + mo + "/" + y;
  }, 1000);

  var evSolar = {
    "01/01": ["Tết Dương Lịch"],
    "09/01": ["Ngày Học sinh, Sinh viên Việt Nam (1950)"],
    "03/02": ["Thành lập Đảng Cộng sản Việt Nam (1930)"],
    "09/02": ["Ngày sinh Tổng Bí thư Trường Chinh (1907)"],
    "14/02": ["Lễ Tình nhân (Valentine Đỏ)"],
    "27/02": ["Ngày Thầy thuốc Việt Nam (1955)"],
    "01/03": ["Ngày sinh Thủ tướng Phạm Văn Đồng (1906)"],
    "08/03": ["Ngày Quốc tế Phụ nữ"],
    "14/03": ["Valentine Trắng (White Valentine)"],
    "20/03": ["Ngày Quốc tế Hạnh phúc"],
    "24/03": ["Ngày truyền thống Bộ đội Biên phòng (1959)"],
    "26/03": ["Thành lập Đoàn TNCS Hồ Chí Minh (1931)"],
    "30/03": ["Ngày mất Chủ tịch Tôn Đức Thắng (1980)"],
    "01/04": ["Ngày Cá tháng Tư"],
    "07/04": ["Ngày sinh Tổng Bí thư Lê Duẩn (1907)"],
    "14/04": [
      "Valentine Đen (Black Valentine)",
      "Ngày sinh Tổng Bí thư Nguyễn Phú Trọng (1944)",
    ],
    "21/04": ["Ngày Sách và Văn hóa đọc Việt Nam (2014)"],
    "22/04": ["Ngày Trái Đất"],
    "27/04": ["Ngày mất Tổng Bí thư Nguyễn Văn Linh (1998)"],
    "29/04": ["Ngày mất Thủ tướng Phạm Văn Đồng (2000)"],
    "30/04": ["Ngày Giải phóng Miền Nam (1975)"],
    "01/05": ["Quốc tế Lao động", "Ngày sinh TBT Trần Phú (1904)"],
    "07/05": ["Chiến thắng Điện Biên Phủ (1954)"],
    "15/05": ["Thành lập Đội TNTP Hồ Chí Minh (1941)"],
    "19/05": ["Ngày sinh Chủ tịch Hồ Chí Minh (1890)"],
    "01/06": ["Quốc tế Thiếu nhi"],
    "05/06": ["Ngày Môi trường Thế giới"],
    "11/06": ["Ngày mất Thủ tướng Võ Văn Kiệt (2008)"],
    "14/06": ["Ngày Thế giới tôn vinh người hiến máu"],
    "21/06": ["Ngày Báo chí Cách mạng Việt Nam (1925)"],
    "28/06": ["Ngày Gia đình Việt Nam"],
    "01/07": ["Ngày sinh Tổng Bí thư Nguyễn Văn Linh (1915)"],
    "10/07": ["Ngày mất Tổng Bí thư Lê Duẩn (1986)"],
    "11/07": ["Ngày Dân số Thế giới"],
    "19/07": ["Ngày mất Tổng Bí thư Nguyễn Phú Trọng (2024)"],
    "27/07": ["Ngày Thương binh - Liệt sĩ (1947)"],
    "28/07": ["Ngày thành lập Công đoàn Việt Nam (1929)"],
    "12/08": ["Ngày Quốc tế Thanh niên"],
    "19/08": [
      "Cách mạng tháng Tám (1945)",
      "Thành lập Công an Nhân dân (1945)",
    ],
    "20/08": ["Ngày sinh Chủ tịch Tôn Đức Thắng (1888)"],
    "25/08": ["Ngày sinh Đại tướng Võ Nguyên Giáp (1911)"],
    "02/09": [
      "Quốc khánh Việt Nam (1945)",
      "Ngày mất Chủ tịch Hồ Chí Minh (1969)",
    ],
    "06/09": [
      "Ngày sinh TBT Lê Hồng Phong (1902)",
      "Ngày mất TBT Trần Phú (1931)",
    ],
    "30/09": ["Ngày mất Tổng Bí thư Trường Chinh (1988)"],
    "01/10": ["Ngày Quốc tế Người cao tuổi"],
    "04/10": ["Ngày mất Đại tướng Võ Nguyên Giáp (2013)"],
    "10/10": ["Ngày Giải phóng Thủ đô (1954)"],
    "13/10": ["Ngày Doanh nhân Việt Nam (2004)"],
    "14/10": ["Ngày thành lập Hội Nông dân Việt Nam (1930)"],
    "15/10": ["Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (1956)"],
    "20/10": ["Thành lập Hội LHPN Việt Nam (1930)"],
    "31/10": ["Lễ hội Halloween"],
    "09/11": ["Ngày Pháp luật Việt Nam (2013)"],
    "18/11": [
      "Ngày truyền thống MTTQ Việt Nam (1930)",
      "Ngày Đại đoàn kết toàn dân tộc",
    ],
    "19/11": ["Ngày Quốc tế Nam giới"],
    "20/11": ["Ngày Nhà giáo Việt Nam (1982)"],
    "23/11": [
      "Ngày sinh TT Võ Văn Kiệt (1922)",
      "Ngày Khởi nghĩa Nam Kỳ (1940)",
    ],
    "19/12": ["Ngày Toàn quốc kháng chiến (1946)"],
    "22/12": ["Thành lập Quân đội Nhân dân Việt Nam (1944)"],
    "24/12": ["Đêm Giáng sinh"],
    "25/12": ["Lễ Giáng sinh (Noel)"],
    "31/12": ["Đêm Giao Thừa Dương lịch"],
  };

  var evLunar = {
    "01/01": ["Tết Nguyên Đán (Mùng 1)"],
    "02/01": ["Mùng 2 Tết"],
    "03/01": ["Mùng 3 Tết"],
    "15/01": ["Tết Nguyên Tiêu (Rằm tháng Giêng)"],
    "03/03": ["Tết Hàn Thực"],
    "10/03": ["Giỗ Tổ Hùng Vương"],
    "15/04": ["Lễ Phật Đản"],
    "05/05": ["Tết Đoan Ngọ"],
    "07/07": ["Lễ Thất Tịch"],
    "15/07": ["Lễ Vu Lan (Rằm tháng Bảy)"],
    "15/08": ["Tết Trung Thu"],
    "09/09": ["Tết Trùng Cửu"],
    "10/10": ["Tết Trùng Thập"],
    "15/10": ["Tết Hạ Nguyên (Rằm tháng Mười)"],
    "23/12": ["Đưa Ông Táo về trời"],
    "29/12": ["Lễ Giao Thừa (Tháng thiếu)"],
    "30/12": ["Lễ Giao Thừa"],
  };

  var initTool = function () {
    loading.classList.add("hidden");
    widget.classList.remove("hidden");

    var btnS = document.getElementById("cal-mode-solar");
    var btnL = document.getElementById("cal-mode-lunar");
    var selD = document.getElementById("sel-d");
    var selM = document.getElementById("sel-m");
    var selY = document.getElementById("sel-y");

    var gridSelM = document.getElementById("grid-sel-m");
    var gridSelY = document.getElementById("grid-sel-y");

    var isSolarMode = true;

    var updateDays = function () {
      var currentD = parseInt(selD.value) || new Date().getDate();
      var m = parseInt(selM.value) || new Date().getMonth() + 1;
      var y = parseInt(selY.value) || new Date().getFullYear();

      var maxD = isSolarMode ? new Date(y, m, 0).getDate() : 30;
      if (currentD > maxD) currentD = maxD;

      var dOpts = "";
      for (var i = 1; i <= maxD; i++) {
        dOpts +=
          '<option value="' +
          i +
          '" ' +
          (i === currentD ? "selected" : "") +
          ">" +
          i +
          "</option>";
      }
      selD.innerHTML = dOpts;
    };

    var mOpts = "";
    for (var i = 1; i <= 12; i++) {
      var optStr = '<option value="' + i + '">' + i + "</option>";
      mOpts += optStr;
    }
    selM.innerHTML = mOpts;
    gridSelM.innerHTML = mOpts;

    var yOpts = "";
    var curY = new Date().getFullYear();
    for (var i = curY - 100; i <= curY + 50; i++) {
      var optStr = '<option value="' + i + '">' + i + "</option>";
      yOpts += optStr;
    }
    selY.innerHTML = yOpts;
    gridSelY.innerHTML = yOpts;

    selM.addEventListener("change", updateDays);
    selY.addEventListener("change", updateDays);

    var handleGridSelectChange = function () {
      document.getElementById("cal-mode-solar").click();
      selM.value = gridSelM.value;
      selY.value = gridSelY.value;
      selD.value = 1;
      updateDays();
      document.getElementById("btn-lookup").click();
    };
    gridSelM.addEventListener("change", handleGridSelectChange);
    gridSelY.addEventListener("change", handleGridSelectChange);

    selM.value = new Date().getMonth() + 1;
    selY.value = curY;
    updateDays();
    selD.value = new Date().getDate();

    // HIỂN THỊ THÔNG ĐIỆP
    var renderQuote = function () {
      if (window.quotesData && window.quotesData.length > 0) {
        var q =
          window.quotesData[
            Math.floor(Math.random() * window.quotesData.length)
          ];
        document.getElementById("res-quote-text").innerText =
          "“" + q.quote + "”";
        document.getElementById("res-quote-author").innerText = "- " + q.author;
      }
    };

    // TẢI DỮ LIỆU THÔNG ĐIỆP (Lưu cache để dùng lại)
    if (!window.quotesParsed) {
      fetch("data/sent-to-you.json")
        .then(function (res) {
          return res.json();
        })
        .then(function (data) {
          window.quotesData = data;
          window.quotesParsed = true;
          renderQuote();
        })
        .catch(function (e) {
          window.quotesData = [
            {
              quote:
                "Đừng cảm thấy tiếc vì bụi hoa hồng có gai, mà hãy vui vì trong bụi gai có hoa hồng.",
              author: "Abraham Lincoln",
            },
          ];
          window.quotesParsed = true;
          renderQuote();
        });
    }

    btnL.onclick = function () {
      if (!isSolarMode) return;
      var d = parseInt(selD.value),
        m = parseInt(selM.value),
        y = parseInt(selY.value);
      try {
        var solar = Solar.fromYmd(y, m, d);
        var lunar = solar.getLunar();
        isSolarMode = false;
        selY.value = lunar.getYear();
        selM.value = Math.abs(lunar.getMonth());
        updateDays();
        selD.value = lunar.getDay();
      } catch (e) {}

      btnL.className =
        "flex-1 py-1.5 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition";
      btnS.className =
        "flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition";
      document.getElementById("btn-lookup").click();
    };

    btnS.onclick = function () {
      if (isSolarMode) return;
      var d = parseInt(selD.value),
        m = parseInt(selM.value),
        y = parseInt(selY.value);
      try {
        var lunar = Lunar.fromYmd(y, m, d);
        var solar = lunar.getSolar();
        isSolarMode = true;
        selY.value = solar.getYear();
        selM.value = solar.getMonth();
        updateDays();
        selD.value = solar.getDay();
      } catch (e) {}

      btnS.className =
        "flex-1 py-1.5 rounded-lg text-sm font-bold bg-white text-orange-500 shadow-sm transition";
      btnL.className =
        "flex-1 py-1.5 rounded-lg text-sm font-bold text-slate-500 hover:text-orange-500 transition";
      document.getElementById("btn-lookup").click();
    };

    var CAN = [
      "Giáp",
      "Ất",
      "Bính",
      "Đinh",
      "Mậu",
      "Kỷ",
      "Canh",
      "Tân",
      "Nhâm",
      "Quý",
    ];
    var CHI = [
      "Tý",
      "Sửu",
      "Dần",
      "Mão",
      "Thìn",
      "Tỵ",
      "Ngọ",
      "Mùi",
      "Thân",
      "Dậu",
      "Tuất",
      "Hợi",
    ];

    var getEventsForDate = function (sDay, sMonth, lDay, lMonth) {
      var sKey = ("0" + sDay).slice(-2) + "/" + ("0" + sMonth).slice(-2);
      var lKey = ("0" + lDay).slice(-2) + "/" + ("0" + lMonth).slice(-2);
      var events = [];
      if (evSolar[sKey]) events = events.concat(evSolar[sKey]);
      if (evLunar[lKey])
        events = events.concat(
          evLunar[lKey].map(function (e) {
            return e + " (Âm lịch)";
          }),
        );
      return events;
    };

    var renderMonthGrid = function (targetSolar) {
      var y = targetSolar.getYear();
      var m = targetSolar.getMonth();
      var d = targetSolar.getDay();

      gridSelM.value = m;
      gridSelY.value = y;

      var firstDay = Solar.fromYmd(y, m, 1);
      var startWeekDay = firstDay.getWeek();
      var offset = startWeekDay === 0 ? 6 : startWeekDay - 1;

      var daysInMonth = new Date(y, m, 0).getDate();

      var gridHtml = "";
      for (var i = 0; i < offset; i++) {
        gridHtml += "<div></div>";
      }

      for (var i = 1; i <= daysInMonth; i++) {
        var s = Solar.fromYmd(y, m, i);
        var l = s.getLunar();
        var lDay = l.getDay();
        var lMonth = Math.abs(l.getMonth());

        var lText = lDay === 1 ? lDay + "/" + lMonth : lDay;
        var isSelected = i === d;
        var isWeekend = s.getWeek() === 0 || s.getWeek() === 6;

        var bgClass = isSelected
          ? "bg-orange-100 border border-orange-200 shadow-sm"
          : "border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800";
        var sColor = isWeekend ? "text-orange-500" : "text-slate-700";
        if (isSelected) sColor = "text-orange-600";

        var dayEvents = getEventsForDate(i, m, lDay, lMonth);
        var dotHtml = '<div class="h-1.5 mt-0.5 flex gap-0.5 justify-center">';
        if (dayEvents.length > 0) {
          var maxDots = Math.min(dayEvents.length, 3);
          for (var dt = 0; dt < maxDots; dt++) {
            dotHtml +=
              '<div class="w-1.5 h-1.5 bg-red-500 rounded-full shadow-sm"></div>';
          }
        }
        dotHtml += "</div>";

        gridHtml +=
          '<div class="cal-cell flex flex-col items-center justify-center py-1.5 rounded-xl cursor-pointer transition min-h-[52px] ' +
          bgClass +
          '" data-d="' +
          i +
          '" data-m="' +
          m +
          '" data-y="' +
          y +
          '">';
        gridHtml +=
          '<span class="text-[15px] font-bold ' + sColor + '">' + i + "</span>";
        gridHtml +=
          '<span class="text-[9px] text-slate-400">' + lText + "</span>";
        gridHtml += dotHtml;
        gridHtml += "</div>";
      }
      document.getElementById("cal-grid").innerHTML = gridHtml;
    };

    var renderWidget = function (solar, lunar) {
      var sDayStr = ("0" + solar.getDay()).slice(-2);
      var sMonthStr = ("0" + solar.getMonth()).slice(-2);
      var sYear = solar.getYear();

      var lDayStr = ("0" + lunar.getDay()).slice(-2);
      var lMonthAbs = Math.abs(lunar.getMonth());
      var lMonthStr = ("0" + lMonthAbs).slice(-2);

      var lYearText =
        CAN[lunar.getYearGanIndex()] + " " + CHI[lunar.getYearZhiIndex()];
      if (lunar.getMonth() < 0) lYearText += " (Nhuận)";

      document.getElementById("res-weekday").innerText =
        wdNames[solar.getWeek()];
      document.getElementById("res-main-d").innerText = solar.getDay();
      document.getElementById("res-main-my").innerText =
        "Tháng " + solar.getMonth() + ", " + sYear;
      document.getElementById("res-sub-date").innerText =
        lDayStr + "/" + lMonthStr + "/" + solar.getYear() + " " + lYearText;

      var phaseText = "Trăng khuyết";
      var shadowTranslate = "100%";

      if (lunar.getDay() === 1 || lunar.getDay() >= 29) {
        phaseText = "Trăng non";
        shadowTranslate = "0%";
      } else if (lunar.getDay() > 1 && lunar.getDay() < 15) {
        phaseText = "Thượng huyền";
        shadowTranslate = (lunar.getDay() / 15) * 100 + "%";
      } else if (lunar.getDay() === 15 || lunar.getDay() === 16) {
        phaseText = "Trăng tròn";
        shadowTranslate = "100%";
      } else if (lunar.getDay() > 16 && lunar.getDay() < 29) {
        phaseText = "Hạ huyền";
        shadowTranslate = "-" + ((lunar.getDay() - 15) / 15) * 100 + "%";
      }

      document.getElementById("res-moon-text").innerText = phaseText;
      document.getElementById("moon-shadow").style.transform =
        "translateX(" + shadowTranslate + ")";

      renderMonthGrid(solar);

      var evContainer = document.getElementById("res-events");
      evContainer.innerHTML = "";

      var todaysEvents = getEventsForDate(
        solar.getDay(),
        solar.getMonth(),
        lunar.getDay(),
        Math.abs(lunar.getMonth()),
      );

      if (todaysEvents.length === 0) {
        evContainer.innerHTML =
          '<div class="text-xs text-slate-400 italic">Không có dấu ấn lịch sử nào vào ngày này.</div>';
      } else {
        todaysEvents.forEach(function (e) {
          evContainer.innerHTML +=
            '<div class="bg-slate-50 p-3 rounded-xl flex gap-3 items-start border border-slate-100 shadow-sm"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500 mt-1 shrink-0"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg><span class="font-bold text-slate-700 text-xs leading-relaxed">' +
            e +
            "</span></div>";
        });
      }
    };

    document.getElementById("cal-grid").addEventListener("click", function (e) {
      var cell = e.target.closest(".cal-cell");
      if (cell) {
        var d = cell.getAttribute("data-d");
        var m = cell.getAttribute("data-m");
        var y = cell.getAttribute("data-y");

        document.getElementById("cal-mode-solar").click();
        selD.value = d;
        selM.value = m;
        selY.value = y;
        document.getElementById("btn-lookup").click();
      }
    });

    document.getElementById("btn-lookup").onclick = function () {
      var d = parseInt(selD.value),
        m = parseInt(selM.value),
        y = parseInt(selY.value);
      try {
        if (isSolarMode) {
          var solar = Solar.fromYmd(y, m, d);
          var lunar = solar.getLunar();
          renderWidget(solar, lunar);
        } else {
          var lunar;
          try {
            lunar = Lunar.fromYmd(y, m, d);
          } catch (e) {
            lunar = Lunar.fromYmd(y, m, d - 1);
            selD.value = d - 1;
          }
          var solar = lunar.getSolar();
          renderWidget(solar, lunar);
        }
        if (window.quotesParsed) renderQuote(); // Đổi thông điệp mỗi lần tra cứu
      } catch (e) {}
    };

    setTimeout(function () {
      document.getElementById("btn-lookup").click();
    }, 200);
  };

  if (typeof Solar !== "undefined" && typeof Lunar !== "undefined") {
    initTool();
  } else {
    var script = document.createElement("script");
    script.src = "https://unpkg.com/lunar-javascript/lunar.js";
    script.onload = function () {
      initTool();
    };
    script.onerror = function () {
      loading.innerHTML =
        '<span class="text-red-500">Lỗi mạng! Không tải được thư viện tính lịch.</span>';
    };
    document.head.appendChild(script);
  }
}
