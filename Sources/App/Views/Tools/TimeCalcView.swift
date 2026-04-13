import SwiftUI

struct TimeCalcView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Tính Thời Gian")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic thời gian native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Time Calc")
    }
}
