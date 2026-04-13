import SwiftUI
import WebKit

struct J2MEEmulatorView: View {
    @State private var webView = CustomWKWebView()
    
    var body: some View {
        VStack(spacing: 0) {
            // Screen Section (320x240)
            ZStack {
                Color.black
                
                // WebView Holder
                WebViewWrapper(webView: webView)
                    .frame(width: 320, height: 240)
                    .clipped()
            }
            .frame(maxWidth: .infinity)
            .frame(height: 280)
            .background(Color(uiColor: .systemGray6))
            
            // Nokia E72 Keypad Section
            NokiaE72Keypad(webView: webView)
                .padding(.top, 10)
                .background(Color(uiColor: .systemGray5))
        }
        .navigationTitle("J2ME Emulator")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - WebView Wrapper
struct WebViewWrapper: UIViewRepresentable {
    let webView: WKWebView
    
    func makeUIView(context: Context) -> WKWebView {
        webView.isOpaque = false
        webView.backgroundColor = .black
        webView.scrollView.isScrollEnabled = false
        webView.scrollView.bounces = false
        
        if let indexPath = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "j2me_emulator/web") {
            let resourcesDir = indexPath.deletingLastPathComponent()
            webView.loadFileURL(indexPath, allowingReadAccessTo: resourcesDir)
        }
        return webView
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {}
}

class CustomWKWebView: WKWebView {
    init() {
        let prefs = WKWebpagePreferences()
        prefs.allowsContentJavaScript = true
        
        let config = WKWebViewConfiguration()
        config.defaultWebpagePreferences = prefs
        config.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        super.init(frame: .zero, configuration: config)
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    func simulateKey(code: String, isDown: Bool) {
        let eventType = isDown ? "keydown" : "keyup"
        let script = "document.dispatchEvent(new KeyboardEvent('\(eventType)', { code: '\(code)', bubbles: true, cancelable: true }));"
        evaluateJavaScript(script, completionHandler: nil)
    }
}

// MARK: - E72 Keypad
struct NokiaE72Keypad: View {
    let webView: CustomWKWebView
    
    // UI Feedback
    let impactMed = UIImpactFeedbackGenerator(style: .medium)
    let impactLight = UIImpactFeedbackGenerator(style: .light)
    let impactHeavy = UIImpactFeedbackGenerator(style: .heavy)
    
    var body: some View {
        VStack(spacing: 8) {
            // Function Row (Softkeys, Call/End, Nav)
            HStack(spacing: 12) {
                // Left Wing
                VStack(spacing: 8) {
                    HStack(spacing: 4) {
                        E72FuncKey(label: "-", code: "F1", webView: webView, sysIcon: "minus")
                        E72FuncKey(label: "Home", code: "Escape", webView: webView, sysIcon: "house.fill")
                    }
                    E72FuncKey(label: "Call", code: "KeyC", webView: webView, sysIcon: "phone.fill", color: .green)
                }
                
                // D-Pad
                VStack(spacing: 4) {
                    E72FuncKey(label: "Up", code: "ArrowUp", webView: webView, sysIcon: "chevron.up")
                    HStack(spacing: 4) {
                        E72FuncKey(label: "Left", code: "ArrowLeft", webView: webView, sysIcon: "chevron.left")
                        E72FuncKey(label: "OK", code: "Enter", webView: webView, sysIcon: "circle.fill", isCentral: true)
                        E72FuncKey(label: "Right", code: "ArrowRight", webView: webView, sysIcon: "chevron.right")
                    }
                    E72FuncKey(label: "Down", code: "ArrowDown", webView: webView, sysIcon: "chevron.down")
                }
                .padding(8)
                .background(Circle().fill(Color(uiColor: .systemGray4)))
                
                // Right Wing
                VStack(spacing: 8) {
                    HStack(spacing: 4) {
                        E72FuncKey(label: "Menu", code: "F3", webView: webView, sysIcon: "line.horizontal.3")
                        E72FuncKey(label: "-", code: "F2", webView: webView, sysIcon: "minus")
                    }
                    E72FuncKey(label: "End", code: "Escape", webView: webView, sysIcon: "phone.down.fill", color: .red)
                }
            }
            .padding(.horizontal, 10)
            
            Divider().padding(.vertical, 4)
            
            // QWERTY & Numpad Core (E72 Layout)
            VStack(spacing: 6) {
                // Row 1
                HStack(spacing: 6) {
                    E72Key(label: "Q", code: "KeyQ", webView: webView)
                    E72Key(label: "W", code: "KeyW", webView: webView)
                    E72NumKey(label: "E", num: "1", code: "Digit1", webView: webView)
                    E72NumKey(label: "R", num: "2", code: "Digit2", webView: webView)
                    E72NumKey(label: "T", num: "3", code: "Digit3", webView: webView)
                    E72Key(label: "Y", code: "KeyY", webView: webView)
                    E72Key(label: "U", code: "KeyU", webView: webView)
                    E72Key(label: "I", code: "KeyI", webView: webView)
                    E72Key(label: "O", code: "KeyO", webView: webView)
                    E72Key(label: "P", code: "KeyP", webView: webView)
                }
                // Row 2
                HStack(spacing: 6) {
                    E72Key(label: "A", code: "KeyA", webView: webView)
                    E72Key(label: "S", code: "KeyS", webView: webView)
                    E72NumKey(label: "D", num: "4", code: "Digit4", webView: webView)
                    E72NumKey(label: "F", num: "5", code: "Digit5", webView: webView)
                    E72NumKey(label: "G", num: "6", code: "Digit6", webView: webView)
                    E72Key(label: "H", code: "KeyH", webView: webView)
                    E72Key(label: "J", code: "KeyJ", webView: webView)
                    E72Key(label: "K", code: "KeyK", webView: webView)
                    E72Key(label: "L", code: "KeyL", webView: webView)
                    E72Key(label: "Del", code: "Backspace", webView: webView, sysIcon: "delete.left.fill")
                }
                // Row 3
                HStack(spacing: 6) {
                    E72Key(label: "Z", code: "KeyZ", webView: webView)
                    E72NumKey(label: "X", num: "7", code: "Digit7", webView: webView)
                    E72NumKey(label: "C", num: "8", code: "Digit8", webView: webView)
                    E72NumKey(label: "V", num: "9", code: "Digit9", webView: webView)
                    E72Key(label: "B", code: "KeyB", webView: webView)
                    E72Key(label: "N", code: "KeyN", webView: webView)
                    E72Key(label: "M", code: "KeyM", webView: webView)
                    E72Key(label: ",", code: "KeyE", webView: webView, opt: "*") // Mapping * to E via keyboard map
                    E72Key(label: ".", code: "KeyR", webView: webView, opt: "#") // Mapping # to R
                    E72Key(label: "Ret", code: "Enter", webView: webView, sysIcon: "return")
                }
                // Row 4
                HStack(spacing: 6) {
                    E72Key(label: "Sym", code: "Control", webView: webView)
                    E72NumKey(label: "Space", num: "0", code: "Digit0", webView: webView, isSpace: true)
                    E72Key(label: "Ctrl", code: "Control", webView: webView)
                }
            }
            .padding(.horizontal, 10)
            .padding(.bottom, 20)
        }
    }
}

// Custom Key Button Modifiers
struct E72KeyStyle: ViewModifier {
    var isPressed: Bool
    var color: Color = Color(uiColor: .systemBackground)
    func body(content: Content) -> some View {
        content
            .frame(maxWidth: .infinity, minHeight: 38)
            .background(isPressed ? Color.gray.opacity(0.3) : color)
            .clipShape(RoundedRectangle(cornerRadius: 6))
            .shadow(color: Color.black.opacity(0.1), radius: 1, x: 0, y: 1)
    }
}

struct E72FuncKey: View {
    let label: String
    let code: String
    let webView: CustomWKWebView
    var sysIcon: String = ""
    var color: Color = Color(uiColor: .systemBackground)
    var isCentral: Bool = false
    
    @State private var pressed = false
    
    var body: some View {
        ZStack {
            if !sysIcon.isEmpty {
                Image(systemName: sysIcon).font(.system(size: isCentral ? 20 : 14, weight: .bold)).foregroundColor(color == .green || color == .red ? .white : .primary)
            } else {
                Text(label).font(.system(size: 14, weight: .bold))
            }
        }
        .modifier(E72KeyStyle(isPressed: pressed, color: color == .green || color == .red ? color : Color(uiColor: .systemBackground)))
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in
                    if !pressed {
                        pressed = true
                        UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                        webView.simulateKey(code: code, isDown: true)
                    }
                }
                .onEnded { _ in
                    pressed = false
                    webView.simulateKey(code: code, isDown: false)
                }
        )
    }
}

struct E72Key: View {
    let label: String
    let code: String
    let webView: CustomWKWebView
    var sysIcon: String = ""
    var opt: String = ""
    
