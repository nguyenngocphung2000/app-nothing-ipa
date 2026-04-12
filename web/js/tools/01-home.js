export function setupTool() {
  const tabId = "tab-home";
  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  // ==========================================
  // 1. GIAO DIỆN HTML & CSS LÕI
  // ==========================================
  panel.innerHTML = `
        <style>
            /* CẤU HÌNH DARK MODE */
            body.dark-mode .bio-box { background-image: linear-gradient(to right, rgba(249, 115, 22, 0.05), transparent) !important; border-left-color: #f97316 !important; }
            body.dark-mode .glass-card { background-color: rgba(30, 41, 59, 0.8) !important; border-color: #334155 !important; }
            body.dark-mode .glass-card h1, body.dark-mode .glass-card h2, body.dark-mode .glass-card strong { color: #f8fafc !important; }
            body.dark-mode .glass-card p.text-gray-700, body.dark-mode .glass-card p.text-gray-600 { color: #cbd5e1 !important; }
            body.dark-mode .glass-card span.bg-white { background-color: #1e293b !important; border-color: #334155 !important; color: #cbd5e1 !important; }
            body.dark-mode .glass-card span.bg-orange-50 { background-color: rgba(249, 115, 22, 0.1) !important; border-color: rgba(249, 115, 22, 0.3) !important; color: #fb923c !important; }
            body.dark-mode .glass-card span:hover { background-color: #f97316 !important; color: #fff !important; border-color: #f97316 !important; }
            
            body.dark-mode .guide-item { background-color: #1e293b !important; border-color: #334155 !important; }
            body.dark-mode .guide-item h3 { color: #f8fafc !important; }
            body.dark-mode .guide-item button:hover h3 { color: #f97316 !important; }
            body.dark-mode .guide-item p.bg-orange-50 { background-color: rgba(249, 115, 22, 0.15) !important; border-color: rgba(249, 115, 22, 0.2) !important; color: #fb923c !important; }
            
            body.dark-mode .guide-item > div[id^="content-"] { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; }
            body.dark-mode .prose-custom { color: #cbd5e1 !important; }
            body.dark-mode .prose-custom h1, body.dark-mode .prose-custom h2, body.dark-mode .prose-custom h3, body.dark-mode .prose-custom h4, body.dark-mode .prose-custom strong { color: #f8fafc !important; }
            body.dark-mode .prose-custom a { color: #fb923c !important; }
            body.dark-mode .prose-custom code { background-color: #334155 !important; color: #f8fafc !important; border: 1px solid #475569; }
            body.dark-mode .prose-custom pre { background-color: #0f172a !important; border: 1px solid #334155; }
            body.dark-mode .prose-custom blockquote { border-left-color: #f97316 !important; color: #94a3b8 !important; background-color: rgba(249, 115, 22, 0.05); }
            
            body.dark-mode input#guide-search { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; }
            body.dark-mode input#guide-search::placeholder { color: #64748b !important; }
            body.dark-mode #guide-no-result { background-color: rgba(15, 23, 42, 0.4) !important; border-color: #334155 !important; }
            body.dark-mode #guide-no-result p.text-gray-700 { color: #cbd5e1 !important; }
        </style>
        
        <div class="w-full max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6">
            <div class="space-y-6 md:space-y-8"> 
                
                <div class="glass-card p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-orange-100 bg-white/80 backdrop-blur-xl relative overflow-hidden shadow-lg shadow-orange-100/50 transition-colors duration-300">
                    
                    <div class="absolute top-0 right-0 w-64 h-64 bg-orange-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-10 -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-10 translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                    
                    <div class="text-left relative z-10 w-full">
                        <div class="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-sm border border-orange-200 transition">
                            <span class="relative flex h-2 w-2">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            Nguyễn Ngọc Phụng
                        </div>
                        
                        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 tracking-tight">
                            Hi I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Nothing</span>
                        </h1>
                        
                        <div class="mb-5 relative border-l-4 border-orange-400 bg-gradient-to-r from-orange-50/20 to-transparent rounded-r-2xl p-3.5 md:p-5 bio-box">
                            <p lang="en" class="text-gray-700 leading-relaxed text-[14px] md:text-[15px] font-medium">
                                <strong class="text-orange-600 tracking-tight block mb-1.5 uppercase text-xs md:text-sm">Nothing yet Everything</strong> 
                                Xin chào! Chào mừng đến với góc nhỏ của tôi. Kho lưu trữ này là nơi tập hợp vài món đồ chơi được tôi "vibe coding" ra, cùng với đủ loại mẹo vặt hay ho. Mấy công cụ này vốn được sinh ra để tự cứu lấy mình, nhưng giờ tôi quyết định mở bát chia sẻ cho tất cả mọi người. Cứ tự nhiên vọc vạch nhé, và nếu có bắt gặp bug nào... hãy nhắn tôi để tôi "vibe" ra bản vá lỗi, thông tin liên hệ ở ngay bên dưới!
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-2 justify-start">
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Application</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Vibe_coding</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tips</span>
                            <span class="bg-white border border-gray-200 text-gray-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-semibold hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#Tools</span>
                            <span class="bg-orange-50 border border-orange-200 text-orange-600 px-3.5 py-1.5 rounded-full text-[11px] md:text-xs font-bold hover:bg-orange-600 hover:text-white hover:-translate-y-0.5 shadow-sm transition-all cursor-default">#AI_Powered</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-4 sm:p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 relative overflow-hidden bg-white/80 backdrop-blur-md shadow-sm transition-colors duration-300">
                    <div class="mb-5">
                        <h2 class="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Tìm thử biết đâu có thứ cần</h2>
                    </div>

                    <div class="relative mb-5 group">
                        <input type="text" id="guide-search" class="w-full bg-gray-50/50 backdrop-blur-sm border-2 border-gray-100 rounded-2xl py-3.5 px-5 text-base text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-4 ring-orange-50 shadow-sm transition-all placeholder-gray-400 font-medium hover:border-orange-200 relative z-0" placeholder="Nhập từ khóa tìm kiếm...">
                    </div>
                    
                    <div id="guide-list" class="space-y-3"></div>

                    <div id="guide-no-result" class="hidden text-center p-8 text-gray-500 italic bg-gray-50/80 rounded-2xl border border-dashed border-gray-200 mt-4 shadow-sm transition-colors duration-300">
                        <p class="font-medium text-lg text-gray-700">Không tìm thấy bài viết nào...</p>
                        <p class="text-sm mt-1 text-gray-400">Thử tìm với từ khóa khác xem sao!</p>
                    </div>
                </div>

            </div>
        </div>
    `;

  document.getElementById("app-container").appendChild(panel);

  // ==========================================
  // 2. DỮ LIỆU & BIẾN CỤC BỘ
  // ==========================================
  const guideList = document.getElementById("guide-list");
  const searchInput = document.getElementById("guide-search");
  const noResult = document.getElementById("guide-no-result");
  let cachedContent = {};

  const manifest = [
    { title: "Contact me", date: "Nothing", path: "posts/contact.md" },
    {
      title: "Cách dùng các công cụ AI hiệu quả như một chuyên gia",
      date: "Nothing",
      path: "posts/guide-use-ai.md",
    },
    {
      title: "Tạo Bot Telegram quản lý tài chính với Google Sheet",
      date: "Nothing",
      path: "posts/bot-telegram.md",
    },
    {
      title: "Chặn quảng cáo Web, App, Zalo bằng NextDNS",
      date: "Thủ thuật IOS",
      path: "posts/nextdns.md",
    },
    {
      title: "Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS, các ứng dụng khác",
      date: "Thủ thuật Mac",
      path: "posts/mac-apps.md",
    },
    {
      title:
        "Tổng hợp tài liệu học lập trình và công nghệ thông tin từ Freetuts",
      date: "Tài liệu học tập",
      path: "posts/tong-hop-tai-lieu-freetuts.md",
    },
    {
      title:
        "Tổng hợp các nhóm crack mod hack - apk,ipa(android/ios) trên Telegram",
      date: "Phần mềm/Ứng dụng",
      path: "posts/group-telegram.md",
    },
    {
      title: "Tổng hợp các trang web chia sẻ tài nguyên ứng dụng trên Mac",
      date: "Thủ thuật Mac",
      path: "posts/mac-webs.md",
    },
  ];

  // ==========================================
  // 3. RENDER DANH SÁCH BÀI VIẾT
  // ==========================================
  const renderGuideList = () => {
    guideList.innerHTML = "";
    manifest.forEach((guide, index) => {
      const item = document.createElement("div");
      item.id = `guide-item-${index}`;
      item.className =
        "guide-item bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition hover:shadow-md hover:border-orange-100 duration-300";

      // Tối ưu Padding (px) cho phần đọc Markdown: Màn dọc (mobile) mở rộng viền tối đa (px-3 sm:px-4)
      item.innerHTML = `
                <button class="w-full text-left px-4 py-4 md:px-6 md:py-5 flex items-center justify-between focus:outline-none group" onclick="toggleGuide(${index})">
                    <div class="pr-4">
                        <h3 class="font-bold text-gray-800 group-hover:text-orange-500 transition text-[15px] md:text-lg leading-snug">${guide.title}</h3>
                        <p class="inline-block mt-2 bg-orange-50 text-orange-600 border border-orange-100 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors">${guide.date}</p>
                    </div>
                    <div id="icon-${index}" class="text-gray-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-gray-50 rounded-full group-hover:bg-orange-100 group-hover:text-orange-500 shrink-0 transition-colors">XEM</div>
                </button>
                <div id="content-${index}" class="hidden border-t border-gray-100 bg-gray-50/50 transition-colors duration-300">
                    <div class="prose-custom max-w-none px-3 py-4 sm:px-4 md:px-6 md:py-6 text-[14.5px] md:text-base leading-relaxed" id="md-render-${index}"></div>
                </div>
            `;
      guideList.appendChild(item);
    });
  };
  renderGuideList();

  // ==========================================
  // 4. LOGIC TÌM KIẾM (Tối ưu hiệu năng)
  // ==========================================
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(".guide-item");
    let hasVisible = false;

    manifest.forEach((guide, index) => {
      const isMatch = guide.title.toLowerCase().includes(term);
      if (items[index]) {
        items[index].style.display = isMatch ? "block" : "none";
      }
      if (isMatch) hasVisible = true;
    });

    noResult.classList.toggle("hidden", hasVisible);
  });

  // ==========================================
  // 5. LOGIC MỞ BÀI VIẾT & DEEP LINKING
  // ==========================================
  window.toggleGuide = async function (index, skipUrlUpdate = false) {
    const contentDiv = document.getElementById("content-" + index);
    const iconDiv = document.getElementById("icon-" + index);
    const renderDiv = document.getElementById("md-render-" + index);
    const parentItem = document.getElementById("guide-item-" + index);

    // Lấy tên file để tạo Link
    const currentSlug = manifest[index].path
      .split("/")
      .pop()
      .replace(".md", "");

    // Đóng tất cả các thẻ đang mở khác
    manifest.forEach((_, i) => {
      if (i !== index) {
        const otherContent = document.getElementById("content-" + i);
        const otherIcon = document.getElementById("icon-" + i);
        if (otherContent && !otherContent.classList.contains("hidden")) {
          otherContent.classList.add("hidden");
          otherIcon.innerText = "XEM";
          otherIcon.classList.remove("bg-orange-100", "text-orange-500");
          otherIcon.classList.add("bg-gray-50", "text-gray-400");
        }
      }
    });

    if (contentDiv.classList.contains("hidden")) {
      // MỞ THẺ
      contentDiv.classList.remove("hidden");
      iconDiv.innerText = "ĐÓNG";
      iconDiv.classList.remove("bg-gray-50", "text-gray-400");
      iconDiv.classList.add("bg-orange-100", "text-orange-500");

      // Cập nhật tham số URL
      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("post", currentSlug);
        window.history.replaceState(null, null, newUrl);
      }

      // Tải & Render Markdown nếu chưa có trong Cache
      if (!cachedContent[index]) {
        renderDiv.innerHTML =
          '<div class="text-orange-500 font-bold animate-pulse text-center py-6">Đang nạp dữ liệu bài viết...</div>';
        try {
          const response = await fetch(manifest[index].path);
          if (!response.ok) throw new Error("Lỗi tải file");
          let text = await response.text();

          if (window.marked) {
            text = text.replace(
              /^@time\[(.*?)\] (.*)$/gm,
              '<div class="md-timeline-node"><span class="md-time-badge">$1</span><div class="md-time-text">$2</div></div>',
            );
            cachedContent[index] = marked.parse(text);
          } else {
            cachedContent[index] =
              "<p class='text-red-500 text-center py-4'>Lỗi thư viện Markdown.</p>";
          }
        } catch (error) {
          cachedContent[index] =
            `<div class="text-red-500 bg-red-50 p-4 text-center rounded-xl border border-red-100 my-4">Không thể tải nội dung file</div>`;
        }
      }

      renderDiv.innerHTML = cachedContent[index];
      renderDiv.querySelectorAll("a").forEach((link) => {
        link.setAttribute("target", "_blank");
        link.className = "text-orange-500 font-bold hover:underline";
      });

      // Cuộn mượt mà tới bài viết
      setTimeout(() => {
        if (parentItem) {
          const y =
            parentItem.getBoundingClientRect().top + window.scrollY - 20;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    } else {
      // ĐÓNG THẺ
      contentDiv.classList.add("hidden");
      iconDiv.innerText = "XEM";
      iconDiv.classList.remove("bg-orange-100", "text-orange-500");
      iconDiv.classList.add("bg-gray-50", "text-gray-400");

      // Gỡ tham số URL
      if (!skipUrlUpdate) {
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete("post");
        window.history.replaceState(null, null, newUrl);
      }
    }
  };

  // ==========================================
  // 6. KHỞI ĐỘNG TỰ ĐỘNG TÌM DEEP LINK
  // ==========================================
  const urlParams = new URLSearchParams(window.location.search);
  const postSlug = urlParams.get("post");

  if (postSlug) {
    const targetIndex = manifest.findIndex((m) =>
      m.path.endsWith(`/${postSlug}.md`),
    );
    if (targetIndex !== -1) {
      setTimeout(() => {
        window.toggleGuide(targetIndex, true);
      }, 150);
    }
  }
}
