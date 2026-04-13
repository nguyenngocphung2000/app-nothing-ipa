import SwiftUI

class CalcViewModel: ObservableObject {
    @Published var mode: Int = 1
    
    // Mode 1: P% of V = R
    @Published var m1P: String = "" { didSet { calc1(targetTag: 1) } }
    @Published var m1V: String = "" { didSet { calc1(targetTag: 2) } }
    @Published var m1R: String = "" { didSet { calc1(targetTag: 3) } }
    var lastModified1: Int = 0 // 1: P, 2: V, 3: R
    
    // Mode 2: X is R% of Y
    @Published var m2X: String = "" { didSet { calc2(targetTag: 1) } }
    @Published var m2Y: String = "" { didSet { calc2(targetTag: 2) } }
    @Published var m2R: String = "" { didSet { calc2(targetTag: 3) } }
    var lastModified2: Int = 0
    
    // Mode 3: Old to New = R%
    @Published var m3O: String = "" { didSet { calc3(targetTag: 1) } }
    @Published var m3N: String = "" { didSet { calc3(targetTag: 2) } }
    @Published var m3R: String = "" { didSet { calc3(targetTag: 3) } }
    var lastModified3: Int = 0
    
    @Published var romanInput: String = "" { didSet { processRoman() } }
    @Published var arabicInput: String = "" { didSet { processArabic() } }
    
    @Published var history: [String] = []
    
    private var isProgrammaticUpdate = false
    
    func calc1(targetTag: Int) {
        guard !isProgrammaticUpdate else { return }
        lastModified1 = targetTag
        
        let p = Double(m1P) ?? .nan
        let v = Double(m1V) ?? .nan
        let r = Double(m1R) ?? .nan
        
        isProgrammaticUpdate = true
        if targetTag != 3 && !p.isNaN && !v.isNaN {
            m1R = formatNumber((p * v) / 100.0)
        } else if targetTag != 2 && !p.isNaN && !r.isNaN && p != 0 {
            m1V = formatNumber((r * 100.0) / p)
        } else if targetTag != 1 && !v.isNaN && !r.isNaN && v != 0 {
            m1P = formatNumber((r / v) * 100.0)
        }
        isProgrammaticUpdate = false
    }
    
    func calc2(targetTag: Int) {
        guard !isProgrammaticUpdate else { return }
        lastModified2 = targetTag
        let x = Double(m2X) ?? .nan
        let y = Double(m2Y) ?? .nan
        let r = Double(m2R) ?? .nan
        
        isProgrammaticUpdate = true
        if targetTag != 3 && !x.isNaN && !y.isNaN && y != 0 {
            m2R = formatNumber((x / y) * 100.0)
        } else if targetTag != 1 && !r.isNaN && !y.isNaN {
            m2X = formatNumber((r * y) / 100.0)
        } else if targetTag != 2 && !x.isNaN && !r.isNaN && r != 0 {
            m2Y = formatNumber((x / r) * 100.0)
        }
        isProgrammaticUpdate = false
    }
    
    func calc3(targetTag: Int) {
        guard !isProgrammaticUpdate else { return }
        lastModified3 = targetTag
        let o = Double(m3O) ?? .nan
        let n = Double(m3N) ?? .nan
        let r = Double(m3R) ?? .nan
        
        isProgrammaticUpdate = true
        if targetTag != 3 && !o.isNaN && !n.isNaN && o != 0 {
            m3R = formatNumber(((n - o) / o) * 100.0)
        } else if targetTag != 2 && !o.isNaN && !r.isNaN {
            m3N = formatNumber(o * (1 + r / 100.0))
        } else if targetTag != 1 && !n.isNaN && !r.isNaN && r != -100 {
            m3O = formatNumber(n / (1 + r / 100.0))
        }
        isProgrammaticUpdate = false
    }
    
    func formatNumber(_ num: Double) -> String {
        let formatter = NumberFormatter()
        formatter.minimumFractionDigits = 0
        formatter.maximumFractionDigits = 2
        formatter.numberStyle = .decimal
        formatter.groupingSeparator = ""
        return formatter.string(from: NSNumber(value: num)) ?? ""
    }
    
    func saveHistory(_ text: String) {
        history.insert(text, at: 0)
        if history.count > 30 { history.removeLast() }
    }
    
