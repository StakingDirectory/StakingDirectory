import { Box, Flex, Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react"

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
        <Box maxW="1260px" w="100%">
            <Tabs>
                <Flex alignItems={"end"} gap={30} wrap={"wrap-reverse"}>
                    <TabList mx={4} minW={"fit-content"} maxH={12} mb={1}>
                        <Tab fontWeight={"bold"} borderTopRadius={10} minW={150}>
                            <Flex>Active {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "active").length, "green")}</Flex>
                        </Tab>
                        <Tab fontWeight={"bold"} borderTopRadius={10} minW={200}>
                            <Flex>
                                In development {tabNumberBox(orderedFilteredProviders.filter((item) => item.status === "dev").length, "pink")}
                            </Flex>
                        </Tab>
                    </TabList>
                    <ActiveFilters dataFilter={dataFilter} setDataFilter={setDataFilter} />
                </Flex>
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
