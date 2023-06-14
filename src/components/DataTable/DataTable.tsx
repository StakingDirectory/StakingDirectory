import React, { useRef, useEffect, useState } from "react"

import {
    Flex,
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

import DataRowMenuButton from "./DataRowMenuButton"
import HeaderButton from "./HeaderButton"
import StatusCircle from "./StatusCircle"
import StakingType from "./StakingType"
import ProviderType from "./ProviderType"
import WithdrawalKeyOwner from "./WithdrawalKeyOwner"
import ValidatorKeyOwner from "./ValidatorKeyOwner"
import HeaderMenuCheckbox from "./HeaderMenuCheckbox"
import HeaderMenuNameSearch from "./HeaderMenuNameSearch"
import ClearFiltersButton from "./ClearFiltersButton"

import {
    faCoins,
    faUsers,
    faServer,
    faCode,
    faUserAstronaut,
    faBuilding,
    faMagnifyingGlass,
    faBookOpen,
    faShield,
    faBug,
    faVolumeHigh,
    faShapes,
    faLockOpen,
    faListUl,
    faCloud,
    faDesktop,
    faShoppingBasket,
} from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")

    const headerValues = [
        { type: "checkbox", id: "stakingType", text: "STAKING <br /> TYPE" },
        { type: "checkbox", id: "providerType", text: "PROVIDER <br /> TYPE" },
        { type: "checkbox", id: "fee", text: "FEE" },
        { type: "checkbox", id: "minStake", text: "MIN STAKE" },
        { type: "checkbox", id: "validatorKey", text: "VALIDATOR <br /> KEY OWNER" },
        { type: "checkbox", id: "withdrawalKey", text: "WITHDRAWAL <br /> KEY OWNER" },
        { type: "checkbox", id: "security", text: "SECURITY" },
        { type: "checkbox", id: "ethereumAligned", text: "ETHEREUM <br /> ALIGNED" },
    ]

    const headerMenuValues = [
        {
            id: "stakingType",
            name: "Staking Type",
            options: [
                { value: "dedicated", text: "Dedicated", color: "green", icon: faServer },
                { value: "pooled", text: "Pooled", color: "blue", icon: faUsers },
                { value: "lst", text: "LST", color: "gold", icon: faCoins },
            ],
        },
        {
            id: "providerType",
            name: "Provider Type",
            options: [
                { value: "hardware", text: "Hardware", color: "", icon: faDesktop },
                { value: "software", text: "Software", color: "", icon: faCode },
                { value: "cloud", text: "Cloud", color: "", icon: faCloud },
                { value: "lst", text: "LST", color: "", icon: faCoins },
                { value: "indexToken", text: "LST index", color: "", icon: faShoppingBasket },
            ],
        },
        {
            id: "validatorKey",
            name: "Validator Key Owner",
            options: [
                { value: "user", text: "User owned", color: "", icon: faUserAstronaut },
                { value: "service", text: "Service owned", color: "", icon: faBuilding },
            ],
        },
        {
            id: "withdrawalKey",
            name: "Withdrawal Key Owner",
            options: [
                { value: "user", text: "User owned", color: "", icon: faUserAstronaut },
                { value: "smartContract", text: "Smart contract", color: "", icon: faCode },
            ],
        },
        {
            id: "security",
            name: "Security",
            options: [
                { value: "openSource", text: "Open source", color: "", icon: faBookOpen },
                { value: "battleTested", text: "Battle tested", color: "", icon: faShield },
                { value: "bugBounty", text: "Bug bounty", color: "", icon: faBug },
                { value: "audited", text: "Audited", color: "", icon: faMagnifyingGlass },
            ],
        },
        {
            id: "ethereumAligned",
            name: "Ethereum Aligned",
            options: [
                { value: "nonCensoringRelays", text: "Censorship resistance", color: "", icon: faVolumeHigh },
                { value: "diverseExecutionClients", text: "Diverse EL clients", color: "", icon: faShapes },
                { value: "diverseBeaconClients", text: "Diverse BN clients", color: "", icon: faListUl },
                { value: "permissionlessOperators", text: "Permissionless operators", color: "", icon: faLockOpen },
                { value: "permissionlessUsage", text: "Permissionless usage", color: "", icon: faUsers },
            ],
        },
    ]

    const ActiveFilters = () => {
        const activeFilters = Object.keys(dataFilter).map((activeFilter) => {
            return (
                <Flex px={2} key={activeFilter} color="blue">
                    <Text>{activeFilter}</Text>
                    <Flex color="yellow">
                        {Array.isArray(Object.values(dataFilter[activeFilter])) ? (
                            <Flex>
                                {Object.values(dataFilter[activeFilter]).map((filterOption: String, index) => (
                                    <Box px={1} key={index}>
                                        {filterOption}
                                    </Box>
                                ))}
                            </Flex>
                        ) : (
                            <Box px={2}>{dataFilter[activeFilter]}</Box>
                        )}
                    </Flex>
                </Flex>
            )
        })

        return <Flex>Active Filters: {activeFilters}</Flex>
    }

    return (
        <Box mt={200} mb={"2000px"} width={"100%"} maxW={"1216px"}>
            <TableContainer>
                <ActiveFilters />
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th>
                                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            </Th>
                            <Th textAlign={"start"}>
                                <Menu placement="top" variant={"DataTableHeader"} gutter={2} initialFocusRef={nameInputRef}>
                                    {({ isOpen }) => (
                                        <>
                                            <Box ml={"-10px"}>
                                                <HeaderButton
                                                    dataFilter={dataFilter}
                                                    id="name"
                                                    text="NAME"
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                            </Box>
                                            <HeaderMenuNameSearch
                                                isOpen={isOpen}
                                                nameInputRef={nameInputRef}
                                                dataFilter={dataFilter}
                                                setDataFilter={setDataFilter}
                                            />
                                        </>
                                    )}
                                </Menu>
                            </Th>
                            {headerValues.map((headerValue) => (
                                <Th key={headerValue.id}>
                                    <Menu placement="top" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                        {headerMenuValues.some((menuValue) => menuValue.id === headerValue.id) ? (
                                            <HeaderButton
                                                dataFilter={dataFilter}
                                                id={headerValue.id}
                                                text={headerValue.text}
                                                filterDisabledColor={filterDisabledColor}
                                            />
                                        ) : (
                                            <Box pb={"10px"}>{headerValue.text}</Box>
                                        )}
                                        <HeaderMenuCheckbox
                                            id={headerValue.id}
                                            headerMenuValues={headerMenuValues}
                                            dataFilter={dataFilter}
                                            setDataFilter={setDataFilter}
                                        />
                                    </Menu>
                                </Th>
                            ))}
                            <Th>
                                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stakingProviders.map((provider, providerIndex) => (
                            <Tr key={provider.id} borderBottomWidth={1} h={14}>
                                <Td w={12} minW={12}>
                                    <Image objectFit="contain" boxSize={8} src={provider.logo.src} alt={provider.logo.alt} borderRadius={"100%"} />
                                </Td>
                                <Td fontWeight={"extrabold"} w={"15%"}>
                                    {provider.name}
                                </Td>
                                <Td textAlign={"center"}>
                                    <StakingType provider={provider} />
                                </Td>
                                <Td textAlign={"center"}>
                                    <ProviderType provider={provider} />
                                </Td>
                                <Td textAlign={"center"}>
                                    {provider.fee.value}
                                    {provider.fee.type == "rewardPercentage" ? "%" : ""}
                                </Td>
                                <Td textAlign={"center"}>
                                    {provider.minStake.value}
                                    {provider.minStake.type == "eth" ? " ETH" : ""}
                                </Td>
                                <Td>
                                    <ValidatorKeyOwner provider={provider} />
                                </Td>
                                <Td>
                                    <WithdrawalKeyOwner provider={provider} />
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
