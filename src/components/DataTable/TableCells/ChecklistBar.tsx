import { Flex, Box, Tooltip, Text, HStack, Link } from "@chakra-ui/react"

import NextLink from "next/link"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleInfo, faMinus } from "@fortawesome/free-solid-svg-icons"
import {} from "@fortawesome/free-regular-svg-icons"

import dataProps from "public/data/dataProps"
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function ChecklistBar({ provider }) {
    const renderBox = (id, index: number) => {
        const name = providerProperties.find((prop) => prop.value === id.value).name
        const value = provider[id.value]?.evidenceLink

        const isFirst = index === 0
        const isLast = index === checklistProperties.length - 1

        let borderLeftWidth = 0
        let borderRightWidth = 0

        if (isFirst) {
            borderRightWidth = 2
        } else if (isLast) {
            borderLeftWidth = 2
        } else {
            borderLeftWidth = 2
            borderRightWidth = 2
        }

        return (
            <Tooltip
                key={index}
                gutter={8}
                label={
                    <Flex direction={"column"} alignItems={"center"} className="tooltipLabel">
                        <HStack>
                            <Text>{name}</Text>
                        </HStack>
                    </Flex>
                }
                placement={"top"}
                className="tooltipArrow"
                hasArrow={true}
            >
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    borderRadius={0}
                    borderY={0}
                    borderLeftWidth={borderLeftWidth}
                    borderRightWidth={borderRightWidth}
                    minW={6}
                    maxW={6}
                    className={value ? "checklistBarBorder checklistBarBackground" : "checklistBarBorder checklistBarBackgroundTransparent"}
                >
                    {value ? (
                        <Link as={NextLink} href={value} target="_blank">
                            <Box
                                as={FontAwesomeIcon}
                                icon={faCircleInfo}
                                size={"1x"}
                                pt={{ base: "1", sm: "0" }}
                                mr={1}
                                ml={1}
                                onClick={(e) => {
                                    e.stopPropagation()
                                }}
                            />
                        </Link>
                    ) : (
                        <Box
                            as={FontAwesomeIcon}
                            icon={faMinus}
                            size={"xs"}
                            pt={{ base: "1", sm: "0" }}
                            mr={1}
                            ml={1}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        />
                    )}
                </Flex>
            </Tooltip>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Flex borderRadius={10} borderWidth={3} borderStyle="solid" className={"checklistBarBorder"} h={10} overflow={"hidden"}>
                {checklistProperties.map((id, index) => renderBox(id, index))}
            </Flex>
        </Flex>
    )
}
