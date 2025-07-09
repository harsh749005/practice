import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: "https://pumped-narwhal-44048.upstash.io",
  token: "AawQAAIjcDEyZDdjODk4ZjZjMDg0MWU1ODdlNTMyYTNlZTNmZWViMnAxMA",
});

export async function middleware(request) {
  const sessionId = request.cookies.get("session_id")?.value;
  console.log(sessionId);
  // ⛔️ First check if sessionId is missing
  if (!sessionId) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const sessionStr = await redis.get(`session:${sessionId}`);
  console.log(sessionStr);
  if (!sessionStr) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // ✅ This will match all routes except static files and internal routes
    // "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:css|js|png|jpg|jpeg|svg|gif|woff2?|ttf|ico|webmanifest|txt|html)).*)",
    "/about","/contact"
  ],
};

