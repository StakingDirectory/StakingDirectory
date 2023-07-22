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
const keyOwnerProperties = dataProps.find((prop) => prop.id === "keyOwnerProperties").keyOwnerProperties
const checklistProperties = dataProps.find((prop) => prop.id === "checklistProperties").checklistProperties

const allOptions = [
    {
        id: "name",
        headerName: "Name",
        fields: [
            {
                id: "name",
                name: "Name",
                inputType: "input",
            },
        ],
    },
    {
        id: "logo",
        headerName: "Logo",
        fields: [
            {
                id: "logo.evidenceLink",
                name: "Logo Link",
                inputType: "input",
            },
        ],
    },
    {
        id: "status",
        headerName: "Status",
        fields: [
            {
                id: "status",
                name: "Status",
                inputType: "select",
                options: [
                    { value: "active", name: "Active" },
                    { value: "dev", name: "In development" },
                ],
            },
        ],
    },
    {
        id: "mainnetLaunch",
        headerName: "Mainnet Launch Date",
        fields: [
            {
                id: "mainnetLaunch.date",
                name: "Mainnet Launch Date",
                inputType: "input",
                placeholder: "YYYY-MM-DD",
            },
            {
                id: "mainnetLaunch.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
            },
        ],
    },
    {
        id: "description",
        headerName: "Description (Supports markdown)",
        fields: [
            {
                id: "description",
                name: "Description",
                inputType: "textarea",
            },
        ],
    },
    {
        id: "stakeFromHome",
        headerName: "Stake from Home",
        fields: [
            {
                id: "stakeFromHome",
                name: "Stake from home?",
                inputType: "selectBool",
            },
        ],
    },
    {
        id: "stakingType",
        headerName: "Staking Type",
        fields: [
            {
                id: "stakingType",
                name: "Staking Type",
                inputType: "select",
                options: dataProps
                    .flatMap((dataProp) => dataProp)
                    .find((prop) => prop?.id === "stakingType")
                    ?.options.map((option) => ({
                        value: option.value,
                        name: providerProperties.find((prop) => prop.value === option.value)?.name,
                    })),
            },
        ],
    },
    {
        id: "providerType",
        headerName: "Provider Type",
        fields: [
            {
                id: "providerType",
                name: "Hardware provider?",
                inputType: "select",
                options: [
                    { value: "hardware", name: "Yes" },
                    { value: "no", name: "No" },
                ],
            },
        ],
    },
    {
        id: "fee",
        headerName: "Fee",
        fields: [
            {
                id: "fee.type",
                name: "Fee Type",
                inputType: "select",
                options: [
                    { value: "percentage", name: "Percentage" },
                    { value: "other", name: "Other" },
                ],
            },
            {
                id: "fee.value",
                name: "Fee Value",
                inputType: "input",
            },
        ],
    },
    {
        id: "minStake",
        headerName: "Min Stake",
        fields: [
            {
                id: "minStake.type",
                name: "Min Stake",
                inputType: "select",
                options: [
                    { value: "eth", name: "ETH" },
                    { value: "anyAmount", name: "Any Amount" },
                ],
            },
            {
                id: "minStake.value",
                name: "Min Stake Value",
                inputType: "input",
            },
        ],
    },
    {
        id: "validatorKey",
        headerName: "Validator Key",
        fields: [
            {
                id: "validatorKey.userValidator",
                name: "User controlled?",
                inputType: "selectBool",
                description: keyOwnerProperties.find((prop) => prop.value === "userValidator").description,
            },
            {
                id: "validatorKey.service",
                name: "Service controlled?",
                inputType: "selectBool",
                description: keyOwnerProperties.find((prop) => prop.value === "service").description,
            },
            {
                id: "validatorKey.nodeOperator",
                name: "Node operator controlled?",
                inputType: "selectBool",
                description: keyOwnerProperties.find((prop) => prop.value === "nodeOperator").description,
            },
        ],
    },
    {
        id: "withdrawalKey",
        headerName: "Withdrawal Key",
        fields: [
            {
                id: "withdrawalKey.userWithdrawal",
                name: "User controlled?",
                inputType: "selectBool",
                description: keyOwnerProperties.find((prop) => prop.value === "userWithdrawal").description,
            },
            {
                id: "withdrawalKey.smartContract",
                name: "Smart contract controlled?",
                inputType: "selectBool",
                description: keyOwnerProperties.find((prop) => prop.value === "smartContract").description,
            },
        ],
    },
    {
        id: "links",
        headerName: "Links",
        fields: [
            {
                id: "links.website",
                name: "Website",
                inputType: "input",
                placeholder: "https://...",
            },
            {
                id: "links.twitter",
                name: "Twitter",
                inputType: "input",
                placeholder: "https://...",
            },
            {
                id: "links.discord",
                name: "Discord",
                inputType: "input",
                placeholder: "https://...",
            },
            {
                id: "links.telegram",
                name: "Telegram",
                inputType: "input",
                placeholder: "https://...",
            },
            {
                id: "links.repo",
                name: "Repo",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "openSource",
        headerName: "Open Source",
        fields: [
            {
                id: "openSource.value",
                name: "Open Source?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "openSource").description,
            },
            {
                id: "openSource.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "audited",
        headerName: "Audited",
        fields: [
            {
                id: "audited.value",
                name: "Audited?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "audited").description,
            },
            {
                id: "audited.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "bugBounty",
        headerName: "Bug Bounty",
        fields: [
            {
                id: "bugBounty.value",
                name: "Bug Bounty?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "bugBounty").description,
            },
            {
                id: "bugBounty.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "permissionlessUsage",
        headerName: "Permissionless Usage",
        fields: [
            {
                id: "permissionlessUsage.value",
                name: "Permissionless Usage?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "permissionlessUsage").description,
            },
            {
                id: "permissionlessUsage.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "permissionlessOperators",
        headerName: "Permissionless Operators",
        fields: [
            {
                id: "permissionlessOperators.value",
                name: "Permissionless Operators?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "permissionlessOperators").description,
            },
            {
                id: "permissionlessOperators.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "nonCensoringRelays",
        headerName: "Censorship Resistant Relays",
        fields: [
            {
                id: "nonCensoringRelays.value",
                name: "Censorship Resistant Relays?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "nonCensoringRelays").description,
            },
            {
                id: "nonCensoringRelays.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "diverseExecutionClients",
        headerName: "Diverse Execution Clients",
        fields: [
            {
                id: "diverseExecutionClients.value",
                name: "Diverse Execution Clients?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "diverseExecutionClients").description,
            },
            {
                id: "diverseExecutionClients.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
    {
        id: "diverseBeaconClients",
        headerName: "Diverse Beacon Clients",
        fields: [
            {
                id: "diverseBeaconClients.value",
                name: "Diverse Beacon Clients?",
                inputType: "selectBool",
                description: checklistProperties.find((prop) => prop.value === "diverseBeaconClients").description,
            },
            {
                id: "diverseBeaconClients.evidenceLink",
                name: "Evidence Link",
                inputType: "input",
                placeholder: "https://...",
            },
        ],
    },
]

function generateRandomId(): number {
    const characters = "123456789"
    let result = ""

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(randomIndex)
    }
    return Number(result)
}

export default function EditorModal({ isOpen, onClose, provider, newProvider = false }) {
    const toast = useToast()

    const [currentSelection, setCurrentSelection] = useState("allOptions")
    const [updatedValues, setUpdatedValues] = useState({})

    const closeEditor = () => {
        setCurrentSelection("allOptions")
        setUpdatedValues({})
        toast.closeAll()
        onClose()
    }

    // If it's a new provider, a unique ID needs to be generated
    useEffect(() => {
        if (newProvider) {
            setUpdatedValues(provider[0])
            setUpdatedValues((prevState) => ({ ...prevState, id: generateRandomId() }))
        }
    }, [isOpen])

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
                            <Image
                                objectFit="contain"
                                boxSize={8}
                                src={provider.logo?.src ? provider.logo?.src : "./StakingDirectoryLogo.svg"}
                                alt={provider.logo?.alt ? provider.logo?.alt : "Staking Directory Logo"}
                                borderRadius={"100%"}
                            />
                            <Text isTruncated>{provider.name}</Text>
                            {newProvider && <Text>Create new provider</Text>}
                        </Flex>
                        <OptionSelector
                            zIndex={999}
                            provider={provider}
                            currentSelection={currentSelection}
                            setCurrentSelection={setCurrentSelection}
                            updatedValues={updatedValues}
                        />
                    </Flex>
                </ModalHeader>
                <ModalBody overflowY={"scroll"} pt={0}>
                    {allOptions.map((option, index) => {
                        return (
                            (currentSelection == option.id || currentSelection == "allOptions") && (
                                <Flex className={"editorOptionContainer"} direction={"column"} gap={4} key={index}>
                                    <EditorOptionHeader
                                        id={option.id}
                                        name={option.headerName}
                                        updatedValues={updatedValues}
                                        setUpdatedValues={setUpdatedValues}
                                    />
                                    {option.fields.map((field, fieldIndex) => (
                                        <EditorOption
                                            id={field.id}
                                            name={field.name}
                                            placeholder={field.placeholder}
                                            description={field.description}
                                            inputType={field.inputType}
                                            options={field.options}
                                            updatedValues={updatedValues}
                                            setUpdatedValues={setUpdatedValues}
                                            provider={provider}
                                            key={fieldIndex}
                                        />
                                    ))}
                                </Flex>
                            )
                        )
                    })}
                </ModalBody>
                <ModalFooter>
                    <EditorFooter
                        onClose={closeEditor}
                        provider={provider}
                        updatedValues={updatedValues}
                        setUpdatedValues={setUpdatedValues}
                        newProvider={newProvider}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
