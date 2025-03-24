"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Lock } from "lucide-react";
import Image from "next/image";
import { useActionState } from "react";
import { submitQRCode } from "@/actions/qrs";

export default function HomePage() {
  const [state, formAction] = useActionState(submitQRCode, null)

  return (
    <div className="container mx-auto min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 gap-8">
      <header className="text-center">
        <Image 
          className="mx-auto"
          src="/Logo.png" 
          alt="Logo QR Safe" 
          width={60} 
          height={60} 
          />
        <h1 className="text-4xl font-bold mt-4">Generate Safe QR Codes</h1>
        <p className="text-gray-600 mt-2">Create secure, authenticated QR codes easily.</p>
      </header>

      <section className="text-center max-w-2xl">
        <h2 className="text-2xl font-semibold mb-2">Why QR Safe?</h2>
        <p className="text-gray-600">
          QR codes are everywhere, but malicious QR codes can lead to phishing, scams, or worse.
          QR Safe ensures each QR code generated is secure, authenticated, and safe to scan.
          Protect your users, clients, or audience by providing trusted and verified QR codes.
        </p>
      </section>

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

      <footer className="text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} QR Safe. All rights reserved.
      </footer>
    </div>
  );
}
