# Website Thái Hà Huy Hotel

Landing page tĩnh — tông xanh nước biển + trắng, sang và đơn giản.
Mỗi mục là 1 file riêng trong `partials/` nên anh sửa từng phần rất dễ.

## Cấu trúc

```
thai-ha-huy-website/
├── index.html            → khung trang (không cần sửa)
├── partials/
│   ├── header.html       → logo + menu + nút gọi
│   ├── hero.html         → banner đầu trang
│   ├── about.html        → giới thiệu khách sạn
│   ├── rooms.html        → 4 loại phòng + giá  ← SỬA GIÁ Ở ĐÂY
│   ├── amenities.html    → tiện ích
│   ├── location.html     → địa chỉ + bản đồ
│   ├── contact.html      → khối đặt phòng (hotline/Zalo/Facebook)
│   └── footer.html       → chân trang + chính sách
├── css/style.css         → toàn bộ giao diện
├── js/main.js            → nạp partial + menu mobile
└── README.md             → file này
```

Muốn sửa nội dung mục nào → mở file partial tương ứng, sửa chữ, lưu lại là xong.
Muốn đổi màu chủ đạo → sửa 3 biến `--blue-900`, `--blue-700`, `--blue-500` ở đầu `css/style.css`.

## Việc cần làm trước khi đăng lên

1. **Ảnh thật**: các ô `[Ảnh phòng ...]` / `[Ảnh khách sạn]` đang là khung chờ.
   Chụp ảnh thật → bỏ vào thư mục `images/` → thay khung chờ bằng thẻ
   `<img src="images/ten-anh.jpg" alt="...">`.
2. **Link Facebook**: trong `partials/contact.html` có nút Facebook đang để `href="#"`.
   Khi có fanpage → thay bằng link thật, ví dụ
   `https://www.facebook.com/ten-fanpage`.
3. **Tiện ích**: danh sách 8 tiện ích trong `partials/amenities.html` là mẫu phổ biến
   của khách sạn 2 sao — anh kiểm tra lại với thực tế, thiếu/thừa mục nào thì sửa.
4. **Zalo**: nút "Nhắn Zalo" đang trỏ `https://zalo.me/0377775231` (tự tạo từ số hotline).
   Nếu số hotline không dùng Zalo thì xóa nút này.

## Đưa lên Cloudflare Pages

1. Nén toàn bộ thư mục `thai-ha-huy-website` thành file zip.
2. Vào [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
3. Đặt tên project (ví dụ `thai-ha-huy-hotel`) → kéo thả file zip hoặc thư mục đã giải nén vào → **Deploy**.
4. Cloudflare cấp cho anh 1 link `*.pages.dev` ngay. Muốn dùng tên miền riêng
   (ví dụ `thaihahuyhotel.com`) → vào project → **Custom domains** → **Set up a custom domain**.

Lưu ý: trang này là file tĩnh thuần túy (HTML/CSS/JS), không cần build, nên
Cloudflare Pages chạy được ngay, không tốn phí.
