import { Flex, Text } from "@chakra-ui/react"

import KeyOwner from "./ExpandedRow/KeyOwner"
import ChecklistList from "./ExpandedRow/ChecklistList"
import Status from "./ExpandedRow/Status"
import Links from "./ExpandedRow/Links"

export default function ExpandedRow({ provider, expandedChecklistRows, setExpandedChecklistRows }) {
    return (
        <Flex gap={5} pt={3} pb={5}>
            <Flex direction={"column"} gap={5} w={160}>
                <Status provider={provider} />
                <Links provider={provider} />
            </Flex>
            <Flex direction={"column"} gap={5} w={400}>
                <Flex className={"expandContentBox"} minH={150}>
                    <Text>🏗️ Description coming soon! 🏗️</Text>
                </Flex>
                <Flex className={"expandContentBox"} grow={1}>
                    <Text>🏗️ Staking Type coming soon! 🏗️</Text>
                </Flex>
                <Flex className={"expandContentBox"} grow={1}>
                    <Text>🏗️ Provider Type coming soon! 🏗️</Text>
                </Flex>
            </Flex>
            <Flex direction={"column"} gap={5} w={220}>
                <Flex direction={"column"} className={"expandContentBox"} p={0} overflow={"hidden"}>
                    <KeyOwner provider={provider} id={"validatorKey"} />
                    <KeyOwner provider={provider} id={"withdrawalKey"} />
                </Flex>
                <Flex direction={"column"} className={"expandContentBox"} grow={1} gap={3}>
                    <Text>Locations</Text>
                    <Text>🏗️ Coming soon! 🏗️</Text>
                </Flex>
            </Flex>
            <ChecklistList provider={provider} expandedChecklistRows={expandedChecklistRows} setExpandedChecklistRows={setExpandedChecklistRows} />
        </Flex>
    )
}
