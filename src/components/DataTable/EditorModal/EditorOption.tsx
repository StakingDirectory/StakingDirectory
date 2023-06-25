import React, { useRef, useEffect, useState } from "react"

import {
    Flex,
    Menu,
    MenuButton,
    MenuList,
    Button,
    Text,
    Box,
    MenuOptionGroup,
    MenuItemOption,
    Input,
    InputGroup,
    InputLeftAddon,
} from "@chakra-ui/react"

import EditorOptionHeader from "./EditorOptionHeader"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const EditorOptionContainer = ({ children }) => {
    return (
        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
            {children}
        </Flex>
    )
}

export default function EditorOption({ id, name, inputType, options = [], updatedValues, setUpdatedValues, provider }) {
    const nameInputRef = useRef<HTMLInputElement | null>(null)

    const updateValues = (option, value) => {
        if (JSON.stringify(value) === JSON.stringify(provider[option]) || value === "") {
            const updatedValuesCopy = { ...updatedValues }
            delete updatedValuesCopy[option]
            setUpdatedValues(updatedValuesCopy)
        } else {
            setUpdatedValues({ ...updatedValues, [option]: value })
        }
    }

    return (
        <EditorOptionContainer>
            <EditorOptionHeader id={id} name={`Update ${name}`} updatedValues={updatedValues} setUpdatedValues={setUpdatedValues} />
            <InputGroup>
                {inputType === "input" && (
                    <>
                        <InputLeftAddon cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                            {name}
                        </InputLeftAddon>
                        <Input
                            variant={"EditorInput"}
                            value={updatedValues[id] ? updatedValues[id] : provider[id]}
                            placeholder={`${name}...`}
                            ref={nameInputRef}
                            onChange={() => {
                                if (nameInputRef.current) {
                                    updateValues(id, nameInputRef.current.value)
                                }
                            }}
                        />
                    </>
                )}

                {inputType === "select" && (
                    <>
                        <InputLeftAddon cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                            {name}
                        </InputLeftAddon>
                        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2}>
                            <MenuButton as={Button} variant={"EditorSelector"} mr={8} borderLeftRadius={0}>
                                <Flex gap={2} justifyContent={"space-between"}>
                                    <Text>
                                        {
                                            providerProperties.find((prop) => prop.value === (updatedValues[id] ? updatedValues[id] : provider[id]))
                                                ?.name
                                        }
                                    </Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList minW={1}>
                                <MenuOptionGroup value={updatedValues[id] ? updatedValues[id] : provider[id]} type="radio">
                                    {options.map((option) => (
                                        <MenuItemOption key={option.value} value={option.value} onClick={() => updateValues(id, option.value)}>
                                            {option.name}
                                        </MenuItemOption>
                                    ))}
                                </MenuOptionGroup>
                            </MenuList>
                        </Menu>
                    </>
                )}
            </InputGroup>
        </EditorOptionContainer>
    )
}
