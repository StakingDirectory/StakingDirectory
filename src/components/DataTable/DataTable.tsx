import {
    Flex,
    Grid,
    Box,
    Image,
    useColorModeValue,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    IconButton,
    Text,
    Tooltip,
    Input,
} from "@chakra-ui/react"

import React from "react"

import DataRowMenuButton from "./DataRowMenuButton"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserAstronaut, faBuilding, faCode, faCoins, faUsers, faServer, faFilter, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment, stakingProviders }) {
    const isSSR = typeof window === "undefined"

    const ProviderType = ({ provider }) => {
        return (
            <Flex
                direction={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                gap={1}
                color={provider.type == "LST" ? "gold" : provider.type == "Pooled" ? "blue" : "green"}
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

    const HeaderButton = ({ text }) => {
        const textElements = text.split("<br />").map((item, index) => (
            <React.Fragment key={index}>
                {item}
                {index !== text.split("<br />").length - 1 && <br />}
            </React.Fragment>
        ))
        return (
            <MenuButton>
                <Flex gap={1} alignItems={"end"}>
                    <Box>{textElements}</Box>
                    <Box>
                        <FontAwesomeIcon icon={faFilter} />
                    </Box>
                </Flex>
            </MenuButton>
        )
    }

    const HeaderMenuName = () => {
        return (
            <MenuList p={0} borderRadius={5}>
                <Input borderRadius={4} placeholder="Search names..." />
            </MenuList>
        )
    }

    const HeaderMenuType = () => {
        return (
            <MenuList minWidth={1}>
                <MenuOptionGroup type="checkbox">
                    <MenuItemOption value="dedicated" color={"green"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faServer} />
                            </Box>
                            <Text>Dedicated</Text>
                        </Flex>
                    </MenuItemOption>
                    <MenuItemOption value="pooled" color={"blue"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faUsers} />
                            </Box>
                            <Text>Pooled</Text>
                        </Flex>
                    </MenuItemOption>
                    <MenuItemOption value="lst" color={"gold"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faCoins} />
                            </Box>
                            <Text>LST</Text>
                        </Flex>
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        )
    }

    const HeaderMenuSecurity = () => {
        return (
            <MenuList minWidth={1}>
                <MenuOptionGroup type="checkbox">
                    <MenuItemOption value="openSource" color={"green"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faServer} />
                            </Box>
                            <Text>Open Source</Text>
                        </Flex>
                    </MenuItemOption>
                    <MenuItemOption value="audited" color={"blue"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faUsers} />
                            </Box>
                            <Text>Audited</Text>
                        </Flex>
                    </MenuItemOption>
                    <MenuItemOption value="bugBounty" color={"gold"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faCoins} />
                            </Box>
                            <Text>Bug Bounty</Text>
                        </Flex>
                    </MenuItemOption>
                    <MenuItemOption value="battleTested" color={"gold"} fontSize={"lg"}>
                        <Flex gap={2}>
                            <Box width={6}>
                                <FontAwesomeIcon icon={faCoins} />
                            </Box>
                            <Text>Battle Tested</Text>
                        </Flex>
                    </MenuItemOption>
                </MenuOptionGroup>
            </MenuList>
        )
    }

    return (
        <Box mt={10} mb={50} width={"100%"} maxW={"1216px"} px={{ base: 0, lg: 20 }}>
            <TableContainer>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th></Th>
                            <Th textAlign={"start"}>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <Box ml={"-10px"}>
                                        <HeaderButton text="NAME" />
                                    </Box>
                                    <HeaderMenuName />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="TYPE" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="FEE" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="MIN STAKE" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="VALIDATOR <br /> KEY OWNER" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="WITHDRAWAL <br /> KEY OWNER" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="SECURITY" />
                                    <HeaderMenuSecurity />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton text="ETHEREUM <br /> ALIGNED" />
                                    <HeaderMenuType />
                                </Menu>
                            </Th>
                            <Th>
                                <Tooltip gutter={4} label="Clear filters" openDelay={300}>
                                    <IconButton
                                        color="red"
                                        variant="ghost"
                                        aria-label="Clear filters"
                                        size="sm"
                                        icon={<FontAwesomeIcon icon={faFilterCircleXmark} />}
                                    ></IconButton>
                                </Tooltip>
                            </Th>
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
