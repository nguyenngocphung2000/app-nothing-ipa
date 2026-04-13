import SwiftUI

struct CalendarView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Lịch Vạn Niên")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic lịch âm dương native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Calendar")
    }
}
