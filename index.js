const express = require('express');
const axios = require('axios'); // LỖI 2: Sinh viên phải cài thêm thư viện axios
const app = express();

// ==========================================
// ĐIỀN TÊN CỦA BẠN VÀO ĐÂY ĐỂ ĐUA TOP NHÉ!
// ==========================================
const MY_NAME = "quang";


app.get('/', (req, res) => {
    res.send(`
        <div style="text-align:center; margin-top:50px; font-family: sans-serif;">
            <h1>🎉 Chúc mừng <b>${MY_NAME}</b>! 🎉</h1>
            <h2>Bạn đã chinh phục thành công Server!</h2>
        </div>
    `);
});

// LỖI 3: Chạy nhầm Port
// Gợi ý cho sinh viên: Nginx đang trỏ vào process.env.PORT, nhưng app lại chạy ở 9999.
const hardcoded_port = 9999; 

// PM2 sẽ cung cấp cổng thực tế qua process.env.PORT
const real_port = process.env.PORT; 

app.listen(hardcoded_port, () => {
    console.log(`====================================================`);
    console.log(`[CẢNH BÁO] App đang chạy ở cổng ${hardcoded_port}`);
    
    if (String(hardcoded_port) !== String(real_port)) {
        console.log(`[LỖI] Cổng ${hardcoded_port} KHÔNG ĐÚNG với tài khoản của bạn!`);
        console.log(`[GỢI Ý] Cổng đúng của bạn là: ${real_port}`);
        console.log(`====================================================`);
        return;
    }
    
    console.log(`[OK] Đúng cổng rồi! Đang gửi kết quả lên Bảng Vàng...`);
    console.log(`====================================================`);
    
    axios.post('http://ketqua.maxware.ivi.vn/submit', { name: MY_NAME })
        .then(response => {
            console.log(`[THÀNH CÔNG] Đã ghi danh lên Bảng Xếp Hạng ở vị trí Top ${response.data.rank}!`);
        })
        .catch(err => {
            console.error("[THẤT BẠI] Không thể gửi kết quả. Bảng xếp hạng có thể đang bảo trì.", err.message);
        });
});
