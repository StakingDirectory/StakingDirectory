import { Flex, Grid, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react"

import DataRowMenuButton from "./DataRowMenuButton"

import stakingProviders from "../../../public/data/stakingProviders.json"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding, faCode, faCoins, faUsers, faServer } from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment }) {
    const isSSR = typeof window === "undefined"

    const ProviderType = ({ provider }) => {
        return (
            <Flex
                direction={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                gap={1}
                color={provider.type == "LST" ? "green" : provider.type == "Pooled" ? "blue" : "gold"}
                fontWeight={"bold"}
            >
                {provider.type == "LST" && <FontAwesomeIcon icon={faCoins} />}
                {provider.type == "Pooled" && <FontAwesomeIcon icon={faUsers} />}
                {provider.type == "Dedicated" && <FontAwesomeIcon icon={faServer} />}
                {provider.type}
            </Flex>
        )
    }

    const ValidatorKey = ({ provider }) => {
        return (
            <Flex justifyContent={"center"} gap={5}>
                {provider.validatorKey.includes("user") && <FontAwesomeIcon icon={faUserAstronaut} size="lg" />}
                {provider.validatorKey.includes("service") && <FontAwesomeIcon icon={faBuilding} size="lg" />}
            </Flex>
        )
    }

    const WithdrawalKey = ({ provider }) => {
        return (
            <Flex justifyContent={"center"} gap={5}>
                {provider.withdrawalKey.includes("user") && <FontAwesomeIcon icon={faUserAstronaut} size="lg" />}
                {provider.withdrawalKey.includes("smartContract") && <FontAwesomeIcon icon={faCode} size="lg" />}
            </Flex>
        )
    }

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
                            <Th textAlign={"start"}>Name</Th>
                            <Th textOverflow={"wrap"}>
                                Validator
                                <br />
                                Type
                            </Th>
                            <Th>Fee</Th>
                            <Th>Min Stake</Th>
                            <Th>
                                Validator
                                <br />
                                Key Owner
                            </Th>
                            <Th>
                                Withdrawal
                                <br />
                                Key Owner
                            </Th>
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
                                    <Image objectFit="contain" boxSize={8} src={provider.logo} alt={"Lido Logo"} borderRadius={"100%"} />
                                </Td>
                                <Td fontWeight={"extrabold"}>{provider.name}</Td>
                                <Td textAlign={"center"}>
                                    <ProviderType provider={provider} />
                                </Td>
                                <Td textAlign={"center"}>{provider.fee}</Td>
                                <Td textAlign={"center"}>{provider.minStake}</Td>
                                <Td>
                                    <ValidatorKey provider={provider} />
                                </Td>
                                <Td>
                                    <WithdrawalKey provider={provider} />
                                </Td>
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
