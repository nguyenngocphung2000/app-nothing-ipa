import SwiftUI

struct FinanceView: View {
    @State private var amount = ""
    @State private var rate = ""
    @State private var months = ""
    @State private var isLoan = true
    
    var resultText: String {
        guard let p = Double(amount), let r = Double(rate), let n = Double(months) else { return "Nhập đầy đủ thông tin..." }
        
        let monthlyRate = (r / 100) / 12
        if isLoan {
            // Loan P & I (Lãi gộp dư nợ giảm dần)
            let payment = p * (monthlyRate * pow(1 + monthlyRate, n)) / (pow(1 + monthlyRate, n) - 1)
            let total = payment * n
            return "Mỗi tháng trả: \(formatMoney(payment)) \nTổng tiền trả: \(formatMoney(total)) \nTổng lãi: \(formatMoney(total - p))"
        } else {
            // Savings
            let total = p * pow(1 + monthlyRate, n)
            return "Số tiền nhận được: \(formatMoney(total)) \nTiền lãi: \(formatMoney(total - p))"
        }
    }
    
    var body: some View {
        Form {
            Section(header: Text("Loại hình")) {
                Picker("Loại", selection: $isLoan) {
                    Text("Khoản Vay").tag(true)
                    Text("Gửi Tiết Kiệm").tag(false)
                }
                .pickerStyle(SegmentedPickerStyle())
            }
            
            Section(header: Text("Thông tin cơ bản")) {
                TextField("Số tiền gốc (VNĐ)", text: $amount)
                    .keyboardType(.decimalPad)
                TextField("Lãi suất (% / năm)", text: $rate)
                    .keyboardType(.decimalPad)
                TextField("Thời hạn (tháng)", text: $months)
                    .keyboardType(.numberPad)
            }
            
            Section(header: Text("Kết quả dự kiến")) {
                Text(resultText)
                    .font(.system(size: 15, weight: .bold))
                    .foregroundColor(isLoan ? .red : .green)
                    .padding(.vertical, 8)
            }
        }
        .navigationTitle("Tài Chính")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    func formatMoney(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 0
        return (formatter.string(from: NSNumber(value: value)) ?? "0") + " đ"
    }
}
