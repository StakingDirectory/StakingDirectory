import { useColorModeValue, Box, Flex, Tabs, TabList, TabPanel, TabPanels, Tab, Thead, Tr, Table, Th } from "@chakra-ui/react"

import DataTable from "./DataTable"

export default function DataTableTabs({ windowSize, environment, orderedFilteredProviders, dataFilter, setDataFilter }) {
    const tabNumberBox = (value) => {
        return (
            <Box border={"2px solid"} borderRadius={"50px"} px={2} ml={2} fontSize={"sm"}>
                {value}
            </Box>
        )
    }

    return (
        <Tabs maxW="100vw">
            <TabList mx={4}>
                <Tab fontWeight={"bold"}>
                    <Flex>Active {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "active").length)}</Flex>
                </Tab>
                <Tab fontWeight={"bold"}>
                    <Flex>In development {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "dev").length)}</Flex>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel pt={0}>
                    <DataTable
                        windowSize={windowSize}
                        environment={environment}
                        stakingProviders={orderedFilteredProviders}
                        status={"active"}
                        dataFilter={dataFilter}
                        setDataFilter={setDataFilter}
                    />
                </TabPanel>
                <TabPanel pt={0}>
                    <DataTable
                        windowSize={windowSize}
                        environment={environment}
                        stakingProviders={orderedFilteredProviders}
                        status={"dev"}
                        dataFilter={dataFilter}
                        setDataFilter={setDataFilter}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}
