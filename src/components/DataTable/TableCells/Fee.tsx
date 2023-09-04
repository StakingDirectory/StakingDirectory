import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={<Box className={"tooltipLabel"}>Fee charged by {provider.name}</Box>}
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box
                    borderRadius={10}
                    border={provider.fee?.value == 0 ? "" : "2px solid"}
                    borderColor="red"
                    bg={provider.fee?.value == 0 ? "green" : ""}
                    w={"fit-content"}
                    px={2}
                    py={"2px"}
                    className={"bgPage"}
                    fontWeight={provider.fee?.value == 0 ? "bold" : "semibold"}
                >
                    {provider.fee?.value}
                    {provider.fee?.type == "percentage" ? "%" : ""}
                </Box>
            </Tooltip>
        </Flex>
    )
}
