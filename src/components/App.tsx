import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTable from "./DataTable/DataTable"

import stakingProviders from "../../public/data/stakingProviders.json"

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

    // const dataFilter = { name: "Lido", type: ["LST", "Dedicated", "Pooled"] }

    const filteredStakingProviders = stakingProviders.filter((provider) => {
        if (dataFilter) {
            for (let key in dataFilter) {
                if (Array.isArray(dataFilter[key])) {
                    // If filter value is an array, check if the item's value is included in the array.
                    if (!dataFilter[key].includes(provider[key])) return false
                } else if (key === "name") {
                    // If the filter key is 'name', check if the item's name contains the filter name.
                    if (!provider[key].toLowerCase().includes(dataFilter[key].toLowerCase())) return false
                } else {
                    // If filter value is not an array, directly compare the values.
                    if (dataFilter[key] !== provider[key]) return false
                }
            }
            // If item passed all filter checks, include it.
            return true
        }
    })

    // write a useEffect function that logs the value of dataFilter whenever it changes
    useEffect(() => {
        console.log(dataFilter)
    }, [dataFilter])

    return (
        <Box minH="100vh" minW="100vw" bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header windowSize={windowSize} environment={environment} />
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
