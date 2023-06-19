import React from "react"

import { Flex } from "@chakra-ui/react"

import dataProps from "public/data/dataProps"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCoins, faUsers, faServer, faShoppingBasket } from "@fortawesome/free-solid-svg-icons"

export default function StakingType({ provider }) {
    return (
        <Flex
            direction={"row"}
            justifyContent={"center"}
            alignContent={"center"}
            color={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.color}
            fontWeight={"bold"}
        >
            <Flex alignItems={"center"} gap={1}>
                <FontAwesomeIcon icon={dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.icon} />
                {dataProps.flatMap((d) => d.options).find((opt) => opt?.value === provider.stakingType)?.text}
            </Flex>
        </Flex>
    )
}
