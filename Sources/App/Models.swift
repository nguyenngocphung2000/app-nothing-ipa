import SwiftUI

struct AppTool: Identifiable {
    let id: String
    let name: String
    let desc: String
    let iconColor: Color
    let bgOpacity: Double
    let index: Int
}

struct PostMeta: Identifiable, Hashable {
    let id: String
    let title: String
    let category: String
    let filenName: String
}

class AppData {
    static let tools: [AppTool] = [
        AppTool(id: "calc", name: "Bảng Tính Toán", desc: "Máy tính nâng cao có lưu sử", iconColor: .blue, bgOpacity: 0.1, index: 1),
        AppTool(id: "finance", name: "Lãi Suất Ngân Hàng", desc: "Tính khoản vay & tiết kiệm", iconColor: .teal, bgOpacity: 0.1, index: 2),
        AppTool(id: "calendar", name: "Lịch Vạn Niên", desc: "Âm dương & ngày xuất hành", iconColor: .red, bgOpacity: 0.1, index: 3),
        AppTool(id: "timecalc", name: "Tính Thời Gian", desc: "Cộng trừ giờ phút dễ dàng", iconColor: .purple, bgOpacity: 0.1, index: 4),
        AppTool(id: "babyname", name: "Tên Cho Bé", desc: "Phân tích ngũ hành tương sinh", iconColor: .pink, bgOpacity: 0.1, index: 5),
        AppTool(id: "wheel", name: "Vòng Quay", desc: "Lựa chọn số phận ngẫu nhiên", iconColor: .indigo, bgOpacity: 0.1, index: 6),
        AppTool(id: "htmlrunner", name: "Chạy HTML", desc: "Sandbox Code Studio Mini", iconColor: .cyan, bgOpacity: 0.1, index: 7),
        AppTool(id: "imagetosvg", name: "Ảnh Vector", desc: "Khử nhiễu & cắt SVG Native", iconColor: .green, bgOpacity: 0.1, index: 8)
    ]
    
    static let manifest: [PostMeta] = [
        PostMeta(id: "1", title: "Contact me", category: "Nothing", filenName: "contact"),
        PostMeta(id: "2", title: "Cách dùng các công cụ AI hiệu quả như một chuyên gia", category: "Nothing", filenName: "guide-use-ai"),
        PostMeta(id: "3", title: "Tạo Bot Telegram quản lý tài chính với Google Sheet", category: "Nothing", filenName: "bot-telegram"),
        PostMeta(id: "4", title: "Chặn quảng cáo Web, App, Zalo bằng NextDNS", category: "Thủ thuật IOS", filenName: "nextdns"),
        PostMeta(id: "5", title: "Cài Lịch Âm & Bộ gõ tiếng Việt trên macOS, các ứng dụng khác", category: "Thủ thuật Mac", filenName: "mac-apps"),
        PostMeta(id: "6", title: "Tổng hợp tài liệu học lập trình và công nghệ thông tin từ Freetuts", category: "Tài liệu học tập", filenName: "tong-hop-tai-lieu-freetuts"),
        PostMeta(id: "7", title: "Tổng hợp các nhóm crack mod hack - apk,ipa(android/ios) trên Telegram", category: "Phần mềm/Ứng dụng", filenName: "group-telegram"),
        PostMeta(id: "8", title: "Tổng hợp các trang web chia sẻ tài nguyên ứng dụng trên Mac", category: "Thủ thuật Mac", filenName: "mac-webs")
    ]
}
