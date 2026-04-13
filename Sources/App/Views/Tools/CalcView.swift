import SwiftUI

struct CalcView: View {
    @State private var display = "0"
    @State private var previousOperand = ""
    @State private var currentOperator: String? = nil
    @State private var history: [String] = []
    
    let buttons = [
        ["C", "AC", "%", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", ".", "="]
    ]
    
    var body: some View {
        VStack(spacing: 12) {
            
            ScrollView(.vertical, showsIndicators: false) {
                VStack(alignment: .trailing, spacing: 4) {
                    ForEach(history, id: \.self) { item in
                        Text(item)
                            .font(.system(size: 16))
                            .foregroundColor(.secondary)
                            .frame(maxWidth: .infinity, alignment: .trailing)
                    }
                }
            }
            .frame(maxHeight: 150)
            
            Text(display)
                .font(.system(size: 64, weight: .light))
                .foregroundColor(.primary)
                .lineLimit(1)
                .minimumScaleFactor(0.5)
                .frame(maxWidth: .infinity, alignment: .trailing)
            
            Divider()
            
            VStack(spacing: 12) {
                ForEach(buttons, id: \.self) { row in
                    HStack(spacing: 12) {
                        ForEach(row, id: \.self) { btn in
                            Button(action: { buttonTapped(btn) }) {
                                Text(btn)
                                    .font(.system(size: 32, weight: .medium))
                                    .frame(maxWidth: .infinity)
                                    .frame(height: btn == "0" ? 70 : 70)
                                    .background(buttonColor(btn))
                                    .foregroundColor(textColor(btn))
                                    .cornerRadius(35)
                            }
                        }
                    }
                }
            }
        }
        .padding()
        .navigationTitle("Tính Toán")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    func buttonColor(_ btn: String) -> Color {
        if ["÷", "×", "-", "+", "="].contains(btn) { return .orange }
        if ["C", "AC", "%"].contains(btn) { return Color(uiColor: .systemGray4) }
        return Color(uiColor: .systemGray5)
    }
    
    func textColor(_ btn: String) -> Color {
        if ["÷", "×", "-", "+", "="].contains(btn) { return .white }
        if ["C", "AC", "%"].contains(btn) { return .primary }
        return .primary
    }
    
    func buttonTapped(_ btn: String) {
        if let num = Int(btn) {
            if display == "0" { display = "\(num)" }
            else { display += "\(num)" }
        } else if btn == "." {
            if !display.contains(".") { display += "." }
        } else if btn == "AC" {
            display = "0"; previousOperand = ""; currentOperator = nil; history.removeAll()
        } else if btn == "C" {
            display = "0"
        } else if ["÷", "×", "-", "+"].contains(btn) {
            previousOperand = display
            currentOperator = btn
            display = "0"
        } else if btn == "=" {
            guard let op = currentOperator, let prev = Double(previousOperand), let curr = Double(display) else { return }
            var result: Double = 0
            switch op {
            case "+": result = prev + curr
            case "-": result = prev - curr
            case "×": result = prev * curr
            case "÷": result = curr != 0 ? prev / curr : 0
            default: break
            }
            let resStr = String(format: "%g", result)
            history.append("\(previousOperand) \(op) \(display) = \(resStr)")
            display = resStr
            currentOperator = nil
            previousOperand = ""
        }
    }
}
