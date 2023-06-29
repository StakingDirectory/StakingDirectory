import React, { useState } from "react"
import { Flex, Box, Text, HStack, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function KeyOwner({ provider, id }) {
    const [expandedRows, setExpandedRows] = useState([])

    const expandRow = (index) => {
        const currentIndex = expandedRows.findIndex((row) => row.index === index && row.providerId === provider.id)

        const newExpandedRows = [...expandedRows]
        if (currentIndex !== -1) {
            newExpandedRows.splice(currentIndex, 1)
        } else {
            newExpandedRows.push({ providerId: provider.id, index })
        }
        setExpandedRows(newExpandedRows)
    }

    const renderBox = (ownerId, index) => {
        const value = provider[ownerId]?.value

        const isOpen = expandedRows.some((row) => row.index === index && row.providerId === provider.id)

        return (
            <Flex key={index} direction={"column"} minH={10} className={isOpen ? "checklistListOpen checklistList" : "checklistList"}>
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
                        transform={`rotate(${isOpen ? 90 : 0}deg)`}
                        mr={3}
                        ml={2}
                    />
                    <Text fontWeight={"semibold"}>{providerProperties.find((prop) => prop.value === ownerId)?.name}</Text>
                </HStack>
                <Collapse in={isOpen}>
                    <Box px={4} pt={1} pb={3}>
                        <Text>🏗️ More details coming soon! 🏗️</Text>
                    </Box>
                </Collapse>
            </Flex>
        )
    }

    return (
        <Box pt={4}>
            <Text fontWeight={"bold"} pl={4} pb={2}>
                {id === "validatorKey" ? "Validator Key Owner" : "Withdrawal Key Owner"}
            </Text>
            <Flex grow={1} className={""} p={0} gap={1} direction={"column"} overflow={"hidden"}>
                {provider[id].map((ownerId, index) => renderBox(ownerId, index))}
            </Flex>
        </Box>
    )
}
