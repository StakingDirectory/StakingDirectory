import React, { useRef, useEffect, useState } from "react"

import { Flex, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Menu, Text, Link, Collapse } from "@chakra-ui/react"
import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons"

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

export default function DataTable({ stakingProviders, status, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.2)")

    const [hasMounted, setHasMounted] = React.useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])

    const [expandedRows, setExpandedRows] = useState([])

    // If filter is changed, close all expanded rows
    useEffect(() => {
        setExpandedRows([])
    }, [dataFilter])

    return (
        <Box mt={0} mb={20} maxW={"100vw"} overflow={"scroll"}>
            <Table variant="DataTable">
                <Thead>
                    <Tr borderBottomWidth={1}>
                        <Th w={"32px"}></Th>
                        <Th w={"32px"}>
                            <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                        </Th>
                        {dataProps.map((headerValue) => {
                            if (headerValue.isTableHeader) {
                                if (headerValue.type == "text") {
                                    return (
                                        <Th minW={210} key={headerValue.id} textAlign={"start"}>
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
                                        <Th key={headerValue.id} minW={headerValue.id == "stakeFromHome" ? 140 : ""}>
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
                                        <Th key={headerValue.id}>
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
                                        <Th key={headerValue.id}>
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
                                        <Th key={headerValue.id}>
                                            <Menu placement="right-start" variant={"DataTableHeader"} closeOnSelect={false} gutter={2}>
                                                <HeaderButton
                                                    id={headerValue.id}
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
                    {stakingProviders.map(
                        (provider, index) =>
                            provider.status == status && (
                                <>
                                    <Tr
                                        key={provider.id}
                                        borderBottomWidth={1}
                                        h={14}
                                        borderColor={expandedRows.includes(index) ? "transparent" : ""}
                                    >
                                        <Td
                                            cursor={"pointer"}
                                            onClick={() => {
                                                const indexPosition = expandedRows.indexOf(index)
                                                const newExpandedRows = [...expandedRows]

                                                if (indexPosition !== -1) {
                                                    newExpandedRows.splice(indexPosition, 1)
                                                } else {
                                                    newExpandedRows.push(index)
                                                }
                                                setExpandedRows(newExpandedRows)
                                            }}
                                        >
                                            <Box
                                                as={FontAwesomeIcon}
                                                icon={faChevronRight}
                                                transition="all 0.2s"
                                                transform={`rotate(${expandedRows.includes(index) ? 90 : 0}deg)`}
                                            />
                                        </Td>
                                        <Td>
                                            <Link as={NextLink} href={provider.links.website} target="_blank">
                                                <Image
                                                    objectFit="contain"
                                                    boxSize={8}
                                                    src={provider.logo.src}
                                                    alt={provider.logo.alt}
                                                    borderRadius={"100%"}
                                                />
                                            </Link>
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
                                        <Td textAlign={"center"} fontWeight={"bold"}>
                                            {provider.minStake.value}
                                            {provider.minStake.type == "eth" ? " ETH" : ""}
                                        </Td>
                                        <Td>
                                            <Flex direction="column" gap={"5px"} fontWeight={"bold"}>
                                                <KeyOwner provider={provider} id={"validatorKey"} />
                                                <KeyOwner provider={provider} id={"withdrawalKey"} />
                                            </Flex>
                                        </Td>
                                        <Td>
                                            <StatusCircle provider={provider} column={"technicalIndicators"} />
                                        </Td>
                                        <Td>
                                            <StatusCircle provider={provider} column={"socialIndicators"} />
                                        </Td>
                                        <Td w={5}>
                                            <DataRowMenuButton />
                                        </Td>
                                    </Tr>
                                    {hasMounted && (
                                        <Tr key={provider.id + "-expanded"}>
                                            <Td
                                                className={"expandedTableRow"}
                                                colSpan={999}
                                                borderBottom={expandedRows.includes(index) ? "1px solid" : "0"}
                                            >
                                                <Collapse in={expandedRows.includes(index)}>
                                                    <Box minH={100} py={5}>
                                                        🏗️ Provider description and more info coming soon! 🏗️
                                                    </Box>
                                                </Collapse>
                                            </Td>
                                        </Tr>
                                    )}
                                </>
                            )
                    )}
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
