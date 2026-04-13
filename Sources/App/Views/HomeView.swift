import SwiftUI

struct HomeView: View {
    @State private var searchText = ""
    @AppStorage("isDarkMode") private var isDarkMode = false
    
    var filteredManifest: [PostMeta] {
        if searchText.isEmpty {
            return AppData.manifest
        } else {
            return AppData.manifest.filter { $0.title.localizedCaseInsensitiveContains(searchText) }
        }
    }
    
    var body: some View {
        NavigationView {
            ZStack {
                // Background
                (isDarkMode ? Color.black : Color(UIColor.systemGroupedBackground))
                    .ignoresSafeArea()
                
                ScrollView(showsIndicators: false) {
                    VStack(alignment: .leading, spacing: 32) {
                        
                        // Header
                        HStack {
                            VStack(alignment: .leading, spacing: 4) {
                                Text("NOTHING")
                                    .font(.system(size: 44, weight: .black, design: .rounded))
                                    .foregroundColor(isDarkMode ? .white : .primary)
                                
                                Text("Yet Everything")
                                    .font(.system(size: 11, weight: .bold, design: .rounded))
                                    .textCase(.uppercase)
                                    .tracking(2)
                                    .foregroundColor(.secondary)
                            }
                            Spacer()
                            Button(action: {
                                withAnimation {
                                    isDarkMode.toggle()
                                }
                            }) {
                                Image(systemName: isDarkMode ? "moon.stars.fill" : "sun.max.fill")
                                    .font(.system(size: 20))
                                    .foregroundColor(isDarkMode ? .white : .black)
                                    .padding(10)
                                    .background(isDarkMode ? Color.white.opacity(0.1) : Color.black.opacity(0.05))
                                    .clipShape(Circle())
                            }
                        }
                        .padding(.horizontal)
                        .padding(.top, 24)
                        
                        // Tools Grid
                        VStack(alignment: .leading, spacing: 16) {
                            Text("Kho Ứng Dụng")
                                .font(.system(size: 12, weight: .black))
                                .textCase(.uppercase)
                                .tracking(2)
                                .foregroundColor(.secondary)
                                .padding(.horizontal)
                            
                            LazyVGrid(columns: [GridItem(.adaptive(minimum: 150), spacing: 16)], spacing: 16) {
                                ForEach(AppData.tools) { tool in
                                    NavigationLink(destination: getDestination(for: tool)) {
                                        GlassCard {
                                            VStack(alignment: .leading) {
                                                Text(String(format: "%02d", tool.index))
                                                    .font(.system(size: 10, weight: .black))
                                                    .foregroundColor(tool.iconColor)
                                                    .padding(.horizontal, 10)
                                                    .padding(.vertical, 4)
                                                    .background(tool.iconColor.opacity(tool.bgOpacity))
                                                    .clipShape(Capsule())
                                                    .padding(.bottom, 8)
                                                
                                                Text(tool.name)
                                                    .font(.system(size: 16, weight: .heavy))
                                                    .foregroundColor(.primary)
                                                    .multilineTextAlignment(.leading)
                                                    .padding(.bottom, 2)
                                                
                                                Text(tool.desc)
                                                    .font(.system(size: 11))
                                                    .foregroundColor(.secondary)
                                                    .multilineTextAlignment(.leading)
                                                    .lineLimit(2)
                                                Spacer()
                                            }
                                            .padding(16)
                                            .frame(maxWidth: .infinity, alignment: .leading)
                                            .frame(height: 140)
                                        }
                                    }
                                }
                            }
                            .padding(.horizontal)
                        }
                        
                        // Articles
                        GlassCard {
                            VStack(alignment: .leading, spacing: 20) {
                                VStack(alignment: .leading, spacing: 4) {
                                    Text("Kinh Nghiệm & Chia Sẻ")
                                        .font(.system(size: 22, weight: .heavy))
                                    Text("Các ghi chép về công nghệ và hệ điều hành.")
                                        .font(.system(size: 11))
                                        .foregroundColor(.secondary)
                                }
                                
                                TextField("Tìm kiếm tài liệu...", text: $searchText)
                                    .padding()
                                    .background(isDarkMode ? Color.white.opacity(0.1) : Color.black.opacity(0.05))
                                    .cornerRadius(12)
                                
                                if filteredManifest.isEmpty {
                                    Text("Trống rỗng...")
                                        .font(.subheadline)
                                        .foregroundColor(.secondary)
                                        .frame(maxWidth: .infinity, alignment: .center)
                                        .padding(.vertical, 30)
                                } else {
                                    VStack(spacing: 12) {
                                        ForEach(filteredManifest) { post in
                                            NavigationLink(destination: ArticleView(post: post)) {
                                                HStack {
                                                    VStack(alignment: .leading, spacing: 8) {
                                                        Text(post.title)
                                                            .font(.system(size: 15, weight: .bold))
                                                            .foregroundColor(.primary)
                                                            .multilineTextAlignment(.leading)
                                                        Text(post.category)
                                                            .font(.system(size: 9, weight: .bold))
                                                            .textCase(.uppercase)
                                                            .padding(.horizontal, 6)
                                                            .padding(.vertical, 2)
                                                            .background(Color.orange.opacity(0.15))
                                                            .foregroundColor(.orange)
                                                            .clipShape(RoundedRectangle(cornerRadius: 4))
                                                    }
                                                    Spacer()
                                                    Image(systemName: "chevron.right")
                                                        .font(.system(size: 12, weight: .bold))
                                                        .foregroundColor(.secondary)
                                                }
                                                .padding()
                                                .background(isDarkMode ? Color.black.opacity(0.2) : Color.white.opacity(0.5))
                                                .cornerRadius(16)
                                            }
                                        }
                                    }
                                }
                            }
                            .padding(20)
                        }
                        .padding(.horizontal)
                        
                        // Footer
                        VStack(spacing: 4) {
                            Text("Vibe Coding By Nguyễn Ngọc Phụng")
                                .font(.system(size: 11, weight: .bold))
                                .textCase(.uppercase)
                                .tracking(2)
                            Text("Thiết kế chuẩn iOS Native • Super Professional Edition")
                                .font(.system(size: 10))
                        }
                        .foregroundColor(.secondary)
                        .opacity(0.6)
                        .frame(maxWidth: .infinity)
                        .padding(.top, 24)
                        .padding(.bottom, 60)
                        
                    }
                }
            }
            .navigationBarHidden(true)
        }
        .navigationViewStyle(StackNavigationViewStyle())
    }
    
    @ViewBuilder
    func getDestination(for tool: AppTool) -> some View {
        switch tool.id {
        case "calc": CalcView()
        case "timecalc": TimeCalcView()
        case "finance": FinanceView()
        case "calendar": CalendarView()
        case "babyname": BabyNameView()
        case "wheel": WheelView()
        case "htmlrunner": HTMLRunnerView()
        case "imagetosvg": ImageToSVGView()
        default: Text("Coming Soon")
        }
    }
}
