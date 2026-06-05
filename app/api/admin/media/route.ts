import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getPortfolioContent, savePortfolioContent } from "@/lib/content-store";

const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/svg+xml", "application/pdf"];

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ message: "No file uploaded." }, { status: 400 });
    }

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ message: "Unsupported file type." }, { status: 400 });
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ message: "File must be 4MB or smaller." }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });
    const extension = path.extname(file.name) || typeToExtension(file.type);
    const safeName = `${Date.now()}-${crypto.randomUUID()}${extension}`;
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(uploadsDir, safeName), bytes);

    const asset = {
      id: crypto.randomUUID(),
      name: file.name,
      url: `/uploads/${safeName}`,
      type: file.type,
      size: file.size,
      uploadedAt: new Date().toISOString()
    };

    const content = await getPortfolioContent();
    content.media = [asset, ...content.media];
    await savePortfolioContent(content);

    return NextResponse.json(asset);
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ message: "Upload failed." }, { status: 500 });
  }
}

function typeToExtension(type: string) {
  if (type === "image/png") return ".png";
  if (type === "image/jpeg") return ".jpg";
  if (type === "image/webp") return ".webp";
  if (type === "image/svg+xml") return ".svg";
  if (type === "application/pdf") return ".pdf";
  return "";
}
