import { NextResponse } from "next/server";

// 6자리 OTP 생성 함수
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function GET() {
  return NextResponse.json({ otp: generateOTP() });
}
