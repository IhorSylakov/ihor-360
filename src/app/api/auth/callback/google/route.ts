import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
      return NextResponse.json({ error: "Authorization code missing" }, { status: 400 });
    }

    // Проверяем сессию
    const sessionCookie = req.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const sessionUser = await adminAuth.verifySessionCookie(sessionCookie);
    if (!sessionUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    const userId = sessionUser.uid;

    // Google OAuth2 Client
    const oauth2Client = new google.auth.OAuth2(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
    );

    // Обмен кода на токен
    const { tokens } = await oauth2Client.getToken(code);
    if (!tokens.refresh_token) {
      return NextResponse.json({ error: "No refresh token received" }, { status: 400 });
    }

    oauth2Client.setCredentials({ refresh_token: tokens.refresh_token });
    const drive = google.drive({ version: "v3", auth: oauth2Client });

    // Проверяем, существует ли папка "360media"
    let folderId: string | null = null;
    const folderResponse = await drive.files.list({
      q: "name='360media' and mimeType='application/vnd.google-apps.folder' and 'root' in parents",
      fields: "files(id)",
      spaces: "drive",
    });

    if (folderResponse.data.files?.length) {
      folderId = folderResponse.data.files[0].id || '';
    } else {
      // Создаём папку, если её нет
      const folderMetadata = {
        name: "360media",
        mimeType: "application/vnd.google-apps.folder",
        parents: ["root"],
      };

      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: "id",
      });

      folderId = folder.data.id || null;
    }

    // Сохраняем `refresh_token` и `folderId` в Firestore
    await adminDb.collection("users").doc(userId).set(
      {
        googleDriveRefreshToken: tokens.refresh_token,
        googleDriveFolderId: folderId,
      },
      { merge: true }
    );

    const userDoc = await adminDb.collection("users").doc(userId).get();
    const username = userDoc.exists ? userDoc.data()?.username : "";

    return NextResponse.redirect(new URL(`${username}/settings`, req.nextUrl.origin)); // Перенаправляем пользователя в настройки
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
