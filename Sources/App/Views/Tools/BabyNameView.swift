import SwiftUI

struct NameData: Codable {
    let nam: [String]
    let nu: [String]
}

struct ParsedData {
    var ho: [String] = []
    var ten: [String] = []
    var demFull: [String] = []
    var demWords: [String] = []
}

class BabyNameViewModel: ObservableObject {
    @Published var isLoading = true
    @Published var gender: String = "all"
    @Published var count: String = "100"
    @Published var lengthOpt: String = "all"
    
    @Published var inputHo: String = ""
    @Published var inputDem: String = ""
    @Published var inputTen: String = ""
    
    @Published var generatedNames: [(name: String, gender: String)] = []
    
    @Published var filterInput: String = ""
    @Published var filterOutput: String = ""
    @Published var removeEmpty: Bool = true
    @Published var cleanSpaces: Bool = true
    @Published var removeOldNumbers: Bool = false
    @Published var addNewNumbers: Bool = false
    @Published var removeDuplicates: Bool = false
    @Published var removeViAccents: Bool = false
    @Published var reverseLines: Bool = false
    @Published var shuffleLines: Bool = false
    @Published var caseOptions: String = "title"
    @Published var sortOptions: String = "none"
    @Published var useWordCountFilter: Bool = false
    @Published var wordCountOperator: String = "eq"
    @Published var wordCountNum: String = "3"
    
    var namParsed = ParsedData()
    var nuParsed = ParsedData()
    
    init() {
        loadData()
    }
    
    func loadData() {
        DispatchQueue.global(qos: .userInitiated).async {
            guard let url = Bundle.main.url(forResource: "name", withExtension: "json", subdirectory: "data"),
                  let data = try? Data(contentsOf: url),
                  let decoded = try? JSONDecoder().decode(NameData.self, from: data) else {
                DispatchQueue.main.async { self.isLoading = false }
                return
            }
            
            self.namParsed = self.parsePool(arr: decoded.nam)
            self.nuParsed = self.parsePool(arr: decoded.nu)
            
            DispatchQueue.main.async {
                self.isLoading = false
            }
        }
    }
    
    private func isValidSyllable(_ word: String) -> Bool {
        let w = word.lowercased()
        let vowels = "aàáảãạăằắẳẵặâầấẩẫậeèéẻẽẹêềếểễệiìíỉĩịoòóỏõọôồốổỗộơờớởỡợuùúủũụưừứửữựyỳýỷỹỵ"
        var hasVowel = false
        for char in w {
            if vowels.contains(char) {
                hasVowel = true
                break
            }
        }
        if !hasVowel { return false }
        
        if w.count == 1 {
            let validOneChar = ["a","á","à","ả","ã","ạ","ý","ỳ","ỷ","ỹ","ỵ","ê","ề","ế","ể","ễ","ệ","ô","ồ","ố","ổ","ỗ","ộ"]
            if !validOneChar.contains(w) { return false }
        }
        return true
    }
    
    private func parsePool(arr: [String]) -> ParsedData {
        var p = ParsedData()
        var hoSet = Set<String>()
        var tenSet = Set<String>()
        var dfSet = Set<String>()
        var dwSet = Set<String>()
        
        for name in arr {
            let cleanParts = name.trimmingCharacters(in: .whitespaces).components(separatedBy: .whitespaces).filter { !$0.isEmpty }
            let validWords = cleanParts.filter { isValidSyllable($0) }
            if validWords.count >= 2 {
                hoSet.insert(validWords.first!)
                tenSet.insert(validWords.last!)
                if validWords.count > 2 {
                    let d = Array(validWords[1..<(validWords.count-1)])
                    dfSet.insert(d.joined(separator: " "))
                    for dw in d { dwSet.insert(dw) }
                }
            }
        }
        p.ho = Array(hoSet)
        p.ten = Array(tenSet)
        p.demFull = Array(dfSet)
        p.demWords = Array(dwSet)
        return p
    }
    
