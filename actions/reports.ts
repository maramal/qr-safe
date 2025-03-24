"use server"

import { createClient } from "@/utils/supabase/server"

export async function submitReport(
    prevState: { errors: { error: string } } | { success: boolean } | null,
    formData: FormData
) {
    try {
        const urlStr = (formData.get("url") as string).toLocaleLowerCase().trim()
        const url = new URL(urlStr)

        const supabase = await createClient()
        const { data, error } = await supabase
            .from("urls")
            .select("id, times_reported")
            .eq("url", url.href)

        if (error) throw error

        if (data.length === 0) {
            throw new Error("QR Code not found")
        }

        const recordId = data[0].id
        const timesReported = data[0].times_reported

        const { error: reportError } = await supabase
            .from("urls")
            .update({ times_reported: timesReported + 1 })
            .eq("id", recordId)

        if (reportError) throw reportError

        return { success: true }
    } catch (error) {
        if (error instanceof Error) {
            return { errors: { error: error.message } }
        }
    }

    return { success: true }
    
}