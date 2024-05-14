import { extendTheme, theme as baseTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand: {
        lavender: "#F4D4FF", // Used for highlighting key interface elements and calls to action
        black: "#000000", // Used for primary text and critical elements
        skyBlue: "#DFF8FB", // Used for background elements to promote a calm and productive environment
        mintGreen: "#CDF9D1", // Used for success states and progress indicators
        peach: "#FAE8B4", // Used for warnings and to draw attention to key information
        // Inverse colors for dark theme
        darkLavender: baseTheme.colors.gray[800],
        darkBlack: baseTheme.colors.whiteAlpha[900],
        darkSkyBlue: baseTheme.colors.gray[700],
        darkMintGreen: baseTheme.colors.green[800],
        darkPeach: baseTheme.colors.orange[700],
      },
    },
    components: {
      Button: {
        baseStyle: {
          fontWeight: "bold",
          _hover: {
            bg: "brand.peach",
            color: "brand.black",
          },
          _dark: {
            bg: "brand.darkPeach",
            color: "brand.darkBlack",
            _hover: {
              bg: "brand.darkBlack",
              color: "brand.darkPeach",
            },
          },
        },
      }
  }
}
  );

export default theme;