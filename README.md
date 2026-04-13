# NOTHING App v26.4.13 (Native Swift Edition)

Chào mừng bạn đến với phiên bản NOTHING App 100% Native. 
Toàn bộ mã nguồn cũ liên quan đến Web (JavaScript, HTML, CSS), Capacitor, và Node.js đã được **xóa sổ hoàn toàn**. Giờ đây, ứng dụng chạy cực kỳ mượt mà, tối ưu hiệu năng tối đa với Framework **SwiftUI** của Apple.

---

## 🚀 Tính năng nổi bật

- Giao diện **Glass OS** chuẩn mực (Mờ ảo, đổ bóng nhẹ, tương thích Dark/Light Mode 100%).
- Markdown Reader **Native**: Parse bài viết trực tiếp thông qua thư viện Text của Swift, không cần webview.
- **Không vướng lỗi Capacitor**: CI/CD build IPA sạch đẹp bằng GitHub Actions + Xcodegen.
- Phiên bản: `26.4.13`.

---

## 🛠 Cách Thêm / Sửa / Xóa Bài Viết (Posts)

Hệ thống đăng bài viết sử dụng chuẩn file `.md` (Markdown).

**Bước 1:** Chuẩn bị nội dung
Tạo hoặc đưa file Markdown của bạn vào thư mục `Sources/App/Resources/posts/`. Ví dụ, tạo file `bi-quyet-code.md`.

**Bước 2:** Đăng ký vào App Data
Mở file `Sources/App/Models.swift`, tìm đến mảng `AppData.manifest` và thêm thông tin báo cáo:

```swift
PostMeta(
    id: "ID_TUY_Y", 
    title: "Tiêu đề bài viết của bạn", 
    category: "Chuyên mục", 
    filenName: "bi-quyet-code" // tên file không có đuôi .md
)
```

**Bước 3:** Build lại ứng dụng. Bài viết của bạn sẽ xuất hiện trên màn hình Home.

---

## 🛠 Cách Thêm / Bớt Công Cụ (Tools)

**Bước 1:** Thiết kế View bằng SwiftUI
Mở thư mục `Sources/App/Views/Tools/`. Kế thừa hoặc tạo mới một file `.swift` chuẩn SwiftUI (ví dụ: `MyNewToolView.swift`).

```swift
import SwiftUI

struct MyNewToolView: View {
    var body: some View {
        Text("Giao diện Tool mới của tôi")
    }
}
```

**Bước 2:** Cấu hình ngoài màn hình Home
Mở `Sources/App/Models.swift`, thêm cấu trúc Tool và Icon vào `AppData.tools`:

```swift
AppTool(
    id: "mynewtool", 
    name: "Tool Cực Đỉnh", 
    desc: "Tính năng siêu việt", 
    iconColor: .purple, 
    bgOpacity: 0.1, 
    index: 9 // Số thứ tự hiển thị ngoài UI
)
```

**Bước 3:** Liên kết Navigation
Mở `Sources/App/Views/HomeView.swift`, tìm hàm `getDestination(for tool: AppTool)` ở cuối file và bổ sung NavigationLink của bạn:

```swift
case "mynewtool": MyNewToolView()
```

---

## ⚙️ Hướng dẫn đóng gói (CI/CD / Developer)

Dự án này sử dụng `xcodegen` để gen project động.
- Nếu bạn có máy Mac, cài `brew install xcodegen`. Sau đó chạy lệnh `xcodegen generate` ở root folder của repo.
- GitHub Actions đã được config tự động chạy lệnh này. Bạn chỉ cần Push code lên nhánh Main, Github sẽ nhả file `nothing.ipa` ra cho bạn tải.

## 👋 Lời kết

Ứng dụng NOTHING được tái cấu trúc hoàn toàn trên nền tảng Swift là bước tiến vĩ đại về độ chuyên nghiệp, hiệu năng và tương thích cho iOS!
