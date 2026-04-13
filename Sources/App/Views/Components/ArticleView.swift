import SwiftUI

struct ArticleView: View {
    let post: PostMeta
    @State private var markdownText: LocalizedStringKey = "Đang tải nội dung..."
    
    var body: some View {
        ScrollView(showsIndicators: false) {
            VStack(alignment: .leading, spacing: 20) {
                Text(post.title)
                    .font(.system(size: 24, weight: .heavy))
                    .padding(.top, 24)
                
                Text(post.category)
                    .font(.system(size: 11, weight: .bold))
                    .textCase(.uppercase)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Color.orange.opacity(0.15))
                    .foregroundColor(.orange)
                    .clipShape(Capsule())
                
                Divider()
                    .padding(.vertical, 8)
                
                Text(markdownText)
                    .font(.system(size: 16))
                    .lineSpacing(6)
            }
            .padding(20)
        }
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            loadContent()
        }
    }
    
    private func loadContent() {
        if let filepath = Bundle.main.path(forResource: post.fileName, ofType: "md", inDirectory: "posts") {
            do {
                let contents = try String(contentsOfFile: filepath)
                self.markdownText = LocalizedStringKey(contents)
            } catch {
                self.markdownText = "Lỗi khi tải file \(post.fileName).md: \(error.localizedDescription)"
            }
        } else {
            self.markdownText = "Không tìm thấy file: \(post.fileName).md trong Resources/posts"
        }
    }
}