    func capitalizeName(_ string: String) -> String {
        let words = string.components(separatedBy: .whitespaces).filter { !$0.isEmpty }
        return words.map { $0.prefix(1).uppercased() + $0.dropFirst().lowercased() }.joined(separator: " ")
    }
    
    func generateNames() {
        if lengthOpt == "2" && !inputDem.trimmingCharacters(in: .whitespaces).isEmpty {
            return // Should prompt alert
        }
        
        var results = [(String, String)]()
        var usedNames = Set<String>()
        
        let targetCount = Int(count) ?? 100
        let cappedCount = min(max(targetCount, 1), 200)
        let totalAttempts = cappedCount * 100
        var attempts = 0
        
        let lengthWeights = [2, 3, 3, 3, 4, 4, 4, 5]
        
        while results.count < cappedCount && attempts < totalAttempts {
            attempts += 1
            
            let g = gender == "all" ? (Bool.random() ? "nam" : "nu") : gender
            let pool = g == "nam" ? namParsed : nuParsed
            
            var targetL: Int
            if lengthOpt == "all" {
                targetL = lengthWeights.randomElement()!
            } else {
                targetL = Int(lengthOpt) ?? 3
            }
            
            let hoStr = inputHo.isEmpty ? pool.ho.randomElement() ?? "" : capitalizeName(inputHo)
            var demInStr = inputDem.isEmpty ? "" : capitalizeName(inputDem)
            let tenStr = inputTen.isEmpty ? pool.ten.randomElement() ?? "" : capitalizeName(inputTen)
            
            let c_ho = hoStr.isEmpty ? 0 : hoStr.components(separatedBy: .whitespaces).count
            let c_ten = tenStr.isEmpty ? 0 : tenStr.components(separatedBy: .whitespaces).count
            let c_dem_in = demInStr.isEmpty ? 0 : demInStr.components(separatedBy: .whitespaces).count
            
            let needed_dem = targetL - c_ho - c_ten - c_dem_in
            
            if needed_dem > 0 {
                var addedDem = ""
                let exactDems = pool.demFull.filter { $0.components(separatedBy: .whitespaces).count == needed_dem }
                if !exactDems.isEmpty && Bool.random() {
                    addedDem = exactDems.randomElement()!
                } else {
                    var tempDemArr: [String] = []
                    var lastWord = demInStr.components(separatedBy: .whitespaces).last ?? ""
                    for _ in 0..<needed_dem {
                        var w = pool.demWords.randomElement() ?? ""
                        var localTries = 0
                        while w == lastWord && localTries < 15 {
                            w = pool.demWords.randomElement() ?? ""
                            localTries += 1
                        }
                        tempDemArr.append(w)
                        lastWord = w
                    }
                    addedDem = tempDemArr.joined(separator: " ")
                }
                demInStr = demInStr.isEmpty ? addedDem : demInStr + " " + addedDem
            } else if lengthOpt == "2" {
                demInStr = ""
            }
            
            var nameParts: [String] = []
            if !hoStr.isEmpty { nameParts.append(hoStr) }
            if !demInStr.isEmpty { nameParts.append(demInStr) }
            if !tenStr.isEmpty { nameParts.append(tenStr) }
            
            let finalName = nameParts.joined(separator: " ").trimmingCharacters(in: .whitespaces).replacingOccurrences(of: "  ", with: " ")
            let finalWordCount = finalName.components(separatedBy: .whitespaces).count
            
            if lengthOpt != "all" && finalWordCount != Int(lengthOpt) {
                if c_ho + c_dem_in + c_ten < (Int(lengthOpt) ?? 3) { continue }
            }
            
            if !usedNames.contains(finalName) {
                usedNames.insert(finalName)
                results.append((finalName, g))
            }
        }
        
        self.generatedNames = results
    }
    
