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

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter, headerValues }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.2)")

    return (
        <Box mt={0} mb={"2000px"} width={"100%"} maxW={"1216px"}>
            <TableContainer>
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
                                        {headerValue.type == "checkbox" ? (
                                            <HeaderButton
                                                dataFilter={dataFilter}
                                                id={headerValue.id}
                                                text={headerValue.headerText}
                                                filterDisabledColor={filterDisabledColor}
                                            />
                                        ) : (
                                            <Box pb={"10px"}>{headerValue.headerText}</Box>
                                        )}
                                        <HeaderMenuCheckbox
                                            id={headerValue.id}
                                            headerValues={headerValues}
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
