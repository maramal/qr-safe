import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto py-12 px-4 min-h-screen bg-gray-50">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-2">Introduction</h2>
            <p>
              At <strong>QR Safe</strong>, your privacy is important. This Privacy Policy clearly describes how we handle the information you provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">What Data Do We Collect?</h2>
            <p>
              QR Safe does <strong>not</strong> collect or store any personal data from users or their browsers. We only store the URLs provided by users in our database to generate secure QR codes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">How Do We Use the Data?</h2>
            <p>
              URLs submitted by users are used solely to generate and serve QR codes. We do not analyze, distribute, or share these URLs with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Cookies and Browser Storage</h2>
            <p>
              QR Safe does not use cookies, local storage, or session storage to track users. Our service is entirely stateless from the user&apos;s perspective.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Data Security</h2>
            <p>
              We take your security seriously. URLs stored in our database are protected using best practices for secure data storage, including encryption at rest and in transit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Open Source & Community Contribution</h2>
            <p>
              QR Safe is an entirely free and open-source project. The repository is publicly available on GitHub to encourage forks, contributions, and issue reporting by the community. This project is non-commercial and aims to grow and improve through open and transparent collaboration.
            </p>
            <p>
              To contribute or report issues, please visit our GitHub repository:
              <br />
              <a href="https://github.com/your-username/qr-safe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                QR Safe GitHub Repository
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. All changes will be clearly posted here. Please check regularly for updates.
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