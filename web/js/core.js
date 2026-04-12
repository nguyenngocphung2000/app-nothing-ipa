/* ==========================================================
   LÕI HỆ THỐNG - GIAO DIỆN APP NATIVE
========================================================== */

// --- 1. KIỂM SOÁT ĐỊNH TUYẾN ---
const toolMap = {
  "tab-home": "./tools/01-home.js",
  "tab-calc": "./tools/02-calc.js",
  "tab-finance": "./tools/03-finance.js",
  "tab-calendar": "./tools/04-calendar.js",
  "tab-time-calc": "./tools/05-time-calc.js",
  "tab-baby-name": "./tools/06-baby-name.js",
  "tab-xiangqi": "./tools/07-xiangqi.js",
  "tab-wheel": "./tools/08-wheel.js",
  "tab-html-runner": "./tools/09-html-runner.js",
  "tab-image-to-svg": "./tools/10-image-to-svg.js",
  "tab-ereader": "./tools/11-ereader.js",
};

const appContainer = document.getElementById("app-container");
const nativeAppBar = document.getElementById("native-app-bar");
const btnBackHome = document.getElementById("btn-back-home");

// --- 2. HÀM CHUYỂN TAB CÓ ANIMATION MƯỢT MÀ ---
window.switchTab = async function (tabId) {
  // Bật/tắt thanh Top Navigation Bar tuỳ thuộc vào trang
  if (tabId === "tab-home") {
      // Ẩn thanh AppBar trượt lên khi về Home
      nativeAppBar.classList.remove("translate-y-0", "opacity-100");
      nativeAppBar.classList.add("-translate-y-full", "opacity-0");
  } else {
      // Hiện thanh AppBar trượt xuống khi ở trong Tool
      nativeAppBar.classList.remove("-translate-y-full", "opacity-0");
      nativeAppBar.classList.add("translate-y-0", "opacity-100");
  }

  // Tắt tất cả các Panel hiện tại
  document.querySelectorAll(".tab-panel").forEach((p) => {
    p.classList.remove("active");
  });

  let targetPanel = document.getElementById(tabId);

  // Lazy Load nếu Tool chưa được tải bao giờ
  if (!targetPanel) {
    const toolUrl = toolMap[tabId];
    if (toolUrl) {
      try {
        const module = await import(toolUrl);
        module.setupTool();
        targetPanel = document.getElementById(tabId);
      } catch (error) {
        console.error("Lỗi tải tool:", error);
        return;
      }
    }
  }

  if (targetPanel) {
    // Reset cuộn của Container
    if(appContainer) appContainer.scrollTop = 0;
    
    // Kích hoạt Active để chạy Animation trong CSS
    targetPanel.classList.add("active");

    const newUrl = new URL(window.location);
    if (tabId !== "tab-home") {
      newUrl.searchParams.delete("post");
    }
    newUrl.hash = tabId;
    window.history.replaceState(null, null, newUrl);
  }
};

// Gắn nút Quay Lại trang chủ
if(btnBackHome) {
    btnBackHome.addEventListener("click", () => {
        window.switchTab("tab-home");
    });
}

// --- 3. HÀM CHUYỂN ĐỔI VÀ ĐỒNG BỘ DARK MODE ---
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark-mode");
  }

  const iconSun = document.getElementById("icon-sun");
  const iconMoon = document.getElementById("icon-moon");
  if (iconSun && iconMoon) {
    if (isDark) {
      iconMoon.classList.add("hidden");
      iconMoon.classList.add("scale-50", "-rotate-90");
      iconSun.classList.remove("hidden");
      setTimeout(() => iconSun.classList.remove("scale-50", "rotate-90"), 50);
    } else {
      iconSun.classList.add("hidden");
      iconSun.classList.add("scale-50", "rotate-90");
      iconMoon.classList.remove("hidden");
      setTimeout(() => iconMoon.classList.remove("scale-50", "-rotate-90"), 50);
    }
  }
}

window.toggleDarkMode = () => {
  const willBeDark = !document.body.classList.contains("dark-mode");
  applyTheme(willBeDark);
  localStorage.setItem("nothing_dark_mode", willBeDark);
};

const darkModeBtn = document.getElementById("dark-mode-btn") || document.querySelector('[onclick="toggleDarkMode()"]');
if (darkModeBtn) {
  darkModeBtn.addEventListener("click", window.toggleDarkMode);
  darkModeBtn.removeAttribute("onclick");
}

const savedTheme = localStorage.getItem("nothing_dark_mode");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

