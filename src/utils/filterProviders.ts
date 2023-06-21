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
                    if (provider[key] === dataFilter[key][0]) {
                        showProvider.push(true)
                    } else {
                        showProvider.push(false)
                    }
                } else if (key === "type") {
                    let showStakingType = []
                    for (let stakingType of ["solo", "pooled", "lst", "indexToken"]) {
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
                } else if (key === "technicalIndicators") {
                    let showTechnicalIndicators = true
                    for (let feature of ["openSource", "audited", "bugBounty", "battleTested"]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) {
                            showTechnicalIndicators = false
                        }
                    }
                    showProvider.push(showTechnicalIndicators)
                } else if (key === "socialIndicators") {
                    let showSocialIndicators = true
                    for (let feature of [
                        "nonCensoringRelays",
                        "permissionlessUsage",
                        "permissionlessOperators",
                        "diverseExecutionClients",
                        "diverseBeaconClients",
                    ]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) {
                            showSocialIndicators = false
                        }
                    }
                    showProvider.push(showSocialIndicators)
                } else if (key === "validatorKey") {
                    let showValidatorKey = []
                    for (let validatorKey of ["userValidator", "service", "nodeOperator"]) {
                        if (dataFilter[key].includes(validatorKey) && provider[key].includes(validatorKey)) {
                            showValidatorKey.push(true)
                        } else if (dataFilter[key].includes(validatorKey) && !provider[key].includes(validatorKey)) {
                            showValidatorKey.push(false)
                        }
                    }
                    if (showValidatorKey.length > 0) {
                        if (showValidatorKey.some((value) => value === true)) {
                            showProvider.push(true)
                        } else {
                            showProvider.push(false)
                        }
                    }
                } else if (key === "withdrawalKey") {
                    let showWithdrawalKey = []
                    for (let withdrawalKey of ["userWithdrawal", "smartContract"]) {
                        if (dataFilter[key].includes(withdrawalKey) && provider[key].includes(withdrawalKey)) {
                            showWithdrawalKey.push(true)
                        } else if (dataFilter[key].includes(withdrawalKey) && !provider[key].includes(withdrawalKey)) {
                            showWithdrawalKey.push(false)
                        }
                    }
                    if (showWithdrawalKey.length > 0) {
                        if (showWithdrawalKey.some((value) => value === true)) {
                            showProvider.push(true)
                        } else {
                            showProvider.push(false)
                        }
                    }
                }
            }
            if (showProvider.length != 0 && showProvider.every((value) => value === true)) return true
        } else {
            return true
        }
    })
}

export default filterStakingProviders
