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
import ProviderType from "./ProviderType"
import WithdrawalKeyOwner from "./WithdrawalKeyOwner"
import ValidatorKeyOwner from "./ValidatorKeyOwner"
import HeaderMenuCheckbox from "./HeaderMenuCheckbox"
import HeaderMenuNameSearch from "./HeaderMenuNameSearch"
import ClearFiltersButton from "./ClearFiltersButton"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.1)", "rgba(255, 255, 255, 0.1)")

    const headerValues = [
        { type: "checkbox", id: "type", text: "TYPE" },
        { type: "checkbox", id: "fee", text: "FEE" },
        { type: "checkbox", id: "minStake", text: "MIN STAKE" },
        { type: "checkbox", id: "validatorKey", text: "VALIDATOR <br /> KEY OWNER" },
        { type: "checkbox", id: "withdrawalKey", text: "WITHDRAWAL <br /> KEY OWNER" },
        { type: "checkbox", id: "security", text: "SECURITY" },
        { type: "checkbox", id: "ethereumAligned", text: "ETHEREUM <br /> ALIGNED" },
    ]

    return (
        <Box mt={10} mb={50} width={"100%"} maxW={"1216px"} px={{ base: 0, lg: 20 }}>
            <TableContainer>
                <Table variant="DataTable">
                    <Thead>
                        <Tr borderBottomWidth={1}>
                            <Th>
                                <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            </Th>
                            <Th textAlign={"start"}>
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
                            {headerValues.map((headerValue) => (
                                <Th key={headerValue.id}>
                                    <Menu variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                        <HeaderButton
                                            dataFilter={dataFilter}
                                            id={headerValue.id}
                                            text={headerValue.text}
                                            filterDisabledColor={filterDisabledColor}
                                        />
                                        <HeaderMenuCheckbox id={headerValue.id} dataFilter={dataFilter} setDataFilter={setDataFilter} />
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
