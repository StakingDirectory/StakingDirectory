import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer } from "@fortawesome/free-solid-svg-icons"

export default function StakingType({ provider }) {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            color={provider.stakingType == "lst" ? "gold" : provider.stakingType == "pooled" ? "blue" : "green"}
            fontWeight={"bold"}
        >
            {provider.stakingType == "lst" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faCoins} />
                    LST
                </Flex>
            )}
            {provider.stakingType == "pooled" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faUsers} />
                    Pooled
                </Flex>
            )}
            {provider.stakingType == "dedicated" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faServer} />
                    Solo
                </Flex>
            )}
        </Flex>
    )
}
