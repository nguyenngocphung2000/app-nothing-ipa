# HƯỚNG DẪN SỬ DỤNG NGỮ CẢNH TRONG TRUY VẤN (PROMPT) ĐỂ TỐI ƯU HÓA ĐỘ CHÍNH XÁC

## 1. Khái niệm và Vai trò của Ngữ cảnh

Ngữ cảnh (Context) là tập hợp các thông tin nền được cung cấp trong cấu trúc prompt nhằm định hướng trí tuệ nhân tạo (AI) nhận diện chính xác tình huống, đối tượng và mục đích yêu cầu.

**Tầm quan trọng:**

- **Tối ưu hóa độ chính xác:** Đảm bảo kết quả phản hồi đúng đối tượng và mục tiêu cụ thể.
- **Hạn chế sai lệch nội dung:** Ngăn chặn tình trạng AI đưa ra các thông tin không phù hợp với mục đích sử dụng thực tế.
- **Cá nhân hóa kết quả:** Điều chỉnh nội dung tương thích hoàn toàn với nhu cầu người dùng.

---

## 2. Phương pháp thiết lập ngữ cảnh hiệu quả

Để tăng cường tính thực thi của prompt, cần áp dụng 04 phương pháp sau:

- **Xác định đối tượng mục tiêu:** Chỉ định rõ chủ thể tiếp nhận nội dung (Ví dụ: học sinh, chuyên viên, khách hàng).
- **Mô tả môi trường ứng dụng:** Làm rõ nền tảng hoặc tình huống sử dụng kết quả (Ví dụ: bài đăng mạng xã hội, thư tín thương mại).
- **Cung cấp dữ liệu nền liên quan:** Bổ sung các chi tiết về thời gian, địa điểm hoặc sự kiện cụ thể.
- **Đồng nhất ngữ cảnh với nhiệm vụ:** Liên kết các yếu tố tình huống với yêu cầu thực thi cụ thể (viết, liệt kê, phân tích).

---

## 3. Phân tích đối chiếu thực nghiệm

- **Tình huống 1: Lập kế hoạch**
  - _Prompt thiếu ngữ cảnh (Hạn chế):_ Viết kế hoạch học tập.
  - _Prompt có ngữ cảnh (Tối ưu):_ Liệt kê kế hoạch học tập trong 03 ngày, 02 giờ/ngày, cho học sinh lớp 8 ôn thi học kỳ môn Toán và Anh văn.

- **Tình huống 2: Quảng cáo**
  - _Prompt thiếu ngữ cảnh (Hạn chế):_ Viết quảng cáo quán ăn.
  - _Prompt có ngữ cảnh (Tối ưu):_ Viết nội dung quảng cáo dưới 50 từ cho quán phở, đăng trên Instagram, đối tượng học sinh, tiêu chí giá rẻ, văn phong thân thiện.

- **Tình huống 3: Sáng tác**
  - _Prompt thiếu ngữ cảnh (Hạn chế):_ Viết thơ về mưa.
  - _Prompt có ngữ cảnh (Tối ưu):_ Soạn bài thơ 04 câu về cảnh mưa và trẻ em, phù hợp trình độ học sinh lớp 6, mục đích giáo dục.

- **Tình huống 4: Thư tín**
  - _Prompt thiếu ngữ cảnh (Hạn chế):_ Viết email cảm ơn.
  - _Prompt có ngữ cảnh (Tối ưu):_ Soạn email cảm ơn sau phỏng vấn (dưới 100 từ) gửi nhà tuyển dụng công ty công nghệ, văn phong lịch sự, thể hiện sự cầu thị.

---

## 4. Nguyên tắc thực hiện

1.  **Tính đầy đủ:** Cung cấp thông tin đủ để AI xác định phạm vi xử lý.
2.  **Tính súc tích:** Ưu tiên diễn đạt ngắn gọn về đối tượng và mục đích.
3.  **Tính kiểm chứng:** Rà soát và điều chỉnh ngữ cảnh nếu kết quả phản hồi chưa đạt yêu cầu thực tế.

---

## 5. Thực hành ứng dụng

Người dùng thực hiện khởi tạo prompt theo cấu trúc:

> **[Nhiệm vụ] + [Ngữ cảnh cụ thể về đối tượng/thời điểm] + [Định dạng đầu ra].**