    @State private var pressed = false
    
    var body: some View {
        ZStack(alignment: .bottom) {
            if !sysIcon.isEmpty {
                Image(systemName: sysIcon).font(.system(size: 12, weight: .bold)).offset(y: -12)
            } else {
                Text(label).font(.system(size: 12, weight: .bold)).offset(y: -14)
                if !opt.isEmpty {
                    Text(opt).font(.system(size: 10, weight: .bold)).foregroundColor(.blue).offset(y: -2)
                }
            }
        }
        .modifier(E72KeyStyle(isPressed: pressed))
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in
                    if !pressed {
                        pressed = true
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                        webView.simulateKey(code: code, isDown: true)
                    }
                }
                .onEnded { _ in
                    pressed = false
                    webView.simulateKey(code: code, isDown: false)
                }
        )
    }
}

struct E72NumKey: View {
    let label: String
    let num: String
    let code: String
    let webView: CustomWKWebView
    var isSpace: Bool = false
    
    @State private var pressed = false
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Text(label).font(.system(size: 12, weight: .bold)).foregroundColor(.gray).offset(y: -18)
            if isSpace {
                RoundedRectangle(cornerRadius: 1).fill(Color.gray).frame(width: 20, height: 2).offset(y: -6)
            } else {
                Text(num).font(.system(size: 16, weight: .bold)).foregroundColor(.blue).offset(y: -2)
            }
        }
        .modifier(E72KeyStyle(isPressed: pressed))
        .simultaneousGesture(
            DragGesture(minimumDistance: 0)
                .onChanged { _ in
                    if !pressed {
                        pressed = true
                        UIImpactFeedbackGenerator(style: .light).impactOccurred()
                        webView.simulateKey(code: code, isDown: true) // Send the Number keyCode for game controls
                        // Optional: some games expect Arrow codes via numpad natively, but FreeJ2ME handles Numpads directly if enabled.
                    }
                }
                .onEnded { _ in
                    pressed = false
                    webView.simulateKey(code: code, isDown: false)
                }
        )
    }
}
