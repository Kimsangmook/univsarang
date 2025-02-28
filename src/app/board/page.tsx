"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react"; // ✅ 변경된 import

export default function BoardPage() {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const fetchOTP = async () => {
      const res = await fetch("/api/otp");
      const data = await res.json();
      setOtp(data.otp);
    };

    fetchOTP(); // 최초 OTP 가져오기
    const interval = setInterval(fetchOTP, 30000); // 30초마다 갱신

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔢 출석 코드</h2>
      <h1>{otp}</h1>
      <p>코드는 30초마다 변경됩니다.</p>

      <h2>📱 QR 코드</h2>
      <QRCodeCanvas value="http://localhost:3001/checking" size={200} />
      <p>스캔하여 출석 확인 페이지로 이동하세요.</p>
    </div>
  );
}
