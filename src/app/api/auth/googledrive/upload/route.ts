import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import stream from "stream";

export async function POST(req: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const sessionCookie = req.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const sessionUser = await adminAuth.verifySessionCookie(sessionCookie);
    if (!sessionUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const userId = sessionUser.uid;

    // Получаем refresh_token из Firestore
    const userDoc = await adminDb.collection("users").doc(userId).get();
    const userData = userDoc.data();
    const refreshToken = userData?.googleDriveRefreshToken;
    const folderId = userData?.googleDriveFolderId;

    if (!refreshToken || !folderId) {
      return NextResponse.json({ error: "Google Drive not connected" }, { status: 400 });
    }

    // Инициализируем Google OAuth2 клиент
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({ refresh_token: refreshToken });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Получаем файл через formData()
    const formData = await req.formData();
    const file = formData.get("file") as Blob;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Создаём поток из buffer
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Загружаем файл в Google Drive
    const fileMetadata = {
      name: `image_${timestamp}.jpg`,
      parents: [folderId],
    };

    const media = {
      mimeType: file.type,
      body: bufferStream, // Передаём stream вместо buffer
    };

    const fileResponse = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = fileResponse.data.id;
    if (!fileId) {
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }

    // Делаем изображение публичным
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Генерируем URL изображения
    // const imageUrl = `https://drive.google.com/uc?id=${fileId}`;
    const imageUrl = `https://lh3.googleusercontent.com/d/${fileId}=w8000`;

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Google Drive Upload Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
