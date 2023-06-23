import { useState, useEffect } from "react"
import Header from "./Header/Header"
import DataTableTabs from "./DataTable/DataTableTabs"
import Footer from "./Footer"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import { Box, Flex } from "@chakra-ui/react"

const App = () => {
    const [dataFilter, setDataFilter] = useState({})
    const filteredProviders = filterProviders(dataFilter)
    const orderedFilteredProviders = orderProviders(filteredProviders)

    const environment = process.env.NODE_ENV

    return (
        <Box minH="100vh" minW="100vw" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                {/* TODO: REMOVE WHEN PROD READY */}
                {environment != "development" && (
                    <>
                        <Box width={"100vw"} minH={6} bg="purple" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                            <Box>🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️</Box>
                            <Box>This is not the final name.</Box>
                            <Box>Content may not be accurate. This will be fixed for production.</Box>
                            <Box>All styles subject to change. This is not the final version.</Box>
                        </Box>
                        <Box height={50} />
                    </>
                )}
                <Box height={50} />
                <DataTableTabs orderedFilteredProviders={orderedFilteredProviders} dataFilter={dataFilter} setDataFilter={setDataFilter} />
            </Flex>
            <Box flex="1" />
            <Footer />
        </Box>
    )
}

export default App
