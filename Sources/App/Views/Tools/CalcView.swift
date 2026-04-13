import SwiftUI

struct CalcView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Bảng Tính Toán")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic máy tính native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Calc")
    }
}
