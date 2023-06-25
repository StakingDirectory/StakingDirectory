import { Flex, Tooltip, Box, Text } from "@chakra-ui/react"

export default function RewardFee({ provider }) {
    return (
        <Flex direction="column" gap={"2px"} alignItems={"center"}>
            <Tooltip
                label={<Box className={"tooltipLabel"}>Cost to use this provider</Box>}
                placement={"top"}
                gutter={10}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Box borderRadius={10} border={"2px solid"} borderColor={"red"} w={"fit-content"} px={2} py={"2px"} className={"bgPage"}>
                    {provider.fee.value}
                    {provider.fee.type == "percentage" ? "%" : ""}
                </Box>
            </Tooltip>
        </Flex>
    )
}
