import { useDisclosure, Button, Box, Text, Flex } from "@chakra-ui/react"

import stakingProviders from "public/data/stakingProviders.json"

import EditorModal from "./DataTable/EditorModal/EditorModal"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCirclePlus, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function AddProviderButton() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const filterStakingProviders = () => {
        return stakingProviders.filter((provider) => {
            if (provider.id == "TEMPLATE") {
                return true
            }
        })
    }

    return (
        <>
            <Button
                aria-label="Add new staking provider"
                variant="AddNewProvider"
                onClick={(e) => {
                    onOpen()
                }}
            >
                <Flex gap={3} alignItems={"center"}>
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                    Add a new staking provider
                </Flex>
            </Button>
            <EditorModal isOpen={isOpen} onClose={onClose} provider={filterStakingProviders()} newProvider={true} />
        </>
    )
}
