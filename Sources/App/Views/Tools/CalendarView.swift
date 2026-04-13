import SwiftUI

struct CalendarView: View {
    @State private var selectedDate = Date()
    
    var solarDateString: String {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.dateStyle = .full
        formatter.locale = Locale(identifier: "vi_VN")
        return formatter.string(from: selectedDate)
    }
    
    var lunarDateString: String {
        let lunarCalendar = Calendar(identifier: .chinese)
        let formatter = DateFormatter()
        formatter.calendar = lunarCalendar
        formatter.dateStyle = .full
        formatter.locale = Locale(identifier: "vi_VN")
        // Chinese calendar returns string like "5/5/Giáp Thìn"
        return formatter.string(from: selectedDate)
    }
    
    var body: some View {
        Form {
            Section(header: Text("Chọn Ngày Dương Lịch")) {
                DatePicker("Ngày xem", selection: $selectedDate, displayedComponents: .date)
                    .datePickerStyle(.graphical)
                    .environment(\.locale, Locale(identifier: "vi_VN"))
            }
            
            Section(header: Text("Ngày Dương (Gregorian)")) {
                Text(solarDateString.capitalized)
                    .font(.headline)
            }
            
            Section(header: Text("Ngày Âm (Lunar/Chinese)")) {
                Text(lunarDateString)
                    .font(.headline)
                    .foregroundColor(.orange)
            }
            
            Section(footer: Text("Sử dụng thuật toán Native Chinese Calendar của iOS (có thể chênh lệch 1 ngày đối với múi giờ GMT+7 trong các năm nhuận so với lịch Việt Nam.)")) {
                EmptyView()
            }
        }
        .navigationTitle("Lịch Vạn Niên")
        .navigationBarTitleDisplayMode(.inline)
    }
}
