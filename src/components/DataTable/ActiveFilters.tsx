import React, { useRef, useEffect, useState } from "react"

import { useColorModeValue, Flex, Text, Box, Collapse, Button } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronRight, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function ActiveFilters({ dataFilter, setDataFilter, headerValues }) {
    const [showActiveFilters, setShowActiveFilters] = useState(true)

    const activeFilters = Object.keys(dataFilter).map((activeFilter) => {
        return (
            <Flex key={activeFilter} direction={"column"} px={2} pb={1}>
                <Box pl={1} pb={1}>
                    {headerValues.find((obj) => obj.id === activeFilter).name}
                </Box>
                <Flex borderRadius={6} border={"1px solid"} px={2} key={activeFilter} color="blue">
                    <Flex color="yellow">
                        {Array.isArray(Object.values(dataFilter[activeFilter])) ? (
                            <Flex gap={2}>
                                {Object.values(dataFilter[activeFilter]).map((filterOption: String, index) => (
                                    <Box border={"1px solid"} px={1} my={2} key={index}>
                                        {filterOption}
                                    </Box>
                                ))}
                            </Flex>
                        ) : (
                            <Box px={2}>{dataFilter[activeFilter]}</Box>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        )
    })

    return (
        <Box width={"100%"} maxW={"1216px"} px={2}>
            <Box width={"fit-content"}>
                <Button
                    variant={"ActiveFilters"}
                    borderRadius={12}
                    mb={1}
                    onClick={() => {
                        setShowActiveFilters(!showActiveFilters)
                        console.log(showActiveFilters)
                    }}
                >
                    <Box>
                        <Box width={3} pt={"1px"}>
                            {showActiveFilters ? (
                                <FontAwesomeIcon icon={faChevronDown} size={"sm"} />
                            ) : (
                                <FontAwesomeIcon icon={faChevronRight} size={"sm"} />
                            )}
                        </Box>
                    </Box>
                    <Text ml={2} fontWeight={"bold"} fontSize="lg">
                        Active Filters
                    </Text>
                </Button>
                <Collapse in={Boolean(showActiveFilters)}>
                    <Flex
                        wrap={"wrap"}
                        padding={2}
                        borderRadius={12}
                        bg={useColorModeValue("contentBackground.light", "contentBackground.dark")}
                        px={2}
                    >
                        {activeFilters}
                    </Flex>
                </Collapse>
            </Box>
        </Box>
    )
}
