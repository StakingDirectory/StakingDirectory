import { Box, Flex, Text } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

export default function Status({ provider }) {
    const hasEvidenceLink = !!provider?.mainnetLaunch?.evidenceLink

    return (
        <Flex direction={"column"} gap={3} className={"expandContentBox"}>
            <Flex direction="column" gap={2} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                <Text fontWeight={"bold"}>Status</Text>
                <Flex
                    fontWeight={"bold"}
                    px={"6px"}
                    py={"3px"}
                    borderRadius={5}
                    bg={provider.status == "active" ? "green" : "blue"}
                    cursor={hasEvidenceLink ? "pointer" : "default"}
                    onClick={() => hasEvidenceLink && window.open(provider.mainnetLaunch.evidenceLink, "_blank")}
                >
                    {provider.status == "active" ? (
                        <Flex gap={2} justifyContent={"center"} alignItems={"center"}>
                            <Text>Active</Text>
                            {hasEvidenceLink && <FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
                        </Flex>
                    ) : (
                        "Development"
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
