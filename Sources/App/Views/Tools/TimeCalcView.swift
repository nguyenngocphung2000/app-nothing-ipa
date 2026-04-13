import SwiftUI

class TimeCalcViewModel: ObservableObject {
    @Published var startDateCalc: Date = Date()
    @Published var endDateCalc: Date = Date()
    @Published var resultType1: String = "--"
    @Published var resultMode1: String = "--"
    @Published var resultTotalDays1: String = "--"
    
    @Published var m2Start: Date? = Date()
    @Published var m2End: Date? = Date()
    @Published var m2WaitY: String = ""
    @Published var m2WaitM: String = ""
    @Published var m2WaitD: String = ""
    @Published var m2RatioNum: String = ""
    @Published var m2RatioDen: String = ""
    
    @Published var m2ResultHtml: String = ""
    
    @Published var history: [String] = []
    
    func calcDistance(isReal: Bool) {
        if endDateCalc < startDateCalc {
            resultType1 = "Lỗi: Ngày đích nhỏ hơn ngày đầu."
            return
        }
        let cal = Calendar.current
        
        if !isReal {
            // "Công thức" 30 days/month
            let c1 = cal.dateComponents([.year, .month, .day], from: startDateCalc)
            let c2 = cal.dateComponents([.year, .month, .day], from: endDateCalc)
            
            guard let d1 = c1.day, let m1 = c1.month, let y1 = c1.year,
                  var d2 = c2.day, var m2 = c2.month, var y2 = c2.year else { return }
            
            var dayRes = 0
            var monthRes = 0
            var yearRes = 0
            
            if d2 >= d1 {
                dayRes = d2 - d1
            } else {
                dayRes = d2 + 30 - d1
                m2 -= 1
            }
            if m2 >= m1 {
                monthRes = m2 - m1
            } else {
                monthRes = m2 + 12 - m1
                y2 -= 1
            }
            yearRes = y2 - y1
            
            resultType1 = "\(yearRes) năm \(monthRes) tháng \(dayRes) ngày"
            resultMode1 = "Công thức (30đ/tháng)"
            resultTotalDays1 = "\(yearRes * 360 + monthRes * 30 + dayRes) ngày"
            
            history.insert("CÔNG THỨC: Từ \(startDateCalc.formatted(date: .numeric, time: .omitted)) đến \(endDateCalc.formatted(date: .numeric, time: .omitted)) -> \(resultType1)", at: 0)
            
        } else {
            // Thực tế
            let components = cal.dateComponents([.year, .month, .day], from: startDateCalc, to: endDateCalc)
            let totalDays = cal.dateComponents([.day], from: startDateCalc, to: endDateCalc).day ?? 0
            
            let y = components.year ?? 0
            let m = components.month ?? 0
            let d = components.day ?? 0
            
            resultType1 = "\(y) năm \(m) tháng \(d) ngày"
            resultMode1 = "Thực tế (Theo lịch)"
            resultTotalDays1 = "\(totalDays) ngày"
            
            history.insert("THỰC TẾ: Từ \(startDateCalc.formatted(date: .numeric, time: .omitted)) đến \(endDateCalc.formatted(date: .numeric, time: .omitted)) -> \(resultType1)", at: 0)
        }
    }
    
    func getDays360(from d1: Date, to d2: Date) -> Int {
        let cal = Calendar.current
        let c1 = cal.dateComponents([.year, .month, .day], from: d1)
        let c2 = cal.dateComponents([.year, .month, .day], from: d2)
        return ((c2.year ?? 0) - (c1.year ?? 0)) * 360 + ((c2.month ?? 0) - (c1.month ?? 0)) * 30 + ((c2.day ?? 0) - (c1.day ?? 0))
    }
    
    func calcMulti() {
        guard let s = m2Start else { return }
        
        let hasEnd = m2End != nil
        let hasWait = !m2WaitY.isEmpty || !m2WaitM.isEmpty || !m2WaitD.isEmpty
        let hasRatio = !m2RatioNum.isEmpty && !m2RatioDen.isEmpty
        
        let wY = Int(m2WaitY) ?? 0
        let wM = Int(m2WaitM) ?? 0
        let wD = Int(m2WaitD) ?? 0
        let waitDaysTotal = wY * 360 + wM * 30 + wD
        
        let rN = Int(m2RatioNum) ?? 0
        let rD = Int(m2RatioDen) ?? 0
        
        if hasEnd && !hasWait && !hasRatio {
            let passDays = getDays360(from: s, to: m2End!)
            let y = passDays / 360
            let m = (passDays % 360) / 30
            let d = (passDays % 360) % 30
            m2ResultHtml = "Tổng quy đổi: \(y) năm \(m) tháng \(d) ngày"
        }
        else if hasWait && hasRatio && !hasEnd {
            guard rD != 0 else { return }
            let passDays = (waitDaysTotal * rN) / rD
            let pY = passDays / 360
            let pM = (passDays % 360) / 30
            let pD = (passDays % 360) % 30
            
            var components = DateComponents()
            components.year = pY
            components.month = pM
            components.day = pD
            
            let eTarget = Calendar.current.date(byAdding: components, to: s)
            let formattedEnd = eTarget?.formatted(date: .long, time: .omitted) ?? ""
            m2ResultHtml = "Ngày chạm mốc: \(formattedEnd)\n(Thời gian quy đổi cộng thêm: \(pY) năm \(pM) tháng \(pD) ngày)"
        }
        else if hasEnd && hasRatio && !hasWait {
            guard rN != 0 else { return }
            let passDays = getDays360(from: s, to: m2End!)
            let wDays = (passDays * rD) / rN
            let wY = wDays / 360
            let wM = (wDays % 360) / 30
            let wD = (wDays % 360) % 30
            m2ResultHtml = "Tổng thời gian: \(wY) năm \(wM) tháng \(wD) ngày"
        }
        else {
            m2ResultHtml = "Vui lòng cung cấp 2 trong 3 dữ kiện để tính."
        }
    }
}

