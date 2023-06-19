import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTable from "./DataTable/DataTable"
import ActiveFilters from "./DataTable/ActiveFilters"

import stakingProviders from "../../public/data/stakingProviders.json"
import dataProps from "public/data/dataProps"

import { useColorModeValue, Box, Flex } from "@chakra-ui/react"

const App = () => {
    const environment = process.env.NODE_ENV

    // Check if the current render is on the server (Server Side Render) or client
    const isSSR = typeof window === "undefined"

    // Rerender when window size changes and save
    // window size to state to allow conditional rendering
    const [windowSize, setWindowSize] = useState({
        width: isSSR ? 0 : window.innerWidth,
        height: isSSR ? 0 : window.innerHeight,
    })
    useEffect(() => {
        const handleResizeWindow = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow)
        window.addEventListener("load", handleResizeWindow)
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow)
            window.removeEventListener("load", handleResizeWindow)
        }
    }, [])

    // Data Filtering State
    const [dataFilter, setDataFilter] = useState({})

    const filteredStakingProviders = stakingProviders.filter((provider) => {
        if (dataFilter && Object.keys(dataFilter).length > 0) {
            let showProvider = []
            for (let key in dataFilter) {
                if (key === "name") {
                    if (provider[key].toLowerCase().includes(dataFilter[key].toLowerCase())) {
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
                } else if (key === "security") {
                    let showSecurity = true
                    for (let feature of ["openSource", "audited", "bugBounty", "battleTested"]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) {
                            showSecurity = false
                        }
                    }
                    showProvider.push(showSecurity)
                } else if (key === "ethereumAligned") {
                    let showEthereumAligned = true
                    for (let feature of [
                        "nonCensoringRelays",
                        "permissionlessUsage",
                        "permissionlessOperators",
                        "diverseExecutionClients",
                        "diverseBeaconClients",
                    ]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) {
                            showEthereumAligned = false
                        }
                    }
                    showProvider.push(showEthereumAligned)
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

    // TODO: Testing only - Remove this console.log
    useEffect(() => {
        console.log(dataFilter)
    }, [dataFilter])

    return (
        <Box minH="100vh" minW="100vw" bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header windowSize={windowSize} environment={environment} />
                {/* TODO: REMOVE WHEN PROD READY */}
                <Box width={"100%"} minH={6} bg="purple" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                    🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️
                </Box>
                <Box height={50} />
                <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} />
                <DataTable
                    windowSize={windowSize}
                    environment={environment}
                    stakingProviders={filteredStakingProviders}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />
            </Flex>
        </Box>
    )
}

export default App
