import React from "react"

import { Flex } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer, faCloud, faCode, faShoppingBasket, faComputer, faDesktop } from "@fortawesome/free-solid-svg-icons"

export default function ProviderType({ provider }) {
    return (
        <Flex direction={"column"} justifyContent={"center"} alignContent={"center"} gap={1} fontWeight={"bold"} mt={1}>
            {provider.providerType == "hardware" && (
                <>
                    <FontAwesomeIcon icon={faDesktop} />
                    Hardware
                </>
            )}
            {provider.providerType == "software" && (
                <>
                    <FontAwesomeIcon icon={faCode} />
                    Software
                </>
            )}
            {provider.providerType == "cloud" && (
                <>
                    <FontAwesomeIcon icon={faCloud} />
                    Cloud
                </>
            )}
            {provider.providerType == "indexToken" && (
                <>
                    <FontAwesomeIcon icon={faShoppingBasket} />
                    LST index
                </>
            )}
            {provider.providerType == "lst" && (
                <>
                    <FontAwesomeIcon icon={faCoins} />
                    LST
                </>
            )}
        </Flex>
    )
}
