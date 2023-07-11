import React, { useState } from "react"
import { Flex, Box, Text, HStack, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition, faChevronRight, faHardDrive } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

interface Option {
    value: string
    color: string
    icon: IconDefinition
    description?: string
}

export default function ProviderType({ provider }) {
    const [expandedRow, setExpandedRow] = useState(false)

    return (
        <Flex className={"expandContentBox"} p={0} direction={"column"} overflow={"hidden"}>
            <Flex
                justifyContent={"space-between"}
                p={4}
                cursor={"pointer"}
                onClick={() => {
                    setExpandedRow(!expandedRow)
                }}
                className={"checklistList"}
            >
                <Flex alignItems={"center"}>
                    <Box
                        as={FontAwesomeIcon}
                        icon={faChevronRight}
                        transition="all 0.2s"
                        size={"sm"}
                        transform={`rotate(${expandedRow ? 90 : 0}deg)`}
                        mr={3}
                    />
                    <Flex gap={1}>
                        <Text fontWeight={"bold"}>
                            Hardware Provider <Box as={FontAwesomeIcon} icon={faHardDrive} ml={2} />
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Collapse in={expandedRow}>
                <Box px={4} pb={4} pt={1}>
                    This provider sells the complete hardware to get you staking from home right away!
                </Box>
            </Collapse>
        </Flex>
    )
}
