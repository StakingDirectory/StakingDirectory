import { useColorModeValue, Box, Flex, Tabs, TabList, TabPanel, TabPanels, Tab, Thead, Tr, Table, Th } from "@chakra-ui/react"

import DataTable from "./DataTable"
import ActiveFilters from "./ActiveFilters"

export default function DataTableTabs({ orderedFilteredProviders, dataFilter, setDataFilter }) {
    const tabNumberBox = (value, color: string) => {
        return (
            <Box border={"2px solid"} borderRadius={"50px"} px={2} ml={2} fontSize={"sm"} fontWeight={"extrabold"} color={color}>
                {value}
            </Box>
        )
    }

    return (
        <Box maxW="1250px" w="100%">
            <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} />
            <Tabs>
                <TabList mx={4} w={"fit-content"}>
                    <Tab fontWeight={"bold"} borderTopRadius={10}>
                        <Flex>Active {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "active").length, "green")}</Flex>
                    </Tab>
                    <Tab fontWeight={"bold"} borderTopRadius={10}>
                        <Flex>In development {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "dev").length, "purple")}</Flex>
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel pt={0}>
                        <DataTable
                            stakingProviders={orderedFilteredProviders}
                            status={"active"}
                            dataFilter={dataFilter}
                            setDataFilter={setDataFilter}
                        />
                    </TabPanel>
                    <TabPanel pt={0}>
                        <DataTable stakingProviders={orderedFilteredProviders} status={"dev"} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