    func processFilter() {
        guard !filterInput.isEmpty else {
            filterOutput = ""
            return
        }
        
        var lines = filterInput.components(separatedBy: .newlines)
        
        if removeEmpty {
            lines = lines.filter { !$0.trimmingCharacters(in: .whitespaces).isEmpty }
        }
        
        if removeOldNumbers {
            let regex = try! NSRegularExpression(pattern: "^\\s*\\d+[\\.\\-\\)]?\\s*")
            lines = lines.map {
                regex.stringByReplacingMatches(in: $0, range: NSRange($0.startIndex..., in: $0), withTemplate: "")
            }
        }
        
        if cleanSpaces {
            lines = lines.map {
                $0.trimmingCharacters(in: .whitespaces).replacingOccurrences(of: "\\s+", with: " ", options: .regularExpression)
            }
        }
        
        switch caseOptions {
        case "title":
            lines = lines.map { capitalizeName($0) }
        case "lower":
            lines = lines.map { $0.lowercased() }
        case "upper":
            lines = lines.map { $0.uppercased() }
        default: break
        }
        
        if removeViAccents {
            lines = lines.map {
                $0.applyingTransform(.stripDiacritics, reverse: false) ?? $0
            }.map {
                $0.replacingOccurrences(of: "đ", with: "d").replacingOccurrences(of: "Đ", with: "D")
            }
        }
        
        if useWordCountFilter {
            let num = Int(wordCountNum) ?? 0
            lines = lines.filter { line in
                if line.trimmingCharacters(in: .whitespaces).isEmpty { return false }
                let wc = line.trimmingCharacters(in: .whitespaces).components(separatedBy: .whitespaces).count
                if wordCountOperator == "less" { return wc < num }
                if wordCountOperator == "eq" { return wc == num }
                if wordCountOperator == "greater" { return wc > num }
                return true
            }
        }
        
        if removeDuplicates {
            var seen = Set<String>()
            lines = lines.filter {
                if seen.contains($0) { return false }
                seen.insert($0)
                return true
            }
        }
        
        if sortOptions != "none" {
            lines.sort { a, b in
                let aLast = a.components(separatedBy: .whitespaces).last ?? ""
                let bLast = b.components(separatedBy: .whitespaces).last ?? ""
                let cmp = aLast.localizedCompare(bLast)
                let finalCmp = cmp == .orderedSame ? a.localizedCompare(b) : cmp
                return sortOptions == "asc" ? (finalCmp == .orderedAscending) : (finalCmp == .orderedDescending)
            }
        }
        
        if reverseLines {
            lines.reverse()
        }
        
        if shuffleLines {
            lines.shuffle()
        }
        
        if addNewNumbers {
            lines = lines.enumerated().map { "\($0.offset + 1). \($0.element)" }
        }
        
        filterOutput = lines.joined(separator: "\n")
    }
}

// ================= UI View =================

struct BabyNameView: View {
    @StateObject private var vm = BabyNameViewModel()
    
