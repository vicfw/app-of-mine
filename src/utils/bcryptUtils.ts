import { compare } from 'bcryptjs';

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}
