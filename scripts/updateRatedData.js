const fs = require("fs")
const axios = require("axios")
const path = require("path")

require("dotenv").config()

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

async function updateStakingProviders() {
    const stakingProvidersPath = path.resolve(__dirname, "../public/data/stakingProviders.json")
    const ratedNetworkApiDataPath = path.resolve(__dirname, "../public/data/ratedNetworkApiData.json")

    const stakingProviders = require(stakingProvidersPath)
    let ratedNetworkApiData = require(ratedNetworkApiDataPath)

    for (const provider of stakingProviders) {
        if (provider.ratedId) {
            try {
                const response = await axios.get(`https://api.rated.network/v0/eth/operators/${provider.ratedId}/summary?window=30d`, {
                    headers: {
                        accept: "application/json",
                        "X-Rated-Network": "mainnet",
                        Authorization: `Bearer ${process.env.RATED_NETWORK_API_KEY}`,
                    },
                })

                console.log("Data returned for", provider.ratedId)

                const { networkPenetration, aprPercentage } = response.data

                const index = ratedNetworkApiData.findIndex((item) => item.id === provider.id)
                if (index !== -1) {
                    ratedNetworkApiData[index].networkPenetration = networkPenetration
                    ratedNetworkApiData[index].aprPercentage30Day = aprPercentage
                }

                await delay(1000)
            } catch (error) {
                console.error(`Error fetching data for ${provider.ratedId}: ${error}`)
            }
        }
    }

    fs.writeFileSync(ratedNetworkApiDataPath, JSON.stringify(ratedNetworkApiData, null, 4))
}

updateStakingProviders()
