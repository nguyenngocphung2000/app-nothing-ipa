export function setupTool() {
  const tabId = "tab-finance";

  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML = `
        <div class="text-center mb-6">
            <span class="bg-cyan-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Tài chính</span>
            <h2 class="text-3xl font-bold mt-2 text-gray-800">Tính Lãi <span class="text-cyan-500">Ngân Hàng</span> 💰</h2>
            <p class="text-sm text-gray-500 mt-2 italic">Tính toán chi tiết lãi gửi tiết kiệm và khoản vay.</p>
        </div>

        <div class="space-y-6 max-w-4xl mx-auto">
            
            <div class="flex justify-center mb-6">
                <div class="bg-gray-100 p-1 rounded-2xl inline-flex shadow-inner">
                    <button id="btn-mode-saving" class="px-6 py-2 rounded-xl text-sm font-bold bg-white text-cyan-600 shadow-sm transition">Gửi Tiết Kiệm</button>
                    <button id="btn-mode-loan" class="px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition">Vay Vốn</button>
                </div>
            </div>

            <div id="finance-saving-mode" class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-cyan-400 shadow-xl block">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số tiền gửi (VNĐ)</label>
                        <input type="number" id="sav-principal" class="w-full bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 100000000">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Lãi suất (% / Năm)</label>
                        <input type="number" id="sav-rate" class="w-full bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 6.5">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Kỳ hạn gửi</label>
                        <div class="flex gap-2">
                            <input type="number" id="sav-time" class="w-2/3 bg-cyan-50/50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold" placeholder="VD: 12">
                            <select id="sav-time-unit" class="w-1/3 bg-cyan-50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold">
                                <option value="12">Tháng</option>
                                <option value="1">Năm</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Hình thức tính lãi</label>
                        <select id="sav-type" class="w-full bg-cyan-50 border border-cyan-100 rounded-xl p-3 outline-none focus:ring-2 ring-cyan-200 text-cyan-700 font-bold">
                            <option value="simple">Lãi đơn (Cuối kỳ)</option>
                            <option value="compound">Lãi kép (Nhập gốc hàng tháng)</option>
                        </select>
                    </div>
                </div>
                
                <button id="btn-calc-sav" class="w-full mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 rounded-xl transition shadow-md active:scale-95">TÍNH TOÁN TIỀN LỜI</button>

                <div id="sav-result" class="mt-6 hidden bg-white p-4 rounded-xl border border-cyan-100 shadow-sm text-center">
                    <div class="text-sm text-gray-500 font-medium">Tổng tiền lãi nhận được</div>
                    <div id="sav-res-interest" class="text-3xl font-black text-green-500 mt-1 mb-2">0 ₫</div>
                    <div class="text-sm text-gray-500 font-medium">Tổng gốc + Lãi</div>
                    <div id="sav-res-total" class="text-xl font-bold text-cyan-700 mt-1">0 ₫</div>
                </div>
            </div>

            <div id="finance-loan-mode" class="glass-card p-4 md:p-6 rounded-[2rem] border-t-4 border-t-red-400 shadow-xl hidden">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Số tiền vay (VNĐ)</label>
                        <input type="number" id="loan-principal" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 500000000">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Lãi suất (% / Năm)</label>
                        <input type="number" id="loan-rate" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 10.5">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Thời gian vay (Tháng)</label>
                        <input type="number" id="loan-time" class="w-full bg-red-50/50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold" placeholder="VD: 36 (3 năm)">
                    </div>
                    <div>
                        <label class="text-[10px] uppercase font-bold text-gray-400 ml-2">Phương thức tính lãi</label>
                        <select id="loan-type" class="w-full bg-red-50 border border-red-100 rounded-xl p-3 outline-none focus:ring-2 ring-red-200 text-red-700 font-bold">
                            <option value="declining">Dư nợ giảm dần (Thực tế)</option>
                            <option value="annuity">Trả góp đều (Dư nợ giảm dần cố định)</option>
                            <option value="flat">Dư nợ ban đầu (Flat Rate)</option>
                        </select>
                    </div>
                </div>

                <div id="loan-warning" class="hidden mt-3 text-xs bg-orange-100 text-orange-700 p-3 rounded-xl border border-orange-200 font-medium">
                    ⚠️ <b>Cảnh báo:</b> Lãi suất trên dư nợ ban đầu thực chất tương đương với khoảng <b id="loan-real-rate">...</b>%/năm nếu tính theo dư nợ giảm dần. Đừng để con số biểu kiến đánh lừa bạn!
                </div>
                
                <button id="btn-calc-loan" class="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md active:scale-95">TÍNH TOÁN KHOẢN VAY</button>

                <div id="loan-result" class="mt-6 hidden bg-white p-4 rounded-xl border border-red-100 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tổng lãi phải trả</div>
                        <div id="loan-res-interest" class="text-xl font-black text-red-500 mt-1">0 ₫</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tổng gốc + Lãi</div>
                        <div id="loan-res-total" class="text-xl font-bold text-gray-800 mt-1">0 ₫</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-400 font-bold uppercase">Tháng cao nhất trả</div>
                        <div id="loan-res-monthly" class="text-xl font-bold text-orange-500 mt-1">0 ₫</div>
                    </div>
                </div>

                <div id="loan-schedule-container" class="mt-6 hidden">
                    <h4 class="font-bold text-gray-800 mb-2 flex items-center gap-2"><span>📅</span> Lịch trả nợ chi tiết</h4>
                    <div class="overflow-x-auto max-h-80 custom-scrollbar rounded-xl border border-gray-100 shadow-inner">
                        <table class="w-full text-sm text-left">
                            <thead class="bg-gray-50 text-gray-500 sticky top-0 text-xs uppercase">
                                <tr>
                                    <th class="px-4 py-3 font-bold">Kỳ</th>
                                    <th class="px-4 py-3 font-bold">Tiền Gốc</th>
                                    <th class="px-4 py-3 font-bold">Tiền Lãi</th>
                                    <th class="px-4 py-3 font-bold">Tổng Trả</th>
                                    <th class="px-4 py-3 font-bold">Gốc Còn Lại</th>
                                </tr>
                            </thead>
                            <tbody id="loan-schedule-body" class="bg-white divide-y divide-gray-100">
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="bg-cyan-50/50 p-4 rounded-2xl border border-cyan-100 text-xs text-gray-600 leading-relaxed font-medium">
                <span class="font-bold text-cyan-700">💡 Mẹo Tài Chính:</span> Sự khác biệt lớn nhất khi vay là phương pháp tính lãi. 
                Vay 100 triệu, 10%/năm trong 12 tháng: Nếu tính theo <b class="text-green-600">Dư nợ giảm dần</b>, tiền lãi mỗi tháng sẽ ít dần đi vì gốc đã giảm. Nhưng nếu tính theo <b class="text-red-500">Dư nợ ban đầu (Flat rate)</b>, tháng nào bạn cũng phải đóng nguyên tiền lãi của 100 triệu dù gốc đã trả gần hết.
            </div>

        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // LOGIC CHUYỂN ĐỔI SANG MODULE
  // ==========================================
  const fmt = (num) => Math.round(num).toLocaleString("vi-VN") + " ₫";

  const btnSav = document.getElementById("btn-mode-saving");
  const btnLoan = document.getElementById("btn-mode-loan");
  const modeSav = document.getElementById("finance-saving-mode");
  const modeLoan = document.getElementById("finance-loan-mode");

  btnSav.addEventListener("click", () => {
    btnSav.className =
      "px-6 py-2 rounded-xl text-sm font-bold bg-white text-cyan-600 shadow-sm transition";
    btnLoan.className =
      "px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition";
    modeSav.classList.remove("hidden");
    modeLoan.classList.add("hidden");
  });

  btnLoan.addEventListener("click", () => {
    btnLoan.className =
      "px-6 py-2 rounded-xl text-sm font-bold bg-white text-red-600 shadow-sm transition";
    btnSav.className =
      "px-6 py-2 rounded-xl text-sm font-bold text-gray-500 hover:text-cyan-600 transition";
    modeLoan.classList.remove("hidden");
    modeSav.classList.add("hidden");
  });

  document.getElementById("btn-calc-sav").addEventListener("click", () => {
    let P = parseFloat(document.getElementById("sav-principal").value);
    let r_annual = parseFloat(document.getElementById("sav-rate").value) / 100;
    let time = parseFloat(document.getElementById("sav-time").value);
    let timeUnit = parseFloat(document.getElementById("sav-time-unit").value);
    let type = document.getElementById("sav-type").value;

    if (!P || !r_annual || !time) {
      alert("Vui lòng nhập đầy đủ thông tin gửi tiết kiệm!");
      return;
    }

    let t_years = time / timeUnit;
    let A = 0;

    if (type === "simple") {
      A = P * (1 + r_annual * t_years);
    } else {
      let n = 12;
      A = P * Math.pow(1 + r_annual / n, n * t_years);
    }

    let interest = A - P;

    document.getElementById("sav-result").classList.remove("hidden");
    document.getElementById("sav-res-interest").innerText = fmt(interest);
    document.getElementById("sav-res-total").innerText = fmt(A);
  });

  const typeSelect = document.getElementById("loan-type");
  const warningDiv = document.getElementById("loan-warning");
  const realRateSpan = document.getElementById("loan-real-rate");

  typeSelect.addEventListener("change", () => {
    if (typeSelect.value === "flat") warningDiv.classList.remove("hidden");
    else warningDiv.classList.add("hidden");
  });

  document.getElementById("btn-calc-loan").addEventListener("click", () => {
    let P = parseFloat(document.getElementById("loan-principal").value);
    let r_annual = parseFloat(document.getElementById("loan-rate").value) / 100;
    let months = parseInt(document.getElementById("loan-time").value);
    let type = typeSelect.value;

    if (!P || !r_annual || !months) {
      alert("Vui lòng nhập đầy đủ thông tin vay vốn!");
      return;
    }

    let totalInterest = 0;
    let maxMonthly = 0;
    let r_monthly = r_annual / 12;
    let scheduleHTML = "";
    let remaining = P;

    if (type === "flat") {
      let eir = (r_annual * 100 * 2 * months) / (months + 1);
      realRateSpan.innerText = eir.toFixed(1);
      warningDiv.classList.remove("hidden");
    }

    if (type === "flat") {
      let monthlyPrincipal = P / months;
      let monthlyInterest = P * r_monthly;
      totalInterest = monthlyInterest * months;
      maxMonthly = monthlyPrincipal + monthlyInterest;

      for (let i = 1; i <= months; i++) {
        remaining -= monthlyPrincipal;
        scheduleHTML += `
                    <tr class="hover:bg-red-50 transition">
                        <td class="px-4 py-2 font-bold">${i}</td>
                        <td class="px-4 py-2 text-gray-600">${fmt(monthlyPrincipal)}</td>
                        <td class="px-4 py-2 text-red-500">${fmt(monthlyInterest)}</td>
                        <td class="px-4 py-2 font-bold text-gray-800">${fmt(maxMonthly)}</td>
                        <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    } else if (type === "declining") {
      let monthlyPrincipal = P / months;

      for (let i = 1; i <= months; i++) {
        let interest = remaining * r_monthly;
        totalInterest += interest;
        let payment = monthlyPrincipal + interest;
        if (payment > maxMonthly) maxMonthly = payment;
        remaining -= monthlyPrincipal;

        scheduleHTML += `
                    <tr class="hover:bg-red-50 transition">
                        <td class="px-4 py-2 font-bold">${i}</td>
                        <td class="px-4 py-2 text-gray-600">${fmt(monthlyPrincipal)}</td>
                        <td class="px-4 py-2 text-red-500">${fmt(interest)}</td>
                        <td class="px-4 py-2 font-bold text-gray-800">${fmt(payment)}</td>
                        <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    } else if (type === "annuity") {
      let pmt =
        (P * r_monthly * Math.pow(1 + r_monthly, months)) /
        (Math.pow(1 + r_monthly, months) - 1);
      maxMonthly = pmt;

      for (let i = 1; i <= months; i++) {
        let interest = remaining * r_monthly;
        let principal = pmt - interest;
        totalInterest += interest;
        remaining -= principal;

        scheduleHTML += `
                    <tr class="hover:bg-red-50 transition">
                        <td class="px-4 py-2 font-bold">${i}</td>
                        <td class="px-4 py-2 text-gray-600">${fmt(principal)}</td>
                        <td class="px-4 py-2 text-red-500">${fmt(interest)}</td>
                        <td class="px-4 py-2 font-bold text-gray-800">${fmt(pmt)}</td>
                        <td class="px-4 py-2 text-gray-500">${fmt(Math.max(0, remaining))}</td>
                    </tr>`;
      }
    }

    document.getElementById("loan-result").classList.remove("hidden");
    document
      .getElementById("loan-schedule-container")
      .classList.remove("hidden");

    document.getElementById("loan-res-interest").innerText = fmt(totalInterest);
    document.getElementById("loan-res-total").innerText = fmt(
      P + totalInterest,
    );
    document.getElementById("loan-res-monthly").innerText = fmt(maxMonthly);
    document.getElementById("loan-schedule-body").innerHTML = scheduleHTML;
  });
}
