import { useState } from "react"
import Header from "./Header/Header"
import CommunityUpdatePhase from "./CommunityUpdates"
import MainFilterButtons from "./MainFilterButtons"
import DataTableTabs from "./DataTable/DataTableTabs"
import Footer from "./Footer"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import dataProps from "public/data/dataProps"

import { Box, Flex, Text, Image, Link, Code } from "@chakra-ui/react"
import NextLink from "next/link"
import AddProviderButton from "./AddProviderButton"

const App = () => {
    const [dataFilter, setDataFilter] = useState({})
    const filteredProviders = filterProviders(dataFilter)
    const orderedFilteredProviders = orderProviders(
        filteredProviders,
        dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
    )

    return (
        <Box minH="100vh" className={"bgPage"} display="flex" flexDirection="column">
            <Flex direction="column" justifyContent="center" alignItems="center">
                <Header />
                <Flex direction={"column"} alignItems={"center"} maxW={"100vw"} w={"1350px"} px={{ base: "0px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}>
                    <Box height={30} />
                    <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                        The Ethereum Staking Directory
                    </Text>
                    <Text fontWeight={"bold"} fontSize={"1xl"} pt={2} px={5} textAlign={"center"}>
                        A community-maintained directory of Ethereum staking providers
                    </Text>
                    <Box height={50} />
                    <CommunityUpdatePhase />
                    <Box height={50} />
                    <Box mx={2}>
                        <MainFilterButtons dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    </Box>
                    <Box height={50} />
                    <DataTableTabs orderedFilteredProviders={orderedFilteredProviders} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    <Box mb={10}>
                        <AddProviderButton />
                    </Box>
                    <Code mx={1} px={2} py={1} borderRadius={10} fontWeight={"extrabold"}>
                        Live data provided by{" "}
                        <Link as={NextLink} href={"https://www.rated.network/"} color={"blue"} textDecoration={"underline"} target="_blank">
                            Rated.Network
                        </Link>{" "}
                        📡
                    </Code>
                    <Box mb={20} />
                </Flex>
            </Flex>
            <Box flex="1" />
            <Footer />
        </Box>
    )
}

export default App
