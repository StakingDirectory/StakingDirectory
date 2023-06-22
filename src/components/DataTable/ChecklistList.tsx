import React, { useRef, useEffect, useState } from "react"
import { Flex, Box, Grid, Tooltip, Text, HStack, Popover, PopoverTrigger, PopoverContent, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties

export default function ChecklistList({ provider }) {
    const allTrue = checklistProperties.every((prop) => provider[prop.value]?.value)

    const [expandedRows, setExpandedRows] = useState([])
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

    const renderBox = (status: { value: any; name: string }, index: number) => {
        const { value: statusValue, name: statusName } = status
        const value = typeof statusValue === "function" ? statusValue(provider) : provider[statusValue]?.value

        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        return (
            <Flex
                py={3}
                px={2}
                minH={10}
                onClick={() => {
                    expandRow(index)
                }}
                cursor={"pointer"}
                className={"checklistList"}
                direction={"column"}
                borderRadius={10}
            >
                <HStack>
                    <Box
                        as={FontAwesomeIcon}
                        icon={faChevronRight}
                        transition="all 0.2s"
                        size={"sm"}
                        transform={`rotate(${expandedRows.includes(index) ? 90 : 0}deg)`}
                        pr={2}
                    />
                    <Box color={iconColor}>
                        <FontAwesomeIcon icon={icon} size="lg" />
                    </Box>
                    <Text>{statusName}</Text>
                </HStack>
                <Collapse in={expandedRows.includes(index)}>
                    <Box pl={6} pt={3} pr={3}>
                        <Text>🏗️ More details coming soon! 🏗️</Text>
                    </Box>
                </Collapse>
            </Flex>
        )
    }

    return (
        <Flex grow={1} className={"expandContentBox"} p={0} direction={"column"} overflow={"hidden"} borderColor={allTrue ? "gold" : ""}>
            {checklistProperties.map((status, index) => renderBox(status, index))}
        </Flex>
    )
}
