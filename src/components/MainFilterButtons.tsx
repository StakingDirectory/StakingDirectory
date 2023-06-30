import React from "react"
import { Flex, Text, Box, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faUsers, faCoins, faServer, faHardDrive } from "@fortawesome/free-solid-svg-icons"

// TODO: Pull the colors from the dataProps
const buttonData = [
    {
        icon: faUser,
        color: "green",
        text: "I want to solo stake",
        type: "solo",
    },
    {
        icon: faUsers,
        color: "blue",
        text: "I want to stake with a pool",
        type: "pooled",
    },
    {
        icon: faServer,
        color: "red",
        text: "I want to stake with a managed service",
        type: "managed",
    },
    {
        icon: faCoins,
        color: "gold",
        text: "I want a Liquid Staking Token (LST)",
        type: "lst",
    },
    {
        icon: faHardDrive,
        color: "",
        text: "I want to buy ready-to-use hardware",
        type: "hardware",
    },
]

const MainFilterButton = ({ dataFilter, setDataFilter }) => {
    const quickFiltersRef = React.useRef(null)

    const scrollToQuickFilters = () => {
        window.scrollTo({
            top: quickFiltersRef.current.offsetTop,
            behavior: "smooth",
        })
    }

    const renderButton = (data, index) => (
        <Button
            key={index}
            onClick={() => {
                scrollToQuickFilters()
                setDataFilter({ ...dataFilter, type: [data.type] })
            }}
            variant="MainFilterButton"
            flex={1}
            minW={{ base: "50%", md: "80px" }}
            h={{ base: "fit-content", md: "100%" }}
            w={{ base: "", md: "500px" }}
        >
            <Flex direction={{ base: "row", sm: "column" }} alignItems="center" gap={2}>
                <Box as={FontAwesomeIcon} icon={data.icon} size="xl" color={data.color} />
                <Flex wrap="wrap">{data.text}</Flex>
            </Flex>
        </Button>
    )

    return (
        <Flex w="100%" direction="row" justifyContent="space-between" wrap="wrap" gap={3}>
            <Flex ref={quickFiltersRef} color="pink" alignItems="center" ml={2} fontWeight="bold" fontSize="2xl">
                Quick filters
            </Flex>
            <Flex w="fit-content" direction="row" justifyContent="start" wrap="wrap" gap={3}>
                {buttonData.map(renderButton)}
            </Flex>
        </Flex>
    )
}

export default MainFilterButton
