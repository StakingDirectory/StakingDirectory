import React, { useRef, useEffect, useState } from "react"

import AddProviderButton from "../AddProviderButton"

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
    Menu,
    Text,
    Collapse,
    Tooltip,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowDownShortWide, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import DataRowMenuButton from "./DataRowMenuButton"
import HeaderButton from "./TableHeaders/HeaderButton"
import HeaderMenuCheckbox from "./TableHeaders/HeaderMenuCheckbox"
import HeaderMenuType from "./TableHeaders/HeaderMenuType"
import HeaderMenuNameSearch from "./TableHeaders/HeaderMenuNameSearch"
import HeaderTextOnly from "./TableHeaders/HeaderTextOnly"

import MainnetLaunchDate from "./TableCells/MainnetLaunchDate"
import StakeFromHome from "./TableCells/StakeFromHome"
import ChecklistBar from "./TableCells/ChecklistBar"
import StakingType from "./TableCells/StakingType"
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
        <Box mt={0} mb={20} maxW={"100vw"} overflowX={"auto"}>
            <Table variant="DataTable">
                <Thead>
                    <Tr borderBottomWidth={1}>
                        <Th w={"32px"} px={0}>
                            <ClearFiltersButton dataFilter={dataFilter} setDataFilter={setDataFilter} />
                        </Th>
                        <Th minW={"32px"} px={0}>
                            <Popover placement="top" trigger="hover" gutter={5}>
                                <PopoverTrigger>
                                    <Flex
                                        justifyContent={"center"}
                                        py={1}
                                        mb={1}
                                        borderWidth={"3px"}
                                        borderRadius={"10px"}
                                        className={"borderColor"}
                                        cursor={"help"}
                                        h={"40px"}
                                    >
                                        <FontAwesomeIcon icon={faArrowDownShortWide} size="2xl" />
                                    </Flex>
                                </PopoverTrigger>
                                <PopoverContent px={6} py={4} w={"fit-content"} maxW={"100vw"}>
                                    <Flex direction={"column"} alignItems={"start"} gap={3}>
                                        <Text fontWeight={"extrabold"} fontSize={"lg"} pb={2}>
                                            How is the list ordered?
                                        </Text>
                                        <Flex alignItems={"start"}>
                                            <Text minW={6} fontWeight={"extrabold"} textAlign={"start"}>
                                                1.
                                            </Text>
                                            <Text textAlign={"left"}>
                                                First, by the staking type &nbsp;(
                                                <Box as="span" color={"green"}>
                                                    Solo
                                                </Box>
                                                , &nbsp;
                                                <Box as="span" color={"blue"}>
                                                    Pooled
                                                </Box>
                                                , &nbsp;
                                                <Box as="span" color={"red"}>
                                                    Managed
                                                </Box>
                                                , &nbsp;
                                                <Box as="span" color={"gold"}>
                                                    LST
                                                </Box>
                                                &nbsp;then&nbsp;
                                                <Box as="span" color={"orange"}>
                                                    LST Index
                                                </Box>
                                                )
                                            </Text>
                                        </Flex>
                                        <Flex alignItems={"start"}>
                                            <Text minW={6} fontWeight={"extrabold"} textAlign={"start"}>
                                                2.
                                            </Text>
                                            <Text textAlign={"left"}>Then, by the number of research links that are available</Text>
                                        </Flex>
                                        <Flex alignItems={"start"}>
                                            <Text minW={6} fontWeight={"extrabold"} textAlign={"start"}>
                                                3.
                                            </Text>
                                            <Text textAlign={"left"}>Then, by the mainnet launch date</Text>
                                        </Flex>
                                        <Flex alignItems={"start"}>
                                            <Text minW={6} fontWeight={"extrabold"} textAlign={"start"}>
                                                4.
                                            </Text>
                                            <Text textAlign={"left"}>Then, if all the previous steps are identical, they are ordered by name</Text>
                                        </Flex>
                                    </Flex>
                                </PopoverContent>
                            </Popover>
                        </Th>
                        {dataProps.map((headerValue) => {
                            if (headerValue.isTableHeader) {
                                if ((headerValue.id == "mainnetLaunch" || headerValue.id == "reward") && status == "dev") {
                                    return null
                                } else if (headerValue.type == "text") {
                                    return (
                                        <Th key={headerValue.id} textAlign={"start"}>
                                            <HeaderMenuNameSearch nameInputRef={nameInputRef} dataFilter={dataFilter} setDataFilter={setDataFilter} />
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
                                                <HeaderTextOnly text={headerValue.headerText} />
                                            </Menu>
                                        </Th>
                                    )
                                }
                            }
                        })}
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
                                                src={provider.logo?.src ? provider.logo?.src : "./StakingDirectoryLogo.svg"}
                                                alt={provider.logo?.alt ? provider.logo?.alt : "Staking Directory Logo"}
                                                borderRadius={"100%"}
                                            />
                                        </Td>
                                        <Td>
                                            <Text fontSize="lg" fontWeight="extrabold" maxW={"220px"} title={provider.name} isTruncated>
                                                {provider.name}
                                            </Text>
                                        </Td>
                                        <Td textAlign={"center"}>
                                            <StakeFromHome provider={provider} />
                                        </Td>
                                        <Td textAlign={"center"}>
                                            <StakingType provider={provider} />
                                        </Td>
                                        {provider.status == "active" && (
                                            <Td textAlign={"center"}>
                                                <Reward provider={provider} />
                                            </Td>
                                        )}
                                        <Td textAlign={"center"}>
                                            <Fee provider={provider} />
                                        </Td>
                                        <Td textAlign={"center"} fontWeight={"bold"}>
                                            {provider.minStake?.type == "anyAmount" ? "Any amount" : `${provider.minStake?.value} ETH`}
                                        </Td>
                                        {provider.status == "active" && (
                                            <Td textAlign={"center"} fontWeight={"bold"}>
                                                <MainnetLaunchDate provider={provider} />
                                            </Td>
                                        )}
                                        <Td>
                                            <ChecklistBar provider={provider} />
                                        </Td>
                                        <Td>
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
                                                        expandedRows={expandedRows}
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
            {stakingProviders && stakingProviders.filter((provider) => provider.status === status).length === 0 && (
                <Flex justifyContent={"center"} mt={3}>
                    <Flex
                        direction={"column"}
                        w={"fit-content"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        px={3}
                        pb={3}
                        pt={1}
                        className={"NoResultsBox"}
                    >
                        <Text fontSize={"3xl"}>🔍</Text>
                        <Text fontWeight={"bold"}>
                            {stakingProviders.filter((provider) => provider.status === "active").length}{" "}
                            <Box as={"span"} color={"green"}>
                                active
                            </Box>{" "}
                            providers
                        </Text>
                        <Text fontWeight={"bold"}>
                            {stakingProviders.filter((provider) => provider.status === "dev").length}{" "}
                            <Box as={"span"} color={"blue"}>
                                in development
                            </Box>{" "}
                            providers
                        </Text>

                        {stakingProviders.length == 0 && (
                            <Flex direction={"column"} alignItems={"center"} pt={5}>
                                <Text fontWeight={"bold"}>Please try a different filter</Text>
                                <Text fontWeight={"bold"}>or</Text>
                                <Box pt={2}>
                                    <AddProviderButton />
                                </Box>
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
        </Box>
    )
}
