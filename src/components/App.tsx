import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTable from "./DataTable/DataTable"
import ActiveFilters from "./DataTable/ActiveFilters"

import stakingProviders from "../../public/data/stakingProviders.json"

import { useColorModeValue, Box, Flex } from "@chakra-ui/react"

import {
    faCoins,
    faUsers,
    faServer,
    faCode,
    faUserAstronaut,
    faBuilding,
    faMagnifyingGlass,
    faBookOpen,
    faShield,
    faBug,
    faVolumeHigh,
    faShapes,
    faLockOpen,
    faListUl,
    faCloud,
    faDesktop,
    faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons"

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
        if (dataFilter) {
            for (let key in dataFilter) {
                if (key === "name") {
                    if (!provider[key].toLowerCase().includes(dataFilter[key].toLowerCase())) return false
                } else if (key === "type") {
                    for (let stakingType of ["dedicated", "pooled", "lst", "lstIndex"]) {
                        if (dataFilter[key].includes(stakingType) && !provider["stakingType"].includes(stakingType)) return false
                    }
                    for (let providerType of ["hardware", "software", "cloud"]) {
                        if (dataFilter[key].includes(providerType) && !provider["providerType"].includes(providerType)) return false
                    }
                } else if (key === "security") {
                    for (let feature of ["openSource", "audited", "bugBounty", "battleTested"]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) return false
                    }
                } else if (key === "ethereumAligned") {
                    for (let feature of [
                        "nonCensoringRelays",
                        "permissionlessUsage",
                        "permissionlessOperators",
                        "diverseExecutionClients",
                        "diverseBeaconClients",
                    ]) {
                        if (dataFilter[key].includes(feature) && !provider[feature].value) return false
                    }
                } else if (key === "validatorKey") {
                    for (let feature of ["user", "service"]) {
                        if (dataFilter[key].includes(feature) && !provider[key].includes(feature)) return false
                    }
                } else if (key === "withdrawalKey") {
                    for (let feature of ["user", "smartContract"]) {
                        if (dataFilter[key].includes(feature) && !provider[key].includes(feature)) return false
                    }
                } else if (Array.isArray(dataFilter[key])) {
                    // If filter value is an array, check if the item's value is included in the array.
                    if (!dataFilter[key].includes(provider[key])) return false
                } else {
                    // If filter value is not an array, directly compare the values.
                    if (dataFilter[key] !== provider[key]) return false
                }
            }
            // If item passed all filter checks, include it.
            return true
        }
    })

    // TODO: Testing only - Remove this console.log
    useEffect(() => {
        console.log(dataFilter)
    }, [dataFilter])

    const headerValues = [
        {
            type: "text",
            id: "name",
            name: "Name",
            headerText: "NAME",
        },
        {
            type: "checkboxType",
            id: "type",
            name: "Type",
            headerText: "TYPE",
            options: [
                { value: "dedicated", text: "Dedicated", color: "green", icon: faServer },
                { value: "pooled", text: "Pooled", color: "blue", icon: faUsers },
                { value: "lst", text: "LST", color: "gold", icon: faCoins },
                { value: "indexToken", text: "LST index", color: "orange", icon: faShoppingBasket },
                { value: "hardware", text: "Hardware", color: "", icon: faDesktop },
                { value: "software", text: "Software", color: "", icon: faCode },
                { value: "cloud", text: "Cloud", color: "", icon: faCloud },
            ],
        },
        {
            type: "other",
            id: "fee",
            name: "Fee",
            headerText: "FEE",
            options: [],
        },
        {
            type: "other",
            id: "minStake",
            name: "Min Stake",
            headerText: "MIN STAKE",
            options: [],
        },
        {
            type: "checkbox",
            id: "validatorKey",
            name: "Validator Key Owner",
            headerText: "VALIDATOR <br /> KEY OWNER",
            options: [
                { value: "user", text: "User owned", color: "", icon: faUserAstronaut },
                { value: "service", text: "Service owned", color: "", icon: faBuilding },
                { value: "nodeOperator", text: "Operator owned", color: "", icon: faServer },
            ],
        },
        {
            type: "checkbox",
            id: "withdrawalKey",
            name: "Withdrawal Key Owner",
            headerText: "WITHDRAWAL <br /> KEY OWNER",
            options: [
                { value: "user", text: "User owned", color: "", icon: faUserAstronaut },
                { value: "smartContract", text: "Smart contract", color: "", icon: faCode },
            ],
        },
        {
            type: "checkbox",
            id: "security",
            name: "Security",
            headerText: "SECURITY",
            options: [
                { value: "openSource", text: "Open source", color: "", icon: faBookOpen },
                { value: "battleTested", text: "Battle tested", color: "", icon: faShield },
                { value: "bugBounty", text: "Bug bounty", color: "", icon: faBug },
                { value: "audited", text: "Audited", color: "", icon: faMagnifyingGlass },
            ],
        },
        {
            type: "checkbox",
            id: "ethereumAligned",
            name: "Ethereum Aligned",
            headerText: "ETHEREUM <br /> ALIGNED",
            options: [
                { value: "nonCensoringRelays", text: "Censorship resistance", color: "", icon: faVolumeHigh },
                { value: "diverseExecutionClients", text: "Diverse EL clients", color: "", icon: faShapes },
                { value: "diverseBeaconClients", text: "Diverse BN clients", color: "", icon: faListUl },
                { value: "permissionlessOperators", text: "Permissionless operators", color: "", icon: faLockOpen },
                { value: "permissionlessUsage", text: "Permissionless usage", color: "", icon: faUsers },
            ],
        },
    ]

    return (
        <Box minH="100vh" minW="100vw" bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header windowSize={windowSize} environment={environment} />
                {/* TODO: REMOVE WHEN PROD READY */}
                <Box width={"100%"} minH={6} bg="purple" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                    🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️
                </Box>
                <Box height={50} />
                <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} headerValues={headerValues} />
                <DataTable
                    windowSize={windowSize}
                    environment={environment}
                    stakingProviders={filteredStakingProviders}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                    headerValues={headerValues}
                />
            </Flex>
        </Box>
    )
}

export default App
