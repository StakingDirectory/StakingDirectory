import { useState } from "react"
import Header from "./Header/Header"
import DataTableTabs from "./DataTable/DataTableTabs"
import Footer from "./Footer"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import dataProps from "public/data/dataProps"

import { Box, Flex } from "@chakra-ui/react"

const App = () => {
    const [dataFilter, setDataFilter] = useState({})
    const filteredProviders = filterProviders(dataFilter)
    const orderedFilteredProviders = orderProviders(
        filteredProviders,
        dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
    )

    return (
        <Box minH="100vh" minW="100vw" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                {/* TODO: REMOVE WHEN PROD READY */}
                {process.env.NODE_ENV != "development" && (
                    <>
                        <Box width={"100vw"} minH={6} bg="pink" textAlign={"center"} fontWeight={"extrabold"} color={"white"}>
                            <Box>🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - NOT PRODUCTION READY 🏗️</Box>
                            <Box>The name is subject to change.</Box>
                            <Box>All styles are subject to change. This is not the final version.</Box>
                            <Box>Content may not be accurate. This will be fixed for production.</Box>
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
