import QRCode from "qrcode";
import sharp from "sharp";
import path from "path";

export async function generateQRCodeWithLogo(url: string): Promise<Buffer> {
    const logoPath = path.join(process.cwd(), "assets", "Logo.png");  

    const qrBuffer = await QRCode.toBuffer(url, {
        errorCorrectionLevel: 'H',
        margin: 2
    });

    // Redimensionar el logo primero (más pequeño para evitar interferencia)
    const resizedLogo = await sharp(logoPath)
        .resize(25, 25, { fit: 'contain' })
        .toBuffer();

    // Crear un fondo blanco con padding alrededor del logo
    const logoWithPadding = await sharp({
        create: {
            width: 30,       // ligeramente mayor que el logo
            height: 30,      // ligeramente mayor que el logo
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 1 }
        }
    })
    .composite([{ input: resizedLogo, gravity: 'center' }])
    .png()
    .toBuffer();

    // Combinar QR con el logo (ahora con padding)
    const qrWithLogo = await sharp(qrBuffer)
        .composite([{ input: logoWithPadding, gravity: 'center' }])
        .png()
        .toBuffer();

    return qrWithLogo;
}
