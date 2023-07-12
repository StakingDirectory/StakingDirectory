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
        const checklistTruesA = countChecklistTrues(a, checklistProperties)
        const checklistTruesB = countChecklistTrues(b, checklistProperties)

        // Sort by number of checklist options that are true
        if (checklistTruesA > checklistTruesB) return -1
        if (checklistTruesA < checklistTruesB) return 1

        // Then sort by stakingType first
        const stakingOrderA = stakingTypeOrder.indexOf(a.stakingType)
        const stakingOrderB = stakingTypeOrder.indexOf(b.stakingType)
        if (stakingOrderA < stakingOrderB) return -1
        if (stakingOrderA > stakingOrderB) return 1

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