**Ví dụ:** _"Liệt kê 03 phương pháp học môn Ngữ văn cho học sinh lớp 9 trong giai đoạn ôn thi chuyển cấp, định dạng danh sách, văn phong khích lệ."_

---

## 6. Ứng dụng Kỹ thuật Prompt Tổng hợp trong Lập Kế hoạch

Kỹ thuật Prompt tổng hợp là phương pháp tích hợp đa yếu tố vào một câu lệnh duy nhất nhằm kiến tạo một bản kế hoạch cá nhân hóa, mang tính khả thi cao và tối ưu về mặt thời gian.

### 6.1. Công thức thiết lập Prompt tổng hợp

Để AI hoạt động như một chuyên gia hoạch định thực thụ, cấu trúc truy vấn cần tuân thủ công thức mở rộng sau:

> **[Vai trò của AI] + [Nhiệm vụ cốt lõi] + [Ngữ cảnh chi tiết] + [Ràng buộc/Điều kiện] + [Định dạng đầu ra]**

### 6.2. Phân tích Tình huống Ứng dụng Thực tế

**Tình huống 1: Thiết lập kế hoạch học tập**

- **Prompt tối ưu:** _"Đóng vai chuyên gia giáo dục. Lập lộ trình tự học ngoại ngữ trong 30 ngày cho người bắt đầu từ con số 0, mục tiêu giao tiếp cơ bản. Ràng buộc: Quỹ thời gian 45 phút/ngày, tập trung vào kỹ năng Nghe và Nói. Trình bày dưới dạng bảng phân chia theo tuần, kèm phương pháp tự kiểm tra đánh giá."_

- **Hiệu quả:** AI xác định chính xác năng lực hiện tại, phương pháp trọng tâm (nghe - nói), phân bổ thời lượng hợp lý (45 phút) và xuất dữ liệu dạng bảng trực quan, dễ theo dõi tiến độ.

**Tình huống 2: Thiết lập kế hoạch làm việc (Dự án kỹ thuật/Chuyên môn)**

- **Prompt tối ưu:** _"Đóng vai quản lý dự án (Project Manager) cấp cao. Lập kế hoạch Sprint 1 tuần cho một lập trình viên đang phát triển ứng dụng web tích hợp tính năng lưu trữ đám mây. Ràng buộc: Thời gian làm việc 8 giờ/ngày (Thứ 2 - Thứ 6). Cần phân bổ thời gian cụ thể cho các tác vụ: nghiên cứu tài liệu/API, viết code tính năng cốt lõi, kiểm thử (testing) và xử lý lỗi (fix bug). Định dạng kết quả theo dạng danh sách Timeline chi tiết từng ngày."_

- **Hiệu quả:** Bối cảnh công việc đặc thù và các tác vụ chuyên môn được làm rõ, giúp AI phân chia luồng công việc logic, tuân thủ đúng quy trình làm việc thực tế thay vì đưa ra các đầu mục chung chung.

### 6.3. Nguyên tắc tối ưu hóa kế hoạch do AI tạo ra

1.  **Định lượng rõ nguồn lực:** Luôn cung cấp chính xác quỹ thời gian thực tế (ví dụ: 2 giờ/ngày, 3 ngày/tuần) để đảm bảo tính khả thi, tránh tình trạng kế hoạch bị quá tải.

2.  **Thiết lập khoảng đệm (Buffer Time):** Chủ động yêu cầu AI dự trù 10-15% thời gian trống trong kế hoạch tổng thể để xử lý các công việc hoặc sự cố phát sinh đột xuất.

3.  **Tính đo lường (SMART):** Yêu cầu AI bổ sung các tiêu chí/đầu ra cụ thể (deliverables) vào cuối mỗi khoảng thời gian để dễ dàng đánh giá tiến độ hoàn thành.

---

_Thông qua việc cung cấp ngữ cảnh sắc bén và kết hợp phương pháp lập lệnh tổng hợp, trí tuệ nhân tạo sẽ vượt ra khỏi giới hạn của một công cụ truy vấn thông tin, trở thành trợ lý đắc lực giúp tối ưu hóa hiệu suất học tập và làm việc của bạn._

---

@Nothing3272

---
