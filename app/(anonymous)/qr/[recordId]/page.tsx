"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Download, Copy, Share2 } from "lucide-react";
import Image from "next/image";

import { getQRCode } from "@/actions/qrs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

async function copyQRCodeImage(qrCode: string) {
    try {
        const response = await fetch(qrCode);
        const blob = await response.blob();

        if (!navigator.clipboard || !navigator.clipboard.write) {
            toast.error("Clipboard image copy not supported on this browser.");
            return;
        }

        const item = new ClipboardItem({ [blob.type]: blob });
        await navigator.clipboard.write([item]);
        toast.success("QR Code image copied to clipboard!");
    } catch {
        toast.error("Failed to copy QR Code image.");
    }
}

async function shareQRCode(qrCode: string) {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "QR Code",
                url: qrCode,
            });
            toast.success("QR Code shared successfully!");
        } catch {
            toast.error("Error sharing QR Code.");
        }
    } else {
        toast.error("Share functionality not supported on this device.");
    }
}

async function downloadQRCode(qrCode: string, filename: string) {
    const response = await fetch(qrCode);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("QR Code downloaded!");
}

export default function QrPage() {
    const { recordId } = useParams();
    const [qrCode, setQrCode] = useState("");

    useEffect(() => {
        async function getQR() {
            const qr = await getQRCode(recordId as string);
            setQrCode(qr.qr_url);
        }
        getQR();
    }, [recordId]);

    if (!qrCode) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <Card className="max-w-md w-full shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center">Your QR Code is Ready!</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4">
                    <div className="relative w-64 h-64">
                        <Image
                            src={qrCode}
                            alt="Generated QR Code"
                            fill
                            className="rounded-lg object-contain"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
                        <Button onClick={() => downloadQRCode(qrCode, `qr-${recordId}.png`)}>
                            <Download className="mr-2" /> Download
                        </Button>

                        <Button variant="outline" onClick={() => copyQRCodeImage(qrCode)}>
                            <Copy className="mr-2" /> Copy QR Code
                        </Button>

                        <Button variant="outline" onClick={() => shareQRCode(qrCode)}>
                            <Share2 className="mr-2" /> Share
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
