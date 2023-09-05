import { Flex, Text } from "@chakra-ui/react"

export default function Status({ provider }) {
    return (
        <Flex direction={"column"} gap={3} className={"expandContentBoxSmall"} cursor={"default"}>
            <Flex direction="row" gap={2} justifyContent={"center"} alignItems={"center"} wrap={"wrap"}>
                <Text fontWeight={"bold"}>Status</Text>
                <Flex fontWeight={"bold"} px={"6px"} py={"3px"} borderRadius={5} bg={provider.status == "active" ? "green" : "blue"}>
                    {provider.status == "active" ? (
                        <Flex gap={3} justifyContent={"center"} alignItems={"center"}>
                            <Text>Active</Text>
                        </Flex>
                    ) : (
                        "Development"
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}
