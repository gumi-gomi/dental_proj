require("dotenv").config(); // dotenv를 사용하여 환경 변수를 로드합니다.

/* eslint-disable no-unused-vars */
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// nodemailer를 사용하여 이메일 전송 설정을 구성합니다.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL, // .env 파일에서 이메일 주소를 가져옵니다.
    pass: process.env.USER_PASSWORD, // .env 파일에서 비밀번호를 가져옵니다.
  },
});

exports.sendOrderEmail = functions.https.onCall((data, context) => {
  const {email, cartItems} = data;


  // 요청 데이터 유효성 검사를 수행합니다.
  if (!email || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new functions.https.HttpsError("invalid-argument", "잘못된 요청 데이터입니다.");
  }

  // 이메일 전송을 위한 옵션을 설정합니다.
  const mailOptions = {
    from: process.env.USER_EMAIL, // 보낸 사람 이메일 주소
    to: process.env.USER_EMAIL, // 받는 사람 이메일 주소
    subject: "주문 내역", // 이메일 제목
    text: `주문 항목:\n\n${cartItems.map((item) => `- ${item.title}`).join("\n")}`,
  };

  // 이메일을 전송합니다.
  return transporter.sendMail(mailOptions)
      .then(() => {
        return {success: true};
      })
      .catch((error) => {
        console.error("이메일 전송 실패:", error);
        throw new functions.https.HttpsError("internal", "이메일 전송에 실패했습니다.");
      });
});
