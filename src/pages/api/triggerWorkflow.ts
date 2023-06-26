import axios from "axios"

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const { id, updatedValues } = req.body

    try {
        const response = await axios.post(
            `https://api.github.com/repos/StakingDirectory/StakingDirectory/actions/workflows/updateProvider.yml/dispatches`,
            {
                ref: "main", // The branch to run the workflow on
                inputs: { id, updatedValues }, // The input parameters for the workflow
            },
            {
                headers: {
                    Accept: "application/vnd.github.v3+json",
                    Authorization: `token ${process.env.GITHUB_PAT}`, // Your GitHub PAT
                },
            }
        )

        res.status(200).json({ message: "Workflow triggered successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Failed to trigger workflow" })
    }
}
