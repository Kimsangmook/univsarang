"use client";

import { useState } from "react";

export default function CheckingPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠️ 인증이 필요합니다. 먼저 본인을 확인해주세요.");
      return;
    }

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, token }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("✅ 출석이 완료되었습니다!");
    } else {
      setMessage("❌ 코드가 올바르지 않습니다.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>출석 확인</h2>
      <input
        type="text"
        placeholder="6자리 코드 입력"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleSubmit}>확인</button>
      <p>{message}</p>
    </div>
  );
}
