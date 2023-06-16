import React, { useRef, useEffect, useState } from "react"

import { Flex, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Menu, Text } from "@chakra-ui/react"

import DataRowMenuButton from "./DataRowMenuButton"
import HeaderButton from "./HeaderButton"
import StatusCircle from "./StatusCircle"
import StakingType from "./StakingType"
import ProviderType from "./ProviderType"
import WithdrawalKeyOwner from "./WithdrawalKeyOwner"
import ValidatorKeyOwner from "./ValidatorKeyOwner"
import HeaderMenuCheckbox from "./HeaderMenuCheckbox"
import HeaderMenuType from "./HeaderMenuType"
import HeaderMenuNameSearch from "./HeaderMenuNameSearch"
import ClearFiltersButton from "./ClearFiltersButton"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter, headerValues }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.2)")

    return (
        <Box mt={0} mb={"500px"} maxW={"100%"}>
            <TableContainer maxW={"1400px"}>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th w={"32px"}>
                                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            </Th>
                            {headerValues.map((headerValue) => {
                                if (headerValue.type == "text") {
                                    return (
                                        <Th minW={250} key={headerValue.id} textAlign={"start"}>
                                            <Menu placement="right" variant={"DataTableHeader"} gutter={2} initialFocusRef={nameInputRef}>
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
                                    )
                                } else if (headerValue.type == "checkbox") {
                                    return (
                                        <Th minW={120} key={headerValue.id}>
                                            <Menu placement="right" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButton
                                                    dataFilter={dataFilter}
                                                    id={headerValue.id}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuCheckbox
                                                    id={headerValue.id}
                                                    headerValues={headerValues}
                                                    dataFilter={dataFilter}
                                                    setDataFilter={setDataFilter}
                                                />
                                            </Menu>
                                        </Th>
                                    )
                                } else if (headerValue.type == "checkboxType") {
                                    return (
                                        <Th minW={120} key={headerValue.id}>
                                            <Menu placement="bottom" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButton
                                                    dataFilter={dataFilter}
                                                    id={headerValue.id}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuType
                                                    id={headerValue.id}
                                                    headerValues={headerValues}
                                                    dataFilter={dataFilter}
                                                    setDataFilter={setDataFilter}
                                                />
                                            </Menu>
                                        </Th>
                                    )
                                } else if (headerValue.type == "other") {
                                    return (
                                        <Th minW={110} key={headerValue.id}>
                                            <Box pb={"10px"}>{headerValue.headerText}</Box>
                                        </Th>
                                    )
                                }
                            })}

                            <Th w={"32px"}>
                                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {stakingProviders.map((provider, providerIndex) => (
                            <Tr key={provider.id} borderBottomWidth={1} h={14}>
                                <Td>
                                    <Image objectFit="contain" boxSize={8} src={provider.logo.src} alt={provider.logo.alt} borderRadius={"100%"} />
                                </Td>
                                <Td maxW={160}>
                                    <Text fontSize="lg" fontWeight="extrabold" isTruncated>
                                        {provider.name}
                                    </Text>
                                </Td>
                                <Td textAlign={"center"}>
                                    <StakingType provider={provider} />
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
                {stakingProviders && stakingProviders.length === 0 && (
                    <Flex direction={"column"} justifyContent={"center"} alignItems={"center"} py={2}>
                        <Text fontSize={"3xl"}>😭</Text>
                        <Text fontWeight={"bold"}>No results found</Text>
                        <Text fontWeight={"bold"}>Please try a different filter</Text>
                    </Flex>
                )}
            </TableContainer>
        </Box>
    )
}
