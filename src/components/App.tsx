import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTableTabs from "./DataTable/DataTableTabs"
import ActiveFilters from "./DataTable/ActiveFilters"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import { Box, Flex } from "@chakra-ui/react"

const App = () => {
    const [dataFilter, setDataFilter] = useState({})
    const filteredProviders = filterProviders(dataFilter)
    const orderedFilteredProviders = orderProviders(filteredProviders)

    return (
        <Box minH="100vh" minW="100vw" className={"bgPage"}>
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                {/* TODO: REMOVE WHEN PROD READY */}
                <Box width={"100vw"} minH={6} bg="purple" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                    <Box>🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️</Box>
                    <Box>Content may not be accurate. This will be fixed for production.</Box>
                    <Box>All styles subject to change. This is not the final version.</Box>
                </Box>
                <Box height={50} />
                <DataTableTabs orderedFilteredProviders={orderedFilteredProviders} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                <Box height={"50vh"} />
            </Flex>
        </Box>
    )
}

export default App
