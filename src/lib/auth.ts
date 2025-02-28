import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "my-secret-key"; // 환경변수 설정 가능

// JWT 생성 함수
export function generateToken(name: string, phone: string) {
  const payload = {
    name,
    phone,
    iat: Math.floor(Date.now() / 1000), // 발급 시간
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }); // 1시간 유효
}

// JWT 검증 함수
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
