export function setupTool() {
  const tabId = "tab-home";
  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  // ==========================================
  // 1. TẠO HTML GIAO DIỆN HOME "GLASS OS" CAO CẤP
  // ==========================================
  
  // Dữ liệu 10 công cụ cốt lõi (Không chứa tab-home)
  const dashboardTools = [
      { id: "tab-calc", name: "Bảng Tính Toán", desc: "Máy tính nâng cao có lưu sử", class: "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400" },
      { id: "tab-finance", name: "Lãi Suất Ngân Hàng", desc: "Tính khoản vay & tiết kiệm", class: "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" },
      { id: "tab-calendar", name: "Lịch Vạn Niên", desc: "Âm dương & ngày xuất hành", class: "bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400" },
      { id: "tab-time-calc", name: "Tính Thời Gian", desc: "Cộng trừ giờ phút dễ dàng", class: "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400" },
      { id: "tab-baby-name", name: "Tên Cho Bé", desc: "Phân tích ngũ hành tương sinh", class: "bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400" },
      { id: "tab-xiangqi", name: "Cờ Tướng", desc: "Kỳ phổ chuyên nghiệp", class: "bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400" },
      { id: "tab-wheel", name: "Vòng Quay", desc: "Lựa chọn số phận ngẫu nhiên", class: "bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400" },
      { id: "tab-html-runner", name: "Chạy HTML", desc: "Sandbox Code Studio Mini", class: "bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400" },
      { id: "tab-image-to-svg", name: "Ảnh Vector", desc: "Khử nhiễu & cắt SVG Native", class: "bg-lime-500/10 border-lime-500/20 text-lime-600 dark:text-lime-400" },
      { id: "tab-ereader", name: "e-Reader", desc: "Trình đọc sách EPUB/PDF chuẩn", class: "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400" },
  ];

  let gridCardsHTML = "";
  dashboardTools.forEach((tool, idx) => {
      // Logic Responsive: Để Card trông như App Native, dùng CSS Grid 2 cột trên rấp nhỏ và 3 cột trên ipad.
      gridCardsHTML += `
      <button onclick="switchTab('${tool.id}')" class="glass-card flex flex-col items-start justify-between p-4 md:p-6 rounded-[1.2rem] md:rounded-[1.5rem] text-left transition transform focus:outline-none w-full appearance-none relative overflow-hidden group">
          <div class="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="mb-4">
              <span class="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${tool.class}">0${idx + 1}</span>
          </div>
          <div>
              <h3 class="font-extrabold text-[14px] md:text-[16px] text-slate-800 dark:text-white leading-tight mb-1 transition-colors group-hover:text-orange-500 dark:group-hover:text-orange-400">${tool.name}</h3>
              <p class="text-[10px] md:text-[11px] text-slate-500 dark:text-slate-400 leading-snug">${tool.desc}</p>
          </div>
      </button>`;
  });

  panel.innerHTML = `
        <style>
            /* CẤU HÌNH DARK MODE CHI TIẾT CHO HOME */
            body.dark-mode .bio-box { background-image: linear-gradient(to right, rgba(249, 115, 22, 0.05), transparent) !important; border-left-color: #f97316 !important; }
            body.dark-mode .guide-item { background-color: rgba(20, 20, 20, 0.6) !important; border-color: rgba(255,255,255,0.05) !important; }
            body.dark-mode .guide-item h3 { color: #f8fafc !important; }
            body.dark-mode .guide-item button:hover h3 { color: #f97316 !important; }
            body.dark-mode .guide-item p.bg-orange-50 { background-color: rgba(249, 115, 22, 0.15) !important; border-color: rgba(249, 115, 22, 0.2) !important; color: #fb923c !important; }
            body.dark-mode .guide-item > div[id^="content-"] { background-color: transparent !important; border-color: rgba(255,255,255,0.05) !important; }
            body.dark-mode input#guide-search { background-color: rgba(20, 20, 20, 0.5) !important; border-color: rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
            body.dark-mode input#guide-search::placeholder { color: #64748b !important; }
            body.dark-mode #guide-no-result { background-color: rgba(20, 20, 20, 0.4) !important; border-color: rgba(255,255,255,0.05) !important; }
            body.dark-mode #guide-no-result p.text-gray-700 { color: #cbd5e1 !important; }
        </style>
        
        <div class="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div class="space-y-6 md:space-y-10"> 
                
                <!-- HEADER CHÍNH CỦA APP (Nằm dưới vùng chóp Notch nhờ padding tổng của body/app-container) -->
                <div class="flex items-center justify-between pb-6 border-b border-black/5 dark:border-white/5">
                    <div>
                        <h1 class="text-[32px] md:text-[44px] font-black text-slate-800 dark:text-white tracking-tighter leading-none mb-1">NOTHING</h1>
                        <p class="font-bold text-[10px] md:text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Yet Everything</p>
                    </div>
                </div>

                <!-- BẢNG ĐIỀU KHIỂN TOOLS (APP GRID) -->
                <div>
                    <h2 class="text-[12px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 px-2">Kho Ứng Dụng</h2>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
                        ${gridCardsHTML}
                    </div>
                </div>
                
                <!-- MỤC BÀI VIẾT (TÀI LIỆU / TIPS) -->
                <div class="glass-card p-4 sm:p-6 md:p-8 rounded-[1.5rem] border border-black/5 dark:border-white/5 relative overflow-hidden">
                    <div class="mb-5">
                        <h2 class="text-[18px] md:text-[22px] font-extrabold text-slate-800 dark:text-white tracking-tight">Kinh Nghiệm & Chia Sẻ</h2>
                        <p class="text-[11px] text-slate-400 mt-1">Các ghi chép về công nghệ và hệ điều hành.</p>
                    </div>

                    <div class="relative mb-5 group">
                        <input type="text" id="guide-search" class="w-full bg-slate-50 dark:bg-black/30 backdrop-blur-sm border-2 border-slate-100 dark:border-white/10 rounded-[1rem] py-3.5 px-5 text-[14px] text-slate-700 dark:text-slate-200 focus:outline-none focus:border-orange-400 transition-all placeholder-slate-400 font-medium relative z-0" placeholder="Tìm kiếm tài liệu...">
                    </div>
                    
                    <div id="guide-list" class="space-y-3"></div>

                    <div id="guide-no-result" class="hidden text-center p-8 text-slate-500 italic bg-slate-50/80 rounded-[1rem] border border-dashed border-slate-200 mt-4 transition-colors duration-300">
                        <p class="font-medium text-lg text-slate-700">Trống rỗng...</p>
                    </div>
                </div>

                <!-- FOOTER GIỚI THIỆU BIO CỦA APP -->
                <div class="mt-12 text-center pb-8 opacity-60 hover:opacity-100 transition-opacity">
                    <p class="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1">Vibe Coding By Nguyễn Ngọc Phụng</p>
                    <p class="text-[10px] text-slate-400">Thiết kế chuẩn iOS Native &bull; Super Professional Edition.</p>
                </div>

            </div>
        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // 2. LOGIC BÀI VIẾT TƯƠNG TỰ BẢN CŨ NHƯNG TỐI ƯU HIỆU NĂNG LẠI
  // ==========================================
  const guideList = document.getElementById("guide-list");
  const searchInput = document.getElementById("guide-search");
  const noResult = document.getElementById("guide-no-result");
  let cachedContent = {};

  const manifest = [
    { title: "Contact me", date: "Nothing", path: "posts/contact.md" },
    { title: "Cách dùng các công cụ AI hiệu quả như một chuyên gia", date: "Nothing", path: "posts/guide-use-ai.md" },
    { title: "Tạo Bot Telegram quản lý tài chính với Google Sheet", date: "Nothing", path: "posts/bot-telegram.md" },
    { title: "Chặn quảng cáo Web, App, Zalo bằng NextDNS", date: "Thủ thuật IOS", path: "posts/nextdns.md" },
    { title: "Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS, các ứng dụng khác", date: "Thủ thuật Mac", path: "posts/mac-apps.md" },
    { title: "Tổng hợp tài liệu học lập trình và công nghệ thông tin từ Freetuts", date: "Tài liệu học tập", path: "posts/tong-hop-tai-lieu-freetuts.md" },
    { title: "Tổng hợp các nhóm crack mod hack - apk,ipa(android/ios) trên Telegram", date: "Phần mềm/Ứng dụng", path: "posts/group-telegram.md" },
    { title: "Tổng hợp các trang web chia sẻ tài nguyên ứng dụng trên Mac", date: "Thủ thuật Mac", path: "posts/mac-webs.md" },
  ];

  // ==========================================
  // 3. RENDER DANH SÁCH BÀI VIẾT (GIAO DIỆN GLASS OS)
  // ==========================================
  const renderGuideList = () => {
    guideList.innerHTML = "";
    manifest.forEach((guide, index) => {
      const item = document.createElement("div");
      item.id = `guide-item-${index}`;
      item.className = "guide-item glass-card rounded-[1.2rem] overflow-hidden border border-black/5 dark:border-white/5 transition-all duration-300";

      item.innerHTML = `
                <button class="w-full text-left px-4 py-4 md:px-5 md:py-5 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div class="pr-2">
                        <h3 class="font-bold text-slate-800 dark:text-white group-hover:text-orange-500 transition text-[14px] md:text-[15px] leading-snug">${guide.title}</h3>
                        <p class="inline-block mt-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded text-[9px] uppercase font-bold tracking-widest transition-colors">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-slate-100/50 dark:bg-white/5 rounded-full group-hover:bg-orange-500/20 group-hover:text-orange-600 shrink-0 transition-colors">ĐỌC</div>
                </button>
                <div id="content-${index}" class="hidden border-t border-black/5 dark:border-white/5 transition-colors duration-300">
                    <div class="prose-custom max-w-none px-4 py-5 md:px-6 md:py-6 text-[14px] md:text-[15px] leading-relaxed" id="md-render-${index}"></div>
                </div>
            `;
      guideList.appendChild(item);
    });
  };
  renderGuideList();

  // ==========================================
  // 4. LOGIC TÌM KIẾM
  // ==========================================
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(".guide-item");
    let hasVisible = false;

    manifest.forEach((guide, index) => {
      const isMatch = guide.title.toLowerCase().includes(term);
      if (items[index]) items[index].style.display = isMatch ? "block" : "none";
      if (isMatch) hasVisible = true;
    });

    noResult.classList.toggle("hidden", hasVisible);
  });

  // ==========================================
  // 5. MỞ BÀI VIẾT (Markdown Renderer)
  // ==========================================
  window.toggleGuide = async function (index, skipUrlUpdate = false) {
    const contentDiv = document.getElementById("content-" + index);
    const iconDiv = document.getElementById("icon-" + index);
    const renderDiv = document.getElementById("md-render-" + index);
    const parentItem = document.getElementById("guide-item-" + index);
    const currentSlug = manifest[index].path.split("/").pop().replace(".md", "");

    manifest.forEach((_, i) => {
      if (i !== index) {
        const otherContent = document.getElementById("content-" + i);
        const otherIcon = document.getElementById("icon-" + i);
        if (otherContent && !otherContent.classList.contains("hidden")) {
          otherContent.classList.add("hidden");
          otherIcon.innerText = "ĐỌC";
          otherIcon.classList.remove("bg-orange-500/20", "text-orange-600");
          otherIcon.classList.add("bg-slate-100/50", "text-slate-400");
        }
      }
    });

    if (contentDiv.classList.contains("hidden")) {
      contentDiv.classList.remove("hidden");
      iconDiv.innerText = "ĐÓNG";
      iconDiv.classList.remove("bg-slate-100/50", "text-slate-400");
      iconDiv.classList.add("bg-orange-500/20", "text-orange-600");

      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("post", currentSlug);
        window.history.replaceState(null, null, newUrl);
      }

      if (!cachedContent[index]) {
        renderDiv.innerHTML = '<div class="text-orange-500 font-bold animate-pulse text-center py-6 text-[12px] uppercase">Đang nạp dữ liệu...</div>';
        try {
          const response = await fetch(manifest[index].path);
          if (!response.ok) throw new Error("File error");
          let text = await response.text();

          if (window.marked) {
             text = text.replace(/^@time\[(.*?)\] (.*)$/gm, '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>');
             cachedContent[index] = marked.parse(text);
          } else {
             cachedContent[index] = "<p class='text-red-500 text-center py-4'>Lỗi thư viện Markdown.</p>";
          }
        } catch (error) {
          cachedContent[index] = `<div class="text-red-500 bg-red-50 p-4 text-[12px] text-center rounded-xl my-4 font-bold uppercase">Không tải được file</div>`;
        }
      }

      renderDiv.innerHTML = cachedContent[index];
      renderDiv.querySelectorAll("a").forEach((link) => {
        link.setAttribute("target", "_blank");
        link.className = "text-orange-500 font-bold hover:underline";
      });

      // Scroll to view
      setTimeout(() => {
        if (parentItem && document.getElementById("app-container")) {
          const container = document.getElementById("app-container");
          const y = parentItem.offsetTop - 80; // Offset cho đẹp
          container.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      contentDiv.classList.add("hidden");
      iconDiv.innerText = "ĐỌC";
      iconDiv.classList.remove("bg-orange-500/20", "text-orange-600");
      iconDiv.classList.add("bg-slate-100/50", "text-slate-400");

      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("post");
        window.history.replaceState(null, null, newUrl);
      }
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get("post");
  if (postSlug) {
    const targetIndex = manifest.findIndex((m) => m.path.endsWith(`/${postSlug}.md`));
    if (targetIndex !== -1) {
      setTimeout(() => { window.toggleGuide(targetIndex, true); }, 150);
    }
  }
}
