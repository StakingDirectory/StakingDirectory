import { IconButton, Tooltip, Box } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function ClearFiltersButton({ dataFilter, setDataFilter }) {
    return (
        <Box w={"32px"}>
            {dataFilter && Object.keys(dataFilter).length > 0 ? (
                <Tooltip gutter={4} label="Remove all filters" openDelay={200}>
                    <IconButton
                        color="purple"
                        variant="ghost"
                        aria-label="Clear filters"
                        size="sm"
                        icon={<FontAwesomeIcon icon={faFilterCircleXmark} size={"lg"} />}
                        onClick={() => {
                            setDataFilter({})
                        }}
                    />
                </Tooltip>
            ) : (
                <></>
            )}
        </Box>
    )
}