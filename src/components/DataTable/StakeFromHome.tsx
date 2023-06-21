import React from "react"
import { Flex, Box, Text, Image, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

export default function StakeFromHome({ provider }) {
    return (
        <>
            {provider.stakeFromHome && (
                <Flex direction="column" gap={"2px"} alignItems={"center"}>
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
