import SwiftUI

struct LoanScheduleItem: Identifiable {
    let id = UUID()
    let period: Int
    let principalPaid: Double
    let interestPaid: Double
    let totalPayment: Double
    let remainingPrincipal: Double
}

class FinanceViewModel: ObservableObject {
    @Published var isSavingMode = true
    
    // Savings
    @Published var savPrincipal: String = ""
    @Published var savRate: String = ""
    @Published var savTime: String = ""
    @Published var savTimeUnit: Double = 12 // 12 for months, 1 for years
    @Published var savType: String = "simple"
    
    @Published var savResultInterest: String = "0"
    @Published var savResultTotal: String = "0"
    @Published var showSavResult: Bool = false
    
    // Loans
    @Published var loanPrincipal: String = ""
    @Published var loanRate: String = ""
    @Published var loanTime: String = ""
    @Published var loanType: String = "declining"
    
    @Published var loanRealRateSpan: String = ""
    @Published var loanResultInterest: String = "0"
    @Published var loanResultTotal: String = "0"
    @Published var loanResultMonthly: String = "0"
    @Published var showLoanResult: Bool = false
    @Published var loanSchedule: [LoanScheduleItem] = []
    
    func fmt(_ num: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        return (formatter.string(from: NSNumber(value: round(num))) ?? "0") + " ₫"
    }
    
    func calcSave() {
        guard let p = Double(savPrincipal), let r = Double(savRate), let t = Double(savTime) else { return }
        let r_annual = r / 100.0
        let t_years = t / savTimeUnit
        
        var A: Double = 0
        if savType == "simple" {
            A = p * (1 + r_annual * t_years)
        } else {
            let n: Double = 12 // monthly compound
            A = p * pow(1 + r_annual / n, n * t_years)
        }
        let interest = A - p
        savResultInterest = fmt(interest)
        savResultTotal = fmt(A)
        showSavResult = true
    }
    
    func calcLoan() {
        guard let p = Double(loanPrincipal), let r = Double(loanRate), let t = Double(loanTime) else { return }
        let r_annual = r / 100.0
        let months = Int(t)
        
        var totalInterest: Double = 0
        var maxMonthly: Double = 0
        let r_monthly = r_annual / 12.0
        var remaining = p
        
        var schedule: [LoanScheduleItem] = []
        
        if loanType == "flat" {
            let eir = (r_annual * 100 * 2 * Double(months)) / Double(months + 1)
            loanRealRateSpan = String(format: "%.1f", eir)
            
            let monthlyPrincipal = p / Double(months)
            let monthlyInterest = p * r_monthly
            totalInterest = monthlyInterest * Double(months)
            maxMonthly = monthlyPrincipal + monthlyInterest
            
            for i in 1...months {
                remaining -= monthlyPrincipal
                schedule.append(LoanScheduleItem(period: i, principalPaid: monthlyPrincipal, interestPaid: monthlyInterest, totalPayment: maxMonthly, remainingPrincipal: max(0, remaining)))
            }
            
        } else if loanType == "declining" {
            let monthlyPrincipal = p / Double(months)
            for i in 1...months {
                let interest = remaining * r_monthly
                totalInterest += interest
                let payment = monthlyPrincipal + interest
                if payment > maxMonthly { maxMonthly = payment }
                remaining -= monthlyPrincipal
                schedule.append(LoanScheduleItem(period: i, principalPaid: monthlyPrincipal, interestPaid: interest, totalPayment: payment, remainingPrincipal: max(0, remaining)))
            }
            
        } else if loanType == "annuity" {
            let pmt = (p * r_monthly * pow(1 + r_monthly, Double(months))) / (pow(1 + r_monthly, Double(months)) - 1)
            maxMonthly = pmt
            for i in 1...months {
                let interest = remaining * r_monthly
                let principal = pmt - interest
                totalInterest += interest
                remaining -= principal
                schedule.append(LoanScheduleItem(period: i, principalPaid: principal, interestPaid: interest, totalPayment: pmt, remainingPrincipal: max(0, remaining)))
            }
        }
        
        self.loanSchedule = schedule
        self.loanResultInterest = fmt(totalInterest)
        self.loanResultTotal = fmt(p + totalInterest)
        self.loanResultMonthly = fmt(maxMonthly)
        self.showLoanResult = true
    }
}

