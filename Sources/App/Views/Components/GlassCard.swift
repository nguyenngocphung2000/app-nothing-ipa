import SwiftUI

struct GlassCard<Content: View>: View {
    @Environment(\.colorScheme) var colorScheme
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        content
            .background(
                ZStack {
                    if colorScheme == .dark {
                        Color.black.opacity(0.3)
                    } else {
                        Color.white.opacity(0.4)
                    }
                    VisualEffectBlur(blurStyle: colorScheme == .dark ? .dark : .light)
                        .opacity(0.5)
                }
            )
            .cornerRadius(24)
            .overlay(
                RoundedRectangle(cornerRadius: 24)
                    .stroke(colorScheme == .dark ? Color.white.opacity(0.1) : Color.black.opacity(0.05), lineWidth: 1)
            )
            .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
    }
}
