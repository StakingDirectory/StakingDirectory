import { useRef, useEffect, useState } from "react"

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
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react"

import React from "react"

import DataRowMenuButton from "./DataRowMenuButton"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faUserAstronaut,
    faBuilding,
    faCode,
    faCoins,
    faUsers,
    faServer,
    faFilter,
    faFilterCircleXmark,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"

    const nameInputRef = useRef<HTMLInputElement>(null)

    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")

    const ProviderType = ({ provider }) => {
        return (
            <Flex
                direction={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                gap={1}
                color={provider.type == "lst" ? "gold" : provider.type == "pooled" ? "blue" : "green"}
                fontWeight={"bold"}
            >
                {provider.type == "lst" && (
                    <>
                        <FontAwesomeIcon icon={faCoins} />
                        LST
                    </>
                )}
                {provider.type == "pooled" && (
                    <>
                        <FontAwesomeIcon icon={faUsers} />
                        Pooled
                    </>
                )}
                {provider.type == "dedicated" && (
                    <>
                        <FontAwesomeIcon icon={faServer} />
                        Dedicated
                    </>
                )}
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
            option4 = provider.ethereumAligned.diverseExecutionClients && provider.ethereumAligned.diverseBeaconClients
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

    const HeaderButton = ({ id, text }) => {
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
                    <Box color={dataFilter && dataFilter[id] ? "blue" : filterDisabledColor}>
                        <FontAwesomeIcon icon={faFilter} />
                    </Box>
                </Flex>
            </MenuButton>
        )
    }

    const HeaderMenuName = ({ isOpen }) => {
        // Keep the focus on the input when typing
        useEffect(() => {
            if (nameInputRef.current) {
                nameInputRef.current.focus()
            }
        }, [isOpen])

        const updateNameFilter = (e) => {
            if (e.target.value === "") {
                setDataFilter(
                    ((newDataFilter) => {
                        delete newDataFilter.name
                        return newDataFilter
                    })({ ...dataFilter })
                )
            } else {
                setDataFilter({ ...dataFilter, name: e.target.value })
            }
        }

        return (
            <MenuList p={0} overflow={"hidden"}>
                <InputGroup borderRadius="lg">
                    <Input ref={nameInputRef} onChange={updateNameFilter} border={0} placeholder="Search names..." value={dataFilter?.name} />
                    {dataFilter?.name && (
                        <InputRightElement>
                            <IconButton
                                icon={<FontAwesomeIcon icon={faTimesCircle} size="sm" />}
                                variant="ghost"
                                borderRadius={8}
                                onClick={() => {
                                    let newDataFilter = { ...dataFilter }
                                    delete newDataFilter.name
                                    setDataFilter(newDataFilter)
                                }}
                                aria-label="Clear search"
                            />
                        </InputRightElement>
                    )}
                </InputGroup>
            </MenuList>
        )
    }

    const headerMenuCheckboxValues = [
        {
            id: "type",
            options: [
                { value: "dedicated", text: "Dedicated", color: "green", icon: faServer },
                { value: "pooled", text: "Pooled", color: "blue", icon: faUsers },
                { value: "lst", text: "LST", color: "gold", icon: faCoins },
            ],
        },
    ]
    const HeaderMenuCheckbox = ({ id }) => {
        const updateFilter = (values) => {
            if (values.length === 0) {
                setDataFilter(
                    ((newDataFilter) => {
                        delete newDataFilter[id]
                        return newDataFilter
                    })({ ...dataFilter })
                )
            } else {
                setDataFilter({ ...dataFilter, [id]: values })
            }
        }

        return (
            <MenuList minWidth={1}>
                <MenuOptionGroup defaultValue={dataFilter[id]} type="checkbox" onChange={updateFilter}>
                    {headerMenuCheckboxValues
                        .find((obj) => obj.id === id)
                        ?.options.map((option) => (
                            <MenuItemOption
                                value={option.value}
                                color={option.color}
                                fontSize={"lg"}
                                isChecked={dataFilter[id] && Array.isArray(dataFilter[id]) && dataFilter[id].includes(option.value)}
                            >
                                <Flex gap={2}>
                                    <Box width={6}>
                                        <FontAwesomeIcon icon={option.icon} />
                                    </Box>
                                    <Text>{option.text}</Text>
                                </Flex>
                            </MenuItemOption>
                        ))}
                </MenuOptionGroup>
                <Box
                    onClick={() => {
                        setDataFilter(
                            ((newDataFilter) => {
                                delete newDataFilter[id]
                                return newDataFilter
                            })({ ...dataFilter })
                        )
                    }}
                >
                    Clear filters
                </Box>
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

    const ClearFiltersButton = () => {
        return (
            <>
                {dataFilter && Object.keys(dataFilter).length > 0 ? (
                    <Tooltip gutter={4} label="Clear filters" openDelay={300}>
                        <IconButton
                            color="blue"
                            variant="ghost"
                            aria-label="Clear filters"
                            size="sm"
                            icon={<FontAwesomeIcon icon={faFilterCircleXmark} />}
                            onClick={() => {
                                setDataFilter({})
                            }}
                        ></IconButton>
                    </Tooltip>
                ) : (
                    <></>
                )}
            </>
        )
    }

    return (
        <Box mt={10} mb={50} width={"100%"} maxW={"1216px"} px={{ base: 0, lg: 20 }}>
            <TableContainer>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th>
                                <ClearFiltersButton />
                            </Th>
                            <Th textAlign={"start"}>
                                <Menu placement="right" variant={"DataTableHeader"} gutter={2} initialFocusRef={nameInputRef}>
                                    {({ isOpen }) => (
                                        <>
                                            <Box ml={"-10px"}>
                                                <HeaderButton id="name" text="NAME" />
                                            </Box>
                                            <HeaderMenuName isOpen={isOpen} />
                                        </>
                                    )}
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="type" text="TYPE" />
                                    <HeaderMenuCheckbox id="type" />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="fee" text="FEE" />
                                    <HeaderMenuCheckbox id="fee" />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="minStake" text="MIN STAKE" />
                                    <HeaderMenuCheckbox id="minStake" />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="validatorKey" text="VALIDATOR <br /> KEY OWNER" />
                                    <HeaderMenuCheckbox id="validatorKey" />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="withdrawalKey" text="WITHDRAWAL <br /> KEY OWNER" />
                                    <HeaderMenuCheckbox id="withdrawalKey" />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="security" text="SECURITY" />
                                    <HeaderMenuSecurity />
                                </Menu>
                            </Th>
                            <Th>
                                <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                    <HeaderButton id="ethereumAligned" text="ETHEREUM <br /> ALIGNED" />
                                    <HeaderMenuCheckbox id="ethereumAligned" />
                                </Menu>
                            </Th>
                            <Th>
                                <ClearFiltersButton />
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stakingProviders.map((provider, providerIndex) => (
                            <Tr key={provider.id} borderBottomWidth={1} h={14}>
                                <Td w={12} minW={12}>
                                    <Image objectFit="contain" boxSize={8} src={provider.logo} alt={"Lido Logo"} borderRadius={"100%"} />
                                </Td>
                                <Td fontWeight={"extrabold"} w={"15%"}>
                                    {provider.name}
                                </Td>
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
