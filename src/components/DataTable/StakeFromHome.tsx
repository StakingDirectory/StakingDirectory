import React from "react"
import { Flex, Tooltip, Box, Text, Image, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouseLaptop } from "@fortawesome/free-solid-svg-icons"

export default function StakeFromHome({ provider }) {
    return (
        <>
            {provider.stakeFromHome && (
                <Flex direction="column" gap={"2px"} alignItems={"center"} cursor={"help"}>
                    <Popover placement="top" trigger="hover" openDelay={200} closeDelay={0} gutter={5}>
                        <PopoverTrigger>
                            <Image
                                objectFit="contain"
                                boxSize={"50px"}
                                src={"./images/StakeFromHome.png"}
                                alt={provider.logo.alt}
                                borderRadius={"100%"}
                            />
                        </PopoverTrigger>
                        <PopoverContent>Stake from Home. Defend Ethereum.</PopoverContent>
                    </Popover>
                </Flex>
            )}
        </>
    )
}