struct FinanceView: View {
    @StateObject private var vm = FinanceViewModel()
    
    var body: some View {
        ScrollView {
            VStack(spacing: 24) {
                VStack(spacing: 8) {
                    Text("Tài Chính")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.blue)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 4)
                        .background(Color.blue.opacity(0.1))
                        .clipShape(Capsule())
                    
                    Text("Tính Lãi Ngân Hàng")
                        .font(.system(size: 26, weight: .bold, design: .rounded))
                    
                    Text("Tính toán chi tiết lãi gửi tiết kiệm và khoản vay.")
                        .font(.caption)
                        .foregroundColor(.secondary)
                        .italic()
                }
                .padding(.top, 20)
                
                Picker("Chế độ", selection: $vm.isSavingMode) {
                    Text("Gửi Tiết Kiệm").tag(true)
                    Text("Vay Vốn").tag(false)
                }
                .pickerStyle(SegmentedPickerStyle())
                .padding(.horizontal)
                
                if vm.isSavingMode {
                    savingForm
                } else {
                    loanForm
                }
            }
            .padding()
        }
        .background(Color(uiColor: .systemGroupedBackground))
        .navigationTitle("Tài Chính Lãi Suất")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    var savingForm: some View {
        VStack(spacing: 16) {
            Group {
                VStack(alignment: .leading) {
                    Text("Số tiền gửi (VNĐ)").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    TextField("100000000", text: $vm.savPrincipal).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                }
                VStack(alignment: .leading) {
                    Text("Lãi suất (% / Năm)").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    TextField("6.5", text: $vm.savRate).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                }
                HStack {
                    VStack(alignment: .leading) {
                        Text("Kỳ hạn gửi").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                        TextField("12", text: $vm.savTime).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                    }
                    VStack(alignment: .leading) {
                        Text("Đơn vị").font(.caption2).fontWeight(.bold).foregroundColor(.clear)
                        Picker("", selection: $vm.savTimeUnit) {
                            Text("Tháng").tag(12.0)
                            Text("Năm").tag(1.0)
                        }.pickerStyle(MenuPickerStyle()).background(Color(uiColor: .systemGray6)).cornerRadius(8)
                    }
                }
                VStack(alignment: .leading) {
                    Text("Hình thức tính lãi").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    Picker("", selection: $vm.savType) {
                        Text("Lãi đơn (Cuối kỳ)").tag("simple")
                        Text("Lãi kép (Nhập gốc hàng tháng)").tag("compound")
                    }.pickerStyle(MenuPickerStyle()).frame(maxWidth: .infinity).background(Color(uiColor: .systemGray6)).cornerRadius(8)
                }
            }
            
            Button("TÍNH TOÁN TIỀN LỜI") {
                UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
                vm.calcSave()
            }
            .font(.subheadline).fontWeight(.bold).frame(maxWidth: .infinity).padding().background(Color.blue).foregroundColor(.white).cornerRadius(10)
            
            if vm.showSavResult {
                VStack(spacing: 8) {
                    Text("Tổng tiền lãi nhận được").font(.caption).foregroundColor(.gray)
                    Text(vm.savResultInterest).font(.title).fontWeight(.black).foregroundColor(.green)
                    Divider()
                    Text("Tổng gốc + Lãi").font(.caption).foregroundColor(.gray)
                    Text(vm.savResultTotal).font(.title3).fontWeight(.bold).foregroundColor(.blue)
                }
                .padding().frame(maxWidth: .infinity).background(Color(uiColor: .secondarySystemGroupedBackground)).cornerRadius(12)
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(20)
    }
    
    var loanForm: some View {
        VStack(spacing: 16) {
            Group {
                VStack(alignment: .leading) {
                    Text("Số tiền vay (VNĐ)").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    TextField("500000000", text: $vm.loanPrincipal).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                }
                VStack(alignment: .leading) {
                    Text("Lãi suất (% / Năm)").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    TextField("10.5", text: $vm.loanRate).keyboardType(.decimalPad).textFieldStyle(RoundedBorderTextFieldStyle())
                }
                VStack(alignment: .leading) {
                    Text("Thời gian vay (Tháng)").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    TextField("36", text: $vm.loanTime).keyboardType(.numberPad).textFieldStyle(RoundedBorderTextFieldStyle())
                }
                VStack(alignment: .leading) {
                    Text("Phương thức tính lãi").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                    Picker("", selection: $vm.loanType) {
                        Text("Dư nợ giảm dần (Thực tế)").tag("declining")
                        Text("Trả góp đều (Annuity)").tag("annuity")
                        Text("Dư nợ ban đầu (Flat)").tag("flat")
                    }.pickerStyle(MenuPickerStyle()).frame(maxWidth: .infinity).background(Color(uiColor: .systemGray6)).cornerRadius(8)
                }
            }
            
            if vm.loanType == "flat" {
                Text("⚠️ Cảnh báo: Lãi trên dư nợ ban đầu tương đương thực tế khoảng \(vm.loanRealRateSpan)%/năm dư nợ giảm dần!")
                    .font(.caption2).fontWeight(.medium).foregroundColor(.red).padding(8).background(Color.red.opacity(0.1)).cornerRadius(8)
            }
            
            Button("TÍNH TOÁN KHOẢN VAY") {
                UIApplication.shared.sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
                vm.calcLoan()
            }
            .font(.subheadline).fontWeight(.bold).frame(maxWidth: .infinity).padding().background(Color.orange).foregroundColor(.white).cornerRadius(10)
            
            if vm.showLoanResult {
                VStack(spacing: 16) {
                    HStack {
                        VStack {
                            Text("TỔNG LÃI").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                            Text(vm.loanResultInterest).font(.subheadline).fontWeight(.black).foregroundColor(.red)
                        }.frame(maxWidth: .infinity)
                        VStack {
                            Text("TỔNG TRẢ").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                            Text(vm.loanResultTotal).font(.subheadline).fontWeight(.black).foregroundColor(.primary)
                        }.frame(maxWidth: .infinity)
                        VStack {
                            Text("THÁNG CAO NHẤT").font(.caption2).fontWeight(.bold).foregroundColor(.gray)
                            Text(vm.loanResultMonthly).font(.subheadline).fontWeight(.black).foregroundColor(.orange)
                        }.frame(maxWidth: .infinity)
                    }
                    
                    Text("Lịch trả nợ chi tiết").font(.headline).fontWeight(.bold).frame(maxWidth: .infinity, alignment: .leading)
                    
                    ScrollView(.horizontal) {
                        VStack(spacing: 0) {
                            HStack {
                                Text("Kỳ").frame(width: 40, alignment: .leading)
                                Text("Gốc").frame(width: 100, alignment: .trailing)
                                Text("Lãi").frame(width: 80, alignment: .trailing)
                                Text("Tổng Trả").frame(width: 100, alignment: .trailing)
                                Text("Còn Lại").frame(width: 120, alignment: .trailing)
                            }
                            .font(.caption).foregroundColor(.gray).padding(.bottom, 8)
                            
                            ForEach(vm.loanSchedule) { item in
                                HStack {
                                    Text("\(item.period)").font(.caption).bold().frame(width: 40, alignment: .leading)
                                    Text(vm.fmt(item.principalPaid)).font(.caption).frame(width: 100, alignment: .trailing)
                                    Text(vm.fmt(item.interestPaid)).font(.caption).foregroundColor(.red).frame(width: 80, alignment: .trailing)
                                    Text(vm.fmt(item.totalPayment)).font(.caption).bold().frame(width: 100, alignment: .trailing)
                                    Text(vm.fmt(item.remainingPrincipal)).font(.caption).foregroundColor(.gray).frame(width: 120, alignment: .trailing)
                                }
                                .padding(.vertical, 8)
                                Divider()
                            }
                        }
                    }
                    .frame(maxHeight: 300)
                }
                .padding().frame(maxWidth: .infinity).background(Color(uiColor: .secondarySystemGroupedBackground)).cornerRadius(12)
            }
        }
        .padding()
        .background(Color(uiColor: .systemBackground))
        .cornerRadius(20)
    }
}
