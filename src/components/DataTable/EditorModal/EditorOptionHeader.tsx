import { Flex, Text, Box, Tooltip, IconButton } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons"

export default function EditorOptionHeader({ id, name, updatedValues, setUpdatedValues }) {
    return (
        <Flex gap={5} alignItems={"center"} justifyContent={"space-between"} h={8}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
                {name}
            </Text>
            {updatedValues[id] != null && (
                <Flex gap={2} alignItems={"center"}>
                    <Box className={"editedLozenge"} cursor={"default"}>
                        Edited
                    </Box>
                    <Tooltip
                        placement={"top"}
                        gutter={8}
                        label={<Box className={"tooltipLabel"}>Reset option</Box>}
                        className="tooltipArrow"
                        hasArrow={true}
                    >
                        <IconButton
                            aria-label="Reset option"
                            icon={<FontAwesomeIcon icon={faRotateLeft} />}
                            borderRadius={20}
                            h={7}
                            onClick={() => {
                                const updatedValuesCopy = { ...updatedValues }
                                delete updatedValuesCopy[id]
                                setUpdatedValues(updatedValuesCopy)
                            }}
                        />
                    </Tooltip>
                </Flex>
            )}
        </Flex>
    )
}
