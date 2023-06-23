import React from "react"
import { Flex, Image, Tooltip } from "@chakra-ui/react"

export default function StakeFromHome({ provider }) {
    const label = provider.stakeFromHome ? "✅ Supports staking from home" : "❌ Does not support staking from home"

    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={label} placement="top" className="tooltipArrow" hasArrow={true}>
                <Image
                    src={"./images/StakeFromHome.png"}
                    alt={provider.logo.alt}
                    objectFit="contain"
                    boxSize={"50px"}
                    borderRadius={"100%"}
                    filter={provider.stakeFromHome ? "" : "grayscale(100%)"}
                    opacity={provider.stakeFromHome ? "" : "0.2"}
                />
            </Tooltip>
        </Flex>
    )
}
