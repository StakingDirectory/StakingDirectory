import { useDisclosure, Button } from "@chakra-ui/react"

import stakingProviders from "public/data/stakingProviders.json"

import EditorModal from "./DataTable/EditorModal/EditorModal"

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
            {" "}
            <Button
                mb={20}
                onClick={(e) => {
                    onOpen()
                }}
            >
                Add new provider
            </Button>
            <EditorModal isOpen={isOpen} onClose={onClose} provider={filterStakingProviders()} newProvider={true} />
        </>
    )
}
