import React, { useRef, useEffect, useState } from "react"

import { Flex, Box, Image, useColorModeValue, Table, Thead, Tbody, Tr, Th, Td, Menu, Text, Link, Collapse, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDownShortWide, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import DataRowMenuButton from "./DataRowMenuButton"
import HeaderButton from "./TableHeaders/HeaderButton"
import HeaderMenuCheckbox from "./TableHeaders/HeaderMenuCheckbox"
import HeaderMenuType from "./TableHeaders/HeaderMenuType"
import HeaderMenuNameSearch from "./TableHeaders/HeaderMenuNameSearch"
import HeaderMenuPlaceholder from "./TableHeaders/HeaderMenuPlaceholder"

import StakeFromHome from "./TableCells/StakeFromHome"
import ChecklistBar from "./TableCells/ChecklistBar"
import StakingType from "./TableCells/StakingType"
import ProviderType from "./TableCells/ProviderType"
import Reward from "./TableCells/Reward"
import Fee from "./TableCells/Fee"

import ClearFiltersButton from "./ClearFiltersButton"
import ExpandedRow from "./ExpandedRow"

import dataProps from "public/data/dataProps"

export default function DataTable({ stakingProviders, status, dataFilter, setDataFilter }) {
    const isSSR = typeof window === "undefined"
    const nameInputRef = useRef<HTMLInputElement>(null)
    const filterDisabledColor = useColorModeValue("rgba(0, 0, 0, 0.2)", "rgba(255, 255, 255, 0.2)")

    const [hasMounted, setHasMounted] = useState(false)
    useEffect(() => {
        setHasMounted(true)
    }, [])

    const [expandedRows, setExpandedRows] = useState([])
    const [expandedChecklistRows, setExpandedChecklistRows] = useState([])

    // If filter is changed, close all expanded rows
    useEffect(() => {
        setExpandedRows([])
    }, [dataFilter])

    const expandRow = (index) => {
        const indexPosition = expandedRows.indexOf(index)
        const newExpandedRows = [...expandedRows]

        if (indexPosition !== -1) {
            newExpandedRows.splice(indexPosition, 1)
        } else {
            newExpandedRows.push(index)
        }
        setExpandedRows(newExpandedRows)
    }

    return (
        <Box mt={0} mb={20} maxW={"100vw"} overflow={"scroll"}>
            <Table variant="DataTable">
                <Thead>
                    <Tr borderBottomWidth={1}>
                        <Th w={"32px"} px={0}>
                            <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                        </Th>
                        <Th minW={"32px"} px={0}>
                            <Tooltip
                                placement={"right"}
                                gutter={0}
                                label={
                                    <Box className={"tooltipLabel"} p={6}>
                                        <Flex direction={"column"} alignItems={"start"} gap={2}>
                                            <Text fontWeight={"extrabold"} fontSize={"lg"}>
                                                How is the table ordered?
                                            </Text>
                                            <Flex>
                                                <Text w={5} fontWeight={"extrabold"} textAlign={"start"}>
                                                    1.
                                                </Text>

                                                <Text>First, by the number of checklist items that are&nbsp;</Text>
                                                <Box color={"green"}>green</Box>
                                            </Flex>
                                            <Flex>
                                                <Text w={5} fontWeight={"extrabold"} textAlign={"start"}>
                                                    2.
                                                </Text>
                                                Then, by the staking type &nbsp;(
                                                <Box color={"green"}>Solo</Box>, &nbsp;
                                                <Box color={"blue"}>Pooled</Box>, &nbsp;<Box color={"gold"}>LST</Box>&nbsp;or&nbsp;
                                                <Box color={"orange"}>LST Index</Box>)
                                            </Flex>
                                            <Flex>
                                                <Text w={5} fontWeight={"extrabold"} textAlign={"start"}>
                                                    3.
                                                </Text>

                                                <Text>Then, by the provider type (Hardware, Software or SAAS)</Text>
                                            </Flex>
                                            <Flex>
                                                <Text w={5} fontWeight={"extrabold"} textAlign={"start"}>
                                                    4.
                                                </Text>

                                                <Text>Finally, if all the previous steps are identical, order by name</Text>
                                            </Flex>
                                        </Flex>
                                    </Box>
                                }
                                className="tooltipArrow"
                                hasArrow={true}
                            >
                                <Box pb={2}>
                                    <FontAwesomeIcon icon={faArrowDownShortWide} size="2xl" />
                                </Box>
                            </Tooltip>
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
                                                <HeaderMenuCheckbox id={headerValue.id} dataFilter={dataFilter} setDataFilter={setDataFilter} />
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
                                                <HeaderMenuType id={headerValue.id} dataFilter={dataFilter} setDataFilter={setDataFilter} />
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
                                                <HeaderMenuPlaceholder id={headerValue.id} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                                            </Menu>
                                        </Th>
                                    )
                                }
                            }
                        })}
                        <Th w={"32px"}>
                            {/* TODO: After launch switch this back to the ClearFiltersButton component */}
                            {/* <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} /> */}
                            <Tooltip
                                placement={"top"}
                                gutter={10}
                                label={
                                    <Flex className={"tooltipLabel"} direction={"column"} gap={2}>
                                        <Box fontWeight={"extrabold"} fontSize={"md"}>
                                            Does something need fixing?
                                        </Box>
                                        <Box>🏆 Let us know and get a POAP 🏆</Box>
                                    </Flex>
                                }
                                className="tooltipArrow"
                                hasArrow={true}
                            >
                                <Text fontWeight={"extrabold"} fontSize={"sm"} pb={2} cursor={"default"} color={"blue"}>
                                    COMMUNITY REVIEW PHASE
                                </Text>
                            </Tooltip>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {stakingProviders.map(
                        (provider, index) =>
                            provider.status == status && (
                                <React.Fragment key={provider.id}>
                                    <Tr
                                        key={provider.id}
                                        borderBottom={expandedRows.includes(index) ? "0" : "1px solid"}
                                        h={14}
                                        borderColor={expandedRows.includes(index) ? "transparent" : ""}
                                        onClick={() => {
                                            // Add a slight delay so if a tooltip is
                                            // showing it's removed before expanding row
                                            setTimeout(() => {
                                                expandRow(index)
                                            }, 10)
                                        }}
                                        cursor={"pointer"}
                                        className={provider.status == "dev" ? "devTableRow" : ""}
                                    >
                                        <Td>
                                            <Box
                                                as={FontAwesomeIcon}
                                                icon={faChevronRight}
                                                transition="all 0.2s"
                                                transform={`rotate(${expandedRows.includes(index) ? 90 : 0}deg)`}
                                            />
                                        </Td>
                                        <Td>
                                            <Image
                                                objectFit="contain"
                                                minW={8}
                                                maxW={8}
                                                src={provider.logo.src}
                                                alt={provider.logo.alt}
                                                borderRadius={"100%"}
                                            />
                                        </Td>
                                        <Td maxW={160}>
                                            <Text fontSize="lg" fontWeight="extrabold" isTruncated>
                                                {provider.name}
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
                                            <Reward provider={provider} />
                                        </Td>
                                        <Td textAlign={"center"}>
                                            <Fee provider={provider} />
                                        </Td>
                                        <Td textAlign={"center"} fontWeight={"bold"}>
                                            {provider.minStake.value}
                                            {provider.minStake.type == "eth" ? " ETH" : ""}
                                        </Td>
                                        <Td>
                                            <ChecklistBar
                                                provider={provider}
                                                tableRowIndex={index}
                                                expandedRows={expandedRows}
                                                setExpandedChecklistRows={setExpandedChecklistRows}
                                            />
                                        </Td>
                                        <Td w={5}>
                                            <DataRowMenuButton provider={provider} />
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
                                                    <ExpandedRow
                                                        provider={provider}
                                                        expandedChecklistRows={expandedChecklistRows}
                                                        setExpandedChecklistRows={setExpandedChecklistRows}
                                                    />
                                                </Collapse>
                                            </Td>
                                        </Tr>
                                    )}
                                </React.Fragment>
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
