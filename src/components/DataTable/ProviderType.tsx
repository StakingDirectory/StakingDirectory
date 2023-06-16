import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer, faCloud, faCode, faShoppingBasket, faComputer, faDesktop } from "@fortawesome/free-solid-svg-icons"

export default function ProviderType({ provider }) {
    return (
        <Flex direction={"row"} justifyContent={"center"} alignContent={"center"} fontWeight={"bold"} mt={1}>
            {provider.providerType == "hardware" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faDesktop} />
                    Hardware
                </Flex>
            )}
            {provider.providerType == "software" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faCode} />
                    Software
                </Flex>
            )}
            {provider.providerType == "saas" && (
                <Flex alignItems={"center"} gap={1}>
                    <FontAwesomeIcon icon={faCloud} />
                    SAAS
                </Flex>
            )}
            {provider.providerType == "indexToken" && <Flex>{provider?.lstName}</Flex>}
            {provider.providerType == "lst" && <Flex>{provider?.lstName}</Flex>}
        </Flex>
    )
}