    var body: some View {
        ScrollView {
            if vm.isLoading {
                ProgressView("Đang tải dữ liệu Tên (Khoảng vài giây)...")
                    .padding(50)
            } else {
                VStack(spacing: 24) {
                    
                    // HEADER
                    VStack(spacing: 8) {
                        Text("Kho dữ liệu vô tận")
                            .font(.system(size: 10, weight: .bold))
                            .foregroundColor(.pink)
                            .padding(.horizontal, 12)
                            .padding(.vertical, 4)
                            .background(Color.pink.opacity(0.1))
                            .clipShape(Capsule())
                            .overlay(Capsule().stroke(Color.pink.opacity(0.2), lineWidth: 1))
                        
                        Text("Đặt Tên Cho Bé Yêu")
                            .font(.system(size: 28, weight: .bold, design: .rounded))
                            .foregroundColor(.primary)
                    }
                    .padding(.top, 20)
                    
                    // COLUMN 1: BỘ LỌC ĐỀ XUẤT TÊN
                    VStack(spacing: 16) {
                        Text("Bộ lọc tùy chỉnh")
                            .font(.headline).fontWeight(.bold).textCase(.uppercase)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        HStack {
                            VStack(alignment: .leading) {
                                Text("GIỚI TÍNH").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                Picker("Giới tính", selection: $vm.gender) {
                                    Text("Tất cả").tag("all")
                                    Text("Nam").tag("nam")
                                    Text("Nữ").tag("nu")
                                }.pickerStyle(.menu).frame(maxWidth: .infinity).padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                            }
                            VStack(alignment: .leading) {
                                Text("SỐ LƯỢNG").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                TextField("100", text: $vm.count)
                                    .keyboardType(.numberPad)
                                    .multilineTextAlignment(.center)
                                    .padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                            }
                        }
                        
                        VStack(alignment: .leading) {
                            Text("ĐỘ DÀI TÊN").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                            Picker("Độ dài", selection: $vm.lengthOpt) {
                                Text("Ngẫu nhiên").tag("all")
                                Text("2 Chữ").tag("2")
                                Text("3 Chữ").tag("3")
                                Text("4 Chữ").tag("4")
                                Text("5 Chữ").tag("5")
                            }.pickerStyle(.menu).frame(maxWidth: .infinity).padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                        }
                        
                        HStack {
                            VStack(alignment: .leading) {
                                Text("HỌ").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                TextField("Nguyễn...", text: $vm.inputHo)
                                    .padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                            }
                            VStack(alignment: .leading) {
                                Text("CHỮ LÓT").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                TextField("Thị, Văn...", text: $vm.inputDem)
                                    .padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                            }
                            VStack(alignment: .leading) {
                                Text("TÊN CHÍNH").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                TextField("Tâm...", text: $vm.inputTen)
                                    .padding(8).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                            }
                        }
                        
                        Button(action: {
                            hideKeyboard()
                            vm.generateNames()
                        }) {
                            Text("ĐỀ XUẤT TÊN")
                                .font(.subheadline).fontWeight(.bold)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.pink)
                                .cornerRadius(12)
                        }
                    }
                    .padding()
                    .background(Color(uiColor: .secondarySystemGroupedBackground))
                    .cornerRadius(24)
                    .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
                    
                    
                    // COLUMN 2: KẾT QUẢ ĐỀ XUẤT
                    VStack(alignment: .leading, spacing: 16) {
                        Text("Danh sách tên gợi ý")
                            .font(.headline).fontWeight(.bold).textCase(.uppercase)
                        
                        if vm.generatedNames.isEmpty {
                            Text("Chưa có dữ liệu. Hãy bấm 'Đề xuất tên'!")
                                .font(.footnote)
                                .foregroundColor(.secondary)
                                .frame(maxWidth: .infinity, alignment: .center)
                                .padding(.vertical, 30)
                        } else {
                            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 12) {
                                ForEach(0..<vm.generatedNames.count, id: \.self) { i in
                                    let item = vm.generatedNames[i]
                                    Text(item.name)
                                        .font(.system(size: 15, weight: .bold))
                                        .foregroundColor(item.gender == "nam" ? .blue : .pink)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 12)
                                        .background(item.gender == "nam" ? Color.blue.opacity(0.1) : Color.pink.opacity(0.1))
                                        .cornerRadius(10)
                                        .overlay(RoundedRectangle(cornerRadius: 10).stroke(item.gender == "nam" ? Color.blue.opacity(0.3) : Color.pink.opacity(0.3), lineWidth: 1))
                                }
                            }
                        }
                    }
                    .padding()
                    .background(Color(uiColor: .secondarySystemGroupedBackground))
                    .cornerRadius(24)
                    .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
                    
                    // TRẠM XỬ LÝ DANH SÁCH (FILTERS)
                    VStack(spacing: 16) {
                        Text("Trạm Xử Lý Danh Sách")
                            .font(.headline).fontWeight(.bold).textCase(.uppercase)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        
                        TextEditor(text: $vm.filterInput)
                            .font(.system(.footnote, design: .monospaced))
                            .frame(height: 120)
                            .padding(8).background(Color(uiColor: .systemGray6))
                            .cornerRadius(12)
                            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.gray.opacity(0.2), lineWidth: 1))
                        
