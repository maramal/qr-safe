const TRUSTED_PROTOCOLS = ["https:"]
const BLACKLISTED_HOSTNAMES = ["bit.ly", "tinyurl.com", "shorturl.at"]
const ALLOWED_PORTS = ["80", "443"]

export function isTrustedURL(url: URL): boolean {
    // Validate protocol
    if (!TRUSTED_PROTOCOLS.includes(url.protocol)) {
        return false
    }

    // Validate hostname format
    const hostnameRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/
    if (!hostnameRegex.test(url.hostname)) {
        return false
    }

    // Prevent blacklisted hostnames (often used for phishing)
    if (BLACKLISTED_HOSTNAMES.includes(url.hostname.toLowerCase())) {
        return false
    }

    // Avoid IP-based URLs (common in phishing)
    const ipRegex = /^\d{1,3}(\.\d{1,3}){3}$/
    if (ipRegex.test(url.hostname)) {
        return false
    }

    // Avoid localhost URLs (common in phishing)
    if (url.hostname === "localhost") {
        return false
    }

    // Avoid non-standard ports (common in phishing)
    if (url.port && !ALLOWED_PORTS.includes(url.port)) {
        return false
    }

    return true
}

export function getURL(url: string): URL {
    if (url.startsWith("http://")) {
        url = url.replace("http://", "https://")
    } else if (!url.startsWith("https://")) {
        url = `https://${url}`
    }

    try {
        return new URL(url)
    }
    catch {
        throw new Error("Invalid URL")
    }
}