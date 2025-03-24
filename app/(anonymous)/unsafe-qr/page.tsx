"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function UnsafeQRPage() {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-lg shadow-md p-8 w-96 space-y-2">
                <h1 className="text-2xl font-bold text-center mb-4 text-red-500">This URL is not safe</h1>
                <p className="text-center text-sm">This QR code has been reported as malicious more than three times.</p>
                <Button className="w-full mt-6" asChild>
                    <Link href="/">
                        <Home />
                        Return Home
                    </Link>
                </Button>
            </div>
        </div>
    )
}