struct TimeCalcView: View {
    @StateObject private var vm = TimeCalcViewModel()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                // HEADER
                VStack(spacing: 8) {
                    Text("Công thức & Thực tế")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.teal)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(Color.teal.opacity(0.1))
                        .clipShape(Capsule())
                    
                    Text("Tính Khoảng Cách Thời Gian")
                        .font(.system(size: 26, weight: .bold, design: .rounded))
                        .multilineTextAlignment(.center)
                }
                .padding(.top, 20)
                
                // MỐC NGÀY 1
                VStack(spacing: 16) {
                    Text("KHOẢNG CÁCH 2 MỐC NGÀY").font(.caption).fontWeight(.bold).foregroundColor(.secondary).frame(maxWidth: .infinity, alignment: .leading)
                    
                    DatePicker("Từ ngày", selection: $vm.startDateCalc, displayedComponents: .date)
                    DatePicker("Đến ngày", selection: $vm.endDateCalc, displayedComponents: .date)
                    
                    HStack(spacing: 12) {
                        Button(action: { vm.calcDistance(isReal: false) }) {
                            VStack {
                                Text("CÔNG THỨC").font(.subheadline).fontWeight(.bold)
                                Text("(Quy ước 30 ngày)").font(.caption2)
                            }.frame(maxWidth: .infinity).padding().background(Color.teal).foregroundColor(.white).cornerRadius(10)
                        }
                        Button(action: { vm.calcDistance(isReal: true) }) {
                            VStack {
                                Text("THỰC TẾ").font(.subheadline).fontWeight(.bold)
                                Text("(Theo lịch iOS)").font(.caption2)
                            }.frame(maxWidth: .infinity).padding().background(Color.indigo).foregroundColor(.white).cornerRadius(10)
                        }
                    }
                    
                    Divider()
                    
                    VStack(spacing: 8) {
                        Text("Kết Quả").font(.caption).fontWeight(.bold).foregroundColor(.gray)
                        Text(vm.resultType1).font(.headline).foregroundColor(.primary)
                        Text("Tổng cộng: \(vm.resultTotalDays1) (\(vm.resultMode1))").font(.caption).foregroundColor(.secondary)
                    }.padding().frame(maxWidth: .infinity).background(Color(uiColor: .systemGray6)).cornerRadius(10)
                }
                .padding()
                .background(Color(uiColor: .secondarySystemGroupedBackground))
                .cornerRadius(20)
                
                // ĐA CHIỀU
                VStack(spacing: 16) {
                    Text("TÍNH THỜI GIAN ĐA CHIỀU").font(.caption).fontWeight(.bold).foregroundColor(.secondary).frame(maxWidth: .infinity, alignment: .leading)
                    
                    HStack {
                        Text("1. Ngày Bắt Đầu").font(.caption2).fontWeight(.bold)
                        Spacer()
                        if vm.m2Start != nil { DatePicker("", selection: Binding(get: { vm.m2Start! }, set: { vm.m2Start = $0 }), displayedComponents: .date).labelsHidden() }
                        else { Button("Thêm") { vm.m2Start = Date() } }
                        Button(action: { vm.m2Start = nil }) { Image(systemName: "xmark.circle.fill").foregroundColor(.gray) }
                    }
                    
                    HStack {
                        Text("2. Ngày Kết Thúc").font(.caption2).fontWeight(.bold)
                        Spacer()
                        if vm.m2End != nil { DatePicker("", selection: Binding(get: { vm.m2End! }, set: { vm.m2End = $0 }), displayedComponents: .date).labelsHidden() }
                        else { Button("Thêm") { vm.m2End = Date() } }
                        Button(action: { vm.m2End = nil }) { Image(systemName: "xmark.circle.fill").foregroundColor(.gray) }
                    }
                    
                    VStack(alignment: .leading) {
                        Text("3. Tổng Thời Gian (Chờ/Gốc)").font(.caption2).fontWeight(.bold)
                        HStack {
                            TextField("Năm", text: $vm.m2WaitY).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            TextField("Tháng", text: $vm.m2WaitM).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            TextField("Ngày", text: $vm.m2WaitD).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                    }
                    
                    VStack(alignment: .leading) {
                        Text("4. Tỷ lệ (Phân số)").font(.caption2).fontWeight(.bold)
                        HStack {
                            TextField("Tử", text: $vm.m2RatioNum).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                            Text("/")
                            TextField("Mẫu", text: $vm.m2RatioDen).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                        }
                    }
                    
                    Button(action: { vm.calcMulti() }) {
                        Text("TÍNH TOÁN")
                            .font(.subheadline).fontWeight(.bold)
                            .frame(maxWidth: .infinity).padding().background(Color.orange).foregroundColor(.white).cornerRadius(10)
                    }
                    
                    Text(vm.m2ResultHtml).font(.subheadline).fontWeight(.bold).foregroundColor(.orange).multilineTextAlignment(.center).padding()
                }
                .padding()
                .background(Color(uiColor: .secondarySystemGroupedBackground))
                .cornerRadius(20)
                
            }
            .padding()
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle("Time Calc")
        .navigationBarTitleDisplayMode(.inline)
    }
}
