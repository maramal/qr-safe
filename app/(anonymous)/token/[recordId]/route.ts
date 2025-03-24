import { NextRequest, NextResponse } from "next/server";

import { getQRCode } from "@/actions/qrs";
import { decrypt } from "@/utils/encryption";

export async function GET(req: NextRequest, { params }: { params: Promise<{ recordId: string }> }) {
    const { recordId } = await params;
    const qrCode = await getQRCode(recordId);

    if (!qrCode) {
        return NextResponse.json({ error: "QR Code not found" }, { status: 404 });
    }

    let decryptedUrl = "";
    try {
        decryptedUrl = decrypt(qrCode.url);
    } catch (err) {
        console.error("Failed to decrypt URL:", err);
        return NextResponse.json({ error: "Invalid encrypted URL" }, { status: 400 });
    }

    return NextResponse.redirect(decryptedUrl, { status: 301 });
}