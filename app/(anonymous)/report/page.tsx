"use client"

import { useActionState, useEffect } from "react"
import { submitReport } from "@/actions/reports"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function ReportURLPage() {
    const router = useRouter()    
    const [state, formAction] = useActionState(submitReport, null)

    useEffect(() => {
        if (state?.success) {
            toast.success("Report submitted successfully.")
            router.push("/")
        }
    }, [router, state?.success])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form action={formAction} className="bg-white rounded-lg shadow-md p-8 w-96 space-y-2">
                <h1 className="text-2xl font-semibold text-center mb-4">Report Unsafe QR Code</h1>
                <p className="text-center text-sm">Report an unsafe QR code as malicious.</p>
                <div className="space-y-1">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" name="url" required />
                    {state?.errors?.error && <p className="text-red-600 text-sm">{state.errors.error}</p>}
                </div>
                <Button className="w-full">Report</Button>
            </form>
        </div>
    )
}