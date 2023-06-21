import React from "react"
import { Flex, Box, Grid, Tooltip, Text, HStack } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

const StatusProperties = {
    security: [
        { value: "audited", name: "Audited" },
        { value: "openSource", name: "Open source" },
        { value: "bugBounty", name: "Bug bounty" },
        { value: "battleTested", name: "Battle tested" },
    ],
    ethereumAligned: [
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

        const labelColor = value ? "green" : "red"
        const icon = value ? faCircleCheck : faCircleXmark

        const label = (
            <HStack>
                <Box color={labelColor}>
                    <FontAwesomeIcon icon={icon} size="lg" />
                </Box>
                <Text>{statusName}</Text>
            </HStack>
        )

        return (
            <Tooltip key={index} placement={placement} margin={margin} gutter={0} label={label} openDelay={0} closeOnClick={false}>
                <Box
                    className={"borderStatusCircle"}
                    {...borderProperties[index].borderRadius}
                    {...borderProperties[index].border}
                    bg={value ? "green" : "red"}
                    h={5}
                    cursor={"help"}
                />
            </Tooltip>
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
