"use server"

import { createClient } from "@/utils/supabase/server"
import { getURL, isTrustedURL } from "@/utils/urls"
import { generateQRCodeWithLogo } from "@/utils/qr"
import { redirect, RedirectType } from "next/navigation"
import { isUrlSafe } from "@/utils/google-safe-browsing"

async function createQRCode(url: URL) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("urls")
        .insert({ url: url.href, qr_url: "" })
        .select("id")

    if (error) throw new Error(error.message)

    return data?.[0].id
}

async function getUrl(filePath: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .storage
        .from("qrs")
        .getPublicUrl(filePath)

    return data.publicUrl
}

async function uploadFile(buffer: Buffer, fileDestination: string) {
    const supabase = await createClient()

    const { error, data } = await supabase.storage
        .from("qrs")
        .upload(fileDestination, buffer, {
            contentType: "image/png",
            upsert: true
        })

    if (error) throw new Error(error.message)

    const filePath = data.path
    const url = await getUrl(filePath)

    return url
}

async function updateQRCode(recordId: string, qrUrl: string) {
    const supabase = await createClient()
    const { error } = await supabase
        .from("urls")
        .update({ qr_url: qrUrl })
        .eq("id", recordId)

    if (error) throw new Error(error.message)
}

export async function getExistingQRCode(url: URL) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("url", url.href)
    
    if (error) throw new Error(error.message)
    
    return data?.[0]
}

export async function submitQRCode(
    prevState: { errors: { error: string } } | null, 
    formData: FormData
) {
    const errors = { error: "" }  

    try {
        const urlStr = (formData.get("url") as string).trim()
        const url = getURL(urlStr)

        if (!isTrustedURL(url)) {
            throw new Error("URL validation failed")
        }

        // Validación con Google Safe Browsing
        const safeBrowsingResult = await isUrlSafe(url.href)
        if (!safeBrowsingResult) {
            throw new Error("URL detected as unsafe by Google Safe Browsing")
        }

        // Verificar si ya existe un QR Code para la URL
        const existingQRCode = await getExistingQRCode(url)
        if (existingQRCode) {
            redirect(`/qr/${existingQRCode.id}`, RedirectType.push)
        }

        const recordId = await createQRCode(url)
        const fileDestination = `${recordId}.png`

        // Generar URL dinámica basada en host actual
        const hostUrl = process.env.NEXT_PUBLIC_SITE_URL!
        const qrContentUrl = `${hostUrl}/token/${recordId}`

        // Generar QR directamente en memoria
        const qrCodeWithLogoBuffer = await generateQRCodeWithLogo(qrContentUrl)

        console.log('QR CODE WITH LOGO BUFFER', qrCodeWithLogoBuffer)

        // Subir directamente a Supabase (sin usar almacenamiento local)
        const filePath = await uploadFile(qrCodeWithLogoBuffer, fileDestination)

        await updateQRCode(recordId, filePath)

        redirect(`/qr/${recordId}`, RedirectType.push)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error
        }

        console.error("Real error:", error)

        if (error instanceof Error && error.message) {
            errors.error = error.message
        } else {
            errors.error = "An unknown error occurred."
        }

        return { errors }
    }

    return null
}

export async function getQRCode(recordId: string) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from("urls")
        .select("*")
        .eq("id", recordId)

    if (error) throw new Error(error.message)

    return data?.[0]
}