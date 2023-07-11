import ReactMarkdown from "react-markdown"
import { Flex, Text, Box, Link, Button } from "@chakra-ui/react"

import { useState, useEffect, useRef, use } from "react"

import KeyOwner from "./ExpandedRow/KeyOwner"
import ChecklistList from "./ExpandedRow/ChecklistList"
import Status from "./ExpandedRow/Status"
import Links from "./ExpandedRow/Links"

export default function ExpandedRow({ provider, expandedRows, expandedChecklistRows, setExpandedChecklistRows }) {
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)
    const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false)
    const markdownRef = useRef<HTMLDivElement>(null)

    // Check if description is overflowing
    useEffect(() => {
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
        <Flex gap={5} pt={3} pb={5}>
            <Flex direction={"column"} gap={5} w={160}>
                <Status provider={provider} />
                <Links provider={provider} />
            </Flex>
            <Flex direction={"column"} gap={5} w={400}>
                <Flex
                    direction={"column"}
                    gap={3}
                    className={"expandContentBox"}
                    minH={provider.providerType === "hardware" ? 150 : 250}
                    overflow={"hidden"}
                    position={"relative"}
                    pb={isDescriptionOverflowing ? 50 : 0}
                >
                    <Flex
                        direction={"column"}
                        gap={3}
                        maxH={isDescriptionExpanded ? "1000px" : "180px"}
                        overflow={isDescriptionExpanded ? "scroll" : "hidden"}
                        ref={markdownRef}
                        transition={isDescriptionExpanded ? "all 1s" : "all 0.2s"}
                    >
                        <ReactMarkdown
                            components={{
                                a: ({ node, ...props }) => <Link color="blue" {...props} />,
                            }}
                        >
                            {provider.description}
                        </ReactMarkdown>
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

                <Flex className={"expandContentBox"} minH={115}>
                    <Text>🏗️ Staking Type coming soon! 🏗️</Text>
                </Flex>
                {provider.providerType === "hardware" && (
                    <Flex className={"expandContentBox"}>
                        <Text>🏗️ Provider Type coming soon! 🏗️</Text>
                    </Flex>
                )}
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
