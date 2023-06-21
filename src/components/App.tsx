import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTableTabs from "./DataTable/DataTableTabs"
import ActiveFilters from "./DataTable/ActiveFilters"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import { Box, Flex } from "@chakra-ui/react"

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

    const [dataFilter, setDataFilter] = useState({})
    const filteredProviders = filterProviders(dataFilter)
    const orderedFilteredProviders = orderProviders(filteredProviders)

    // TODO: Testing only - Remove this console.log
    useEffect(() => {
        console.log(dataFilter)
    }, [dataFilter])

    return (
        <Box minH="100vh" minW="100vw" className={"bgPage"}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header windowSize={windowSize} environment={environment} />
                {/* TODO: REMOVE WHEN PROD READY */}
                <Box width={"100vw"} minH={6} bg="purple" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                    🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️
                </Box>
                <Box height={50} />
                <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} />
                <DataTableTabs
                    windowSize={windowSize}
                    environment={environment}
                    orderedFilteredProviders={orderedFilteredProviders}
                    dataFilter={dataFilter}
                    setDataFilter={setDataFilter}
                />
                <Box height={"1000px"} />
            </Flex>
        </Box>
    )
}

export default App
