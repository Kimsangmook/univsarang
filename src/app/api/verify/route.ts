import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const VALID_CODES = ["123456", "654321"]; // 임시 코드 리스트 (DB로 대체 가능)

export async function POST(req: NextRequest) {
  try {
    const { code, token } = await req.json();
    
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ success: false, error: "토큰이 유효하지 않습니다." }, { status: 401 });
    }

    if (!VALID_CODES.includes(code)) {
      return NextResponse.json({ success: false, error: "코드가 올바르지 않습니다." }, { status: 400 });
    }

    // ✅ 출석 정보 저장 (Next.js DB 연동 필요)
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: "서버 오류 발생" }, { status: 500 });
  }
}
