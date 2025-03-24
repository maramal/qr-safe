export async function isUrlSafe(url: string): Promise<boolean> {
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    const body = {
        client: {
            clientId: "qr-safe-app",
            clientVersion: "1.0.0",
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{ url }],
        },
    };

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();

    console.log(data)

    // If there are matches, the URL is not safe
    return !data.matches;
}
