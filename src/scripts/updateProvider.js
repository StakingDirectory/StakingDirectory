const fs = require("fs")
const path = require("path")

const [providerId, updatedValues] = process.argv.slice(2)

const filePath = path.join(__dirname, "../public/data/stakingProviders.json")
const providers = JSON.parse(fs.readFileSync(filePath, "utf8"))

const providerIndex = providers.findIndex((provider) => provider.id === providerId)
if (providerIndex === -1) {
    console.error("Provider not found")
    process.exit(1)
}

providers[providerIndex] = { ...providers[providerIndex], ...JSON.parse(updatedValues) }

fs.writeFileSync(filePath, JSON.stringify(providers, null, 2), "utf8")
