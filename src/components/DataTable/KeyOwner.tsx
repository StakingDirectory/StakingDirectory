import React from "react"
import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export default function KeyOwner({ provider, id }) {
    const tooltipLabel = (value: string, color: string, icon: IconDefinition) => {
        return (
            <Flex alignItems={"center"} direction="column" gap={3}>
                <Text fontSize={"md"} fontWeight={"extrabold"}>
                    {dataProps.find((obj) => obj.id === id).name}
                </Text>
                <Flex gap={2} color={color} alignItems="center">
                    <FontAwesomeIcon icon={icon} size="lg" />
                    <Text fontSize={"md"} fontWeight={"extrabold"} color={color}>
                        {value}
                    </Text>
                </Flex>
            </Flex>
        )
    }

    return (
        <Flex justifyContent={"center"} gap={3}>
            {provider[id].map((owner) => {
                return (
                    <Tooltip
                        key={owner}
                        label={tooltipLabel(
                            dataProps.flatMap((d) => d.options).find((opt) => opt?.value === owner)?.text,
                            dataProps.flatMap((d) => d.options).find((opt) => opt?.value === owner)?.color,
                            dataProps.flatMap((d) => d.options).find((opt) => opt?.value === owner)?.icon
                        )}
                        openDelay={0}
                        closeOnClick={false}
                    >
                        <Box color={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === owner)?.color}>
                            <FontAwesomeIcon icon={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === owner)?.icon} size="lg" />
                        </Box>
                    </Tooltip>
                )
            })}
        </Flex>
    )
}
