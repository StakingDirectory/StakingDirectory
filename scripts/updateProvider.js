const _ = require("lodash")
const fs = require("fs")
const path = require("path")

const [providerId, updatedValues] = process.argv.slice(2)

const filePath = path.join(__dirname, "../public/data/stakingProviders.json")
const providers = JSON.parse(fs.readFileSync(filePath, "utf8"))

let providerIndex = providers.findIndex((provider) => Number(provider.id) == Number(providerId))

// If provider is not found, create a new provider with the provided id and add it to the providers array
if (providerIndex === -1) {
    const newProvider = { id: Number(providerId) }
    providers.push(newProvider)
    providerIndex = providers.length - 1 // Update the providerIndex to point to the newly created provider
}

// Merge the provider and updatedValues objects recursively
providers[providerIndex] = _.merge({}, providers[providerIndex], JSON.parse(updatedValues))

fs.writeFileSync(filePath, JSON.stringify(providers, null, 4), "utf8")
