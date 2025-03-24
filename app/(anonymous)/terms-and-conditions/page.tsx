import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from '@/components/ui/card';

export default function TermsAndConditionsPage() {
    return (
        <div className="container mx-auto py-12 px-4 min-h-screen bg-gray-50">
            <Card className="max-w-3xl mx-auto shadow-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Terms and Conditions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-gray-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold mb-2">Acceptance of Terms</h2>
                        <p>
                            By using the QR Safe website, you agree to comply with these Terms and Conditions.
                            If you do not agree with any part of these terms, please refrain from using our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Usage of the Tool</h2>
                        <p>
                            QR Safe allows users to generate secure QR codes from provided URLs.
                            You are solely responsible for the content of the URLs you submit. QR Safe does not verify or endorse the content behind these URLs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">URL Validation</h2>
                        <p>
                            QR Safe employs robust validation techniques to ensure the safety and legitimacy of submitted URLs:
                        </p>
                        <ul className="list-disc pl-6">
                            <li>
                                <strong>Google Safe Browsing:</strong> Each submitted URL is checked against Google&apos;s Safe Browsing database to detect malware, phishing, unwanted software, and other threats.
                            </li>
                            <li>
                                <strong>Simple URL Validations:</strong> Basic checks ensure the URL uses HTTPS protocol, has a properly formatted domain, and doesn&apos;t match common patterns of malicious or deceptive sites.
                            </li>
                        </ul>
                        <p>
                            Despite these precautions, we cannot guarantee absolute security or accuracy. Always exercise caution when scanning unknown QR codes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Liability</h2>
                        <p>
                            QR Safe provides this tool without any warranty. We shall not be responsible for any direct or indirect damages caused by the use or misuse of the QR codes generated by this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-2">Changes to These Terms</h2>
                        <p>
                            We reserve the right to modify these Terms and Conditions at any time. Changes will be clearly posted on this page. Continued use of QR Safe implies acceptance of the updated terms.
                        </p>
                    </section>

                    <footer className="text-sm text-center text-gray-500">
                        © {new Date().getFullYear()} QR Safe. All rights reserved.
                    </footer>
                </CardContent>
            </Card>
        </div>
    );
}
