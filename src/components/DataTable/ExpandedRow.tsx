import ReactMarkdown from "react-markdown"
import { Flex, Text, Box, Link, Button } from "@chakra-ui/react"

import { useState, useEffect, useRef, use } from "react"

import KeyOwner from "./ExpandedRow/KeyOwner"
import ChecklistList from "./ExpandedRow/ChecklistList"
import Status from "./ExpandedRow/Status"
import Links from "./ExpandedRow/Links"
import StakingType from "./ExpandedRow/StakingType"
import ProviderType from "./ExpandedRow/ProviderType"

export default function ExpandedRow({ provider, expandedRows, expandedChecklistRows, setExpandedChecklistRows }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false)
    const markdownRef = useRef<HTMLDivElement>(null)

    // Check if description is overflowing
    useEffect(() => {
        console.log("markdownRef.current.scrollHeight", markdownRef.current.scrollHeight)
        console.log("markdownRef.current.clientHeight", markdownRef.current.clientHeight)

        // Timeout used because of collapse animation
        const timeoutId = setTimeout(() => {
            if (markdownRef.current && markdownRef.current.scrollHeight > markdownRef.current.clientHeight) {
                setIsDescriptionOverflowing(true)
            }
        }, 100)
        // Clear timeout if the component unmounts before the timeout finishes
        return () => clearTimeout(timeoutId)
    }, [expandedRows])

    return (
        <Flex gap={5} pt={1} pb={5} justifyContent={"center"}>
            <Flex direction={"column"} gap={5} w={160}>
                <Status provider={provider} />
                <Links provider={provider} />
            </Flex>
            <Flex direction={"column"} gap={5} w={400}>
                <Flex
                    direction={"column"}
                    gap={3}
                    className={"expandContentBox"}
                    minH={provider.providerType === "hardware" ? 225 : 300}
                    overflow={"hidden"}
                    position={"relative"}
                    pb={isDescriptionOverflowing ? 50 : 2}
                >
                    <Flex
                        direction={"column"}
                        gap={3}
                        maxH={isDescriptionExpanded ? "1000px" : "230px"}
                        overflow={isDescriptionExpanded ? "scroll" : "hidden"}
                        ref={markdownRef}
                        transition={isDescriptionExpanded ? "all 1s" : "all 0.2s"}
                        fontWeight={"medium"}
                    >
                        <Text fontWeight={"bold"}>About {provider.name}</Text>
                        {provider.description ? (
                            <ReactMarkdown
                                components={{
                                    a: ({ node, ...props }) => <Link color="blue" {...props} />,
                                }}
                            >
                                {provider.description}
                            </ReactMarkdown>
                        ) : (
                            <Text>🤔 Description missing</Text>
                        )}
                    </Flex>
                    {isDescriptionOverflowing && (
                        <Button
                            variant={"ShowMoreButton"}
                            w={"100%"}
                            borderTopRadius={0}
                            onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                            position={"absolute"}
                            bottom={0}
                            left={0}
                        >
                            {isDescriptionExpanded ? "Show less" : "Show more"}
                        </Button>
                    )}
                </Flex>
                <StakingType provider={provider} />
                {provider.providerType === "hardware" && <ProviderType provider={provider} />}
            </Flex>
            <Flex direction={"column"} gap={5} w={220}>
                <Flex direction={"column"} className={"expandContentBox"} p={0} overflow={"hidden"}>
                    <KeyOwner provider={provider} id={"validatorKey"} />
                    <KeyOwner provider={provider} id={"withdrawalKey"} />
                </Flex>
                <Flex direction={"column"} className={"expandContentBox"} gap={3} minH={185}>
                    <Text>Locations</Text>
                    <Text>🏗️ Coming soon! 🏗️</Text>
                </Flex>
            </Flex>
            <ChecklistList provider={provider} expandedChecklistRows={expandedChecklistRows} setExpandedChecklistRows={setExpandedChecklistRows} />
        </Flex>
    )
}