                        VStack(spacing: 12) {
                            HStack {
                                Toggle("Xóa dòng trống", isOn: $vm.removeEmpty).font(.caption).labelsHidden()
                                Text("Xóa dòng trống").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                Spacer()
                                Toggle("Dấu cách chuẩn", isOn: $vm.cleanSpaces).font(.caption).labelsHidden()
                                Text("Dấu cách chuẩn").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                            }
                            HStack {
                                Toggle("Bỏ số cũ", isOn: $vm.removeOldNumbers).font(.caption).labelsHidden()
                                Text("Bỏ số cũ").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                Spacer()
                                Toggle("Thêm số mới", isOn: $vm.addNewNumbers).font(.caption).labelsHidden()
                                Text("Thêm số mới").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                            }
                            HStack {
                                Toggle("Lọc trùng", isOn: $vm.removeDuplicates).font(.caption).labelsHidden()
                                Text("Lọc trùng").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                                Spacer()
                                Toggle("Bỏ dấu Tiếng Việt", isOn: $vm.removeViAccents).font(.caption).labelsHidden()
                                Text("Bỏ dấu Tiếng Việt").font(.caption2).fontWeight(.bold).foregroundColor(.secondary)
                            }
                            
                            Divider()
                            
                            Picker("In/Hoa", selection: $vm.caseOptions) {
                                Text("Aa (Viết hoa chữ đầu)").tag("title")
                                Text("aa (Viết thường)").tag("lower")
                                Text("AA (Viết hoa)").tag("upper")
                                Text("A/a (Không đổi)").tag("none")
                            }.pickerStyle(.menu).frame(maxWidth: .infinity).padding(4).background(Color.white).cornerRadius(8)
                            
                            Picker("Sắp xếp", selection: $vm.sortOptions) {
                                Text("Không sắp xếp").tag("none")
                                Text("A-Z").tag("asc")
                                Text("Z-A").tag("desc")
                            }.pickerStyle(.menu).frame(maxWidth: .infinity).padding(4).background(Color.white).cornerRadius(8)
                        }
                        .padding()
                        .background(Color(uiColor: .systemGray6))
                        .cornerRadius(16)
                        
                        Button(action: {
                            hideKeyboard()
                            vm.processFilter()
                        }) {
                            Text("XỬ LÝ DỮ LIỆU")
                                .font(.subheadline).fontWeight(.bold)
                                .foregroundColor(.white)
                                .frame(maxWidth: .infinity)
                                .padding()
                                .background(Color.indigo)
                                .cornerRadius(12)
                        }
                        
                        TextEditor(text: $vm.filterOutput)
                            .font(.system(.footnote, design: .monospaced))
                            .frame(height: 120)
                            .padding(8).background(Color.indigo.opacity(0.05))
                            .cornerRadius(12)
                            .overlay(RoundedRectangle(cornerRadius: 12).stroke(Color.indigo.opacity(0.2), lineWidth: 1))
                    }
                    .padding()
                    .background(Color(uiColor: .secondarySystemGroupedBackground))
                    .cornerRadius(24)
                    .shadow(color: Color.black.opacity(0.05), radius: 10, x: 0, y: 5)
                    
                }
                .padding(.horizontal)
                .padding(.bottom, 40)
            }
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle("Đặt Tên")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#if canImport(UIKit)
extension View {
    func hideKeyboard() {
        UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}
#endif
