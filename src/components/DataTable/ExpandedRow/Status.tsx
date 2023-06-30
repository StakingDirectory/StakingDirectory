import { Box, Flex, Text, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocket } from "@fortawesome/free-solid-svg-icons"

function getFormattedDate(dateString) {
    const date = new Date(dateString)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    return `${month} ${year}`
}

export default function Status({ provider }) {
    return (
        <Flex direction={"column"} gap={3} h={90} className={"expandContentBox"} cursor={"default"}>
            <Flex gap={2} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                <Text fontWeight={"bold"}>Status</Text>
                <Box fontWeight={"bold"} px={"6px"} py={"2px"} borderRadius={5} bg={provider.status == "active" ? "green" : "blue"}>
                    {provider.status == "active" ? "Active" : "Development"}
                </Box>
            </Flex>
            {provider.status == "active" && (
                <Tooltip
                    placement={"top"}
                    gutter={10}
                    openDelay={300}
                    label={<Box className={"tooltipLabel"}>🗓️ Mainnet launch date</Box>}
                    className="tooltipArrow"
                    hasArrow={true}
                >
                    <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
                        {provider.mainnetLaunch.date ? (
                            <>
                                <FontAwesomeIcon icon={faRocket} />
                                <Text fontWeight={"bold"}>{getFormattedDate(provider.mainnetLaunch.date)}</Text>
                            </>
                        ) : (
                            <Text>🤔 Date missing</Text>
                        )}
                    </Flex>
                </Tooltip>
            )}
        </Flex>
    )
}
