import { Flex, Box, Tooltip, Text, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faCircleCheck, faCircleXmark, faCircleQuestion } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ChecklistBar({ provider, tableRowIndex, expandedRows, setExpandedChecklistRows }) {
    const renderBox = (id, index: number) => {
        const name = providerProperties.find((prop) => prop.value === id.value).name
        const value = provider[id.value]?.value
        const iconColor = value ? "blueLink" : "gray"
        const icon = value ? faCircleInfo : faCircleQuestion

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
                    <Flex direction={"column"} alignItems={"center"} className="tooltipLabel">
                        <HStack>
                            <Flex
                                className="pageBackgroundInverted"
                                justifyContent={"center"}
                                alignItems={"center"}
                                color={iconColor}
                                borderRadius={50}
                                minW={3}
                                maxW={3}
                                minH={3}
                                maxH={3}
                                mr={1}
                            >
                                <FontAwesomeIcon icon={icon} size="xl" />
                            </Flex>
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
                    minW={6}
                    maxW={6}
                    bg={value ? "blueLink" : "gray"}
                    onClick={(e) => {
                        // Prevent propagation of the event if tableRowIndex is in expandedRows
                        if (expandedRows.includes(tableRowIndex)) {
                            e.stopPropagation()
                        }
                        setExpandedChecklistRows([{ providerId: provider.id, index }])
                    }}
                >
                    <Box as={FontAwesomeIcon} icon={value ? faCircleInfo : faCircleQuestion} pt={{ base: "1", sm: "0" }} mr={1} ml={1} />
                </Flex>
            </Tooltip>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex borderRadius={10} borderWidth={3} borderStyle="solid" className={"checklistBar"} h={10} overflow={"hidden"}>
                {checklistProperties.map((id, index) => renderBox(id, index))}
            </Flex>
        </Flex>
    )
}
