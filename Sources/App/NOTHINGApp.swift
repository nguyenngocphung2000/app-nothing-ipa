import SwiftUI

@main
struct NOTHINGApp: App {
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    var body: some Scene {
        WindowGroup {
            HomeView()
                .preferredColorScheme(isDarkMode ? .dark : .light)
                .animation(.easeInOut, value: isDarkMode)
        }
    }
}
