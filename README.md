# QR Safe

QR Safe is an open-source platform that allows users to generate secure and authenticated QR codes. It emphasizes safety by validating URLs through Google Safe Browsing.

## Features

- ✅ **Secure QR Generation:**
  - Generate secure, validated QR codes.
  - Includes logo integration for professional-looking QR codes.

- 🚨 **Community Reporting:**
  - Users can report unsafe or malicious QR codes.
  - URLs receiving three or more reports are permanently disabled.

- 🛡 **Advanced URL Validation:**
  - Integrated Google Safe Browsing API to prevent phishing, malware, and scams.
  - Basic URL format validations (HTTPS protocol and domain format).

- 🔐 **Privacy-Friendly:**
  - No personal data or browser data stored.
  - URLs provided by users are securely stored and not shared externally.

## How to Use

### Generate a QR Code

1. Navigate to the homepage.
2. Enter a valid URL and submit the form.
3. Receive a QR code that points to a safe, validated link.

## Technology Stack

- **Frontend:** Next.js, React, TailwindCSS, Shadcn UI
- **Backend:** Next.js Server Actions, Supabase
- **Storage:** Supabase Storage
- **Security:** Google Safe Browsing API

## Getting Started

Clone the repository:

```bash
git clone https://github.com/maramal/qr-safe.git
```

Install dependencies:

```bash
npm install
```

Set environment variables (`.env.local`):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GOOGLE_SAFE_BROWSING_API_KEY=your_google_safe_browsing_api_key
ENCRYPTION_SECRET=32bytes_64chars_secret_enrcyption
```

To generate the 64 characters (32 bytes) for the environment variable `ENCRYPTION_SECRET` you need to run this command:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in the browser.

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project.
2. Create your Feature Branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to your branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## License

QR Safe is open-sourced software licensed under the [MIT license](LICENSE).

## Acknowledgements

- [Google Safe Browsing](https://developers.google.com/safe-browsing)
- [Supabase](https://supabase.com/)
- [Next.js](https://nextjs.org/)
