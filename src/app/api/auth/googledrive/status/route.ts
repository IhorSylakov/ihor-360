import { NextRequest, NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    // Проверяем сессию пользователя
    const sessionCookie = req.cookies.get("session")?.value;
    if (!sessionCookie) {
      return NextResponse.json({ connected: false }, { status: 401 });
    }

    const sessionUser = await adminAuth.verifySessionCookie(sessionCookie);
    if (!sessionUser) {
      return NextResponse.json({ connected: false }, { status: 401 });
    }

    const userId = sessionUser.uid;

    // Проверяем, есть ли токен в Firestore
    const userDoc = await adminDb.collection("users").doc(userId).get();
    const userData = userDoc.data();
    const isConnected = !!userData?.googleDriveRefreshToken;

    return NextResponse.json({ connected: isConnected });
  } catch (error) {
    console.error("Ошибка при проверке статуса Google Drive:", error);
    return NextResponse.json({ connected: false }, { status: 500 });
  }
}
