import { Flex, Menu, MenuButton, MenuList, Button, Text, Box, MenuOptionGroup, MenuItemOption, MenuDivider } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

export default function OptionSelector({ zIndex, provider, currentSelection, setCurrentSelection, updatedValues }) {
    return (
        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
            <MenuButton as={Button} variant={"EditorSelector"}>
                <Flex gap={2} justifyContent={"space-between"}>
                    <Text>
                        {currentSelection == "allOptions"
                            ? "All options"
                            : currentSelection == "stakeFromHome"
                            ? "Stake from home"
                            : currentSelection
                            ? providerProperties.find((prop) => prop.value === currentSelection)?.name
                            : "Select an option..."}
                    </Text>
                    <Box>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </Box>
                </Flex>
            </MenuButton>
            <MenuList minW={1} maxH={275} overflow={"scroll"} zIndex={zIndex}>
                <MenuOptionGroup defaultValue="allOptions" type="radio">
                    <MenuItemOption
                        value="allOptions"
                        onClick={() => {
                            setCurrentSelection("allOptions")
                        }}
                    >
                        All options
                    </MenuItemOption>
                    <MenuDivider borderWidth={5} m={0} />
                    {providerProperties
                        // Filter out properties without a name
                        .filter((prop) => prop.name && provider[prop.value])
                        // Sort the remaining properties alphabetically
                        .sort((a, b) => a.name.localeCompare(b.name))
                        // Map over properties to render MenuItems
                        .map((prop, i) => (
                            <MenuItemOption
                                key={i}
                                value={prop.value}
                                onClick={() => {
                                    setCurrentSelection(prop.value)
                                }}
                            >
                                <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
                                    {prop.name == "Yes!" ? "Stake from home" : prop.name}
                                    {updatedValues[prop.value] && (
                                        <Box className={"editedLozenge"} fontSize={"sm"} paddingY={0}>
                                            Edited
                                        </Box>
                                    )}
                                </Flex>
                            </MenuItemOption>
                        ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    )
}
