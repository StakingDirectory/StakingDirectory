import React from "react"
import { Flex, Tooltip, Box, Text, Image } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons"

export default function StakeFromHome({ provider }) {
    return (
        <>
            {provider.stakeFromHome && (
                <Flex direction="column" gap={"2px"} alignItems={"center"} cursor={"help"}>
                    <Tooltip label={"Stake from home and help to decentralize Ethereum!"} placement={"top"} closeOnClick={false}>
                        <Image
                            objectFit="contain"
                            boxSize={"50px"}
                            src={"./images/StakeFromHome.png"}
                            alt={provider.logo.alt}
                            borderRadius={"100%"}
                        />
                    </Tooltip>
                </Flex>
            )}
        </>
    )
}
