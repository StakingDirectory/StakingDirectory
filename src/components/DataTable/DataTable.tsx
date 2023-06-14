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
import WithdrawalKeyOwner from "./WithdrawalKeyOwner"
import ValidatorKeyOwner from "./ValidatorKeyOwner"
import HeaderMenuCheckbox from "./HeaderMenuCheckbox"
import HeaderMenuNameSearch from "./HeaderMenuNameSearch"
import ClearFiltersButton from "./ClearFiltersButton"

import { faCoins, faUsers, faServer, faCode, faUserAstronaut, faBuilding } from "@fortawesome/free-solid-svg-icons"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")

    const headerValues = [
        { type: "checkbox", id: "stakingType", text: "STAKING <br /> TYPE" },
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
            id: "validatorKey",
            name: "Validator Key Owner",
            options: [
                { value: "user", text: "User Controlled", color: "", icon: faUserAstronaut },
                { value: "service", text: "Service Controlled", color: "", icon: faBuilding },
            ],
        },
        {
            id: "withdrawalKey",
            name: "Withdrawal Key Owner",
            options: [
                { value: "user", text: "User Owned", color: "", icon: faUserAstronaut },
                { value: "smartContract", text: "Smart Contract Controlled", color: "", icon: faCode },
            ],
        },
        {
            id: "security",
            name: "Security",
            options: [
                { value: "openSource", text: "Open Source", color: "green", icon: faServer },
                { value: "audited", text: "Audited", color: "blue", icon: faUsers },
                { value: "bugBounty", text: "Bug Bounty", color: "gold", icon: faCoins },
                { value: "battleTested", text: "Battle Tested", color: "gold", icon: faCoins },
            ],
        },
        {
            id: "ethereumAligned",
            name: "Ethereum Aligned",
            options: [
                { value: "nonCensoringRelays", text: "Censorship Resistance", color: "green", icon: faServer },
                { value: "permissionlessUsage", text: "Permissionless Usage", color: "blue", icon: faUsers },
                { value: "permissionlessOperators", text: "Permissionless Operators", color: "gold", icon: faCoins },
                { value: "diverseClients", text: "Diverse Clients", color: "gold", icon: faCoins },
            ],
        },
    ]

    const ActiveFilters = () => {
        const ActiveFilterOptions = (activeFilterOptions) => {
            if (Array.isArray(Object.values(activeFilterOptions))) {
                return (
                    <Box>
                        {Object.values(activeFilterOptions).map((filterOption: String, index) => (
                            <Box key={index}>{filterOption}</Box>
                        ))}
                    </Box>
                )
            } else {
                return <Box>{activeFilterOptions}</Box>
            }
        }

        const activeFilters = Object.keys(dataFilter).map((activeFilter) => {
            return (
                <Box key={activeFilter} color="blue">
                    {activeFilter}
                    <Box color="yellow">
                        <ActiveFilterOptions activeFilterOptions={dataFilter[activeFilter]} />
                    </Box>
                </Box>
            )
        })

        return <Box>Active Filters: {activeFilters}</Box>
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
                                        <HeaderButton
                                            dataFilter={dataFilter}
                                            id={headerValue.id}
                                            text={headerValue.text}
                                            filterDisabledColor={filterDisabledColor}
                                        />
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
