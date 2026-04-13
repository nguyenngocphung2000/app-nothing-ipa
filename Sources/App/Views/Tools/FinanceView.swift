import SwiftUI

struct FinanceView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Lãi Suất Ngân Hàng")
                    .font(.largeTitle).bold()
                Text("Vui lòng phát triển logic lãi suất native tại đây.")
                    .foregroundColor(.secondary)
            }
            .padding()
        }
        .navigationTitle("Finance")
    }
}
