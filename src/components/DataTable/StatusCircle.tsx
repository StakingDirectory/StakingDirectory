import React from "react"

import { Flex, Box, Grid, useColorModeValue } from "@chakra-ui/react"

export default function StatusCircle({ provider, column }) {
    let option1
    let option2
    let option3
    let option4

    if (column === "security") {
        option1 = provider.audited.value
        option2 = provider.openSource.value
        option3 = provider.bugBounty.value
        option4 = provider.battleTested.value
    } else if (column === "ethereumAligned") {
        option1 = provider.permissionlessUsage.value
        option2 = provider.nonCensoringRelays.value
        option3 = provider.permissionlessOperators.value
        option4 = provider.diverseExecutionClients.value && provider.diverseBeaconClients.value
    }

    const allTrue = option1 && option2 && option3 && option4

    return (
        <Flex justifyContent={"center"}>
            <Box borderRadius={"100%"} overflow={"hidden"} border={"2px solid"} borderColor={allTrue ? "gold" : "transparent"} w="48px">
                <Grid
                    bg={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                    templateColumns={"repeat(2, 1fr)"}
                    border={"2px solid"}
                    borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                    borderRadius={"100%"}
                    overflow={"hidden"}
                    w="44px"
                >
                    <Box
                        borderBottomRightRadius={3}
                        borderBottomLeftRadius={2}
                        borderTopRightRadius={2}
                        borderRight={"1px solid"}
                        borderBottom={"1px solid"}
                        borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        bg={option1 ? "green" : "red"}
                        h={5}
                    ></Box>
                    <Box
                        borderBottomLeftRadius={3}
                        borderTopLeftRadius={2}
                        borderBottomRightRadius={2}
                        borderLeft={"1px solid"}
                        borderBottom={"1px solid"}
                        borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        bg={option2 ? "green" : "red"}
                        h={5}
                    ></Box>
                    <Box
                        borderTopRightRadius={3}
                        borderTopLeftRadius={2}
                        borderBottomRightRadius={2}
                        borderRight={"1px solid"}
                        borderTop={"1px solid"}
                        borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        bg={option4 ? "green" : "red"}
                        h={5}
                    ></Box>
                    <Box
                        borderTopLeftRadius={3}
                        borderBottomLeftRadius={2}
                        borderTopRightRadius={2}
                        borderLeft={"1px solid"}
                        borderTop={"1px solid"}
                        borderColor={useColorModeValue("pageBackground.light", "pageBackground.dark")}
                        bg={option3 ? "green" : "red"}
                        h={5}
                    ></Box>
                </Grid>
            </Box>
        </Flex>
    )
}
