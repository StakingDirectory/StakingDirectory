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
    Textarea,
} from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

const ResizableTextArea = React.forwardRef<HTMLTextAreaElement, any>(({ value, onChange, ...props }, ref) => {
    const handleChange = (event) => {
        if (ref && typeof ref !== "function" && ref.current) {
            ref.current.style.height = "unset"
            ref.current.style.height = `${ref.current.scrollHeight}px`
        }
        if (onChange) {
            onChange(event)
        }
    }

    useEffect(() => {
        if (ref && typeof ref !== "function" && ref.current) {
            ref.current.style.height = "unset"
            ref.current.style.height = `${ref.current.scrollHeight + 10}px`
        }
    }, [value])

    return <Textarea ref={ref} value={value} onChange={handleChange} {...props} resize="none" />
})

ResizableTextArea.displayName = "ResizableTextArea"

export default function EditorOption({ id, name, inputType, options = [], updatedValues, setUpdatedValues, provider }) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getNestedValue = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj)

    const updateValues = (option, value) => {
        const parts = option.split(".")

        // Get existing values, if any
        let existingValue = getNestedValue(updatedValues, option)
        if (existingValue == null) {
            existingValue = getNestedValue(provider, option)
        }

        // Compare with new value
        if (JSON.stringify(value) === JSON.stringify(existingValue)) {
            const updatedValuesCopy = { ...updatedValues }
            if (parts.length > 1) {
                delete updatedValuesCopy[parts[0]][parts[1]]
                if (Object.keys(updatedValuesCopy[parts[0]]).length === 0) {
                    delete updatedValuesCopy[parts[0]]
                }
            } else {
                delete updatedValuesCopy[parts[0]]
            }
            setUpdatedValues(updatedValuesCopy)
        } else {
            // Set the new value in the updatedValues
            if (parts.length > 1) {
                setUpdatedValues((prev) => ({
                    ...prev,
                    [parts[0]]: {
                        ...prev[parts[0]],
                        [parts[1]]: value,
                    },
                }))
            } else {
                setUpdatedValues({ ...updatedValues, [option]: value })
            }
        }
    }

    return (
        /* 
        For some reason that I couldn't work out, the selectors didn't have the correct z-indexes when they were rendered in the modal.
        So, as a workaround, when each one is opened, set the zIndex to 999, and when it's closed, set it back to 0.
        */
        <InputGroup zIndex={isMenuOpen ? 999 : 0}>
            {inputType === "input" && (
                <>
                    <InputLeftAddon cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                        {name}
                    </InputLeftAddon>
                    <Input
                        maxW="100%"
                        variant={"EditorInput"}
                        value={getNestedValue(updatedValues, id) != null ? getNestedValue(updatedValues, id) : getNestedValue(provider, id)}
                        placeholder={`${name}...`}
                        ref={inputRef}
                        onChange={() => {
                            if (inputRef.current) {
                                updateValues(id, inputRef.current.value)
                            }
                        }}
                    />
                </>
            )}
            {inputType === "textarea" && (
                <ResizableTextArea
                    maxW="100%"
                    variant={"EditorTextarea"}
                    value={getNestedValue(updatedValues, id) != null ? getNestedValue(updatedValues, id) : getNestedValue(provider, id)}
                    placeholder={`${name}...`}
                    ref={textareaRef}
                    onChange={() => {
                        if (textareaRef.current) {
                            updateValues(id, textareaRef.current.value)
                        }
                    }}
                />
            )}
            {inputType === "select" && (
                <>
                    <InputLeftAddon cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                        {name}
                    </InputLeftAddon>
                    <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                        <MenuButton as={Button} variant={"EditorSelector"} mr={8} borderLeftRadius={0} onClick={() => setIsMenuOpen(true)}>
                            <Flex gap={2} justifyContent={"space-between"}>
                                <Text>
                                    {updatedValues[id]
                                        ? providerProperties.find((prop) => prop.value === updatedValues[id])?.name
                                        : providerProperties.find((prop) => prop.value === provider[id])?.name}
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
            {inputType === "selectBool" && (
                <>
                    <InputLeftAddon cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                        {name}
                    </InputLeftAddon>
                    <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                        <MenuButton as={Button} variant={"EditorSelector"} mr={8} borderLeftRadius={0} onClick={() => setIsMenuOpen(true)}>
                            <Flex gap={2} justifyContent={"space-between"}>
                                <Text>{updatedValues[id] == null ? (provider[id] ? "Yes" : "No") : updatedValues[id] ? "Yes" : "No"}</Text>
                                <Box>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </Box>
                            </Flex>
                        </MenuButton>
                        <MenuList minW={1}>
                            <MenuOptionGroup
                                value={updatedValues[id] == null ? (provider[id] ? "Yes" : "No") : updatedValues[id] ? "Yes" : "No"}
                                type="radio"
                            >
                                <MenuItemOption value={"Yes"} onClick={() => updateValues(id, true)}>
                                    Yes
                                </MenuItemOption>
                                <MenuItemOption value={"No"} onClick={() => updateValues(id, false)}>
                                    No
                                </MenuItemOption>
                            </MenuOptionGroup>
                        </MenuList>
                    </Menu>
                </>
            )}
        </InputGroup>
    )
}
