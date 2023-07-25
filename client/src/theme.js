// color design tokens export
// font-family: 'Inter', sans-serif;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Oswald', sans-serif;
// font-family: 'Piazzolla', serif;
// font-family: 'Poppins', sans-serif;
// font-family: 'Roboto Condensed', sans-serif;
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary1: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
  purple:{
    50: "#F6EBFF",
    100: "#EDD7FF",
    200: "#E4B3FF",
    300: "#DB8FFF",
    400: "#D16BFF",
    500: "#C847FF",
    600: "#BE24FF",
    700: "#A01DE6",
    800: "#8217CC",
    900: "#640DA3",
  },
  primary:{
    50: "#F5EBFF",
    100: "#E8D7FF",
    200: "#DBB3FF",
    300: "#CE8FFF",
    400: "#C16BFF",
    500: "#B447FF",
    600: "#A724FF",
    700: "#9900E6",
    800: "#8700CC",
    900: "#7500B3",
  },
  primary2:{
    50: "#F3F9E9",
  100: "#E6F3D3",
  200: "#D9EDBC",
  300: "#CCF7A6",
  400: "#BFF191",
  500: "#B2EB7B",
  600: "#8FC85F",
  700: "#6CA344",
  800: "#497027",
  900: "#263D0B",
  }

};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[500],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
