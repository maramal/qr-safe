"use client"

import Image from "next/image";
import QRForm from "./_components/qr-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
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
                <p className="text-gray-600 mt-4">
                    All submitted URLs are validated (including Google Safe Browsing) and then encrypted before being saved. The resulting QR points to a trusted format like:
                </p>
                <p className="mt-2 font-mono text-blue-600">https://qrsafe.xyz/token/abc123</p>
                <p className="text-gray-600 mt-4">
                    Since the URL is encrypted, it&apos;s private and can&apos;t be guessed or reported once created. This is ideal for flyers, signage, or printed material where security and trust matter.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    (qrsafe.com cost over $5,000, so we went with <code>qrsafe.xyz</code>. This is a free, open-source and non-commercial project.)
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    The website is currently hosted on a free Vercel account. We are exploring more stable hosting solutions. If you&apos;d like to help, suggestions are welcome on GitHub.
                </p>
                <div className="mt-4">
                    <Button asChild variant="outline">
                        <Link href="https://safebrowsing.google.com/safebrowsing/report_phish/" target="_blank" rel="noopener noreferrer">
                            Report a malicious site to Google
                        </Link>
                    </Button>
                </div>
            </section>

            <QRForm />

            <section className="text-left max-w-2xl w-full mt-12">
                <h2 className="text-2xl font-semibold mb-4 text-center">FAQ</h2>
                <div className="space-y-6 text-gray-700 text-sm">
                    <div>
                        <h3 className="font-semibold">Why does the QR code point to qrsafe.xyz and not directly to the URL?</h3>
                        <p>
                            This allows us to verify, encrypt, and securely manage the URL. It also gives us the ability to block dangerous links later if needed.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Can I host this myself?</h3>
                        <p>
                            Yes! It&apos;s open source. You can fork the project on GitHub and run it on your own infrastructure.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">What happens if qrsafe.xyz goes offline?</h3>
                        <p>
                            Since the system is open source, anyone can spin up a backup instance. However, QR codes that rely on this domain would stop redirecting unless migrated.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Can I report a QR that redirects to a malicious site?</h3>
                        <p>
                            Currently, since the URLs are encrypted, QR Safe itself doesn&apos;t support reporting. But you can report any suspicious destination directly to Google Safe Browsing.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-semibold">Why isn&apos;t qrsafe.com used?</h3>
                        <p>
                            The domain qrsafe.com was over $5,000, which isn&apos;t reasonable for a non-commercial community project. That&apos;s why we use qrsafe.xyz.
                        </p>
                    </div>
                </div>
            </section>

            <footer className="text-gray-500 text-sm mt-12 text-center">
                © {new Date().getFullYear()} QR Safe — Open source and non-commercial.
            </footer>
        </div>
    )
}
