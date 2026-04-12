export function setupTool() {
  const tabId = "tab-image-to-svg";
  if (document.getElementById(tabId)) return;

  const panel = document.createElement("div");
  panel.id = tabId;
  panel.className = "tab-panel active";

  panel.innerHTML =
    "<style>" +
    "body.dark-mode .svg-card { background-image: linear-gradient(to bottom right, #1e293b, #0f172a) !important; border-color: #334155 !important; } " +
    "body.dark-mode .svg-input { background-color: rgba(15, 23, 42, 0.6) !important; border-color: #334155 !important; color: #f8fafc !important; } " +
    "body.dark-mode .svg-preview-box { background-color: rgba(15, 23, 42, 0.4) !important; border-color: #334155 !important; } " +
    ".is-round .cropper-view-box, .is-round .cropper-face { border-radius: 50%; } " +
    "</style>" +
    '<link rel="stylesheet" href="js/libs/cropper.min.css" />' +
    '<div class="text-center mb-8">' +
    '<span class="bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-blue-200">Hiệu năng cao</span>' +
    '<h2 class="text-3xl font-bold mt-2 text-slate-800">Chuyển Ảnh Sang <span class="text-blue-500">Vector SVG</span></h2>' +
    '<p class="text-[11px] text-slate-500 italic mt-2 max-w-2xl mx-auto px-4">Tích hợp thuật toán Auto-Resize và Khử nhiễu. Tránh đơ trình duyệt trên thiết bị di động.</p>' +
    "</div>" +
    '<div class="w-full max-w-[1600px] mx-auto pb-10 px-4 lg:px-8 xl:px-12">' +
    '<div class="grid grid-cols-1 lg:grid-cols-3 items-stretch gap-6 lg:gap-8">' +
    '<div class="w-full h-full">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 svg-card h-full flex flex-col">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Tải Lên & Cắt Ảnh</h3></div>' +
    '<div class="mt-4 relative overflow-hidden w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl border border-slate-200 transition active:scale-95 flex justify-center items-center gap-2 text-[12px] uppercase tracking-wide cursor-pointer svg-input shrink-0">' +
    "<span>Tải ảnh lên (JPG, PNG)</span>" +
    '<input type="file" id="svg-tool-input" accept="image/png, image/jpeg" class="absolute inset-0 opacity-0 cursor-pointer" />' +
    "</div>" +
    '<div class="mt-3 flex gap-2 shrink-0">' +
    '<button class="svg-tool-ratio w-full bg-blue-500 text-white border border-blue-500 py-2.5 rounded-lg font-bold shadow-sm transition active:scale-95 text-[10px] uppercase" data-ratio="NaN">Tự do</button>' +
    '<button class="svg-tool-ratio w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg font-bold shadow-sm transition active:scale-95 text-[10px] uppercase svg-input" data-ratio="1">1:1</button>' +
    '<button class="svg-tool-ratio w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg font-bold shadow-sm transition active:scale-95 text-[10px] uppercase svg-input" data-ratio="1" data-round="true">Tròn</button>' +
    '<button class="svg-tool-ratio w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg font-bold shadow-sm transition active:scale-95 text-[10px] uppercase svg-input" data-ratio="1.33333333">4:3</button>' +
    '<button class="svg-tool-ratio w-full bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg font-bold shadow-sm transition active:scale-95 text-[10px] uppercase svg-input" data-ratio="1.77777778">16:9</button>' +
    "</div>" +
    '<div class="mt-4 w-full min-h-[300px] flex-1 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative svg-preview-box">' +
    '<img id="svg-tool-image" src="" style="display: none; max-width: 100%; max-height: 100%;" alt="Workspace">' +
    '<span id="svg-tool-placeholder" class="text-[11px] font-bold text-slate-400">Chưa có ảnh</span>' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="w-full h-full">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 svg-card h-full flex flex-col">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Cấu Hình Biến Đổi</h3></div>' +
    '<div class="mt-4 bg-slate-50 rounded-xl p-5 border border-slate-200 svg-input flex-1 flex flex-col">' +
    '<div class="flex justify-between items-center mb-2">' +
    '<span class="text-[12px] font-bold text-slate-600">Mức độ chi tiết:</span>' +
    '<span id="svg-tool-color-val" class="text-[12px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">16 màu</span>' +
    "</div>" +
    '<input type="range" id="svg-tool-slider" min="2" max="64" value="16" step="2" class="w-full cursor-pointer accent-blue-500 mb-3">' +
    '<ul class="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4 mb-4">' +
    "<li><strong>2 - 4 màu:</strong> Icon, Logo, Chữ viết (Nhanh).</li>" +
    "<li><strong>8 - 16 màu:</strong> Hình 2D, Minh hoạ (Cân bằng).</li>" +
    '<li><strong class="text-red-500">32 - 64 màu:</strong> Ảnh chụp (Nặng, xử lý chậm).</li>' +
    "</ul>" +
    '<p class="text-[10px] text-slate-500 italic pb-4 border-b border-slate-200">Ảnh sẽ được tự động thu nhỏ (tối đa 800px) để không làm đơ máy.</p>' +
    '<div class="mt-4">' +
    '<label class="flex items-start gap-2 cursor-pointer">' +
    '<input type="checkbox" id="svg-tool-sharp-mode" class="mt-0.5 w-4 h-4 text-blue-500 rounded border-slate-300 cursor-pointer">' +
    '<div class="flex-1">' +
    '<span class="text-[12px] font-bold text-slate-700 block">Tối ưu cho ảnh có Chữ / Mã vạch</span>' +
    '<span class="text-[10px] text-slate-500 italic block mt-1">Giữ góc sắc nét, không bị bo tròn. Hãy cắt (crop) thật sát vào vùng chữ để viền rõ nhất.</span>' +
    "</div>" +
    "</label>" +
    "</div>" +
    "</div>" +
    '<button id="svg-tool-btn-convert" disabled class="mt-4 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-[13px] uppercase tracking-wide shrink-0 mt-auto">' +
    "Cắt & Tạo SVG" +
    "</button>" +
    "</div>" +
    "</div>" +
    '<div class="w-full h-full">' +
    '<div class="bg-white/90 backdrop-blur-md p-5 rounded-3xl shadow-sm border border-slate-100 relative svg-card h-full flex flex-col">' +
    '<div class="border-b border-slate-200 pb-3 shrink-0"><h3 class="font-bold text-slate-700 text-[13px] uppercase text-center md:text-left">Kết Quả Đầu Ra</h3></div>' +
    '<div class="mt-4 w-full min-h-[220px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl p-2 flex items-center justify-center overflow-hidden svg-preview-box shrink-0">' +
    '<img id="svg-tool-preview-img" src="" style="display: none; width: 100%; height: 100%; object-fit: contain;" alt="SVG Preview" />' +
    '<span id="svg-tool-preview-text" class="text-[11px] font-bold text-slate-400">Kết quả SVG</span>' +
    "</div>" +
    '<div class="mt-4 flex-1 flex flex-col min-h-[140px]">' +
    '<label class="text-[11px] font-bold text-slate-400 uppercase mb-1.5 block ml-1">Mã Source Code SVG</label>' +
    '<textarea id="svg-tool-code" readonly class="svg-input w-full flex-1 bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-[11px] font-mono text-slate-700 outline-none custom-scrollbar resize-none" placeholder="<svg>...</svg>"></textarea>' +
    "</div>" +
    '<div class="mt-4 flex gap-2 shrink-0 mt-auto">' +
    '<button id="svg-tool-btn-copy" disabled class="w-1/3 disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200 disabled:cursor-not-allowed bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3.5 rounded-xl shadow-sm border border-blue-200 transition active:scale-95 text-[11px] uppercase text-center flex items-center justify-center">Copy</button>' +
    '<button id="svg-tool-btn-download" disabled class="w-2/3 disabled:bg-slate-300 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white font-black py-3.5 rounded-xl shadow-md transition active:scale-95 flex justify-center items-center gap-2 text-[12px] uppercase tracking-wide">' +
    '<span id="svg-tool-dl-text">Tải File SVG</span>' +
    "</button>" +
    "</div>" +
    '<div id="svg-tool-loading" class="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 rounded-3xl hidden flex-col items-center justify-center">' +
    '<div class="w-10 h-10 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-3"></div>' +
    '<h3 class="font-bold text-blue-500 text-sm uppercase tracking-wide">Đang Xử Lý Vector...</h3>' +
    '<p class="text-[10px] text-slate-500 mt-1">Vui lòng đợi nhé!</p>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  document.getElementById("app-container").appendChild(panel);

  function loadExternalScripts(callback) {
    let loaded = 0;
    const scripts = [
      {
        id: "script-cropper",
        src: "js/libs/cropper.min.js",
      },
      {
        id: "script-imagetracer",
        src: "js/libs/imagetracer.min.js",
      },
    ];

    scripts.forEach((s) => {
      if (document.getElementById(s.id)) {
        loaded++;
        if (loaded === scripts.length) callback();
      } else {
        let scriptEl = document.createElement("script");
        scriptEl.id = s.id;
        scriptEl.src = s.src;
        scriptEl.onload = () => {
          loaded++;
          if (loaded === scripts.length) callback();
        };
        document.head.appendChild(scriptEl);
      }
    });
  }

  loadExternalScripts(function () {
    const inputImg = document.getElementById("svg-tool-input");
    const imgWorkspace = document.getElementById("svg-tool-image");
    const placeholderWorkspace = document.getElementById(
      "svg-tool-placeholder",
    );
    const sliderColor = document.getElementById("svg-tool-slider");
    const sliderValTxt = document.getElementById("svg-tool-color-val");

    const chkSharp = document.getElementById("svg-tool-sharp-mode");

    const btnConvert = document.getElementById("svg-tool-btn-convert");
    const btnCopy = document.getElementById("svg-tool-btn-copy");
    const btnDownload = document.getElementById("svg-tool-btn-download");
    const dlText = document.getElementById("svg-tool-dl-text");
    const ratioBtns = document.querySelectorAll(".svg-tool-ratio");

    const loadingLayer = document.getElementById("svg-tool-loading");
    const previewImg = document.getElementById("svg-tool-preview-img");
    const previewPlaceholder = document.getElementById("svg-tool-preview-text");
    const textareaCode = document.getElementById("svg-tool-code");

    let cropper = null;
    let finalSvgString = "";
    let currentSvgBlobUrl = "";

    function updateActiveRatioBtn(clickedBtn) {
      ratioBtns.forEach((b) => {
        b.classList.remove("bg-blue-500", "text-white", "border-blue-500");
        b.classList.add("bg-white", "text-slate-600", "border-slate-200");
      });
      clickedBtn.classList.remove(
        "bg-white",
        "text-slate-600",
        "border-slate-200",
      );
      clickedBtn.classList.add("bg-blue-500", "text-white", "border-blue-500");
    }

    function formatBytes(bytes) {
      if (!+bytes) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    }

    sliderColor.addEventListener("input", function (e) {
      sliderValTxt.innerText = e.target.value + " màu";
    });

    inputImg.addEventListener("change", function (e) {
      const files = e.target.files;
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (cropper) cropper.destroy();

          imgWorkspace.src = event.target.result;
          imgWorkspace.style.display = "block";
          placeholderWorkspace.style.display = "none";

          let activeRatio = NaN;
          let isRound = false;
          ratioBtns.forEach((b) => {
            if (b.classList.contains("bg-blue-500")) {
              activeRatio = parseFloat(b.dataset.ratio);
              if (b.dataset.round === "true") isRound = true;
            }
          });

          if (isRound) {
            imgWorkspace.parentElement.classList.add("is-round");
          } else {
            imgWorkspace.parentElement.classList.remove("is-round");
          }

          cropper = new Cropper(imgWorkspace, {
            aspectRatio: activeRatio,
            viewMode: 1,
            autoCropArea: 0.8,
            responsive: true,
            background: false,
          });

          btnConvert.disabled = false;

          previewImg.style.display = "none";
          if (currentSvgBlobUrl) URL.revokeObjectURL(currentSvgBlobUrl);
          previewPlaceholder.style.display = "block";
          textareaCode.value = "";
          btnCopy.disabled = true;
          btnDownload.disabled = true;
          dlText.innerText = "Tải File SVG";
        };
        reader.readAsDataURL(files[0]);
      }
    });

    ratioBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        updateActiveRatioBtn(this);
        if (cropper) cropper.setAspectRatio(parseFloat(this.dataset.ratio));

        if (this.dataset.round === "true") {
          imgWorkspace.parentElement.classList.add("is-round");
        } else {
          imgWorkspace.parentElement.classList.remove("is-round");
        }
      });
    });

    btnConvert.addEventListener("click", function () {
      if (!cropper) return;

      loadingLayer.style.display = "flex";
      btnConvert.disabled = true;

      requestAnimationFrame(() => {
        setTimeout(() => {
          const originalCanvas = cropper.getCroppedCanvas({
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high",
          });

          const MAX_SIZE = 800;
          let width = originalCanvas.width;
          let height = originalCanvas.height;

          if (width > MAX_SIZE || height > MAX_SIZE) {
            const ratio = Math.min(MAX_SIZE / width, MAX_SIZE / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          const resizedCanvas = document.createElement("canvas");
          resizedCanvas.width = width;
          resizedCanvas.height = height;
          const ctx = resizedCanvas.getContext("2d");

          let isRound = false;
          ratioBtns.forEach((b) => {
            if (
              b.classList.contains("bg-blue-500") &&
              b.dataset.round === "true"
            )
              isRound = true;
          });

          if (isRound) {
            ctx.beginPath();
            ctx.arc(
              width / 2,
              height / 2,
              Math.min(width, height) / 2,
              0,
              2 * Math.PI,
            );
            ctx.clip();
          } else {
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(originalCanvas, 0, 0, width, height);
          const processDataUrl = resizedCanvas.toDataURL("image/png");

          const numColors = parseInt(sliderColor.value);
          const isSharp = chkSharp.checked;

          const options = {
            numberofcolors: numColors,
            pathomit: isSharp ? 2 : 8,
            mincolorratio: isSharp ? 0 : 0.02,
            colorquantcycles: 3,
            scale: 1,
            roundcoords: 1,
            blurradius: isSharp ? 0 : 1,
            rightangleenhance: isSharp,
            ltres: isSharp ? 0.1 : 1,
            qtres: isSharp ? 0.1 : 1,
          };

          window.ImageTracer.imageToSVG(
            processDataUrl,
            function (svgstr) {
              finalSvgString = svgstr;
              textareaCode.value = svgstr;

              const blob = new Blob([svgstr], {
                type: "image/svg+xml;charset=utf-8",
              });
              const fileSizeString = formatBytes(blob.size);
              dlText.innerText = "Tải SVG (" + fileSizeString + ")";

              if (currentSvgBlobUrl) URL.revokeObjectURL(currentSvgBlobUrl);
              currentSvgBlobUrl = URL.createObjectURL(blob);

              previewImg.src = currentSvgBlobUrl;
              previewImg.style.display = "block";
              previewPlaceholder.style.display = "none";

              loadingLayer.style.display = "none";
              btnConvert.disabled = false;
              btnCopy.disabled = false;
              btnDownload.disabled = false;
            },
            options,
          );
        }, 100);
      });
    });

    btnCopy.addEventListener("click", function () {
      if (!finalSvgString) return;
      navigator.clipboard.writeText(finalSvgString).then(() => {
        const oldText = btnCopy.innerText;
        btnCopy.innerText = "✅ Đã Copy";
        btnCopy.classList.add(
          "bg-green-100",
          "text-green-600",
          "border-green-200",
        );
        btnCopy.classList.remove(
          "bg-blue-50",
          "text-blue-600",
          "border-blue-200",
        );
        setTimeout(() => {
          btnCopy.innerText = oldText;
          btnCopy.classList.remove(
            "bg-green-100",
            "text-green-600",
            "border-green-200",
          );
          btnCopy.classList.add(
            "bg-blue-50",
            "text-blue-600",
            "border-blue-200",
          );
        }, 2000);
      });
    });

    btnDownload.addEventListener("click", function () {
      if (!finalSvgString) return;
      const blob = new Blob([finalSvgString], {
        type: "image/svg+xml;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "vectorized-image.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  });
}
