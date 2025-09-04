import { NextResponse } from "next/server";
import { ApiResponse, BadRequestError } from "@/lib/response";
import { authService } from "@/lib/services";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    if (!email || !password) {
      throw new BadRequestError("Email and password required");
    }
    return authService.register(email, password);
  } catch (error: Error | unknown) {
    const err = ApiResponse.error(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
