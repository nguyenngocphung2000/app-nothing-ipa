export function setupTool() {
  const tabId = "tab-ereader";
  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML = `
    <style>
      :root {
          --er-bg: #ffffff;
          --er-text: #1a1a1a;
          --er-overlay-bg: rgba(255,255,255,0.95);
          --er-border: #e0e0e0;
          --er-primary: #111111;
      }
      
      .ereader-app[data-theme="dark"] {
          --er-bg: #121212;
          --er-text: #e0e0e0;
          --er-overlay-bg: rgba(30,30,30,0.95);
          --er-border: #333333;
          --er-primary: #ffffff;
      }

      .ereader-app[data-theme="sepia"] {
          --er-bg: #fbf0d9;
          --er-text: #5f4b32;
          --er-overlay-bg: rgba(251,240,217,0.95);
          --er-border: #e2d3b2;
          --er-primary: #5f4b32;
      }

      /* Home Screen - Normal flow */
      .ereader-home {
          min-height: 70vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--er-bg);
          color: var(--er-text);
          transition: background 0.3s, color 0.3s;
          border-radius: 1.5rem;
          padding: 2rem;
      }

      /* Reader Screen - Fixed full screen like an app */
      .ereader-reader {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--er-bg);
          color: var(--er-text);
          z-index: 99999;
          display: none;
          flex-direction: column;
          overflow: hidden;
      }

      .ereader-reader.active { display: flex; }

      /* Control Overlays */
      .er-overlay {
          position: absolute;
          left: 0; right: 0;
          background: var(--er-overlay-bg);
          backdrop-filter: blur(8px);
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          border-color: var(--er-border);
      }
      
      .er-header {
          top: 0;
          height: 60px;
          border-bottom: 1px solid var(--er-border);
          justify-content: space-between;
          padding: 0 1rem;
          transform: translateY(-100%);
      }

      .er-footer {
          bottom: 0;
          height: 50px;
          border-top: 1px solid var(--er-border);
          justify-content: center;
          padding: 0 1rem;
          flex-direction: column;
          transform: translateY(100%);
      }

      .er-overlay.show { transform: translateY(0); }

      /* Touch Zones for Kindle-like navigation */
      .er-touch-zones {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
      }
      .er-zone-left { flex: 0 0 25%; }
      .er-zone-center { flex: 1; }
      .er-zone-right { flex: 0 0 25%; }

      /* Content Mount */
      .er-mount {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden; /* we manage scrolling inside or via pagination */
          display: flex;
          justify-content: center;
      }

      /* Specific mount setups */
      .er-mount.mode-scroll { overflow-y: auto; overflow-x: hidden; }
      .er-mount.mode-paginate { overflow: hidden; } /* JS or css columns handles pagination */

      /* Format styling */
      #er-text-content {
          padding: 40px 20px;
          max-width: 800px;
          width: 100%;
          line-height: inherit;
          font-family: inherit;
          white-space: pre-wrap;
          word-wrap: break-word;
      }
      
      /* Text Pagination Trick (CSS Columns) */
      .er-mount.mode-paginate #er-text-content {
          column-width: 100vw;
          column-gap: 0;
          height: 100vh;
          padding: 40px 5vw;
          box-sizing: border-box;
          max-width: none;
      }

      /* Epub/PDF iframe/canvas containers */
      #er-epub-view { width: 100%; height: 100%; max-width: 900px; }
      #er-pdf-view { width: 100%; display: flex; flex-direction: column; align-items: center; }
      .er-mount.mode-scroll #er-pdf-view canvas { margin-bottom: 20px; max-width: 100%; }
      .er-mount.mode-paginate #er-pdf-view canvas { max-height: 100vh; max-width: 100%; object-fit: contain; }

      /* Buttons & Typography */
      .er-icon-btn {
          background: transparent; border: none; color: var(--er-primary);
          font-size: 1.2rem; cursor: pointer; padding: 0.5rem;
          font-weight: bold;
      }
      .er-title {
          font-weight: 700; font-size: 1rem; color: var(--er-primary);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 50%;
          text-align: center; font-family: sans-serif;
      }

      /* Settings Modal */
      .er-settings {
          position: fixed; top: 65px; right: 1rem;
          background: var(--er-overlay-bg);
          border: 1px solid var(--er-border);
          border-radius: 12px;
          padding: 1rem;
          z-index: 100;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          display: none;
          flex-direction: column;
          gap: 1rem;
          min-width: 250px;
      }
      .er-settings.show { display: flex; }

      .er-setting-row { display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; }
      .er-setting-label { font-size: 0.85rem; font-weight: bold; color: var(--er-text); opacity: 0.8; }
      .er-chip-group { display: flex; gap: 0.3rem; background: rgba(128,128,128,0.1); padding: 0.2rem; border-radius: 8px;}
      .er-chip {
          padding: 0.4rem 0.8rem; border-radius: 6px; font-size: 0.8rem; font-weight: bold;
          cursor: pointer; background: transparent; border: none; color: var(--er-text);
      }
      .er-chip.active { background: var(--er-bg); box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

      /* TOC Modal */
      .er-toc-modal {
          position: fixed; top: 0; left: -100%; bottom: 0; width: 80%; max-width: 350px;
          background: var(--er-overlay-bg); border-right: 1px solid var(--er-border);
          z-index: 100; transition: left 0.3s;
          display: flex; flex-direction: column; overflow-y: auto;
      }
      .er-toc-modal.show { left: 0; }
      .er-toc-item {
          padding: 1rem; border-bottom: 1px solid var(--er-border); cursor: pointer; color: var(--er-text);
          font-size: 0.95rem; display: block; text-decoration: none;
      }
      .er-toc-item:hover { background: rgba(128,128,128,0.1); }

      .er-file-input { display: none; }
      
      .er-primary-btn {
          background: #3b82f6; color: #fff; padding: 1rem 2rem; border-radius: 99px;
          font-weight: 800; font-size: 1.1rem; cursor: pointer; display: inline-flex; align-items: center;
          gap: 0.5rem; border: none; box-shadow: 0 4px 6px rgba(59,130,246,0.3); transition: transform 0.2s;
      }
      .er-primary-btn:active { transform: scale(0.95); }
      
      .er-progress-bar { width: 100%; height: 3px; background: rgba(128,128,128,0.2); margin: 0 auto; max-width: 300px; border-radius: 3px; overflow: hidden; }
      .er-progress-fill { width: 0%; height: 100%; background: var(--er-primary); transition: width 0.3s; }
      
      #er-loading {
          position: fixed; inset: 0; background: var(--er-bg); z-index: 100000;
          display: none; flex-direction: column; align-items: center; justify-content: center;
          color: var(--er-text);
      }
      .er-spinner {
          width: 40px; height: 40px; border: 4px solid var(--er-border); border-top-color: var(--er-primary); border-radius: 50%; animation: spin 1s linear infinite;
      }
      @keyframes spin {100%{transform:rotate(360deg)}}
    </style>

    <div class="ereader-app" data-theme="light">
        
        <!-- HOME SCREEN -->
        <div class="ereader-home" id="er-home">
            <h1 class="text-[32px] md:text-[44px] font-black tracking-tighter leading-none mb-2" style="color: var(--er-text)">Web E-Reader</h1>
            <p class="mb-4 opacity-60 text-center max-w-sm text-[12px] font-medium" style="color: var(--er-text)">
                Trình đọc sách chuyên nghiệp UX Kindle. Hỗ trợ EPUB, PDF, TXT.
            </p>
            <label class="group relative cursor-pointer">
                <span class="er-primary-btn bg-slate-800 dark:bg-white text-white dark:text-slate-900 group-active:scale-95 transition-transform flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="m9 15 3-3 3 3"/></svg>
                    <span class="text-[14px]">MỞ TỆP SÁCH</span>
                </span>
                <input type="file" id="er-file-loader" class="er-file-input" accept=".epub,.pdf,.txt,.md,.html" />
            </label>
            <div class="mt-8 text-center text-[10px] opacity-40 uppercase tracking-widest font-bold" style="color: var(--er-text)">Auto Memory Clearing (Nhẹ & Không Rác)</div>
        </div>

        <!-- READER SCREEN -->
        <div class="ereader-reader" id="er-reader">
            
            <!-- Mount (Content goes here) -->
            <div class="er-mount mode-paginated" id="er-mount">
                <div id="er-text-content" style="display:none;"></div>
                <div id="er-epub-view" style="display:none;"></div>
                <div id="er-pdf-view" style="display:none;"></div>
            </div>

            <!-- Touch Zones -->
            <div class="er-touch-zones">
                <div class="er-zone-left" id="zone-prev"></div>
                <div class="er-zone-center" id="zone-toggle"></div>
                <div class="er-zone-right" id="zone-next"></div>
            </div>

            <!-- Header -->
            <div class="er-header er-overlay" id="er-header">
                <button class="er-icon-btn group focus:outline-none" id="btn-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div class="er-title" id="book-title">Tên sách</div>
                <div style="display:flex; gap: 0.5rem">
                    <button class="er-icon-btn group focus:outline-none" id="btn-toc">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                    </button>
                    <button class="er-icon-btn group focus:outline-none" id="btn-settings">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-slate-500 group-hover:text-orange-500 transition-colors"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg>
                    </button>
                </div>
            </div>

            <!-- Footer -->
            <div class="er-footer er-overlay" id="er-footer">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: bold; width: 100%; max-width: 300px; margin: 0 auto 5px auto; opacity: 0.6">
                    <span id="er-loc">Loc 1</span>
                    <span id="er-perc">0%</span>
                </div>
                <div class="er-progress-bar"><div class="er-progress-fill" id="er-prog-fill"></div></div>
            </div>

            <!-- Settings -->
            <div class="er-settings" id="er-settings">
                <div class="er-setting-row">
                    <span class="er-setting-label">Giao diện</span>
                    <div class="er-chip-group">
                        <button class="er-chip active" data-opt="theme" data-val="light">Sáng</button>
                        <button class="er-chip" data-opt="theme" data-val="sepia">Vàng</button>
                        <button class="er-chip" data-opt="theme" data-val="dark">Tối</button>
                    </div>
                </div>
                <div class="er-setting-row">
                    <span class="er-setting-label">Cỡ chữ</span>
                    <div class="er-chip-group">
                        <button class="er-chip" data-opt="size" data-val="90">A-</button>
                        <button class="er-chip active" data-opt="size" data-val="100">Chuẩn</button>
                        <button class="er-chip" data-opt="size" data-val="120">A+</button>
                        <button class="er-chip" data-opt="size" data-val="140">A++</button>
                    </div>
                </div>
                <div class="er-setting-row">
                    <span class="er-setting-label">Kiểu đọc</span>
                    <div class="er-chip-group">
                        <button class="er-chip active" data-opt="layout" data-val="paginate">Lật trang</button>
                        <button class="er-chip" data-opt="layout" data-val="scroll">Cuộn dọC</button>
                    </div>
                </div>
            </div>

            <!-- Table Of Contents -->
            <div class="er-toc-modal" id="er-toc">
                <div style="padding: 1rem; font-weight: 900; border-bottom: 2px solid var(--er-border); color: var(--er-primary);">MỤC LỤC</div>
                <div id="er-toc-list"></div>
            </div>
        </div>

        <!-- Loading -->
        <div id="er-loading">
            <div class="er-spinner mb-4"></div>
            <div class="font-bold">Đang xử lý nội dung...</div>
        </div>
    </div>
  `;
  document.getElementById("app-container").appendChild(panel);

  // Tham chiếu DOM
  const appContainer = document.querySelector(".ereader-app");
  const homeScreen = document.getElementById("er-home");
  const readerScreen = document.getElementById("er-reader");
  const fileLoader = document.getElementById("er-file-loader");
  const loadingDisplay = document.getElementById("er-loading");

  const btnBack = document.getElementById("btn-back");
  const btnSettings = document.getElementById("btn-settings");
  const btnToc = document.getElementById("btn-toc");
  const overlayHeader = document.getElementById("er-header");
  const overlayFooter = document.getElementById("er-footer");
  const settingsModal = document.getElementById("er-settings");
  const tocModal = document.getElementById("er-toc");
  const tocList = document.getElementById("er-toc-list");
  
  const mountArea = document.getElementById("er-mount");
  const textContent = document.getElementById("er-text-content");
  const epubView = document.getElementById("er-epub-view");
  const pdfView = document.getElementById("er-pdf-view");
  const progFill = document.getElementById("er-prog-fill");
  const percText = document.getElementById("er-perc");
  const titleText = document.getElementById("book-title");

  // State cấu hình
  let config = {
      theme: localStorage.getItem('ereader_theme') || 'light',
      size: localStorage.getItem('ereader_size') || '100',
      layout: localStorage.getItem('ereader_layout') || 'paginate'
  };

  function applySettings() {
      // Theme
      appContainer.setAttribute("data-theme", config.theme);
      
      // Styling epub
      if(epubRendition) {
          try {
              epubRendition.themes.select(config.theme);
              epubRendition.themes.fontSize(config.size + "%");
          } catch(e){}
      }
      
      // Styling text
      textContent.style.fontSize = (parseInt(config.size) / 100 * 1.15) + "rem";
      
      // Layout
      mountArea.className = "er-mount mode-" + config.layout;

      // Update chips UI
      document.querySelectorAll(".er-chip").forEach(c => {
          if(c.dataset.val === config[c.dataset.opt]) c.classList.add("active");
          else c.classList.remove("active");
      });
  }

  // Bind settings buttons
  document.querySelectorAll(".er-chip").forEach(btn => {
      btn.addEventListener("click", () => {
          config[btn.dataset.opt] = btn.dataset.val;
          localStorage.setItem('ereader_' + btn.dataset.opt, btn.dataset.val);
          applySettings();
          
          if(btn.dataset.opt === 'layout') {
              // Reload mode if necessary logic demands layout change
              if(currentFormat === 'epub' && epubBook) {
                  // Epub requires full recreation of rendition to switch layout
                  loadingDisplay.style.display = "flex";
                  setTimeout(() => softReloadEpub(), 100);
              }
              if(currentFormat === 'pdf') {
                  renderPDFPageLogic();
              }
              if(currentFormat === 'txt') {
                  textCurrentScroll = 0;
                  syncTextPagination();
              }
          }
      });
  });

  // State đọc
  let extLibsLoaded = false;
  let currentFile = null;
  let currentFormat = ""; // epub, pdf, txt
  let epubBook = null;
  let epubRendition = null;
  let pdfDoc = null;
  let pdfCurrentPage = 1;
  let textCurrentScroll = 0; // For txt pagination trick (translateX via scrolling the scrollLeft)

  function loadExternalScripts(cb) {
      if(extLibsLoaded) return cb();
      loadingDisplay.style.display = "flex";
      let loaded = 0;
      const scripts = [
          { id: "jszip-js", src: "js/libs/jszip.min.js" },
          { id: "epub-js", src: "js/libs/epub.min.js" },
          { id: "pdf-js", src: "js/libs/pdf.min.js" }
      ];
      scripts.forEach(s => {
          if (document.getElementById(s.id)) checkLoaded();
          else {
              let scriptEl = document.createElement("script");
              scriptEl.id = s.id; scriptEl.src = s.src;
              scriptEl.onload = checkLoaded; document.head.appendChild(scriptEl);
          }
      });
      function checkLoaded() {
          loaded++;
          if (loaded === scripts.length) {
              if (window.pdfjsLib) window.pdfjsLib.GlobalWorkerOptions.workerSrc = "js/libs/pdf.worker.min.js";
              extLibsLoaded = true;
              cb();
          }
      }
  }

  // --- TRÌNH BÀY GIAO DIỆN (UI INTERACTION) ---
  function toggleOverlay() {
      overlayHeader.classList.toggle("show");
      overlayFooter.classList.toggle("show");
      settingsModal.classList.remove("show");
      tocModal.classList.remove("show");
  }

  document.getElementById("zone-toggle").addEventListener("click", toggleOverlay);
  btnSettings.addEventListener("click", () => settingsModal.classList.toggle("show"));
  btnToc.addEventListener("click", () => tocModal.classList.toggle("show"));
  
  btnBack.addEventListener("click", () => {
      readerScreen.classList.remove("active");
      homeScreen.style.display = "flex";
      // Đọc xong xóa (Xóa RAM giải phóng bộ nhớ)
      if(epubBook) { epubBook.destroy(); epubBook = null; }
      pdfDoc = null;
      textContent.innerHTML = "";
      fileLoader.value = "";
      currentFile = null;
      document.body.style.overflow = "auto";
  });

  document.getElementById("zone-prev").addEventListener("click", navPrev);
  document.getElementById("zone-next").addEventListener("click", navNext);

  // Quản lý vuốt (Swiping) bằng touch event
  let touchStartX = 0;
  mountArea.addEventListener("touchstart", e => touchStartX = e.changedTouches[0].screenX, {passive: true});
  mountArea.addEventListener("touchend", e => {
      let touchEndX = e.changedTouches[0].screenX;
      if (touchEndX - touchStartX > 50) navPrev();
      if (touchStartX - touchEndX > 50) navNext();
  }, {passive: true});

  // Hotkeys
  document.addEventListener("keydown", e => {
      if(!currentFile) return;
      if(e.key === "ArrowLeft") navPrev();
      if(e.key === "ArrowRight") navNext();
      if(e.key === "Escape") toggleOverlay();
  });


  // --- CÔNG CỤ ĐỌC & LẬT TRANG (ENGINE) ---
  function navPrev() {
      if(config.layout === 'scroll') return; // Không can thiệp nếu cuộn
      
      if(currentFormat === 'epub' && epubRendition) epubRendition.prev();
      if(currentFormat === 'pdf' && pdfCurrentPage > 1) {
          pdfCurrentPage--; renderPDFPageLogic(); saveProgress(pdfCurrentPage);
      }
      if(currentFormat === 'txt') {
          let colWidth = mountArea.clientWidth;
          textCurrentScroll = Math.max(0, textCurrentScroll - colWidth);
          mountArea.scrollTo({left: textCurrentScroll, behavior: 'smooth'});
      }
  }

  function navNext() {
      if(config.layout === 'scroll') return;
      
      if(currentFormat === 'epub' && epubRendition) epubRendition.next();
      if(currentFormat === 'pdf' && pdfCurrentPage < pdfDoc.numPages) {
          pdfCurrentPage++; renderPDFPageLogic(); saveProgress(pdfCurrentPage); 
      }
      if(currentFormat === 'txt') {
          let colWidth = mountArea.clientWidth;
          let maxScroll = textContent.scrollWidth - colWidth;
          textCurrentScroll = Math.min(maxScroll, textCurrentScroll + colWidth);
          mountArea.scrollTo({left: textCurrentScroll, behavior: 'smooth'});
      }
  }

  // --- KÍCH HOẠT LOAD FILE ---
  fileLoader.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      currentFile = file.name;
      titleText.innerText = currentFile.substring(0, 30);
      
      homeScreen.style.display = "none";
      readerScreen.classList.add("active");
      document.body.style.overflow = "hidden"; // Khóa cuộn trang web ngoài
      
      // Cleanup
      textContent.style.display = "none";
      epubView.style.display = "none";
      pdfView.style.display = "none";
      tocList.innerHTML = `<div class="p-4 opacity-50">Không có mục lục...</div>`;
      
      let ext = file.name.split('.').pop().toLowerCase();
      applySettings();
      loadExternalScripts(() => {
          if (ext === "epub") { currentFormat = "epub"; initEpub(file); }
          else if (ext === "pdf") { currentFormat = "pdf"; initPdf(file); }
          else { currentFormat = "txt"; initText(file); }
      });
  });

  // --- EPUB ENGINE ---
  function initEpub(file) {
      epubView.style.display = "block";
      const reader = new FileReader();
      reader.onload = e => {
          epubBook = ePub(e.target.result);
          softReloadEpub(); // Render theo config.layout
          
          epubBook.loaded.navigation.then(nav => {
              tocList.innerHTML = "";
              nav.forEach(item => {
                  let a = document.createElement("div");
                  a.className = "er-toc-item";
                  a.innerText = item.label.trim();
                  a.onclick = () => { epubRendition.display(item.href); tocModal.classList.remove("show"); };
                  tocList.appendChild(a);
              });
          });
      };
      reader.readAsArrayBuffer(file);
  }

  function softReloadEpub() {
      if(epubRendition) epubRendition.destroy();
      epubRendition = epubBook.renderTo(epubView, {
          width: "100%", height: "100%",
          flow: config.layout === "scroll" ? "scrolled-doc" : "paginated",
          manager: "continuous"
      });
      
      // Inject Themes
      epubRendition.themes.register("light", { "body": { "background": "transparent !important", "color": "#1a1a1a !important" } });
      epubRendition.themes.register("dark", { "body": { "background": "transparent !important", "color": "#e0e0e0 !important" } });
      epubRendition.themes.register("sepia", { "body": { "background": "transparent !important", "color": "#5f4b32 !important" } });
      applySettings();
      
      let savedLoc = getSavedLocation();
      epubRendition.display(savedLoc || undefined);

      epubRendition.on("relocated", location => {
          if (!location) return;
          saveLocation(location.start.cfi);
          let perc = Math.round(epubBook.locations.percentageFromCfi(location.start.cfi) * 100);
          updateProgress(perc, epubBook.locations.total ? "Loc " + location.start.location : "Đang tính toán...");
      });
      
      // Location generation for percentage accuracy (heavy but standard)
      epubBook.ready.then(() => epubBook.locations.generate(1600)).then(() => {
          // Trigger relocate để render số phần trăm đúng
          let loc = epubRendition.currentLocation();
          if(loc && loc.start) {
              let perc = Math.round(epubBook.locations.percentageFromCfi(loc.start.cfi) * 100);
              updateProgress(perc, "Loc " + loc.start.location);
          }
      });

      loadingDisplay.style.display = "none";
  }

  // --- PDF ENGINE ---
  function initPdf(file) {
      pdfView.style.display = "flex";
      loadingDisplay.style.display = "flex";
      const reader = new FileReader();
      reader.onload = async e => {
          pdfDoc = await pdfjsLib.getDocument(e.target.result).promise;
          let saved = getSavedLocation();
          pdfCurrentPage = saved ? parseInt(saved) : 1;
          renderPDFPageLogic();
          loadingDisplay.style.display = "none";
      };
      reader.readAsArrayBuffer(file);
  }

  function renderPDFPageLogic() {
      pdfView.innerHTML = "";
      if (config.layout === 'paginate') {
          // Render Single Page
          renderCanvasForPdfPage(pdfCurrentPage, pdfView);
          let perc = Math.round((pdfCurrentPage / pdfDoc.numPages) * 100);
          updateProgress(perc, "Trang " + pdfCurrentPage + " / " + pdfDoc.numPages);
      } else {
          // Render all pages for scrolling (simplified)
          for(let i=1; i<=pdfDoc.numPages; i++) {
              let container = document.createElement("div");
              pdfView.appendChild(container);
              // Using basic Intersection Observer here if needed, or straight render for small files
              // To keep it simple & Kindle-like, PDF should strictly follow paginate. But if user insists on scroll:
              renderCanvasForPdfPage(i, container);
          }
          pdfView.style.overflowY = "auto";
          updateProgress(100, "Tổng " + pdfDoc.numPages + " trang");
      }
  }

  async function renderCanvasForPdfPage(pageNum, container) {
      const page = await pdfDoc.getPage(pageNum);
      let viewport = page.getViewport({ scale: 1 });
      let w = window.innerWidth;
      let scale = w / viewport.width;
      if(config.layout === 'paginate') {
          let h = window.innerHeight;
          let scaleH = h / viewport.height;
          scale = Math.min(scale, scaleH);
      }
      viewport = page.getViewport({ scale: scale * window.devicePixelRatio });
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = viewport.width; canvas.height = viewport.height;
      container.appendChild(canvas);
      await page.render({ canvasContext: ctx, viewport: viewport }).promise;
  }

  // --- TEXT ENGINE ---
  function initText(file) {
      textContent.style.display = "block";
      const reader = new FileReader();
      reader.onload = e => {
          textContent.textContent = e.target.result;
          let savedScroll = getSavedLocation();
          if(savedScroll) textCurrentScroll = parseInt(savedScroll);
          syncTextPagination();
      };
      reader.readAsText(file);
  }

  function syncTextPagination() {
      if(config.layout === 'paginate') {
          mountArea.scrollTo({left: textCurrentScroll});
          // Estimate % via scrollLeft max
          setTimeout(() => {
              let max = textContent.scrollWidth - mountArea.clientWidth;
              let perc = max > 0 ? Math.round((textCurrentScroll / max) * 100) : 100;
              updateProgress(perc, "TXT File");
          }, 100);
      } else {
          mountArea.scrollTo({top: textCurrentScroll});
      }
  }

  // Update progress bar helper
  function updateProgress(perc, locStr) {
      percText.innerText = Math.min(100, Math.max(0, perc)) + "%";
      progFill.style.width = perc + "%";
      document.getElementById("er-loc").innerText = locStr || "";
  }

  // Database Memory helpers
  function saveLocation(val) {
      if(!currentFile) return;
      localStorage.setItem("ereader_prog_" + currentFile, val);
  }
  function getSavedLocation() {
      return currentFile ? localStorage.getItem("ereader_prog_" + currentFile) : null;
  }
}
