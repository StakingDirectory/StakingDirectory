import axios from "axios"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const { providerId, updatedValues } = req.body

    try {
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
