import { Flex, Tooltip, Box, Text, Image } from "@chakra-ui/react"

function getFormattedDate(dateString) {
    const date = new Date(dateString)
    const month = date.toLocaleString("default", { month: "short" })
    const year = date.getFullYear()
    return `${month} ${year}`
}

export default function MainnetLaunchDate({ provider }) {
    return (
        <Tooltip
            placement={"top"}
            gutter={8}
            openDelay={300}
            label={<Box className={"tooltipLabel"}>{provider.name} was live at the time the Beacon Chain launched</Box>}
            className="tooltipArrow"
            hasArrow={true}
        >
            <Flex direction={"column"} alignItems={"center"} gap={1}>
                {provider?.mainnetLaunch?.date === "2020-12-01" && (
                    <Image maxW={3} objectFit={"cover"} src={"./EthereumBeaconChainLogo.svg"} alt={"Staking Directory Logo"} />
                )}
                <Text fontWeight={"bold"}>{provider?.mainnetLaunch?.date ? getFormattedDate(provider?.mainnetLaunch?.date) : "-"}</Text>
            </Flex>
        </Tooltip>
    )
}
