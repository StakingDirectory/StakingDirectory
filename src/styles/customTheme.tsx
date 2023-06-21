import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            ".bgPage": {
                bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
            ".bgContent": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
            },
            ".borderColor": {
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
            },
            ".borderColorDivider": {
                borderColor: props.colorMode === "dark" ? "divider.dark" : "divider.light",
            },
            "div .borderStatusCircle": {
                borderColor: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
            },
        }),
    },
    components: {
        Button: {
            variants: {
                ActiveFilters: (props: StyleFunctionProps) => ({
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    },
                }),
            },
        },
        Table: {
            variants: {
                DataTable: (props: StyleFunctionProps) => ({
                    th: {
                        bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                        borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                        paddingTop: "1rem",
                        paddingLeft: "0.5rem",
                        paddingRight: "0.5rem",
                        paddingBottom: "0",
                        fontWeight: "800",
                        verticalAlign: "bottom",
                        textAlign: "center",
                    },
                    tbody: {
                        tr: {
                            _hover: {
                                bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                            },
                            td: {
                                borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                                paddingX: "0.5rem",
                                paddingY: "0",
                            },
                        },
                    },
                }),
            },
        },
        Tooltip: {
            baseStyle: (props: StyleFunctionProps) => ({
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                color: props.colorMode === "dark" ? "text.dark" : "text.light",
                borderColor: "white",
                maxWidth: "500px",
                textAlign: "center",
                borderWidth: "1px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "sm",
                padding: "0.6rem",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                _arrow: {
                    bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                },
            }),
        },
        Popover: {
            baseStyle: (props: StyleFunctionProps) => ({
                content: {
                    bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                    color: props.colorMode === "dark" ? "text.dark" : "text.light",
                    borderColor: "white",
                    maxWidth: "500px",
                    textAlign: "center",
                    borderWidth: "1px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    fontSize: "sm",
                    padding: "0.6rem",
                    boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
                    _arrow: {
                        bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                    },
                },
            }),
        },
        Menu: {
            baseStyle: (props: StyleFunctionProps) => ({
                list: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                    borderRadius: "10px",
                    overflow: "hidden",
                    paddingTop: "0",
                    paddingBottom: "0",
                },
                item: {
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                    _hover: {
                        bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                    },
                    focus: {
                        bg: props.colorMode === "dark" ? "contentBackgroundHover.dark" : "contentBackgroundHover.light",
                    },
                },
                groupTitle: {
                    textAlign: "left",
                    marginLeft: "0.8rem",
                },
            }),
            variants: {
                DataTableOption: (props: StyleFunctionProps) => ({
                    button: {
                        transition: "none",
                        _hover: {
                            border: "2px solid",
                            borderColor: props.colorMode === "dark" ? "tableBorder.dark" : "tableBorder.light",
                        },
                    },
                }),
                DataTableHeader: (props: StyleFunctionProps) => ({
                    button: {
                        padding: "10px",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        _hover: {
                            bg: props.colorMode === "dark" ? "pageBackgroundHover.dark" : "pageBackgroundHover.light",
                        },
                    },
                }),
            },
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
        contentBackgroundHover: {
            light: "#b2b6ba",
            dark: "#18191d",
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
        blue: "#0da6d8",
        purple: "#b124b1",
        orange: "#d66b13",
    },
})

export default customTheme
