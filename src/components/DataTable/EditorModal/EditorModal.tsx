import React, { useRef, useEffect, useState } from "react"

import {
    useToast,
    Flex,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    MenuOptionGroup,
    MenuItemOption,
    MenuDivider,
    Image,
    Input,
    InputGroup,
    InputLeftAddon,
    Code,
    IconButton,
    Tooltip,
} from "@chakra-ui/react"

import OptionSelector from "./OptionSelector"
import EditorOption from "./EditorOption"
import EditorOptionHeader from "./EditorOptionHeader"
import EditorFooter from "./EditorFooter"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faRotateLeft } from "@fortawesome/free-solid-svg-icons"

import dataProps from "public/data/dataProps"
const providerProperties = dataProps.find((prop) => prop.id === "providerProperties").providerProperties

/* Hacky solution to z-index issue
For some reason that I couldn't work out, the selectors didn't have the correct z-indexes when they were rendered in the modal.
So, I had to manually calculate the z-indexes for each option, and pass them down to the EditorOption component.
If there are multiple EditorOption components in a single editorOptionContainer then you need to count down from the top

e.g. for each EditorOption component, the z-index should be the z-index of the previous EditorOption minus 1
zIndex={calcZIndex("status")}
zIndex={calcZIndex("status") - 1}
zIndex={calcZIndex("status") - 2}

That's why the calcZIndex multiplies the index of the option by 100 so it is very unlikely to clash with other z-indexes
*/
const allOptions = ["name", "stakingType", "status", "statusTest", "mainnetLaunch.date", "mainnetLaunch.evidenceLink"]
const calcZIndex = (option) => {
    return (allOptions.length - allOptions.indexOf(option)) * 100
}

export default function EditorModal({ isOpen, onClose, provider }) {
    const toast = useToast()

    const [currentSelection, setCurrentSelection] = useState("allOptions")
    const [updatedValues, setUpdatedValues] = useState({})

    const closeEditor = () => {
        setCurrentSelection("allOptions")
        setUpdatedValues({})
        toast.closeAll()
        onClose()
    }

    return (
        <Modal
            isOpen={isOpen}
            isCentered
            closeOnOverlayClick={true}
            onClose={() => {
                if (Object.keys(updatedValues).length > 0) {
                    if (!toast.isActive("data-changed")) {
                        toast({
                            id: "data-changed",
                            position: "top",
                            render: () => (
                                <Box className={"ToastBaseStyle ToastWarning"}>
                                    {process.env.NODE_ENV === "development" ? "Save changes" : "Suggest update"} or cancel before closing the editor
                                </Box>
                            ),
                            duration: 3000,
                        })
                    }
                } else {
                    closeEditor()
                }
            }}
        >
            <ModalOverlay />
            <ModalContent h={"80vh"} minW="50vw" overflow={"hidden"}>
                <ModalHeader fontWeight={"extrabold"} fontSize={"initial"}>
                    <Flex gap={5} alignItems={"center"} wrap={"wrap"} justifyContent={"space-between"}>
                        <Flex gap={3} alignItems={"center"} fontSize={"xl"}>
                            <Image objectFit="contain" boxSize={8} src={provider.logo.src} alt={provider.logo.alt} borderRadius={"100%"} />
                            <Text isTruncated>{provider.name}</Text>
                        </Flex>
                        <OptionSelector
                            provider={provider}
                            currentSelection={currentSelection}
                            setCurrentSelection={setCurrentSelection}
                            updatedValues={updatedValues}
                        />
                    </Flex>
                </ModalHeader>
                <ModalBody overflowY={"scroll"} pt={0}>
                    {(currentSelection == "name" || currentSelection == "allOptions") && (
                        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
                            <EditorOptionHeader id={"name"} name={`Update Name`} updatedValues={updatedValues} setUpdatedValues={setUpdatedValues} />
                            <EditorOption
                                zIndex={calcZIndex("name")}
                                id="name"
                                name="Name"
                                inputType="input"
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        </Flex>
                    )}
                    {(currentSelection == "stakingType" || currentSelection == "allOptions") && (
                        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
                            <EditorOptionHeader
                                id={"stakingType"}
                                name={`Update Staking Type`}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                            />
                            <EditorOption
                                zIndex={calcZIndex("stakingType")}
                                id="stakingType"
                                name="Staking Type"
                                inputType="select"
                                options={dataProps
                                    .flatMap((dataProp) => dataProp)
                                    .find((prop) => prop?.id === "stakingType")
                                    ?.options.map((option) => ({
                                        value: option.value,
                                        name: providerProperties.find((prop) => prop.value === option.value)?.name,
                                    }))}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        </Flex>
                    )}
                    {(currentSelection == "status" || currentSelection == "allOptions") && (
                        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
                            <EditorOptionHeader
                                id={"status"}
                                name={`Update Status`}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                            />
                            <EditorOption
                                zIndex={calcZIndex("status")}
                                id="status"
                                name="Status"
                                inputType="select"
                                options={[
                                    { value: "active", name: "Active" },
                                    { value: "dev", name: "In development" },
                                ]}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        </Flex>
                    )}
                    {(currentSelection == "mainnetLaunch" || currentSelection == "allOptions") && (
                        <Flex className={"editorOptionContainer"} direction={"column"} gap={3}>
                            <EditorOptionHeader
                                id={"mainnetLaunch"}
                                name={`Update Mainnet Launch Date`}
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                            />
                            <EditorOption
                                zIndex={calcZIndex("mainnetLaunch.date")}
                                id="mainnetLaunch.date"
                                name="Mainnet Launch Date"
                                inputType="input"
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                            <EditorOption
                                zIndex={calcZIndex("mainnetLaunch.evidenceLink")}
                                id="mainnetLaunch.evidenceLink"
                                name="Evidence Link"
                                inputType="input"
                                updatedValues={updatedValues}
                                setUpdatedValues={setUpdatedValues}
                                provider={provider}
                            />
                        </Flex>
                    )}
                </ModalBody>
                <ModalFooter>
                    <EditorFooter onClose={closeEditor} provider={provider} updatedValues={updatedValues} setUpdatedValues={setUpdatedValues} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
