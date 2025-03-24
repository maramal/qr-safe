import { NextRequest, NextResponse } from "next/server";

import { getQRCode } from "@/actions/qrs";
import { decrypt } from "@/utils/encryption";

export async function GET(req: NextRequest, { params }: { params: Promise<{ recordId: string }> }) {
    const { recordId } = await params;
    const qrCode = await getQRCode(recordId);

    if (!qrCode) {
        return NextResponse.redirect("/unsafe-qr", { status: 301 });
    }

    let decryptedUrl = "";
    try {
        decryptedUrl = decrypt(qrCode.url);
    } catch (err) {
        console.error("Failed to decrypt URL:", err);
        return NextResponse.redirect("/unsafe-qr", { status: 301 });
    }

    return NextResponse.redirect(decryptedUrl, { status: 301 });
}