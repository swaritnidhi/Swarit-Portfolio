import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

function createPreviewToken() {
  const secret = process.env.PREVIEW_SECRET;

  if (!secret) {
    throw new Error("PREVIEW_SECRET is not configured");
  }

  return createHmac("sha256", secret)
    .update("red-dragon-private-preview")
    .digest("hex");
}

function safeCompare(a: string, b: string) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  return (
    first.length === second.length &&
    timingSafeEqual(first, second)
  );
}

export async function POST(request: NextRequest) {
  try {
    const configuredPassword = process.env.PREVIEW_PASSWORD;

    if (!configuredPassword || !process.env.PREVIEW_SECRET) {
      return NextResponse.json(
        { error: "Preview login is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const password = typeof body.password === "string" ? body.password : "";

    if (!safeCompare(password, configuredPassword)) {
      return NextResponse.json(
        { error: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    response.cookies.set("portfolio_preview", createPreviewToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Unable to sign in. Please try again." },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("portfolio_preview", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}