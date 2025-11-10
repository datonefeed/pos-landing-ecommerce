import { NextResponse } from "next/server";
import { HttpStatus } from "./httpStatus";

export function jsonResponse(data: unknown, status: HttpStatus = HttpStatus.OK) {
  return NextResponse.json(data, { status });
}