if (savedTheme !== null) {
  applyTheme(savedTheme === "true");
} else {
  applyTheme(systemPrefersDark.matches);
}

systemPrefersDark.addEventListener("change", (e) => {
  if (localStorage.getItem("nothing_dark_mode") === null) {
    applyTheme(e.matches);
  }
});

// Ngăn chặn thu phóng (Zoom) mặc định của trình duyệt để tạo cảm giác App Native
document.addEventListener("touchmove", function (event) {
    if (event.scale !== 1 && event.scale !== undefined) event.preventDefault();
}, { passive: false });
document.addEventListener("gesturestart", function (event) { 
    event.preventDefault(); 
});

// --- 4. KHỞI ĐỘNG TRANG ĐẦU TIÊN ---
localStorage.removeItem("my_active_tab");
let initialTab = "tab-home";
if (window.location.hash) {
  const hashTab = window.location.hash.substring(1);
  if (toolMap[hashTab]) initialTab = hashTab;
}

// Khởi chạy App sau khi DOM load
window.addEventListener("DOMContentLoaded", () => {
    switchTab(initialTab);
    initGlobalStars();
});

// =========================================
// HIỆU ỨNG BẦU TRỜI SAO TỰ ĐỘNG
// =========================================
function initGlobalStars() {
  if (document.getElementById("global-star-bg")) return;

  const starContainer = document.createElement("div");
  starContainer.id = "global-star-bg";
  const starCount = 70;

  for (let i = 0; i < starCount; i++) {
    let star = document.createElement("div");
    star.className = "global-star";

    let size = Math.random() * 1.5 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";

    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.animationDuration = Math.random() * 4 + 3 + "s";

    starContainer.appendChild(star);
  }
  document.body.appendChild(starContainer);
}

// =========================================
// GLOBAL BOTTOM SHEET MODAL (POSTS VIEW)
// =========================================
window.openBottomSheet = function(titleHtml, contentHtml, onOpenCallback, onCloseCallback) {
  const modal = document.getElementById('global-bottom-sheet');
  const container = document.getElementById('bs-container');
  const title = document.getElementById('bs-title');
  const content = document.getElementById('bs-content');
  
  if(!modal || !container) return;
  
  title.innerHTML = titleHtml;
  content.innerHTML = contentHtml;
  
  // Hiển thị modal
  modal.classList.remove('pointer-events-none', 'opacity-0');
  
  // Trượt lên
  setTimeout(() => {
    container.classList.remove('translate-y-full');
  }, 10);
  
  // Callback when open
  if (typeof onOpenCallback === 'function') {
      setTimeout(onOpenCallback, 300);
  }

  window._currentBsCloseCallback = onCloseCallback;
};

window.closeBottomSheet = function(skipCallback = false) {
  const modal = document.getElementById('global-bottom-sheet');
  const container = document.getElementById('bs-container');
  
  if(!modal || !container) return;
  
  // Trượt xuống
  container.classList.add('translate-y-full');
  
  // Ẩn modal
  setTimeout(() => {
    modal.classList.add('pointer-events-none', 'opacity-0');
    document.getElementById('bs-content').innerHTML = ""; // Clear mem
    
    if(!skipCallback && typeof window._currentBsCloseCallback === 'function') {
        window._currentBsCloseCallback();
    }
  }, 400); // Wait for transition
};

// Gắn sự kiện đóng bằng nút, backdrop, thoát bằng vuốt header
window.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById('bs-close-btn');
  const backdrop = document.getElementById('bs-backdrop');
  const header = document.getElementById('bs-header');
  
  if (closeBtn) closeBtn.addEventListener('click', () => window.closeBottomSheet());
  if (backdrop) backdrop.addEventListener('click', () => window.closeBottomSheet());
  
  // Xử lý vuốt màn hình
  if (header) {
      let startY = 0;
      let currentY = 0;
      let isDragging = false;
      const container = document.getElementById('bs-container');

      header.addEventListener('touchstart', (e) => {
          startY = e.touches[0].clientY;
          isDragging = true;
          container.style.transition = 'none';
      }, {passive: true});

      header.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          currentY = e.touches[0].clientY;
          let diff = currentY - startY;
          if (diff > 0) {
              container.style.transform = `translateY(${diff}px)`;
          }
      }, {passive: true});

      header.addEventListener('touchend', (e) => {
          if (!isDragging) return;
          isDragging = false;
          container.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
          let diff = currentY - startY;
          if (diff > 100) {
              window.closeBottomSheet();
          } else {
              container.style.transform = 'translateY(0)';
          }
      }, {passive: true});
  }
});
