import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const destinations = await prisma.destination.findMany();
    return NextResponse.json(destinations);
  } catch (error) {
    throw NextResponse.json(null, { status: 500 });
  }
}
