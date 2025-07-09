"use server";

import { ensureDBReady, sql } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import redis from 'redis';

export async function POST(req) {

  const body = await req.json();
  const { name, email, password } = body.formData;

  await ensureDBReady();
  try {
    const generateKey = () => {
      const str = "QWERTYUIOPLKJHGFDSAZXCVBNMmnbvcxzasdfghjklpoiuytrewq";
      // const num ="1234567890";
      const special = "!@#$%^&*()";
      let key = "";
      for (let i = 0; i < 10; i++) {
        let strran = Math.floor(Math.random() * 52);
        let numran = Math.floor(Math.random() * 10);
        let specialran = Math.floor(Math.random() * 10);
        key = key + str[strran] + numran + special[specialran];
      }
      return key;
    };
    const userkey = generateKey();
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await sql`SELECT * FROM brushup_user WHERE email = ${email}`;
    const user = result[0];
    if (!user) {
      await sql`INSERT INTO brushup_user (name,email,password,userkey) VALUES(${name},${email},${hashPassword},${userkey})`;
      //  console.log(sql);
      return NextResponse.json(
        {
          message: "User Registered",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User already exist",
        },
        { status: 409 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        status: "fail",
        message: "Error inserting data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
