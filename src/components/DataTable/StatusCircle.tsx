import React from "react"
import { Flex, Box, Grid, Tooltip, Text, HStack, Popover, PopoverTrigger, PopoverContent } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

const StatusProperties = {
    technicalIndicators: [
        { value: "audited", name: "Audited" },
        { value: "openSource", name: "Open source" },
        { value: "bugBounty", name: "Bug bounty" },
        { value: "battleTested", name: "Battle tested" },
    ],
    socialIndicators: [
        { value: "permissionlessUsage", name: "Permissionless usage" },
        { value: "nonCensoringRelays", name: "Censorship resistance" },
        { value: "permissionlessOperators", name: "Permissionless operators" },
        { value: (provider) => provider.diverseExecutionClients.value && provider.diverseBeaconClients.value, name: "Diverse clients" },
    ],
}

export default function StatusCircle({ provider, column }) {
    const statusProps = StatusProperties[column]
    const allTrue = statusProps.every((prop) => (typeof prop.value === "function" ? prop.value(provider) : provider[prop.value]?.value))

    const borderStyle = "1px solid"
    const borderProperties = [
        {
            border: { borderBottom: borderStyle, borderRight: borderStyle },
            borderRadius: { borderBottomRightRadius: 3, borderTopRightRadius: 2, borderBottomLeftRadius: 2 },
        },
        {
            border: { borderBottom: borderStyle, borderLeft: borderStyle },
            borderRadius: { borderBottomLeftRadius: 3, borderTopLeftRadius: 2, borderBottomRightRadius: 2 },
        },
        {
            border: { borderTop: borderStyle, borderRight: borderStyle },
            borderRadius: { borderTopRightRadius: 3, borderTopLeftRadius: 2, borderBottomRightRadius: 2 },
        },
        {
            border: { borderTop: borderStyle, borderLeft: borderStyle },
            borderRadius: { borderTopLeftRadius: 3, borderBottomLeftRadius: 2, borderTopRightRadius: 2 },
        },
    ]

    const renderBox = (status: { value: any; name: string }, index: number) => {
        type PlacementWithLogical = "top-end" | "top-start" | "bottom-end" | "bottom-start"

        const { value: statusValue, name: statusName } = status
        const value = typeof statusValue === "function" ? statusValue(provider) : provider[statusValue]?.value

        const placements: PlacementWithLogical[] = ["top-end", "top-start", "bottom-end", "bottom-start"]
        const placement = placements[index]

        const margins = allTrue
            ? ["0 15px -1px 0", "0 0 -1px 15px", "-1px 15px 0 0", "-1px 0 10px 15px"]
            : ["0 15px -5px 0", "0 0 -5px 15px", "-5px 15px 0 0", "-5px 0 0 15px"]
        const margin = margins[index]

        const iconColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        return (
            <Popover placement={placement} trigger="hover" openDelay={100} closeDelay={100} gutter={0}>
                <PopoverTrigger>
                    <Box
                        className={"borderStatusCircle"}
                        {...borderProperties[index].borderRadius}
                        {...borderProperties[index].border}
                        bg={value ? "green" : "red"}
                        h={5}
                    />
                </PopoverTrigger>
                <PopoverContent margin={margin} width={"fit-content"}>
                    <Flex direction={"column"} gap={5}>
                        <HStack>
                            <Box color={iconColor}>
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </Box>
                            <Text>{statusName}</Text>
                        </HStack>
                        <Text>🏗️ More details coming soon! 🏗️</Text>
                    </Flex>
                </PopoverContent>
            </Popover>
        )
    }

    return (
        <Flex justifyContent={"center"}>
            <Box borderRadius={"100%"} overflow={"hidden"} border={"2px solid"} borderColor={allTrue ? "gold" : "transparent"} w="48px">
                <Grid
                    templateColumns={"repeat(2, 1fr)"}
                    border={"2px solid"}
                    className={"bgPage borderStatusCircle"}
                    borderRadius={"100%"}
                    overflow={"hidden"}
                    w="44px"
                >
                    {statusProps.map((status, index) => renderBox(status, index))}
                </Grid>
            </Box>
        </Flex>
    )
}
