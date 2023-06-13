// import React, { useRef, useEffect, useState } from "react"

import { IconButton, Tooltip } from "@chakra-ui/react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"

export default function ClearFiltersButton({ dataFilter, setDataFilter }) {
    return (
        <>
            {dataFilter && Object.keys(dataFilter).length > 0 ? (
                <Tooltip gutter={4} label="Clear filters" openDelay={300}>
                    <IconButton
                        color="blue"
                        variant="ghost"
                        aria-label="Clear filters"
                        size="sm"
                        icon={<FontAwesomeIcon icon={faFilterCircleXmark} />}
                        onClick={() => {
                            setDataFilter({})
                        }}
                    ></IconButton>
                </Tooltip>
            ) : (
                <></>
            )}
        </>
    )
}
