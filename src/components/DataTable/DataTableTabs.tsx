import { Box, Flex, Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react"

import DataTable from "./DataTable"
import ActiveFilters from "./ActiveFilters"

export default function DataTableTabs({ orderedFilteredProviders, dataFilter, setDataFilter }) {
    const tabNumberBox = (value, color: string) => {
        return (
            <Box border={"3px solid"} borderRadius={"50px"} px={2} ml={2} fontSize={"sm"} fontWeight={"extrabold"} borderColor={color}>
                {value}
            </Box>
        )
    }

    return (
        <Box w="100%" minH={"65vh"}>
            <Tabs>
                <Flex justifyContent={"space-between"} alignItems={"end"} gap={30} wrap={"wrap-reverse"} ml={{ base: 2, sm: 0 }}>
                    <TabList maxH={12} mb={1}>
                        <Tab fontWeight={"extrabold"} borderTopRadius={10} minW={150}>
                            <Flex alignItems={"center"}>
                                Active {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "active").length, "green")}
                            </Flex>
                        </Tab>
                        <Tab fontWeight={"extrabold"} borderTopRadius={10} minW={200}>
                            <Flex alignItems={"center"}>
                                In development {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "dev").length, "blue")}
                            </Flex>
                        </Tab>
                    </TabList>
                    <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} />
                </Flex>
                <TabPanels>
                    <TabPanel p={0}>
                        <DataTable
                            stakingProviders={orderedFilteredProviders}
                            status={"active"}
                            dataFilter={dataFilter}
                            setDataFilter={setDataFilter}
                        />
                    </TabPanel>
                    <TabPanel p={0}>
                        <DataTable stakingProviders={orderedFilteredProviders} status={"dev"} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
