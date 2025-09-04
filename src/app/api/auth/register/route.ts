import { NextResponse } from "next/server";
import { ApiResponse, BadRequestError } from "@/lib/response";
import { AuthService } from "@/lib/services";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    if (!email || !password) {
      throw new BadRequestError("Email and password required");
    }
    const authService = new AuthService();
    const response  = authService.register(email, password);
    return NextResponse.json(ApiResponse.success(response))
  } catch (error: Error | unknown) {
    const err = ApiResponse.error(error);
    return NextResponse.json(err, { status: err.statusCode });
  }
}
