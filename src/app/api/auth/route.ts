import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json({ error: "이름과 전화번호를 입력하세요." }, { status: 400 });
    }

    const token = generateToken(name, phone);

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
