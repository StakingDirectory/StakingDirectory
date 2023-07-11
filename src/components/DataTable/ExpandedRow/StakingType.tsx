import React, { useState } from "react"
import { Flex, Box, Text, HStack, Collapse } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition, faChevronRight } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

interface Option {
    value: string
    color: string
    icon: IconDefinition
    description?: string
}

export default function StakingType({ provider }) {
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
                        <Text fontWeight={"bold"}>Staking Type:</Text>
                        <Text
                            fontWeight={"bold"}
                            color={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.color}
                        >
                            {providerProperties.find((prop) => prop.value === provider.stakingType)?.name}
                        </Text>
                    </Flex>
                </Flex>
                {provider?.lstName && (
                    <Flex gap={1}>
                        <Text fontWeight={"bold"}>Token:</Text>
                        <Text fontWeight={"bold"}>{provider?.lstName}</Text>
                    </Flex>
                )}
            </Flex>
            <Collapse in={expandedRow}>
                <Box px={4} pb={4} pt={1}>
                    {(dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType) as Option)?.description}
                </Box>
            </Collapse>
        </Flex>
    )
}
