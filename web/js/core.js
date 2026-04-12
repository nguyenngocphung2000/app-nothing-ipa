/* ==========================================================
   LÕI HỆ THỐNG
========================================================== */

// --- 1. BẢN ĐỒ MENU ---
const menuConfig = [
  { id: "tab-home", name: "Trang Chủ" },
  { id: "tab-calc", name: "Tính Toán" },
  { id: "tab-finance", name: "Lãi Suất" },
  { id: "tab-calendar", name: "Lịch Vạn Niên" },
  { id: "tab-time-calc", name: "Thời Gian" },
  { id: "tab-baby-name", name: "Đặt Tên Con" },
  { id: "tab-xiangqi", name: "Cờ Tướng" },
  { id: "tab-wheel", name: "Quay ngẫu nhiên" },
  { id: "tab-html-runner", name: "HTML Runner" },
  { id: "tab-image-to-svg", name: "Tạo ảnh SVG" },
  { id: "tab-ereader", name: "Đọc Sách" },
];

// --- 2. BỘ ĐỊNH TUYẾN (LAZY LOAD MAP) ---
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

// --- 3. KHAI BÁO CÁC PHẦN TỬ GIAO DIỆN ---
const desktopNav = document.getElementById("desktop-nav");
const mobileNav = document.getElementById("mobile-nav");
const mobileMenu = document.getElementById("mobile-menu");
const mainHeader = document.getElementById("main-header");

if (mobileMenu) {
  mobileMenu.classList.add(
    "max-h-[70vh]",
    "overflow-y-auto",
    "custom-scrollbar",
  );
}

// --- 4. HÀM TẠO MENU (KHÔNG ICON, TỐI ƯU TYPOGRAPHY) ---
if (desktopNav && mobileNav) {
  desktopNav.innerHTML = "";
  mobileNav.innerHTML = "";
  menuConfig.forEach((tool) => {
    desktopNav.innerHTML += `
            <button onclick="switchTab('${tool.id}')" data-target="${tool.id}" 
                class="nav-btn flex items-center px-4 py-2 text-gray-500 hover:text-orange-500 transition rounded-xl hover:bg-orange-50/50 text-[12px] font-bold uppercase tracking-wider">
                <span>${tool.name}</span>
            </button>`;

    mobileNav.innerHTML += `
            <button onclick="switchTab('${tool.id}')" data-target="${tool.id}" 
                class="mobile-nav-btn block w-full px-6 py-4 text-left text-gray-600 hover:bg-orange-50 transition border-l-4 border-transparent hover:border-orange-500 text-[13px] font-bold uppercase tracking-widest">
                ${tool.name}
            </button>`;
  });
}

// --- 5. HÀM CHUYỂN TAB (ĐÃ FIX LỖI KẸT LINK ?POST) ---
window.switchTab = async function (tabId) {
  document.querySelectorAll(".tab-panel").forEach((p) => {
    p.classList.remove("active");
    p.style.display = "none";
  });
  document
    .querySelectorAll(".nav-btn, .mobile-nav-btn")
    .forEach((b) => b.classList.remove("active"));

  if (mobileMenu) mobileMenu.classList.add("hidden");

  let targetPanel = document.getElementById(tabId);

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
    document.querySelectorAll(".tab-panel").forEach((p) => {
      p.classList.remove("active");
      p.style.display = "none";
    });
    targetPanel.classList.add("active");
    targetPanel.style.display = "block";

    document
      .querySelectorAll(`[data-target="${tabId}"]`)
      .forEach((b) => b.classList.add("active"));

    // --- XỬ LÝ LÀM SẠCH URL TẠI ĐÂY ---
    const newUrl = new URL(window.location);
    if (tabId !== "tab-home") {
      // Nếu nhảy sang tab khác, tự động xóa đuôi ?post= đi
      newUrl.searchParams.delete("post");
    }
    newUrl.hash = tabId;
    window.history.replaceState(null, null, newUrl);
  }
};

// --- 6. HÀM CHUYỂN ĐỔI VÀ ĐỒNG BỘ DARK MODE ---
function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark");
    document.body.classList.remove("dark-mode");
  }

  const textSun = document.getElementById("text-sun");
  const textMoon = document.getElementById("text-moon");
  if (textSun && textMoon) {
    if (isDark) {
      textSun.classList.remove("hidden");
      textMoon.classList.add("hidden");
    } else {
      textSun.classList.add("hidden");
      textMoon.classList.remove("hidden");
    }
  }
}

window.toggleDarkMode = () => {
  const willBeDark = !document.body.classList.contains("dark-mode");
  applyTheme(willBeDark);
  localStorage.setItem("nothing_dark_mode", willBeDark);
};

// ==========================================================
// GẮN SỰ KIỆN TRỰC TIẾP
// ==========================================================

if (mainHeader) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("header-scrolled");
    } else {
      mainHeader.classList.remove("header-scrolled");
    }
  });
}

const mobileMenuBtn = document.getElementById("mobile-menu-btn");
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    const isMenuOpen = !mobileMenu.classList.contains("hidden");

    if (isMenuOpen) {
      if (
        !mobileMenu.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
      }
    }
  });
}

const darkModeBtn =
  document.getElementById("dark-mode-btn") ||
  document.querySelector('[onclick="toggleDarkMode()"]');
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

document.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale !== 1 && event.scale !== undefined) event.preventDefault();
  },
  { passive: false },
);
document.addEventListener("gesturestart", function (event) {
  event.preventDefault();
});

localStorage.removeItem("my_active_tab");
let initialTab = "tab-home";
if (window.location.hash) {
  const hashTab = window.location.hash.substring(1);
  if (toolMap[hashTab]) initialTab = hashTab;
}
switchTab(initialTab);

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

document.addEventListener("DOMContentLoaded", initGlobalStars);
