import React, { useRef, useEffect, useState } from "react"

import { Flex, Text, Box, Button, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons"

export default function ActiveFilters({ dataFilter, setDataFilter, headerValues }) {
    return (
        <Box width={"100%"} maxW={"1216px"} px={2}>
            <Flex gap={2} width={"fit-content"} minH={12} alignItems={"center"} wrap={"wrap"}>
                <Flex color="blue" alignItems={"center"} ml={2} fontWeight={"bold"} fontSize="lg">
                    Active filters
                </Flex>
                {Object.keys(dataFilter).length > 0 ? (
                    Object.keys(dataFilter).map((activeFilter) => {
                        return (
                            <Flex key={activeFilter} className={"bgContent"} borderRadius={30} pl={2} pr={1} minH={10} gap={2}>
                                <Flex px={1} alignItems={"center"} fontWeight={"bold"}>
                                    {headerValues.find((obj) => obj.id === activeFilter).name}
                                </Flex>
                                <Flex wrap={"wrap"}>
                                    {Array.isArray(Object.values(dataFilter[activeFilter])) ? (
                                        <Flex wrap={"wrap"}>
                                            {Object.values(dataFilter[activeFilter]).map((filterOption: String, index) => (
                                                <Button
                                                    key={index}
                                                    variant={"ActiveFilters"}
                                                    border={"1px solid"}
                                                    borderRadius={30}
                                                    px={1}
                                                    mx={1}
                                                    py={0}
                                                    my={"6px"}
                                                    h={8}
                                                    onClick={() => {
                                                        let newFilter = dataFilter
                                                        newFilter[activeFilter] = newFilter[activeFilter].filter((option) => option !== filterOption)
                                                        if (newFilter[activeFilter].length === 0) delete newFilter[activeFilter]
                                                        setDataFilter({ ...newFilter })
                                                    }}
                                                >
                                                    <Flex alignItems={"center"} gap={2} pr={2} pl={1}>
                                                        <FontAwesomeIcon
                                                            size="sm"
                                                            icon={
                                                                headerValues
                                                                    .find((obj) => obj.id === activeFilter)
                                                                    .options.find((obj) => obj.value === filterOption).icon
                                                            }
                                                        />
                                                        {
                                                            headerValues
                                                                .find((obj) => obj.id === activeFilter)
                                                                .options.find((obj) => obj.value === filterOption).text
                                                        }
                                                    </Flex>
                                                    <Box pr={"2px"}>
                                                        <FontAwesomeIcon icon={faTimesCircle} />
                                                    </Box>
                                                </Button>
                                            ))}
                                        </Flex>
                                    ) : (
                                        <Box px={2}>{dataFilter[activeFilter]}</Box>
                                    )}
                                </Flex>
                            </Flex>
                        )
                    })
                ) : (
                    <Tooltip placement={"top"} gutter={5} label={"Filter the table headings to show your active filters here"}>
                        <Flex className={"bgContent"} borderRadius={30} px={3} gap={2} minH={10} alignItems={"center"}>
                            <Text>No filters selected</Text>
                            <FontAwesomeIcon icon={faFilter} />
                        </Flex>
                    </Tooltip>
                )}
            </Flex>
        </Box>
    )
}
