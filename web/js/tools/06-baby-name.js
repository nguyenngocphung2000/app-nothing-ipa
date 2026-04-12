export function setupTool() {
  const tabId = "tab-baby-name";
  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";
  panel.innerHTML =
    "<style>" +
    "body.dark-mode .bn-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } " +
    "body.dark-mode .bn-input { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; } " +
    "body.dark-mode .bn-name-nam { background-color: rgba(30, 58, 138, 0.4) !important; border-color: rgba(59, 130, 246, 0.3) !important; color: #bfdbfe !important; } " +
    "body.dark-mode .bn-name-nu { background-color: rgba(131, 24, 67, 0.4) !important; border-color: rgba(236, 72, 153, 0.3) !important; color: #fbcfe8 !important; } " +
    "body.dark-mode .filter-card { background-color: rgba(30, 41, 59, 0.6) !important; border-color: rgba(99, 102, 241, 0.2) !important; }" +
    "</style>" +
    '<div class="text-center mb-8">' +
    '<span class="bg-pink-100 text-pink-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-pink-200">Kho dữ liệu vô tận</span>' +
    '<h2 class="text-3xl font-bold mt-2 text-slate-800">Đặt Tên Cho <span class="text-pink-500">Bé Yêu</span></h2>' +
    '<p class="text-[11px] text-slate-500 italic mt-2 max-w-2xl mx-auto px-4">Đề xuất tên theo thuật toán ngẫu nhiên hoặc xử lý danh sách tên có sẵn.</p>' +
    "</div>" +
    // BỌC GIAO DIỆN 3 CỘT TRÀN VIỀN
    '<div class="w-full max-w-[1600px] mx-auto pb-10 px-4 lg:px-8 xl:px-12">' +
    '<div class="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6 lg:gap-8">' +
    // ================= CỘT 1: BỘ LỌC TÙY CHỈNH =================
    '<div class="w-full h-full flex flex-col">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col bn-card">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Bộ lọc tùy chỉnh</h3></div>' +
    // Khung nhập liệu (Cố định ở trên)
    '<div class="mt-4 space-y-4 shrink-0">' +
    '<div class="flex gap-3">' +
    '<div class="flex-1">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Giới tính</label>' +
    '<select id="bn-gender" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
    '<option value="all">Tất cả</option>' +
    '<option value="nam">Nam</option>' +
    '<option value="nu">Nữ</option>' +
    "</select>" +
    "</div>" +
    '<div class="flex-1">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Số lượng</label>' +
    '<input id="bn-count" type="number" placeholder="Mặc định: 100" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200">' +
    "</div>" +
    "</div>" +
    "<div>" +
    '<label class="text-[10px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Độ dài tên</label>' +
    '<select id="bn-length" style="text-align-last: center;" class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 py-3 outline-none focus:ring-2 ring-pink-200 cursor-pointer">' +
    '<option value="all">Ngẫu nhiên</option>' +
    '<option value="2">2 Chữ</option>' +
    '<option value="3">3 Chữ</option>' +
    '<option value="4">4 Chữ</option>' +
    '<option value="5">5 Chữ</option>' +
    "</select>" +
    "</div>" +
    '<div class="flex gap-2">' +
    '<div class="w-1/3">' +
    '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Họ</label>' +
    '<input id="bn-ho" type="text" placeholder="Nguyễn..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
    "</div>" +
    '<div class="w-1/3">' +
    '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Chữ lót</label>' +
    '<input id="bn-dem" type="text" placeholder="Thị, Văn..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
    "</div>" +
    '<div class="w-1/3">' +
    '<label class="text-[9px] font-bold text-slate-400 uppercase mb-1.5 block ml-1 text-center">Tên chính</label>' +
    '<input id="bn-ten" type="text" placeholder="Tâm..." class="bn-input w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 text-center font-bold text-slate-700 outline-none focus:ring-2 ring-pink-200">' +
    "</div>" +
    "</div>" +
    // Nút Đề Xuất Tên ngay dưới form nhập liệu
    '<button id="bn-btn-gen" class="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-4 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center text-[13px] uppercase tracking-wide mt-2">' +
    "ĐỀ XUẤT TÊN" +
    "</button>" +
    "</div>" +
    // Mẹo đặt tên (Sử dụng flex-1 để lấp đầy khoảng trống, cân bằng với cột 3)
    '<div class="mt-6 flex-1 bg-pink-50/50 rounded-2xl p-4 border border-pink-100/50 flex flex-col min-h-[150px]">' +
    '<h4 class="text-[11px] font-bold text-pink-600 uppercase mb-3 text-center md:text-left">Mẹo Đặt Tên Hay & Ý Nghĩa</h4>' +
    '<div class="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 text-[11.5px] text-slate-600 leading-relaxed">' +
    '<p><strong class="text-slate-700">1. Quy luật Âm - Dương:</strong> Một cái tên hài hòa nên có sự kết hợp đan xen giữa thanh bằng (ngang, huyền) và thanh trắc (sắc, hỏi, ngã, nặng) để tạo ra nhịp điệu dễ đọc, dễ nghe.</p>' +
    '<p><strong class="text-slate-700">2. Độ dài lý tưởng:</strong> Tên có 3 hoặc 4 chữ thường cân đối nhất. Việc ghép Họ Cha và Họ Mẹ (ví dụ: Nguyễn Trần...) đang là xu hướng hiện đại, mang ý nghĩa trọn vẹn của gia đình.</p>' +
    '<p><strong class="text-slate-700">3. Cẩn trọng từ đồng âm:</strong> Hãy đọc lướt nhanh hoặc thử nói lái tên dự định đặt để tránh trường hợp tên bị biến tấu thành những ý nghĩa không mong muốn.</p>' +
    '<p><strong class="text-slate-700">4. Phát huy tối đa bộ lọc:</strong> Hãy mạnh dạn bỏ trống các ô bạn chưa nghĩ ra ý tưởng. Thuật toán của chúng tôi sẽ tự động phân tích và lấp đầy bằng những chữ lót, tên chính hay nhất từ kho dữ liệu.</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 1
    // ================= CỘT 2: DANH SÁCH TÊN GỢI Ý =================
    '<div class="w-full h-full flex flex-col min-h-0">' +
    '<div id="bn-result" class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-pink-100 h-full flex flex-col bn-card min-h-[400px] lg:min-h-0">' +
    '<div class="flex justify-between items-center border-b border-pink-200/50 pb-3 shrink-0">' +
    '<h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Danh sách tên gợi ý</h3>' +
    '<button id="bn-btn-copy-gen" class="text-[10px] bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 px-4 py-1.5 rounded-lg font-bold shadow-sm transition uppercase tracking-wider">COPY</button>' +
    "</div>" +
    // Khung chứa list kết quả, tự động tạo thanh cuộn nếu quá dài
    '<div class="relative flex-1 mt-4 min-h-[300px] lg:min-h-0">' +
    '<div id="bn-res-list" class="absolute inset-0 overflow-y-auto custom-scrollbar pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3 content-start">' +
    '<div class="col-span-full text-center text-slate-400 italic py-10 text-[11px]">Chưa có dữ liệu. Hãy bấm "Đề xuất tên"!</div>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 2
    // ================= CỘT 3: TRẠM XỬ LÝ DANH SÁCH =================
    '<div class="w-full h-full flex flex-col">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-indigo-100 h-full flex flex-col filter-card">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Trạm xử lý danh sách</h3></div>' +
    '<div class="mt-3 flex flex-col flex-1 space-y-4">' +
    "<div>" +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<div class="flex items-center gap-2">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase ml-1">Nhập danh sách</label>' +
    '<span class="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">DÒNG: <span id="flt-cnt-in">0</span></span>' +
    "</div>" +
    '<div class="flex gap-1.5">' +
    '<button id="flt-btn-clear-in" class="text-[9px] bg-red-50 border border-red-100 text-red-500 hover:bg-red-100 px-3 py-1 rounded-lg font-bold shadow-sm transition active:scale-95 uppercase tracking-wider">XÓA</button>' +
    '<button id="flt-btn-paste" class="text-[9px] bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 px-3 py-1 rounded-lg font-bold shadow-sm transition active:scale-95 uppercase tracking-wider">DÁN</button>' +
    "</div>" +
    "</div>" +
    '<textarea id="flt-input" class="bn-input w-full h-24 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium text-slate-700 outline-none focus:ring-2 ring-indigo-200 resize-none custom-scrollbar" placeholder="Dán danh sách vào đây để xử lý..."></textarea>' +
    "</div>" +
    '<div class="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-3 bn-input">' +
    '<div class="grid grid-cols-2 gap-3">' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-empty" checked class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Xóa dòng trống</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-space" checked class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Dấu cách chuẩn</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-rem-num" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Bỏ số thứ tự cũ</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-add-num" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Thêm số thứ tự</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-dup" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Lọc trùng lặp</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-accent" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Bỏ dấu Tiếng Việt</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-reverse" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Đảo ngược</label>' +
    '<label class="flex items-center gap-2 text-[11px] font-bold text-slate-600 cursor-pointer"><input type="checkbox" id="chk-shuffle" class="w-4 h-4 text-indigo-500 rounded focus:ring-indigo-500"> Xáo trộn</label>' +
    "</div>" +
    '<div class="grid grid-cols-1 gap-2 border-t border-slate-200 pt-2">' +
    '<select id="sel-case" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-[11px] font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-200 cursor-pointer">' +
    '<option value="none">A/a (Không can thiệp HOA/thường)</option>' +
    '<option value="title" selected>Aa (Viết hoa chữ đầu mỗi từ)</option>' +
    '<option value="lower">aa (Viết thường toàn bộ)</option>' +
    '<option value="upper">AA (Viết HOA toàn bộ)</option>' +
    "</select>" +
    '<select id="sel-sort" class="w-full bg-white border border-slate-200 rounded-lg p-2 text-[11px] font-bold text-slate-700 outline-none focus:ring-2 ring-indigo-200 cursor-pointer">' +
    '<option value="none">Không sắp xếp bảng chữ cái</option>' +
    '<option value="asc">Sắp xếp A-Z</option>' +
    '<option value="desc">Sắp xếp Z-A</option>' +
    "</select>" +
    "</div>" +
    '<div class="flex items-center gap-2 border-t border-slate-200 pt-2">' +
    '<input type="checkbox" id="chk-wc" class="w-4 h-4 text-indigo-500 rounded cursor-pointer focus:ring-indigo-500">' +
    '<span class="text-[11px] font-bold text-slate-600">Lọc theo từ:</span>' +
    '<select id="sel-wc-op" class="bg-white border border-slate-200 rounded p-1 text-[11px] font-bold text-slate-700 outline-none">' +
    '<option value="less">&lt;</option>' +
    '<option value="eq" selected>=</option>' +
    '<option value="greater">&gt;</option>' +
    "</select>" +
    '<input type="number" id="inp-wc-num" value="3" class="w-12 bg-white border border-slate-200 rounded p-1 text-center text-[11px] font-bold text-slate-700 outline-none">' +
    '<span class="text-[11px] font-bold text-slate-500">từ/dòng</span>' +
    "</div>" +
    "</div>" +
    '<div class="w-full shrink-0">' +
    '<button id="flt-btn-process" class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black py-3 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center text-[13px] uppercase tracking-wide">' +
    "XỬ LÝ" +
    "</button>" +
    "</div>" +
    '<div class="flex-1 flex flex-col">' +
    '<div class="flex justify-between items-end mb-1.5">' +
    '<label class="text-[10px] font-bold text-slate-400 uppercase ml-1">Kết quả đầu ra</label>' +
    '<span class="text-[9px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-md border border-green-100">DÒNG: <span id="flt-cnt-out">0</span></span>' +
    "</div>" +
    '<textarea id="flt-output" readonly class="bn-input w-full flex-1 min-h-[80px] bg-indigo-50/50 border border-indigo-100 rounded-xl p-3 text-sm font-bold text-slate-700 outline-none custom-scrollbar" placeholder="Kết quả sẽ hiển thị ở đây..."></textarea>' +
    "</div>" +
    "</div>" +
    '<div class="flex gap-2 shrink-0 mt-4">' +
    '<button id="flt-btn-clear" class="w-1/4 bg-red-50 hover:bg-red-100 text-red-500 font-bold py-3.5 rounded-xl shadow-sm border border-red-100 transition active:scale-95 text-[10px] uppercase text-center flex items-center justify-center tracking-wider">XÓA</button>' +
    '<button id="flt-btn-copy" class="w-2/4 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-3.5 rounded-xl shadow-sm border border-indigo-200 transition active:scale-95 text-[11px] uppercase tracking-wide text-center flex items-center justify-center">COPY KẾT QUẢ</button>' +
    '<button id="flt-btn-down" class="w-1/4 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-md transition active:scale-95 text-[10px] uppercase text-center flex items-center justify-center tracking-wider">TẢI TXT</button>' +
    "</div>" +
    "</div>" +
    "</div>" + // KẾT THÚC CỘT 3
    "</div>" + // KẾT THÚC LƯỚI GRID
    "</div>"; // KẾT THÚC BỌC TRÀN VIỀN

  document.getElementById("app-container").appendChild(panel);

  // --- LOGIC XỬ LÝ DỮ LIỆU TÊN VÀ TRẠM LỌC ---
  var capitalize = function (str) {
    return str
      .trim()
      .replace(/\s+/g, " ")
      .split(" ")
      .map(function (word) {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  var removeAccents = function (str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  var randItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  var isValidSyllable = function (word) {
    var w = word.toLowerCase();
    var vowels =
      "aàáảãạăằắẳẵặâầấẩẫậeèéẻẽẹêềếểễệiìíỉĩịoòóỏõọôồốổỗộơờớởỡợuùúủũụưừứửữựyỳýỷỹỵ";
    var hasVowel = false;
    for (var i = 0; i < w.length; i++) {
      if (vowels.indexOf(w[i]) !== -1) {
        hasVowel = true;
        break;
      }
    }
    if (!hasVowel) return false;

    if (w.length === 1) {
      var validOneChar = [
        "a",
        "á",
        "à",
        "ả",
        "ã",
        "ạ",
        "ý",
        "ỳ",
        "ỷ",
        "ỹ",
        "ỵ",
        "ê",
        "ề",
        "ế",
        "ể",
        "ễ",
        "ệ",
        "ô",
        "ồ",
        "ố",
        "ổ",
        "ỗ",
        "ộ",
      ];
      if (validOneChar.indexOf(w) === -1) return false;
    }
    return true;
  };

  var btnGen = document.getElementById("bn-btn-gen");
  var btnCopyGen = document.getElementById("bn-btn-copy-gen");
  var resList = document.getElementById("bn-res-list");
  var currentResults = [];

  btnCopyGen.onclick = function () {
    if (currentResults.length === 0) {
      alert("Chưa có danh sách tên nào để Copy!");
      return;
    }
    var textToCopy = currentResults.join("\n");
    navigator.clipboard.writeText(textToCopy).then(function () {
      var oldHtml = btnCopyGen.innerHTML;
      btnCopyGen.innerHTML = "ĐÃ COPY";
      btnCopyGen.classList.add(
        "bg-green-100",
        "text-green-600",
        "border-green-200",
      );
      setTimeout(function () {
        btnCopyGen.innerHTML = oldHtml;
        btnCopyGen.classList.remove(
          "bg-green-100",
          "text-green-600",
          "border-green-200",
        );
      }, 2000);
    });
  };

  // ===============================================
  // CẬP NHẬT LOGIC TẢI FILE TỪ GỘP TỪ name.json
  // ===============================================
  btnGen.onclick = async function () {
    if (!window.nameParsed) {
      btnGen.innerHTML = "ĐANG TẢI DỮ LIỆU...";
      try {
        const response = await fetch("data/name.json"); // Sửa đường dẫn sang file gộp
        if (!response.ok) throw new Error("Không thể tải file dữ liệu.");

        const allData = await response.json(); // Phân tích file gộp

        const namDataArr = allData.nam || []; // Lấy mảng nam
        const nuDataArr = allData.nu || []; // Lấy mảng nữ

        window.nameData = {
          nam: { ho: [], demFull: [], demWords: [], ten: [] },
          nu: { ho: [], demFull: [], demWords: [], ten: [] },
        };

        var parsePool = function (arr, gender) {
          arr.forEach(function (n) {
            var cleanName = n.trim().replace(/\s+/g, " ");
            var w = cleanName.split(" ");
            w = w.filter(isValidSyllable);
            if (w.length >= 2) {
              window.nameData[gender].ho.push(w[0]);
              window.nameData[gender].ten.push(w[w.length - 1]);
              if (w.length > 2) {
                var d = w.slice(1, -1);
                window.nameData[gender].demFull.push(d.join(" "));
                d.forEach(function (dw) {
                  window.nameData[gender].demWords.push(dw);
                });
              }
            }
          });
          window.nameData[gender].ho = [...new Set(window.nameData[gender].ho)];
          window.nameData[gender].ten = [
            ...new Set(window.nameData[gender].ten),
          ];
          window.nameData[gender].demFull = [
            ...new Set(window.nameData[gender].demFull),
          ];
          window.nameData[gender].demWords = [
            ...new Set(window.nameData[gender].demWords),
          ];
        };

        parsePool(namDataArr, "nam");
        parsePool(nuDataArr, "nu");
        window.nameParsed = true;
        btnGen.innerHTML = "ĐỀ XUẤT TÊN";
      } catch (error) {
        alert(
          "Lỗi: Không tìm thấy file dữ liệu (data/name.json). Hãy kiểm tra lại cấu trúc thư mục và tên file!",
        );
        btnGen.innerHTML = "ĐỀ XUẤT TÊN";
        return;
      }
    }

    var count = parseInt(document.getElementById("bn-count").value) || 100;
    if (count <= 0 || count > 200) count = 100;
    var gender = document.getElementById("bn-gender").value;
    var lengthOpt = document.getElementById("bn-length").value;

    var inputHo = document.getElementById("bn-ho").value.trim();
    var inputDem = document.getElementById("bn-dem").value.trim();
    var inputTen = document.getElementById("bn-ten").value.trim();

    if (lengthOpt === "2" && inputDem !== "") {
      alert(
        "Tên 2 chữ thì không có Chữ lót nhé! Vui lòng xóa 'Chữ lót' hoặc đổi độ dài thành 3-4-5 chữ.",
      );
      return;
    }

    var resultsMap = new Map();
    var attempts = 0;
    var maxAttempts = count * 100;

    while (resultsMap.size < count && attempts < maxAttempts) {
      attempts++;
      var g = gender === "all" ? (Math.random() < 0.5 ? "nam" : "nu") : gender;
      var data = window.nameData[g];

      var targetL;
      if (lengthOpt === "all") {
        var lengthWeights = [2, 3, 3, 3, 4, 4, 4, 5];
        targetL = randItem(lengthWeights);
      } else {
        targetL = parseInt(lengthOpt);
      }

      var hoStr = inputHo !== "" ? capitalize(inputHo) : randItem(data.ho);
      var demInStr = inputDem !== "" ? capitalize(inputDem) : "";
      var tenStr = inputTen !== "" ? capitalize(inputTen) : randItem(data.ten);

      var c_ho = hoStr.split(" ").length;
      var c_ten = tenStr.split(" ").length;
      var c_dem_in = demInStr === "" ? 0 : demInStr.split(" ").length;

      var needed_dem = targetL - c_ho - c_ten - c_dem_in;
      var dem_final = demInStr;

      if (needed_dem > 0) {
        var addedDem = "";
        var exactDems = data.demFull.filter(function (d) {
          return d.split(" ").length === needed_dem;
        });
        if (exactDems.length > 0 && Math.random() < 0.5) {
          addedDem = randItem(exactDems);
        } else {
          var tempDemArr = [];
          var lastWord = dem_final.split(" ").pop();
          for (var j = 0; j < needed_dem; j++) {
            var w = randItem(data.demWords);
            var localTries = 0;
            while (w === lastWord && localTries < 15) {
              w = randItem(data.demWords);
              localTries++;
            }
            tempDemArr.push(w);
            lastWord = w;
          }
          addedDem = tempDemArr.join(" ");
        }
        dem_final = dem_final === "" ? addedDem : dem_final + " " + addedDem;
      } else if (lengthOpt === "2") {
        dem_final = "";
      }

      var nameParts = [];
      if (hoStr) nameParts.push(hoStr);
      if (dem_final) nameParts.push(dem_final);
      if (tenStr) nameParts.push(tenStr);

      var finalName = nameParts.join(" ").replace(/\s+/g, " ").trim();
      var finalWordCount = finalName.split(" ").length;

      if (lengthOpt !== "all" && finalWordCount !== parseInt(lengthOpt)) {
        if (c_ho + c_dem_in + c_ten < parseInt(lengthOpt)) continue;
      }

      if (!resultsMap.has(finalName)) {
        resultsMap.set(finalName, g);
      }
    }

    var generatedHTML = "";
    currentResults = [];
    resultsMap.forEach(function (g, finalName) {
      currentResults.push(finalName);
      var colorClass =
        g === "nam"
          ? "bn-name-nam bg-blue-50 text-blue-800 border-blue-200"
          : "bn-name-nu bg-pink-50 text-pink-800 border-pink-200";
      generatedHTML +=
        '<div class="p-3.5 rounded-xl border shadow-sm text-center ' +
        colorClass +
        '">';
      generatedHTML +=
        '<span class="font-bold text-[15px]">' + finalName + "</span>";
      generatedHTML += "</div>";
    });

    if (resultsMap.size === 0) {
      generatedHTML =
        '<div class="col-span-1 sm:col-span-2 text-center text-slate-500 italic py-4 text-[11px]">Không tìm thấy tổ hợp tên nào phù hợp!</div>';
    }

    resList.innerHTML = generatedHTML;
  };

  var inputArea = document.getElementById("flt-input");
  inputArea.addEventListener("input", function () {
    var lines = inputArea.value.split("\n");
    document.getElementById("flt-cnt-in").innerText =
      inputArea.value === "" ? 0 : lines.length;
  });

  var btnPaste = document.getElementById("flt-btn-paste");
  if (btnPaste) {
    btnPaste.onclick = function () {
      navigator.clipboard
        .readText()
        .then(function (clipText) {
          if (clipText) {
            inputArea.value = clipText;
            inputArea.dispatchEvent(new Event("input"));

            var oldHtml = btnPaste.innerHTML;
            btnPaste.innerHTML = "ĐÃ DÁN";
            setTimeout(function () {
              btnPaste.innerHTML = oldHtml;
            }, 2000);
          }
        })
        .catch(function (err) {
          alert(
            "Trình duyệt chặn quyền truy cập Clipboard hoặc không hỗ trợ tự động dán!",
          );
        });
    };
  }

  var btnClearIn = document.getElementById("flt-btn-clear-in");
  if (btnClearIn) {
    btnClearIn.onclick = function () {
      inputArea.value = "";
      document.getElementById("flt-cnt-in").innerText = "0";
    };
  }

  document.getElementById("flt-btn-process").onclick = function () {
    var text = document.getElementById("flt-input").value;
    if (text === "") {
      document.getElementById("flt-output").value = "";
      document.getElementById("flt-cnt-out").innerText = "0";
      return;
    }

    var lines = text.split("\n");

    if (document.getElementById("chk-empty").checked) {
      lines = lines.filter(function (l) {
        return l.trim() !== "";
      });
    }
    if (document.getElementById("chk-rem-num").checked) {
      lines = lines.map(function (l) {
        return l.replace(/^\s*\d+[\.\-\)]?\s*/, "");
      });
    }
    if (document.getElementById("chk-space").checked) {
      lines = lines.map(function (l) {
        return l.replace(/\s+/g, " ").trim();
      });
    }

    var caseOpt = document.getElementById("sel-case").value;
    if (caseOpt === "title") {
      lines = lines.map(function (l) {
        return capitalize(l);
      });
    } else if (caseOpt === "lower") {
      lines = lines.map(function (l) {
        return l.toLowerCase();
      });
    } else if (caseOpt === "upper") {
      lines = lines.map(function (l) {
        return l.toUpperCase();
      });
    }

    if (document.getElementById("chk-accent").checked) {
      lines = lines.map(function (l) {
        return removeAccents(l);
      });
    }

    if (document.getElementById("chk-wc").checked) {
      var op = document.getElementById("sel-wc-op").value;
      var num = parseInt(document.getElementById("inp-wc-num").value) || 0;
      lines = lines.filter(function (l) {
        if (l.trim() === "") return false;
        var wc = l.trim().split(/\s+/).length;
        if (op === "less") return wc < num;
        if (op === "eq") return wc === num;
        if (op === "greater") return wc > num;
        return true;
      });
    }

    if (document.getElementById("chk-dup").checked) {
      lines = [...new Set(lines)];
    }

    var sortOpt = document.getElementById("sel-sort").value;
    if (sortOpt === "asc" || sortOpt === "desc") {
      lines.sort(function (a, b) {
        var aWords = a.trim().split(/\s+/);
        var bWords = b.trim().split(/\s+/);
        var aName = aWords[aWords.length - 1] || "";
        var bName = bWords[bWords.length - 1] || "";
        var cmp = aName.localeCompare(bName, "vi");
        if (cmp === 0) {
          cmp = a.localeCompare(b, "vi");
        }
        return sortOpt === "asc" ? cmp : -cmp;
      });
    }

    if (document.getElementById("chk-reverse").checked) {
      lines.reverse();
    }
    if (document.getElementById("chk-shuffle").checked) {
      lines.sort(function () {
        return 0.5 - Math.random();
      });
    }
    if (document.getElementById("chk-add-num").checked) {
      lines = lines.map(function (l, i) {
        return i + 1 + ". " + l;
      });
    }

    document.getElementById("flt-output").value = lines.join("\n");
    document.getElementById("flt-cnt-out").innerText = lines.length;
  };

  document.getElementById("flt-btn-clear").onclick = function () {
    document.getElementById("flt-input").value = "";
    document.getElementById("flt-output").value = "";
    document.getElementById("flt-cnt-in").innerText = "0";
    document.getElementById("flt-cnt-out").innerText = "0";
  };

  document.getElementById("flt-btn-copy").onclick = function () {
    var outText = document.getElementById("flt-output").value;
    if (outText === "") {
      alert("Không có kết quả để copy!");
      return;
    }
    navigator.clipboard.writeText(outText).then(function () {
      var btn = document.getElementById("flt-btn-copy");
      var oldHtml = btn.innerHTML;
      btn.innerHTML = "ĐÃ COPY";
      btn.classList.add("bg-green-100", "text-green-600", "border-green-200");
      btn.classList.remove(
        "bg-indigo-50",
        "text-indigo-600",
        "border-indigo-200",
      );
      setTimeout(function () {
        btn.innerHTML = oldHtml;
        btn.classList.remove(
          "bg-green-100",
          "text-green-600",
          "border-green-200",
        );
        btn.classList.add(
          "bg-indigo-50",
          "text-indigo-600",
          "border-indigo-200",
        );
      }, 2000);
    });
  };

  document.getElementById("flt-btn-down").onclick = function () {
    var outText = document.getElementById("flt-output").value;
    if (outText === "") {
      alert("Không có dữ liệu để tải xuống!");
      return;
    }
    var blob = new Blob([outText], { type: "text/plain;charset=utf-8" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Danh_Sach_Ten_Da_Loc.txt";
    link.click();
  };
}
