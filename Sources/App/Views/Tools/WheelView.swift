import SwiftUI

struct WheelView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Vòng Quay")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic vòng quay ngẫu nhiên native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Wheel")
    }
}
