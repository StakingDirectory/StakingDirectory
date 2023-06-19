import React, { useRef, useEffect, useState } from "react"

import { Flex, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Menu, Text, Link } from "@chakra-ui/react"
import NextLink from "next/link"

import DataRowMenuButton from "./DataRowMenuButton"
import HeaderButton from "./HeaderButton"
import HeaderButtonKeyOwner from "./HeaderButtonKeyOwner"
import StatusCircle from "./StatusCircle"
import StakingType from "./StakingType"
import ProviderType from "./ProviderType"
import KeyOwner from "./KeyOwner"
import RewardFee from "./RewardFee"
import StakeFromHome from "./StakeFromHome"
import HeaderMenuCheckbox from "./HeaderMenuCheckbox"
import HeaderMenuType from "./HeaderMenuType"
import HeaderMenuKeyOwner from "./HeaderMenuKeyOwner"
import HeaderMenuNameSearch from "./HeaderMenuNameSearch"
import HeaderMenuPlaceholder from "./HeaderMenuPlaceholder"
import ClearFiltersButton from "./ClearFiltersButton"

import dataProps from "public/data/dataProps"

export default function DataTable({ windowSize, environment, stakingProviders, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.2)")

    const [isSticky, setSticky] = useState(false)
    const tableRef = useRef(null)
    const handleScroll = () => {
        if (!tableRef.current) return
        const rect = tableRef.current.getBoundingClientRect()
        setSticky(rect.top < 0 && rect.bottom > 0)
    }
    useEffect(() => {
        if (!isSSR) {
            window.addEventListener("scroll", handleScroll)
            return () => window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    // Scroll to top of table when a filter is changed
    useEffect(() => {
        if (dataFilter && isSticky) {
            tableRef.current.scrollIntoView({ behavior: "auto" })
        }
    }, [dataFilter])

    return (
        <Box mt={0} mb={"500px"} maxW={"100%"} ref={tableRef}>
            <Table variant="DataTable">
                <Thead position={isSticky ? "sticky" : "static"} top="0" zIndex="1">
                    <Tr borderBottomWidth={1}>
                        <Th w={"32px"}>
                            <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                        </Th>
                        {dataProps.map((headerValue) => {
                            if (headerValue.isTableHeader) {
                                if (headerValue.type == "text") {
                                    return (
                                        <Th minW={200} key={headerValue.id} textAlign={"start"}>
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
                                            <Menu placement="right-start" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButton
                                                    dataFilter={dataFilter}
                                                    id={headerValue.id}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuCheckbox
                                                    id={headerValue.id}
                                                    dataProps={dataProps}
                                                    dataFilter={dataFilter}
                                                    setDataFilter={setDataFilter}
                                                />
                                            </Menu>
                                        </Th>
                                    )
                                } else if (headerValue.type == "checkboxType") {
                                    return (
                                        <Th minW={120} key={headerValue.id}>
                                            <Menu placement="right-start" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButton
                                                    dataFilter={dataFilter}
                                                    id={headerValue.id}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuType
                                                    id={headerValue.id}
                                                    dataProps={dataProps}
                                                    dataFilter={dataFilter}
                                                    setDataFilter={setDataFilter}
                                                />
                                            </Menu>
                                        </Th>
                                    )
                                } else if (headerValue.type == "checkboxKeyOwner") {
                                    return (
                                        <Th minW={120} key={headerValue.id}>
                                            <Menu placement="right-start" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButtonKeyOwner
                                                    dataFilter={dataFilter}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuKeyOwner dataProps={dataProps} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                                            </Menu>
                                        </Th>
                                    )
                                } else if (headerValue.type == "other") {
                                    return (
                                        <Th minW={110} key={headerValue.id}>
                                            <Menu placement="right-start" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButtonKeyOwner
                                                    dataFilter={dataFilter}
                                                    text={headerValue.headerText}
                                                    filterDisabledColor={filterDisabledColor}
                                                />
                                                <HeaderMenuPlaceholder
                                                    id={headerValue.id}
                                                    dataProps={dataProps}
                                                    dataFilter={dataFilter}
                                                    setDataFilter={setDataFilter}
                                                />
                                            </Menu>
                                        </Th>
                                    )
                                }
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
                                    <Link as={NextLink} href={provider.links.website} target="_blank">
                                        {provider.name}
                                    </Link>
                                </Text>
                            </Td>
                            <Td textAlign={"center"}>
                                <StakeFromHome provider={provider} />
                            </Td>
                            <Td textAlign={"center"}>
                                <StakingType provider={provider} />
                                <ProviderType provider={provider} />
                            </Td>
                            <Td textAlign={"center"}>
                                <RewardFee provider={provider} />
                            </Td>
                            <Td textAlign={"center"}>
                                {provider.minStake.value}
                                {provider.minStake.type == "eth" ? " ETH" : ""}
                            </Td>
                            <Td>
                                <Flex direction="column" gap={"5px"}>
                                    <KeyOwner provider={provider} id={"validatorKey"} />
                                    <KeyOwner provider={provider} id={"withdrawalKey"} />
                                </Flex>
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
        </Box>
    )
}
