import stakingProviders from "public/data/stakingProviders.json"

const filterStakingProviders = (dataFilter) => {
    return stakingProviders.filter((provider) => {
        if (dataFilter && Object.keys(dataFilter).length > 0) {
            let showProvider = []
            for (let key in dataFilter) {
                if (key === "name") {
                    if (provider[key].toLowerCase().includes(dataFilter[key].toLowerCase())) {
                        showProvider.push(true)
                    } else {
                        showProvider.push(false)
                    }
                } else if (key === "stakeFromHome") {
                    if (provider[key] && dataFilter[key][0]) {
                        showProvider.push(true)
                    } else {
                        showProvider.push(false)
                    }
                } else if (key === "type") {
                    let showStakingType = []
                    for (let stakingType of ["solo", "pooled", "managed", "lst", "indexToken"]) {
                        if (dataFilter[key].includes(stakingType) && provider["stakingType"].includes(stakingType)) {
                            showStakingType.push(true)
                        } else if (dataFilter[key].includes(stakingType)) {
                            showStakingType.push(false)
                        }
                    }
                    if (showStakingType.length > 0) {
                        if (showStakingType.some((value) => value === true)) {
                            showProvider.push(true)
                        } else {
                            showProvider.push(false)
                        }
                    }
                    let showProviderType = []
                    for (let providerType of ["hardware", "software", "saas"]) {
                        if (dataFilter[key].includes(providerType) && provider["providerType"].includes(providerType)) {
                            showProviderType.push(true)
                        } else if (dataFilter[key].includes(providerType)) {
                            showProviderType.push(false)
                        }
                    }
                    if (showProviderType.length > 0) {
                        if (showProviderType.some((value) => value === true)) {
                            showProvider.push(true)
                        } else {
                            showProvider.push(false)
                        }
                    }
                } else if (key === "checklist") {
                    let showTechnicalIndicators = true
                    for (let feature of [
                        "openSource",
                        "audited",
                        "bugBounty",
                        "nonCensoringRelays",
                        "permissionlessUsage",
                        "permissionlessOperators",
                        "diverseExecutionClients",
                        "diverseBeaconClients",
                    ]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) {
                            showTechnicalIndicators = false
                        }
                    }
                    showProvider.push(showTechnicalIndicators)
                }
            }
            if (showProvider.length != 0 && showProvider.every((value) => value === true)) return true
        } else {
            return true
        }
    })
}

export default filterStakingProviders
