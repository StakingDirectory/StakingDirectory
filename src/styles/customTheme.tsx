import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"

const customTheme = extendTheme({
    components: {
        Table: {
            variants: {
                DataTable: (props: StyleFunctionProps) => ({
                    th: {
                        borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                        padding: "0.5rem",
                        fontWeight: "800",
                        verticalAlign: "bottom",
                        textAlign: "center",
                    },
                    tr: {
                        _hover: {
                            bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                        },
                        td: {
                            borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                            paddingX: "0.5rem",
                            paddingY: "0",
                            textAlign: "center",
                        },
                    },
                }),
            },
        },

        Menu: {
            parts: ["list", "item"],
            baseStyle: (props: StyleFunctionProps) => ({
                list: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                    borderRadius: "10px",
                },
                item: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                    focus: {
                        bg: props.colorMode === "dark" ? "contentBackgroundHover.dark" : "contentBackgroundHover.light",
                    },
                },
            }),
        },
    },
    colors: {
        pageBackground: {
            light: "#FFFFFF",
            dark: "#1B1B1B",
        },
        pageBackgroundHover: {
            light: "#EDF2F7",
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
            light: "#dfdfdf",
            dark: "#424242",
        },
        divider: {
            light: "#dfdfdf",
            dark: "#565656",
        },
        gold: "#e7c60d",
        red: "#EC420C",
        green: "#16913f",
    },
})

export default customTheme
