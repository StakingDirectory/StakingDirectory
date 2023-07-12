import React from "react"
import { Flex, Text, Box, Button } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faUsers, faCoins, faServer, faHardDrive, faHouse } from "@fortawesome/free-solid-svg-icons"

// TODO: Pull the colors from the dataProps
const buttonData = [
    {
        icon: faHouse,
        color: "green",
        text: "I want to stake from home",
        value: "stakeFromHome",
        type: "stakeFromHome",
    },
    {
        icon: faServer,
        color: "red",
        text: "I want to stake with a managed service",
        value: "managed",
        type: "stakingType",
    },
    {
        icon: faCoins,
        color: "gold",
        text: "I want a Liquid Staking Token (LST)",
        value: "lst",
        type: "stakingType",
    },
    {
        icon: faHardDrive,
        color: "",
        text: "I want to buy ready-to-use hardware",
        value: "hardware",
        type: "providerType",
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
                setDataFilter({ [data.type]: data.value.split(", ").map((item) => item.trim()) })
            }}
            variant="MainFilterButton"
            flex={1}
            minW={{ base: "50%", md: "80px" }}
            h={{ base: "fit-content", md: "100%" }}
            w={{ base: "", md: "500px" }}
            alignItems={"top"}
            justifyContent={{ base: "space-between", sm: "center" }}
        >
            <Flex direction={{ base: "row", md: "column" }} alignItems="center" gap={3}>
                <Box as={FontAwesomeIcon} icon={data.icon} size="xl" color={data.color} />
                <Flex wrap="wrap" fontWeight={"bold"} textAlign={{ base: "start", sm: "center" }}>
                    {data.text}
                </Flex>
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
