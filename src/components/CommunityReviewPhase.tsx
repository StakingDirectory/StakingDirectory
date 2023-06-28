import React, { useState } from "react"

import { useBreakpointValue, Flex, Text, Box, Link, Collapse, MenuButton, Menu } from "@chakra-ui/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight, faDownLong, faPencil, faRightLong, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons"
import NextLink from "next/link"

const InfoBlock = ({ icon, color, children }) => (
    <Flex wrap={{ base: "wrap", sm: "nowrap" }} gap={5}>
        <Flex alignItems={"center"} justifyContent={"center"} grow={1} minW={"60px"} color={color} mt={{ base: "20px", sm: "0" }}>
            <FontAwesomeIcon icon={icon} size={"2x"} />
        </Flex>
        <Text textAlign={{ base: "center", sm: "inherit" }} fontWeight={"medium"}>
            {children}
        </Text>
    </Flex>
)

export default function CommunityReviewPhase() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Flex w={"100%"} maxW={"1600px"} px={{ base: "10px", sm: "2vw", xl: "5vw", "2xl": "3vw" }} mb={10}>
            <Flex className={"CommunityReviewPhase"} direction={"column"} w={"100%"} overflow={"hidden"}>
                <Flex
                    className={"CommunityReviewPhaseHeader"}
                    p={"1rem"}
                    alignItems={{ base: "start", sm: "center" }}
                    gap={3}
                    cursor={"pointer"}
                    onClick={() => {
                        setIsOpen(!isOpen)
                    }}
                >
                    <Box
                        as={FontAwesomeIcon}
                        icon={faChevronRight}
                        transition="all 0.2s"
                        size={"xl"}
                        transform={`rotate(${isOpen ? 90 : 0}deg)`}
                        pt={{ base: "1", sm: "0" }}
                        mr={1}
                        ml={1}
                    />
                    <Flex alignItems={"center"} gap={15} wrap={"wrap"}>
                        <Text fontSize={{ base: "xl", sm: "2lx" }} fontWeight={"extrabold"} mr={5}>
                            Community Review Phase
                        </Text>
                        {!isOpen && (
                            <>
                                <Box as={FontAwesomeIcon} icon={faUsers} size={"xl"} color={"blue"} />
                                <Box as={FontAwesomeIcon} icon={faRightLong} size={"xl"} />
                                <Box as={FontAwesomeIcon} icon={faPencil} size={"xl"} color={"orange"} />
                                <Box as={FontAwesomeIcon} icon={faRightLong} size={"xl"} />
                                <Box as={FontAwesomeIcon} icon={faTrophy} size={"xl"} color={"gold"} />
                            </>
                        )}
                    </Flex>
                </Flex>
                <Collapse in={isOpen}>
                    <Box px={"1rem"}>
                        <Box mt={3}></Box>
                        <InfoBlock icon={faUsers} color={"blue"}>
                            The Community Review Phase is a crucial step before our main launch. It&apos;s an opportunity for the Ethereum staking
                            community to help us ensure the accuracy and relevance of our data. We understand the importance of trust in this space,
                            and that trust is built on accurate, up-to-date information.
                        </InfoBlock>
                        {useBreakpointValue({ base: false, sm: true }) && (
                            <Flex alignItems={"center"} justifyContent={"center"} w={"60px"} pt={3}>
                                <Box as={FontAwesomeIcon} icon={faDownLong} size={"xl"} />
                            </Flex>
                        )}
                        <InfoBlock icon={faPencil} color={"orange"}>
                            During this phase, we encourage you to review our data and make any necessary updates. If you notice any inaccuracies, or
                            if you have more current information, simply click the{" "}
                            <Menu variant={"DataTableOption"} placement="right" gutter={3}>
                                <MenuButton aria-label="Options" borderRadius={10} w={"130px"} h={8} cursor={"default"}>
                                    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"} gap={2}>
                                        <FontAwesomeIcon icon={faPencil} />
                                        <Box>Update me!</Box>
                                    </Flex>
                                </MenuButton>
                            </Menu>{" "}
                            button located at the end of each row. This will allow you to submit your suggestions, which will automatically create a
                            GitHub Pull Request (PR) that can be reviewed by our team. You can view all the open PRs{" "}
                            <Link
                                as={NextLink}
                                href={"https://github.com/StakingDirectory/StakingDirectory/pulls"}
                                color={"blue"}
                                textDecoration={"underline"}
                                target="_blank"
                            >
                                here
                            </Link>
                            .
                        </InfoBlock>
                        {useBreakpointValue({ base: false, sm: true }) && (
                            <Flex alignItems={"center"} justifyContent={"center"} w={"60px"} pt={3}>
                                <Box as={FontAwesomeIcon} icon={faDownLong} size={"xl"} />
                            </Flex>
                        )}
                        <InfoBlock icon={faTrophy} color={"gold"}>
                            We also want to acknowledge the contributions of our community members. If you would like to be recognized for your
                            contribution to this resource, you can add your Ethereum address or ENS when you suggest an update. Please note that this
                            address will be publicly visible on the GitHub PR and will be used exclusively for sending POAPs as a symbol of our
                            appreciation. Your contributions are what make this resource valuable, and we thank you in advance for your participation
                            in the Community Review Phase.
                        </InfoBlock>
                        <Box pb={8}></Box>
                    </Box>
                </Collapse>
            </Flex>
        </Flex>
    )
}
