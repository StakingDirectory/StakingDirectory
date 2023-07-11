const _ = require("lodash")
const fs = require("fs")
const path = require("path")

const [providerId, updatedValues] = process.argv.slice(2)

const filePath = path.join(__dirname, "../public/data/stakingProviders.json")
const providers = JSON.parse(fs.readFileSync(filePath, "utf8"))

const providerIndex = providers.findIndex((provider) => provider.id === Number(providerId))
if (providerIndex === -1) {
    console.error("Provider not found")
    process.exit(1)
}

// Merge the provider and updatedValues objects recursively
providers[providerIndex] = _.merge({}, providers[providerIndex], JSON.parse(updatedValues))

fs.writeFileSync(filePath, JSON.stringify(providers, null, 4), "utf8")
