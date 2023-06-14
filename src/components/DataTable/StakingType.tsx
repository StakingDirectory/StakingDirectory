import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer } from "@fortawesome/free-solid-svg-icons"

export default function StakingType({ provider }) {
    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            alignContent={"center"}
            gap={1}
            color={provider.stakingType == "lst" ? "gold" : provider.stakingType == "pooled" ? "blue" : "green"}
            fontWeight={"bold"}
        >
            {provider.stakingType == "lst" && (
                <>
                    <FontAwesomeIcon icon={faCoins} />
                    LST
                </>
            )}
            {provider.stakingType == "pooled" && (
                <>
                    <FontAwesomeIcon icon={faUsers} />
                    Pooled
                </>
            )}
            {provider.stakingType == "dedicated" && (
                <>
                    <FontAwesomeIcon icon={faServer} />
                    Dedicated
                </>
            )}
        </Flex>
    )
}
