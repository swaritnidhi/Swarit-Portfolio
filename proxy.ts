import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

function getPreviewToken() {
  const secret = process.env.PREVIEW_SECRET;

  if (!secret) {
    throw new Error("PREVIEW_SECRET is not configured");
  }

  return createHmac("sha256", secret)
    .update("red-dragon-private-preview")
    .digest("hex");
}

function isAuthorized(request: NextRequest) {
  try {
    const cookie = request.cookies.get("portfolio_preview")?.value;

    if (!cookie) return false;

    const expected = Buffer.from(getPreviewToken());
    const actual = Buffer.from(cookie);

    return (
      actual.length === expected.length &&
      timingSafeEqual(actual, expected)
    );
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/preview-auth") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  if (pathname === "/maintenance") {
    return NextResponse.next();
  }

  return NextResponse.redirect(
    new URL("/maintenance", request.url)
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
