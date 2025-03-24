import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import QRCode from "qrcode";

export async function generateQRCodeWithLogo(url: string): Promise<Buffer> {
    const logoPath = path.join(process.cwd(), "Logo.png");

    let logoBuffer: Buffer;

    try {
        logoBuffer = await fs.readFile(logoPath);
    } catch (err) {
        throw new Error(`Failed to read logo at ${logoPath}: ${err}`);
    }

    const qrBuffer = await QRCode.toBuffer(url, {
        errorCorrectionLevel: 'H',
        margin: 2
    });

    const resizedLogo = await sharp(logoBuffer)
        .resize(25, 25, { fit: 'contain' })
        .toBuffer();

    const logoWithPadding = await sharp({
        create: {
            width: 30,
            height: 30,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
    })
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .png()
    .toBuffer();

    const qrWithLogo = await sharp(qrBuffer)
        .composite([{ input: logoWithPadding, gravity: 'center' }])
        .png()
        .toBuffer();

    return qrWithLogo;
}