    // Roman Logic
    let romanMap: [(String, Int)] = [
        ("M", 1000), ("CM", 900), ("D", 500), ("CD", 400),
        ("C", 100), ("XC", 90), ("L", 50), ("XL", 40),
        ("X", 10), ("IX", 9), ("V", 5), ("IV", 4), ("I", 1)
    ]
    
    func processArabic() {
        guard !isProgrammaticUpdate else { return }
        guard let val = Int(arabicInput) else {
            isProgrammaticUpdate = true; romanInput = ""; isProgrammaticUpdate = false; return
        }
        if val < 1 || val > 3999 {
            isProgrammaticUpdate = true; romanInput = "LỖI"; isProgrammaticUpdate = false; return
        }
        
        var num = val
        var str = ""
        for item in romanMap {
            let q = num / item.1
            num -= q * item.1
            str += String(repeating: item.0, count: q)
        }
        isProgrammaticUpdate = true; romanInput = str; isProgrammaticUpdate = false
    }
    
    func processRoman() {
        guard !isProgrammaticUpdate else { return }
        var str = romanInput.uppercased().trimmingCharacters(in: .whitespaces)
        guard !str.isEmpty else {
            isProgrammaticUpdate = true; arabicInput = ""; isProgrammaticUpdate = false; return
        }
        
        let validChars = CharacterSet(charactersIn: "IVXLCDM")
        if str.rangeOfCharacter(from: validChars.inverted) != nil {
            isProgrammaticUpdate = true; arabicInput = ""; isProgrammaticUpdate = false; return
        }
        
        var num = 0
        for item in romanMap {
            while str.hasPrefix(item.0) {
                num += item.1
                str.removeFirst(item.0.count)
            }
        }
        isProgrammaticUpdate = true; arabicInput = num > 0 ? String(num) : ""; isProgrammaticUpdate = false
    }
}

