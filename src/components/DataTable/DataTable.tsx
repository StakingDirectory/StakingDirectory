import { Flex, Grid, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react"

import DataRowMenuButton from "./DataRowMenuButton"

import stakingProviders from "../../../public/data/stakingProviders.json"

export default function DataTable({ windowSize, environment }) {
    const isSSR = typeof window === "undefined"

    const StatusCircle = ({ provider, column }) => {
        let option1
        let option2
        let option3
        let option4

        if (column === "security") {
            option1 = provider.security.audited
            option2 = provider.security.openSource
            option3 = provider.security.bugBounty
            option4 = provider.security.battleTested
        } else if (column === "ethereumAligned") {
            option1 = provider.ethereumAligned.permissionlessUsage
            option2 = provider.ethereumAligned.nonCensoringRelays
            option3 = provider.ethereumAligned.permissionlessOperators
            option4 = provider.ethereumAligned.diverseClients
        }

        const allTrue = Object.values(provider[column]).every((value) => value === true)

        return (
            <Flex justifyContent={"center"}>
                <Box borderRadius={"100%"} overflow={"hidden"} border={"2px solid"} borderColor={allTrue ? "gold" : "transparent"} w="48px">
                    <Grid
                        bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        templateColumns={"repeat(2, 1fr)"}
                        border={"2px solid"}
                        borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        borderRadius={"100%"}
                        overflow={"hidden"}
                        w="44px"
                    >
                        <Box
                            borderBottomRightRadius={3}
                            borderBottomLeftRadius={2}
                            borderTopRightRadius={2}
                            borderRight={"1px solid"}
                            borderBottom={"1px solid"}
                            borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                            bg={option1 ? "green" : "red"}
                            h={5}
                        ></Box>
                        <Box
                            borderBottomLeftRadius={3}
                            borderTopLeftRadius={2}
                            borderBottomRightRadius={2}
                            borderLeft={"1px solid"}
                            borderBottom={"1px solid"}
                            borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                            bg={option2 ? "green" : "red"}
                            h={5}
                        ></Box>
                        <Box
                            borderTopRightRadius={3}
                            borderTopLeftRadius={2}
                            borderBottomRightRadius={2}
                            borderRight={"1px solid"}
                            borderTop={"1px solid"}
                            borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                            bg={option4 ? "green" : "red"}
                            h={5}
                        ></Box>
                        <Box
                            borderTopLeftRadius={3}
                            borderBottomLeftRadius={2}
                            borderTopRightRadius={2}
                            borderLeft={"1px solid"}
                            borderTop={"1px solid"}
                            borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                            bg={option3 ? "green" : "red"}
                            h={5}
                        ></Box>
                    </Grid>
                </Box>
            </Flex>
        )
    }

    return (
        <Box mt={10} mb={50} width={"100%"} maxW={"1216px"} px={{ base: 0, lg: 20 }}>
            <TableContainer>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th></Th>
                            <Th>Name</Th>
                            <Th>Type</Th>
                            <Th>Fee</Th>
                            <Th>Min Deposit</Th>
                            <Th>Trust</Th>
                            <Th>Security</Th>
                            <Th>
                                Ethereum
                                <br />
                                Aligned
                            </Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stakingProviders.map((provider, providerIndex) => (
                            <Tr key={provider.id} borderBottomWidth={1} h={14}>
                                <Td w={12} minW={12}>
                                    <Image
                                        objectFit="contain"
                                        width={8}
                                        height={8}
                                        src="./images/LidoLogo.png"
                                        alt={"Lido Logo"}
                                        borderRadius={"100%"}
                                    />
                                </Td>
                                <Td textAlign={"end"} fontWeight={"extrabold"}>
                                    {provider.name}
                                </Td>
                                <Td>{provider.type}</Td>
                                <Td>{provider.fee}</Td>
                                <Td>{provider.minStake}</Td>
                                <Td>Smart</Td>
                                <Td>
                                    <StatusCircle provider={provider} column={"security"} />
                                </Td>
                                <Td>
                                    <StatusCircle provider={provider} column={"ethereumAligned"} />
                                </Td>
                                <Td w={5}>
                                    <DataRowMenuButton />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
