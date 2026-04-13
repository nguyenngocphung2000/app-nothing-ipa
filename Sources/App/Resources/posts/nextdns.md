# Hướng Dẫn Cấu Hình NextDNS Cơ Bản & Nâng Cao

**NextDNS** là dịch vụ phân giải tên miền (DNS) thông minh giúp bảo vệ thiết bị khỏi quảng cáo, mã độc và các trang web lừa đảo.

** Ưu điểm nổi bật:**

- **Tốc độ cao:** Hỗ trợ máy chủ định tuyến ngay tại Việt Nam.
- **Bảo mật tối đa:** Mã hóa toàn bộ truy vấn DNS của thiết bị.
- **Bảo vệ cục bộ:** Tích hợp các bộ lọc chuyên chặn trang mã độc/lừa đảo nhắm vào người dùng Việt Nam.

---

## Phần 1: Các Bước Cài Đặt Cơ Bản

### 1. Khởi tạo tài khoản

1. Truy cập trang chủ [NextDNS](https://nextdns.io).

2. Nhấn vào **my.nextdns.io** (góc trên bên phải) để vào bảng điều khiển.

3. Ghi nhớ mã **ID** của cấu hình vừa được tạo để sử dụng cho thiết bị của bạn.

### 2. Thêm bộ lọc quảng cáo (Tab `Privacy`)

1. Chuyển sang thẻ **Privacy**.

2. Tìm mục **Blocklists** và thêm 2 bộ lọc thiết yếu sau:
   - `hostsVN` (Tối ưu cho web Việt Nam)
   - `AdGuard DNS filter` (Bộ lọc quảng cáo quốc tế)

### 3. Cài đặt lên thiết bị (Tab `Setup`)

1. Trở về thẻ **Setup**.

2. Kéo xuống phần **Setup Guide** và làm theo hướng dẫn tương ứng với hệ điều hành thiết bị của bạn (Windows, macOS, Android, Router...).
3. **Dành riêng cho thiết bị Apple (iOS/macOS):** Truy cập nhanh vào [apple.nextdns.io](https://apple.nextdns.io/) để tự động tạo và tải hồ sơ cấu hình.

---

## Phần 2: Cấu Hình Nâng Cao (Tùy Chọn)

Để tối ưu hóa trải nghiệm cá nhân và gia đình, bạn có thể thiết lập thêm các tính năng sau:

### Tùy chỉnh tại Tab `Privacy`

- **Mở khóa link tiếp thị (Affiliate):** Bật tính năng **Allow Affiliate & Tracking Links** nếu bạn thường xuyên mua sắm qua Shopee, Lazada hoặc hay click vào các link kết quả được tài trợ trên Google Search.

### Tùy chỉnh tại Tab `Parental Control` (Quản lý gia đình)

- **Chặn cờ bạc:** Tại mục _Categories_, thêm `Gambling`.
- **Bảo vệ trẻ em:** * Tại mục *Categories*, thêm `P*rn` để chặn nội dung người lớn.
  - Bật tính năng **SafeSearch** (Tìm kiếm an toàn trên Google, Bing, YouTube).
  - Thiết lập **Recreation Time** để giới hạn khung giờ truy cập internet/giải trí.

### Tùy chỉnh tại Tab `Settings`

- **Khắc phục mạng chậm:** Nếu cảm thấy tốc độ mạng bị suy giảm sau khi dùng NextDNS, hãy tìm và **Tắt** tính năng `Anonymized EDNS Client Subnet`.

---

## Phần 3: Chuyên Đề - Chặn Quảng Cáo Ứng Dụng Zalo

Zalo thường hiển thị quảng cáo ở mục "Khám phá" và "Nhật ký". Bạn có thể chặn triệt để bằng cách đưa các máy chủ quảng cáo của Zalo vào danh sách đen.

> **LƯU Ý QUAN TRỌNG:**
> Việc chặn các tên miền này có thể làm **vô hiệu hóa tính năng chuyển khoản nhanh** trong Zalo chat. Hãy cân nhắc kỹ trước khi áp dụng.

**Cách thực hiện:**

1. Mở bảng điều khiển NextDNS, chọn thẻ **Denylist**.

2. Thêm lần lượt các tên miền dưới đây vào danh sách (nhấn Enter sau mỗi dòng):

`social.zalopay.vn`  
`opentracking.zalopay.vn`  
`video.zalo.me`  
`zinst-stc.zdn.vn`  
`graph.zalo.me`  
`miniappstore.api.zalo.me`  
`zagoo.vn`  
`zalo.cloud`  
`zalo.video`  
`discovery.api.zaloapp.com`  
`stc-zmp.zadn.vn`  
`broadcast.api.zaloapp.com`  
`oa.zalo.me`  
`fiza.ai`  
`stc-fin.zdn.vn`  
`stc-sp.zadn.vn`  
`res-zalo.zadn.vn`  
`zagoo.zadn.vn`  
`zmdcdn.me`  
`channel-zinstant.api.zaloapp.com`  
`zsp.zaloapp.com`  
`universal-zinstant.api.zaloapp.com`  
`stc-oa.zdn.vn`

_(Bạn có thể tự do xóa bớt các tên miền trong danh sách này sau này nếu thấy ứng dụng bị lỗi)._

---

## Thông Tin Bổ Sung

- **Giới hạn miễn phí:** 300.000 truy vấn/tháng (Hoàn toàn đủ dùng cho cá nhân với 1-2 thiết bị).
- **Tài liệu tham khảo chuyên sâu:** Tham khảo Wiki của dự án hostsVN tại [Github hostsVN/NextDNS](https://github.com/bigdargon/hostsVN/wiki/NextDNS).

Chúc các bạn thiết lập thành công và có trải nghiệm lướt web sạch sẽ, an toàn!
