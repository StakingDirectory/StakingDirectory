import { useState } from "react"
import Header from "./Header/Header"
import CommunityReviewPhase from "./CommunityReviewPhase"
import MainFilterButtons from "./MainFilterButtons"
import DataTableTabs from "./DataTable/DataTableTabs"
import Footer from "./Footer"

import filterProviders from "../utils/filterProviders"
import orderProviders from "../utils/orderProviders"

import dataProps from "public/data/dataProps"

import { Box, Flex, Text, Image, Button } from "@chakra-ui/react"
import AddProviderButton from "./AddProviderButton"

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
                            <Box>🏗️ ACTIVE DEVELOPMENT ENVIRONMENT - CONTENT UPDATE IN PROGRESS 🏗️</Box>
                        </Box>
                    </>
                )}
                <Flex
                    direction={"column"}
                    alignItems={"center"}
                    maxW={"100vw"}
                    w={"1350px"}
                    px={{ base: "10px", sm: "2vw", xl: "3vw", "2xl": "3vw" }}
                >
                    <Box height={30} />
                    <Text fontWeight={"extrabold"} fontSize={"3xl"} textAlign={"center"}>
                        The Ethereum Staking Directory
                    </Text>
                    <Image
                        src={"./images/StakeFromHome.png"}
                        alt={"Staking Directory Cover Image"}
                        objectFit="contain"
                        boxSize={"200px"}
                        borderRadius={"100%"}
                        my={4}
                    />
                    <Text fontWeight={"bold"} fontSize={"1xl"} pt={2} px={5} textAlign={"center"}>
                        A community maintained directory of Ethereum staking providers
                    </Text>
                    <Box height={50} />
                    <CommunityReviewPhase />
                    <Box height={50} />
                    <MainFilterButtons dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    <Box height={50} />
                    <DataTableTabs orderedFilteredProviders={orderedFilteredProviders} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    {process.env.NODE_ENV == "development" && <AddProviderButton />}
                </Flex>
            </Flex>
            <Box flex="1" />
            <Footer />
        </Box>
    )
}

export default App
