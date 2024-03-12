import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { StatusCodes } from "http-status-codes";

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url);

  try {
    const accommodations = await prisma.accommodation.findMany({
      include: {
        destination: true,
      },
    });
    return Response.json({ accommodations }, { status: StatusCodes.OK });
  } catch (error) {
    return Response.json(null, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}
