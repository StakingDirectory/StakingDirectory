import { Flex, Image, Tooltip, Box } from "@chakra-ui/react"

export default function StakeFromHome({ provider }) {
    const label = (
        <Box className={"tooltipLabel"}>
            {provider.stakeFromHome ? "🏡 Allows you to operator your validator from your home" : "A node operator runs your validator for you"}
        </Box>
    )

    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip label={label} placement="top" className="tooltipArrow" gutter={10} hasArrow={true}>
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
