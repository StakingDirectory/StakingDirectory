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
    }, [value, ref])

    return <Textarea ref={ref} value={value} onChange={handleChange} {...props} resize="none" />
})
ResizableTextArea.displayName = "ResizableTextArea"

const valueGetter = (id, obj) => {
    if (id.includes(".")) {
        const [mainProp, subProp] = id.split(".")
        return obj[mainProp] && obj[mainProp][subProp]
    }
    return obj[id]
}

export default function EditorOption({
    id,
    name,
    placeholder = null,
    description = null,
    inputType,
    options = [],
    updatedValues,
    setUpdatedValues,
    provider,
}) {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getNestedValue = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj)

    const updateValues = (option, value) => {
        const parts = option.split(".")

        // const existingValue = parts.length > 1 ? provider[parts[0]][parts[1]] : provider[parts[0]]
        const existingValue = parts.length > 1 ? provider[parts[0]]?.[parts[1]] : provider[parts[0]]

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
                    <InputLeftAddon className="EditorInputLeftAddon" cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                        {name}
                    </InputLeftAddon>
                    <Input
                        maxW="100%"
                        variant={"EditorInput"}
                        value={getNestedValue(updatedValues, id) != null ? getNestedValue(updatedValues, id) : getNestedValue(provider, id)}
                        placeholder={placeholder ? placeholder : `${name}...`}
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
                    <InputLeftAddon className="EditorInputLeftAddon" cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                        {name}
                    </InputLeftAddon>
                    <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                        <MenuButton
                            as={Button}
                            variant={"EditorSelector"}
                            mr={8}
                            borderLeftRadius={0}
                            onClick={() => setIsMenuOpen(true)}
                            _hover={{ bg: "" }}
                            _active={{ bg: "" }}
                        >
                            <Flex gap={2} justifyContent={"space-between"}>
                                <Text>
                                    {getNestedValue(updatedValues, id)
                                        ? providerProperties.find((prop) => prop.value === getNestedValue(updatedValues, id))?.name
                                        : providerProperties.find((prop) => prop.value === getNestedValue(provider, id))?.name}
                                </Text>
                                <Box>
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </Box>
                            </Flex>
                        </MenuButton>
                        <MenuList minW={1}>
                            <MenuOptionGroup
                                value={getNestedValue(updatedValues, id) ? getNestedValue(updatedValues, id) : getNestedValue(provider, id)}
                                type="radio"
                            >
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
                <Flex direction={"column"} wrap={"wrap"} gap={2}>
                    <Flex wrap={"wrap"}>
                        <InputLeftAddon className="EditorInputLeftAddon" cursor={"default"} fontWeight={"bold"} borderLeftRadius={"10px"}>
                            {name}
                        </InputLeftAddon>
                        <Menu variant={"EditorSelector"} placement="bottom-start" gutter={2} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                            <MenuButton
                                as={Button}
                                variant={"EditorSelector"}
                                mr={8}
                                borderLeftRadius={0}
                                onClick={() => setIsMenuOpen(true)}
                                bg={
                                    valueGetter(id, updatedValues) == null
                                        ? valueGetter(id, provider)
                                            ? "green"
                                            : "red"
                                        : valueGetter(id, updatedValues)
                                        ? "green"
                                        : "red"
                                }
                                _hover={{ bg: "" }}
                                _active={{ bg: "" }}
                            >
                                <Flex gap={2} justifyContent={"space-between"}>
                                    <Text>
                                        {valueGetter(id, updatedValues) == null
                                            ? valueGetter(id, provider)
                                                ? "Yes"
                                                : "No"
                                            : valueGetter(id, updatedValues)
                                            ? "Yes"
                                            : "No"}
                                    </Text>
                                    <Box>
                                        <FontAwesomeIcon icon={faChevronDown} />
                                    </Box>
                                </Flex>
                            </MenuButton>
                            <MenuList minW={1}>
                                <MenuOptionGroup
                                    value={
                                        valueGetter(id, updatedValues) == null
                                            ? valueGetter(id, provider)
                                                ? "Yes"
                                                : "No"
                                            : valueGetter(id, updatedValues)
                                            ? "Yes"
                                            : "No"
                                    }
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
                    </Flex>
                    {description && (
                        <Box pb={3}>
                            {typeof description === "object" && description !== null
                                ? description[valueGetter(id, updatedValues) == null ? valueGetter(id, provider) : valueGetter(id, updatedValues)]
                                : description}
                        </Box>
                    )}
                </Flex>
            )}
        </InputGroup>
    )
}
