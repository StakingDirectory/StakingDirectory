import axios from "axios"

// Create an async function to send data to the Discord webhook
async function sendToDiscord(content) {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL

    try {
        await axios.post(webhookUrl, { content: content })
    } catch (error) {
        console.error("Error sending message to Discord:", error.response.data)
    }
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const { providerId, updatedValues } = req.body

    try {
        // Convert your data to a string format that can be sent as a message
        const discordMessage = `Provider ID: ${providerId}\nUpdated Values: ${JSON.stringify(updatedValues)}`
        // Send the data to the Discord channel
        await sendToDiscord(discordMessage)

        const response = await axios.post(
            `https://api.github.com/repos/StakingDirectory/StakingDirectory/actions/workflows/updateProvider.yml/dispatches`,
            {
                ref: "main",
                inputs: {
                    providerId: providerId.toString(),
                    updatedValues: JSON.stringify(updatedValues),
                },
            },
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization: `token ${process.env.GITHUB_PAT}`,
                },
            }
        )

        res.status(200).json({ message: "Workflow triggered successfully" })
    } catch (error) {
        console.error("Error response from GitHub:", error.response.data)
        res.status(500).json({ message: "Failed to trigger workflow" })
    }
}
