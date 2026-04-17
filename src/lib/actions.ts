"use server";

export async function verifyAdminPassword(password: string) {
  const secret = process.env.ADMIN_SECRET;
  return password === secret;
}
