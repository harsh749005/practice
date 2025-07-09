import { ensureDBReady, sql } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import redis from "@/app/lib/redis";
import { v4 as uuidv4 } from "uuid";
import { serialize } from "cookie";
import client from "@/app/lib/redis";
export async function POST(req) {
  const body = await req.json();
  const { email, password } = body.formData;

  // console.log(email,password);
  try {
    ensureDBReady();
    const result = await sql`SELECT * FROM brushup_user WHERE email = ${email}`;
    const user = result[0];
    // console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        {
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }
    const token = jwt.sign(
      { id: user.id, userkey: user.key, email: user.email, name: user.name },
      "suuuu",
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      message: "LoggedIn",
      user,
    });
    //connect to redis
    // if(!client.isOpen)
    //
    const sessionID = uuidv4();
await redis.set(`session:${sessionID}`, JSON.stringify({email}),{ex:600});
// await redis.set("session:test123", JSON.stringify({ test: true }), { ex: 600 });
response.cookies.set("session_id", sessionID, {
  httpOnly: true,
  maxAge: 600,
  path: "/",
});

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error" },
      { details: error.message },
      { status: 500 }
    );
  }
}
