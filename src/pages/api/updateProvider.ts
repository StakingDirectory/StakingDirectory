import type { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import path from "path"
import _ from "lodash"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { providerId, updatedValues } = req.body

        const filePath = path.join(process.cwd(), "public/data/stakingProviders.json")
        const fileContents = fs.readFileSync(filePath, "utf8")
        const providers = JSON.parse(fileContents)

        let providerIndex = providers.findIndex((provider) => provider.id === providerId)
        if (providerIndex === -1) {
            providers.push({
                id: providerId,
                ...updatedValues,
            })
            providerIndex = providers.length - 1
        } else {
            _.merge(providers[providerIndex], updatedValues)
        }

        fs.writeFileSync(filePath, JSON.stringify(providers, null, 4), "utf8")

        res.status(200).json({ message: "Provider updated successfully" })
    } else {
        res.setHeader("Allow", ["POST"])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
