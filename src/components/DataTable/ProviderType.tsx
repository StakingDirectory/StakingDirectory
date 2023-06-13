import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer } from "@fortawesome/free-solid-svg-icons"

export default function ProviderType({ provider }) {
    return (
        <Flex
            direction={"column"}
            justifyContent={"center"}
            alignContent={"center"}
            gap={1}
            color={provider.type == "lst" ? "gold" : provider.type == "pooled" ? "blue" : "green"}
            fontWeight={"bold"}
        >
            {provider.type == "lst" && (
                <>
                    <FontAwesomeIcon icon={faCoins} />
                    LST
                </>
            )}
            {provider.type == "pooled" && (
                <>
                    <FontAwesomeIcon icon={faUsers} />
                    Pooled
                </>
            )}
            {provider.type == "dedicated" && (
                <>
                    <FontAwesomeIcon icon={faServer} />
                    Dedicated
                </>
            )}
        </Flex>
    )
}
