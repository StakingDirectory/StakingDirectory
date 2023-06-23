import React, { useRef, useEffect, useState } from "react"
import { Flex, Box, Grid, Tooltip, Text, HStack, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties

export default function ChecklistList({ provider, expandedChecklistRows, setExpandedChecklistRows }) {
    const allTrue = checklistProperties.every((prop) => provider[prop.value]?.value)

    const expandRow = (index) => {
        const currentIndex = expandedChecklistRows.findIndex((row) => row.index === index && row.providerId === provider.id)

        const newExpandedRows = [...expandedChecklistRows]
        if (currentIndex !== -1) {
            newExpandedRows.splice(currentIndex, 1)
        } else {
            newExpandedRows.push({ providerId: provider.id, index })
        }

        setExpandedChecklistRows(newExpandedRows)
    }

    const renderBox = (status: { value: any; name: string }, index: number) => {
        const { value: statusValue, name: statusName } = status
        const value = typeof statusValue === "function" ? statusValue(provider) : provider[statusValue]?.value

        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        return (
            <Flex key={index} direction={"column"} minH={10} className={"checklistList"}>
                <HStack
                    py={3}
                    px={2}
                    onClick={() => {
                        expandRow(index)
                    }}
                    cursor={"pointer"}
                >
                    <Box
                        as={FontAwesomeIcon}
                        icon={faChevronRight}
                        transition="all 0.2s"
                        size={"sm"}
                        transform={`rotate(${
                            expandedChecklistRows.some((row) => row.index === index && row.providerId === provider.id) ? 90 : 0
                        }deg)`}
                        mr={3}
                        ml={2}
                    />
                    <Box color={iconColor}>
                        <FontAwesomeIcon icon={icon} size="lg" />
                    </Box>
                    <Text>{statusName}</Text>
                </HStack>
                <Collapse in={expandedChecklistRows.some((row) => row.index === index && row.providerId === provider.id)}>
                    <Box pl={12} pt={1} pb={3} pr={3}>
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
