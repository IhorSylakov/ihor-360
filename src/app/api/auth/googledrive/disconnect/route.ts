import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import * as admin from "firebase-admin"; // Импортируем admin, так как используем admin.firestore.FieldValue

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

    if (userData?.googleDriveRefreshToken) {
      const refreshToken = userData.googleDriveRefreshToken;

      // Опционально: Отзываем токен в Google
      const revokeUrl = `https://oauth2.googleapis.com/revoke?token=${refreshToken}`;
      await fetch(revokeUrl, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } });

      // Удаляем refresh_token из Firestore
      await adminDb.collection("users").doc(userId).update({
        googleDriveRefreshToken: admin.firestore.FieldValue.delete(), // Требует admin
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Google Drive Disconnect Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
