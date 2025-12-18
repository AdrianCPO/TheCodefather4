import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const docs = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, createdAt: true },
  });

  return NextResponse.json(docs);
}
