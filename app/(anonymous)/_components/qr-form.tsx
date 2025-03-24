"use client"

import { useActionState } from "react";
import { QrCode, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitQRCode } from "@/actions/qrs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QRForm() {
    const [state, formAction] = useActionState(submitQRCode, null)

    return (
        <Card className="w-full max-w-md shadow-xl rounded-2xl">
            <CardHeader>
            <CardTitle className="flex items-center gap-2 justify-center">
                <QrCode /> QR Safe Generator
            </CardTitle>
            </CardHeader>

            <CardContent>
            <form action={formAction} className="flex flex-col gap-4">
                {state?.errors?.error && (
                <div className="bg-red-100 text-red-600 p-4 rounded-lg">
                    {state.errors.error}
                </div>
                )}
                <Input
                name="url"
                placeholder="Enter your URL"
                className="p-4 rounded-lg shadow-sm"
                required
                />

                <Button className="w-full flex gap-2">
                <Lock size={18} /> Generate Secure QR
                </Button>
            </form>
            </CardContent>
        </Card>

    )
}