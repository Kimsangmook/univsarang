"use client";

import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default function BoardPage() {
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const fetchOTP = async () => {
      const res = await fetch(`${BASE_URL}/api/otp`);
      const data = await res.json();
      setOtp(data.otp);
    };

    fetchOTP();
    const interval = setInterval(fetchOTP, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🔢 출석 코드</h2>
      <h1>{otp}</h1>
      <p>코드는 30초마다 변경됩니다.</p>

      <h2>📱 QR 코드</h2>
      <QRCodeCanvas value={`${BASE_URL}/checking`} size={200} />
      <p>스캔하여 출석 확인 페이지로 이동하세요.</p>
    </div>
  );
}
