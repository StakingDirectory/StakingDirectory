import { Flex, Box, Text, HStack, Collapse, Button, Link } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faChevronRight, faLink, faCircleQuestion, faInfo, faLinkSlash } from "@fortawesome/free-solid-svg-icons"

import NextLink from "next/link"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ChecklistList({ provider, expandedChecklistRows, setExpandedChecklistRows }) {
    const expandRow = (index) => {
        const currentIndex = expandedChecklistRows.findIndex((row) => row.index === index && row.providerId === provider.id)

        const newExpandedRows = [...expandedChecklistRows]
        if (currentIndex !== -1) {
            newExpandedRows.splice(currentIndex, 1)
        } else {
            newExpandedRows.push({ providerId: provider.id, index })
        }

        setExpandedChecklistRows(newExpandedRows)
    }

    const renderBox = (id, index: number) => {
        const name = providerProperties.find((prop) => prop.value === id.value).name
        const value = provider[id.value]?.evidenceLink
        const description = id.description
        const href = provider[id.value]?.evidenceLink

        const isOpen = expandedChecklistRows.some((row) => row.index === index && row.providerId === provider.id)

        return (
            <Flex key={index} direction={"column"} minH={10} className={isOpen ? "checklistListOpen checklistList" : "checklistList"}>
                <HStack
                    justifyContent={"space-between"}
                    py={"9.5px"}
                    px={2}
                    // TODO: Uncomment when explanations for sections have been written
                    // onClick={() => {
                    //     expandRow(index)
                    // }}
                    // cursor={"pointer"}
                >
                    <HStack>
                        {/* 
                            TODO: Uncomment when explanations for sections have been written
                            <Box
                            as={FontAwesomeIcon}
                            icon={faChevronRight}
                            transition="all 0.2s"
                            size={"sm"}
                            transform={`rotate(${isOpen ? 90 : 0}deg)`}
                            mx={2}
                        /> */}
                        {/* TODO: Remove box when expand is added back in above */}
                        <Box pl={1} />
                        <Text cursor={"default"}>{name}</Text>
                    </HStack>
                    {href ? (
                        <Link as={NextLink} href={href} target="_blank">
                            <Button
                                w={"fit-content"}
                                size={"sm"}
                                justifyContent={"start"}
                                borderRadius={10}
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                            >
                                <Flex gap={3}>
                                    <Text>View</Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                    </Box>
                                </Flex>
                            </Button>
                        </Link>
                    ) : (
                        <Button isDisabled size={"sm"} w={"fit-content"} justifyContent={"start"} borderRadius={10}>
                            <Flex gap={3}>
                                <Text>Link missing</Text>
                            </Flex>
                        </Button>
                    )}
                </HStack>
                <Collapse in={isOpen}>
                    <Flex direction={"column"} gap={3} pl={12} pt={1} pb={3} pr={3}>
                        <Text>{description}</Text>
                    </Flex>
                </Collapse>
            </Flex>
        )
    }

    return (
        <Flex
            grow={1}
            h={"fit-content"}
            className={"expandContentBox"}
            minW={{ base: 350, xl: 370 }}
            maxW={{ base: 350, xl: 370 }}
            p={0}
            gap={1}
            direction={"column"}
            overflow={"hidden"}
        >
            {checklistProperties.map((id, index) => renderBox(id, index))}
        </Flex>
    )
}
