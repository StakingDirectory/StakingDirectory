const countChecklistTrues = (provider, checklistProperties) => {
    return checklistProperties.reduce((count, checklistItem) => {
        return count + (provider[checklistItem.value]?.value ? 1 : 0)
    }, 0)
}

const orderFilteredProviders = (filteredProviders, checklistProperties) => {
    const stakingTypeOrder = ["solo", "pooled", "managed", "lst", "indexToken"]
    const providerTypeOrder = ["hardware", "software", "saas", "lst"]

    // Copy the filteredProviders array before sorting
    const sortedProviders = [...filteredProviders].sort((a, b) => {
        // First, sort by stakingType
        const stakingOrderA = stakingTypeOrder.indexOf(a.stakingType)
        const stakingOrderB = stakingTypeOrder.indexOf(b.stakingType)
        if (stakingOrderA < stakingOrderB) return -1
        if (stakingOrderA > stakingOrderB) return 1

        // Then sort by mainnetLaunch date
        const dateA = a.mainnetLaunch?.date
        const dateB = b.mainnetLaunch?.date

        if (!dateA && dateB) return 1
        if (dateA && !dateB) return -1
        if (dateA && dateB) {
            if (dateA < dateB) return -1
            if (dateA > dateB) return 1
        }

        // If counts are equal, sort by name
        const nameA = a.name?.toLowerCase()
        const nameB = b.name?.toLowerCase()
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1

        return 0
    })

    return sortedProviders
}

export default orderFilteredProviders
