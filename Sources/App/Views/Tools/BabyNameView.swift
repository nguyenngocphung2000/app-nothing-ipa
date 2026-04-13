import SwiftUI

struct BabyNameView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Tên Cho Bé")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic đặt tên ngũ hành native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Baby Name")
    }
}
