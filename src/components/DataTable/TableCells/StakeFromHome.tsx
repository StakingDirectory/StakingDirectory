import React from "react"
import { Flex, Box, Text, Image, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

export default function StakeFromHome({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Popover placement="top" trigger="hover" openDelay={200} closeDelay={0} gutter={5}>
                <PopoverTrigger>
                    <Image
                        src={"./images/StakeFromHome.png"}
                        alt={provider.logo.alt}
                        objectFit="contain"
                        boxSize={"50px"}
                        borderRadius={"100%"}
                        filter={provider.stakeFromHome ? "" : "grayscale(100%)"}
                        opacity={provider.stakeFromHome ? "" : "0.2"}
                    />
                </PopoverTrigger>
                <PopoverContent>
                    <Flex direction={"column"} gap={5}>
                        <Text>Stake from Home. Defend Ethereum.</Text>
                        <Text>🏗️ More details coming soon! 🏗️</Text>
                    </Flex>
                </PopoverContent>
            </Popover>
        </Flex>
    )
}
