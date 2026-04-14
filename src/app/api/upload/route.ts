import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("images") as File[];

  if (files.length === 0) {
    return NextResponse.json({ error: "画像が選択されていません" }, { status: 400 });
  }

  if (files.length > 4) {
    return NextResponse.json({ error: "画像は4枚までです" }, { status: 400 });
  }

  const savedPaths: string[] = [];

  for (const file of files) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `${file.name}: 対応していないファイル形式です（JPEG, PNG, GIF, WebP のみ）` },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: `${file.name}: ファイルサイズが大きすぎます（5MB以下）` },
        { status: 400 }
      );
    }

    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${randomUUID()}.${ext}`;
    const filePath = path.join(process.cwd(), "public", "uploads", fileName);

    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));

    savedPaths.push(`/uploads/${fileName}`);
  }

  return NextResponse.json({ paths: savedPaths });
}
