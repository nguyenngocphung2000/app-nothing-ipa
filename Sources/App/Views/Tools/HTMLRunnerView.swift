import SwiftUI
import WebKit

struct HTMLRunnerView: View {
    @State private var htmlCode: String = "<h1>Hello NOTHING</h1><p>Viết code HTML ở đây...</p>"
    
    var body: some View {
        VStack(spacing: 0) {
            TextEditor(text: $htmlCode)
                .font(.system(.body, design: .monospaced))
                .padding()
                .background(Color(UIColor.systemGray6))
            
            Divider()
            
            HTMLPreview(htmlContent: htmlCode)
                .frame(maxHeight: .infinity)
        }
        .navigationTitle("HTML Runner")
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct HTMLPreview: UIViewRepresentable {
    var htmlContent: String
    
    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        uiView.loadHTMLString(htmlContent, baseURL: nil)
    }
}
