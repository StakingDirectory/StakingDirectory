import React from "react"
import { Flex, Box, Grid, Tooltip, Text, HStack, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties

export default function ChecklistBar({ provider }) {
    const allTrue = checklistProperties.every((prop) => provider[prop.value]?.value)

    const renderBox = (status: { value: any; name: string }, index: number) => {
        const { value: statusValue, name: statusName } = status
        const value = typeof statusValue === "function" ? statusValue(provider) : provider[statusValue]?.value

        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        return (
            <Popover placement={"top"} trigger="hover" openDelay={100} closeDelay={100} gutter={3}>
                <PopoverTrigger>
                    <Box borderRadius={0} w={10} bg={value ? "green" : "red"} />
                </PopoverTrigger>
                <PopoverContent width={"fit-content"}>
                    <Flex direction={"column"} gap={5}>
                        <HStack>
                            <Box color={iconColor}>
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </Box>
                            <Text>{statusName}</Text>
                        </HStack>
                        <Text>🏗️ More details coming soon! 🏗️</Text>
                    </Flex>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex
                borderRadius={10}
                borderWidth={3}
                borderStyle="solid"
                className={allTrue ? "bgPage" : "bgPage borderChecklistBar"}
                borderColor={allTrue ? "gold" : ""}
                w={200}
                h={10}
                overflow={"hidden"}
                gap={1}
            >
                {checklistProperties.map((status, index) => renderBox(status, index))}
            </Flex>
        </Flex>
    )
}
