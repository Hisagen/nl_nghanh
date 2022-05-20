require('dotenv').config();
import nodemailer from 'nodemailer'
let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"SHOP HANDMADE 👻" <sinb1805653@student.ctu.edu.vn>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend), // html body
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    result = `
    <p> Bạn nhận được email này vì đã đặt  online trên hàng thành công trên  Website HandMade ABC</p>
    <h1>Đơn Hàng</h1>
    <h3> Họ tên khách hàng:  ${dataSend.nguoidung}!</h3>
     <div><b>Ngày đặt hàng: ${dataSend.ngay}</b></div>
    <div><b>Số điện thoại: ${dataSend.sdt}</b></div>
    <div><b>Mã đơn hàng: ${dataSend.iddonhang}</b></div>
    <div><b>Địa chỉ giao hàng: ${dataSend.diachi}</b></div>
   
       <table>
        <tr>
            <th>Tên sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
        <tr>
            <td>${dataSend.ten_sp}</td>
            <td>${dataSend.gia_sp}</td>
            <td>${dataSend.soluong_sp}</td>
            <td>${dataSend.thanhtien}</td>
        </tr>
        <tr>
            <td>${dataSend.ten_sp1}</td>
            <td>${dataSend.gia_sp1}</td>
            <td>${dataSend.soluong_sp1}</td>
            <td>${dataSend.thanhtien1}</td>
        </tr>
    </table >
    <p>Cảm ơn bạn đã tin tưởng Shop của chúng tôi.</p>
    <div>Xin chân thành cảm ơn</div>
    `

    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}
