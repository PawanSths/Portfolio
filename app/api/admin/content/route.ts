import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getPortfolioContent, savePortfolioContent } from "@/lib/content-store";
import { portfolioSchema } from "@/lib/content-schema";

export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json(await getPortfolioContent());
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const parsed = portfolioSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: "Validation failed", errors: parsed.error.flatten() }, { status: 422 });
    }

    const saved = await savePortfolioContent(parsed.data);
    return NextResponse.json(saved);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "Unable to save content." }, { status: 500 });
  }
}
