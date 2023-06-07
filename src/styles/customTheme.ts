import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"

const customTheme = extendTheme({
    components: {
        Table: {
            variants: {
                DataTable: {
                    thead: {
                        th: (props: StyleFunctionProps) => ({
                            borderColor: props.colorMode === "dark" ? "tableBorder.light" : "tableBorder.dark",
                            padding: "0.5rem",
                            fontWeight: "800",
                            verticalAlign: "bottom",
                            textAlign: "center",
                        }),
                    },
                    tbody: {
                        tr: (props) => ({
                            _hover: {
                                bg: props.colorMode === "dark" ? "pageBackgroundHover.light" : "pageBackgroundHover.dark",
                            },
                            td: {
                                borderColor: props.colorMode === "dark" ? "tableBorder.light" : "tableBorder.dark",
                                paddingX: "0.5rem",
                                paddingY: "0",
                                textAlign: "center",
                            },
                        }),
                    },
                },
            },
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#1B1B1B",
        },
        pageBackgroundHover: {
            light: "#D3D3D3",
            dark: "#2f2f2f",
        },
        contentBackground: {
            light: "#EDF2F7",
            dark: "#272A2F",
        },
        border: {
            light: "#D3D3D3",
            dark: "#333333",
        },
        tableBorder: {
            light: "#D3D3D3",
            dark: "#424242",
        },
        divider: {
            light: "#dfdfdf",
            dark: "#565656",
        },
    },
})

export default customTheme
