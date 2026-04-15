import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

// MIMEタイプから安全な拡張子を導出（ユーザー入力のファイル名は使わない）
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

const ALLOWED_TYPES = Object.keys(MIME_TO_EXT);
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

    // 安全な拡張子をMIMEタイプから取得（ユーザー入力のファイル名は使わない）
    const ext = MIME_TO_EXT[file.type];
    const fileName = `uploads/${randomUUID()}.${ext}`;

    // Vercel Blobにアップロード
    const blob = await put(fileName, file, {
      access: "public",
      contentType: file.type,
    });

    savedPaths.push(blob.url);
  }

  return NextResponse.json({ paths: savedPaths });
}