struct CalcView: View {
    @StateObject private var vm = CalcViewModel()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("Công cụ tính toán")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.yellow)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(Color.yellow.opacity(0.1))
                        .clipShape(Capsule())
                    
                    Text("Tính Phần Trăm")
                        .font(.system(size: 26, weight: .bold, design: .rounded))
                    
                    Text("Nhập 2 ô bất kỳ, ô còn lại sẽ tự động tính!")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .italic()
                }
                .padding(.top, 20)
                
                // MÁY TÍNH %
                VStack(spacing: 16) {
                    Picker("Mode", selection: $vm.mode) {
                        Text("X% của Y").tag(1)
                        Text("X là % của Y").tag(2)
                        Text("Tăng/Giảm").tag(3)
                    }
                    .pickerStyle(SegmentedPickerStyle())
                    
                    if vm.mode == 1 {
                        HStack {
                            VStack {
                                Text("Phần trăm").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("30", text: $vm.m1P).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("% của").font(.caption).fontWeight(.bold).foregroundColor(.gray)
                            VStack {
                                Text("Giá trị").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("250000", text: $vm.m1V).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("=").font(.headline).foregroundColor(.gray)
                            VStack {
                                Text("Kết quả").font(.caption2).fontWeight(.bold).foregroundColor(.red)
                                TextField("75000", text: $vm.m1R).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle()).foregroundColor(.red)
                            }
                        }
                        
                        Button("LƯU KQ") {
                            if !vm.m1P.isEmpty && !vm.m1V.isEmpty && !vm.m1R.isEmpty {
                                vm.saveHistory("\(vm.m1P)% của \(vm.m1V) = \(vm.m1R)")
                            }
                        }.font(.caption).fontWeight(.bold).padding(8).background(Color.blue.opacity(0.1)).foregroundColor(.blue).cornerRadius(8)
                        
                    } else if vm.mode == 2 {
                        HStack {
                            VStack {
                                Text("Giá trị X").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("45000", text: $vm.m2X).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("là % của").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                            VStack {
                                Text("Giá trị Y").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("180000", text: $vm.m2Y).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("=").font(.headline).foregroundColor(.gray)
                            VStack {
                                Text("Phần trăm").font(.caption2).fontWeight(.bold).foregroundColor(.red)
                                HStack {
                                    TextField("25", text: $vm.m2R).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle()).foregroundColor(.red)
                                    Text("%").bold()
                                }
                            }
                        }
                        
                        Button("LƯU KQ") {
                            if !vm.m2X.isEmpty && !vm.m2Y.isEmpty && !vm.m2R.isEmpty {
                                vm.saveHistory("\(vm.m2X) là \(vm.m2R)% của \(vm.m2Y)")
                            }
                        }.font(.caption).fontWeight(.bold).padding(8).background(Color.blue.opacity(0.1)).foregroundColor(.blue).cornerRadius(8)
                        
                    } else if vm.mode == 3 {
                        HStack {
                            VStack {
                                Text("Giá cũ").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("200000", text: $vm.m3O).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("→").font(.headline).foregroundColor(.gray)
                            VStack {
                                Text("Giá mới").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                                TextField("150000", text: $vm.m3N).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            }
                            Text("=").font(.headline).foregroundColor(.gray)
                            VStack {
                                Text("Tăng/Giảm").font(.caption2).fontWeight(.bold).foregroundColor(.red)
                                HStack {
                                    TextField("-25", text: $vm.m3R).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle()).foregroundColor(.red)
                                    Text("%").bold()
                                }
                            }
                        }
                        
                        Button("LƯU KQ") {
                            if !vm.m3O.isEmpty && !vm.m3N.isEmpty && !vm.m3R.isEmpty {
                                let r = Double(vm.m3R) ?? 0
                                let t = r > 0 ? "Tăng" : "Giảm"
                                vm.saveHistory("Từ \(vm.m3O) → \(vm.m3N) là \(t) \(abs(r))%")
                            }
                        }.font(.caption).fontWeight(.bold).padding(8).background(Color.blue.opacity(0.1)).foregroundColor(.blue).cornerRadius(8)
                    }
                }
                .padding()
                .background(Color(uiColor: .secondarySystemGroupedBackground))
                .cornerRadius(20)
                
                // MÁY TÍNH LA MÃ
                VStack(spacing: 16) {
                    Text("CHUYỂN ĐỔI SỐ LA MÃ").font(.caption).fontWeight(.bold).foregroundColor(.secondary).frame(maxWidth: .infinity, alignment: .leading)
                    
                    HStack {
                        VStack {
                            Text("Số Thường").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                            TextField("2026", text: $vm.arabicInput).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                        Text("↔").font(.title).foregroundColor(.gray)
                        VStack {
                            Text("Số La Mã").font(.caption2).fontWeight(.bold).foregroundColor(.red)
                            TextField("MMXXVI", text: $vm.romanInput).textFieldStyle(RoundedBorderTextFieldStyle()).foregroundColor(.red)
                        }
                    }
                    
                    Button("LƯU KQ") {
                        if !vm.arabicInput.isEmpty && !vm.romanInput.isEmpty && vm.romanInput != "LỖI" {
                            vm.saveHistory("Số \(vm.arabicInput) = RM \(vm.romanInput)")
                        }
                    }.font(.caption).fontWeight(.bold).padding(8).background(Color.blue.opacity(0.1)).foregroundColor(.blue).cornerRadius(8)
                }
                .padding()
                .background(Color(uiColor: .secondarySystemGroupedBackground))
                .cornerRadius(20)
                
                // HISTORY
                VStack(alignment: .leading, spacing: 12) {
                    HStack {
                        Text("LỊCH SỬ TÍNH TOÁN").font(.caption).fontWeight(.bold).foregroundColor(.secondary)
                        Spacer()
                        Button("Xóa") { vm.history.removeAll() }.font(.caption).foregroundColor(.red)
                    }
                    
                    if vm.history.isEmpty {
                        Text("Chưa có lịch sử. Ấn LƯU KQ ở các bảng tính!").font(.caption).foregroundColor(.gray).italic().padding(.vertical)
                    } else {
                        ForEach(vm.history, id: \.self) { item in
                            Text("• \(item)").font(.subheadline).padding(.vertical, 4)
                            Divider()
                        }
                    }
                }
                .padding()
                .background(Color(uiColor: .secondarySystemGroupedBackground))
                .cornerRadius(20)
            }
            .padding()
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle("Calc / RM")
        .navigationBarTitleDisplayMode(.inline)
    }
}
