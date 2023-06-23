import { extendTheme } from "@chakra-ui/react"
import type { StyleFunctionProps } from "@chakra-ui/styled-system"
import { cssVar } from "@chakra-ui/theme-tools"

const customTheme = extendTheme({
    styles: {
        global: (props: StyleFunctionProps) => ({
            // This is a hack to get the tooltip arrow to work with a custom theme
            // It doesn't seem to accept variables, so I've hardcoded the values here
            ".tooltipArrow": {
                "--popper-arrow-shadow-color": "#FFFFFF",
                [cssVar("popper-arrow-bg").variable]: props.colorMode === "dark" ? "#272A2F" : "#EDF2F7",
            },
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
            ".borderChecklistBar": {
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
            },
            ".expandedTableRow": {
                _hover: {
                    bg: props.colorMode === "dark" ? "pageBackground.dark" : "pageBackground.light",
                },
            },
            ".checklistList": {
                _hover: {
                    bg: props.colorMode === "dark" ? "contentBackgroundHover.dark" : "contentBackground.light",
                },
            },
            ".expandContentBox": {
                bg: props.colorMode === "dark" ? "contentBackground.dark" : "contentBackground.light",
                borderColor: props.colorMode === "dark" ? "border.dark" : "border.light",
                borderWidth: "3px",
                padding: "1rem",
                borderRadius: "20px",
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
                // This is a hack to get the tooltip arrow to work with a custom theme
                // and this hides the default arrow theme
                [cssVar("popper-arrow-bg").variable]: "",
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
                    borderWidth: "3px",
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
            dark: "#1f2025",
        },
        border: {
            light: "#D3D3D3",
            dark: "#4b4a4a",
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
