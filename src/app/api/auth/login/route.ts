import { NextResponse } from "next/server";
import { generateAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/security";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!expectedUser || !expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "ADMIN_USERNAME dan ADMIN_PASSWORD belum dikonfigurasi di environment server.",
        },
        { status: 500 }
      );
    }

    if (username !== expectedUser || password !== expectedPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Username atau password salah. Silakan coba lagi.",
        },
        { status: 401 }
      );
    }

    const token = await generateAdminSessionToken(username);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil. Selamat datang di Portal Admin Internext!",
      user: username,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Terjadi kesalahan internal." },
      { status: 500 }
    );
  }
}
