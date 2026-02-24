import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = process.env.JWT_SECRET ?? 'change_this_secret';

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: object, options?: SignOptions): string {
  return jwt.sign(payload, SECRET, { expiresIn: '1h', ...(options ?? {}) });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET);
}
