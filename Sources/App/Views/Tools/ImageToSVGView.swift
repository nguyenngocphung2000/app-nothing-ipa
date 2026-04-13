import SwiftUI

struct ImageToSVGView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Ảnh Vector")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic xử lý vector ảnh native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Image To SVG")
    }
}
