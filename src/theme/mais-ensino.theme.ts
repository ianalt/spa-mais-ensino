import { createTheme } from "@mui/material/styles";
import Quicksand from "./fonts/Quicksand-Medium.woff";

declare module "@mui/material/styles" {
  interface Theme {}

  interface Palette {
    brandOrange: Palette["primary"];
    brandBlue: Palette["primary"];
    brandGreen: Palette["primary"];
    brandPurple: Palette["primary"];
    brandPink: Palette["primary"];
    brandYellow: Palette["primary"];
    brandGrey: Palette["primary"];
    brandBlack: Palette["primary"];
  }

  interface PaletteOptions {
    brandOrange: PaletteOptions["primary"];
    brandBlue: PaletteOptions["primary"];
    brandGreen: PaletteOptions["primary"];
    brandPurple: PaletteOptions["primary"];
    brandPink: PaletteOptions["primary"];
    brandYellow: PaletteOptions["primary"];
    brandGrey: PaletteOptions["primary"];
    brandBlack: PaletteOptions["primary"];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {}
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF7900",
      darker: "#e86f02",
    },
    secondary: {
      main: "#028BCA",
    },
    action: {
      selected: "#F5F5F5",
      hover: "#FAFAFA",
    },
    brandOrange: {
      main: "#FF7900",
      darker: "#e86f02",
    },
    brandBlue: {
      main: "#4BB4E6",
      darker: "#028BCA",
    },
    brandGreen: {
      main: "#50be87",
      darker: "#3D8E66",
    },
    brandPurple: { main: "#a885d8", darker: "#512da8" },
    brandPink: { main: "#FFB4E6", darker: "#D590BE" },
    brandYellow: { main: "#FFD200", darker: "#CCA700" },
    brandBlack: { main: "#212121" },
    brandGrey: { main: "#8F8F8F" },
  },
  typography: {
    fontFamily: ["Quicksand", "Arial"].join(","),
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFF",
          fontWeight: "bold",
          border: "1px solid #c4c4c4",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          color: "#000",
          fontWeight: 500,
          backgroundColor: "#FFF",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorSecondary: {
          "&$checked": {
            color: "#FF7900",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        colorSecondary: {
          "&$checked": {
            color: "#FF7900",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Quicksand';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: local('Quicksand'), local('Quicksand'), url(${Quicksand}) format('woff');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `,
    },
    MuiDialogActions: {
      styleOverrides: {
        spacing: {
          padding: "4px 24px 12px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: "16px 24px 4px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "#FFF",
          fontWeight: 500,
        },
      },
    },
  },
});
