const orderFilteredProviders = (filteredProviders) => {
    const stakingTypeOrder = ["solo", "pooled", "lst", "indexToken"]
    const providerTypeOrder = ["hardware", "software", "saas", "lst"]

    // Copy the filteredProviders array before sorting
    const sortedProviders = [...filteredProviders].sort((a, b) => {
        // Sort by stakingType first
        const stakingOrderA = stakingTypeOrder.indexOf(a.stakingType)
        const stakingOrderB = stakingTypeOrder.indexOf(b.stakingType)
        if (stakingOrderA < stakingOrderB) return -1
        if (stakingOrderA > stakingOrderB) return 1

        // If stakingType is the same, sort by providerType
        const providerOrderA = providerTypeOrder.indexOf(a.providerType)
        const providerOrderB = providerTypeOrder.indexOf(b.providerType)
        if (providerOrderA < providerOrderB) return -1
        if (providerOrderA > providerOrderB) return 1

        // If providerType is also the same, then sort by name
        const nameA = a.name.toLowerCase() // ignore upper and lowercase
        const nameB = b.name.toLowerCase() // ignore upper and lowercase
        if (nameA < nameB) return -1
        if (nameA > nameB) return 1

        return 0 // names must be equal
    })

    return sortedProviders
}

export default orderFilteredProviders
