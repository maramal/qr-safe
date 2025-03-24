import { getQRCode } from "@/actions/qrs";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest, { params }: { params: Promise<{ recordId: string}> }) {
    const { recordId } = await params
    const qrCode = await getQRCode(recordId)

    if (!qrCode) {
        return NextResponse.json({ error: "QR Code not found" }, { status: 404 })
    }

    if (qrCode.times_reported > 3) {
        return NextResponse.redirect("/unsafe-qr", { status: 301 })
    }

    return NextResponse.redirect(qrCode.url, { status: 301 })
}