import { Flex, Box, Tooltip, Text, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCircleCheck, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ChecklistBar({ provider, tableRowIndex, expandedRows, setExpandedChecklistRows }) {
    const renderBox = (id, index: number) => {
        const name = providerProperties.find((prop) => prop.value === id.value).name
        const value = provider[id.value]?.value
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
                gutter={8}
                label={
                    <Flex direction={"column"} alignItems={"center"} gap={2} className="tooltipLabel">
                        <HStack>
                            <Box color={iconColor}>
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </Box>
                            <Text>{name}</Text>
                        </HStack>
                    </Flex>
                }
                placement={"top"}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={0}
                    borderY={0}
                    borderLeftWidth={borderLeftWidth}
                    borderRightWidth={borderRightWidth}
                    className={"checklistBar"}
                    w={10}
                    bg={value ? "green" : "red"}
                    onClick={(e) => {
                        // Prevent propagation of the event if tableRowIndex is in expandedRows
                        if (expandedRows.includes(tableRowIndex)) {
                            e.stopPropagation()
                        }
                        setExpandedChecklistRows([{ providerId: provider.id, index }])
                    }}
                >
                    <Box as={FontAwesomeIcon} icon={value ? faCheck : faXmark} size={"xs"} pt={{ base: "1", sm: "0" }} mr={1} ml={1} />
                </Flex>
            </Tooltip>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex borderRadius={10} borderWidth={3} borderStyle="solid" className={"checklistBar"} w={200} h={10} overflow={"hidden"}>
                {checklistProperties.map((id, index) => renderBox(id, index))}
            </Flex>
        </Flex>
    )
}
