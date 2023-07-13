import { Flex, Box, Text, HStack, Collapse, Button, Link } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpRightFromSquare, faChevronRight, faLink } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

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
        const value = provider[id.value]?.value
        const description = id.description[value ? "true" : "false"]
        const href = provider[id.value]?.evidenceLink
        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        const isOpen = expandedChecklistRows.some((row) => row.index === index && row.providerId === provider.id)

        return (
            <Flex key={index} direction={"column"} minH={10} className={isOpen ? "checklistListOpen checklistList" : "checklistList"}>
                <HStack
                    py={3}
                    px={2}
                    onClick={() => {
                        expandRow(index)
                    }}
                    cursor={"pointer"}
                >
                    <Box
                        as={FontAwesomeIcon}
                        icon={faChevronRight}
                        transition="all 0.2s"
                        size={"sm"}
                        transform={`rotate(${isOpen ? 90 : 0}deg)`}
                        mr={3}
                        ml={2}
                    />
                    <Box color={iconColor}>
                        <FontAwesomeIcon icon={icon} size="lg" />
                    </Box>
                    <Text>{name}</Text>
                </HStack>
                <Collapse in={isOpen}>
                    <Flex direction={"column"} gap={3} pl={12} pt={1} pb={3} pr={3}>
                        <Text>{description}</Text>
                        {href ? (
                            <Link as={NextLink} href={href} target="_blank">
                                <Button w={"fit-content"} justifyContent={"start"} borderRadius={10}>
                                    <Flex gap={3}>
                                        <Text>Evidence link</Text>
                                        <Box>
                                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                        </Box>
                                    </Flex>
                                </Button>
                            </Link>
                        ) : (
                            value && (
                                <Button isDisabled w={"fit-content"} justifyContent={"start"} borderRadius={10}>
                                    <Flex gap={3}>
                                        <Text>🤔 Evidence link missing</Text>
                                    </Flex>
                                </Button>
                            )
                        )}
                    </Flex>
                </Collapse>
            </Flex>
        )
    }

    return (
        <Flex grow={1} h={"fit-content"} className={"expandContentBox"} p={0} gap={1} direction={"column"} overflow={"hidden"}>
            {checklistProperties.map((id, index) => renderBox(id, index))}
        </Flex>
    )
}
