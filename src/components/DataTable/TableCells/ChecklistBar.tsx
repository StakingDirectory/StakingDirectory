import React from "react"
import { Flex, Box, Tooltip, Text, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties

export default function ChecklistBar({ provider, tableRowIndex, expandedRows, setExpandedChecklistRows }) {
    const allTrue = checklistProperties.every((prop) => provider[prop.value]?.value)

    const renderBox = (status: { value: any; name: string }, index: number) => {
        const { value: statusValue, name: statusName } = status
        const value = typeof statusValue === "function" ? statusValue(provider) : provider[statusValue]?.value

        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        const isFirst = index === 0
        const isLast = index === checklistProperties.length - 1

        let borderLeftWidth = 0
        let borderRightWidth = 0

        if (isFirst) {
            borderRightWidth = 2
        } else if (isLast) {
            borderLeftWidth = 2
        } else {
            borderLeftWidth = 2
            borderRightWidth = 2
        }

        return (
            <Tooltip
                key={index}
                gutter={10}
                label={
                    <Flex direction={"column"} alignItems={"center"} gap={2} className="tooltipLabel">
                        <HStack>
                            <Box color={iconColor}>
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </Box>
                            <Text>{statusName}</Text>
                        </HStack>
                    </Flex>
                }
                placement={"top"}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box
                    borderRadius={0}
                    borderY={0}
                    borderLeftWidth={borderLeftWidth}
                    borderRightWidth={borderRightWidth}
                    className="borderChecklistBar"
                    w={10}
                    bg={value ? "green" : "red"}
                    onClick={(e) => {
                        // Prevent propagation of the event if tableRowIndex is in expandedRows
                        if (expandedRows.includes(tableRowIndex)) {
                            e.stopPropagation()
                        }
                        setExpandedChecklistRows([{ providerId: provider.id, index }])
                    }}
                />
            </Tooltip>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex
                borderRadius={10}
                borderWidth={3}
                borderStyle="solid"
                className={allTrue ? "bgChecklistBar" : "bgChecklistBar borderChecklistBar"}
                borderColor={allTrue ? "gold" : ""}
                w={200}
                h={10}
                overflow={"hidden"}
            >
                {checklistProperties.map((status, index) => renderBox(status, index))}
            </Flex>
        </Flex>
    )
}
