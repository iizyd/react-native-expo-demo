import React from "react";
import { createTheme, ThemeProvider } from "@rneui/themed";
import IndexComponent from "./src/Index";
import "react-native-gesture-handler";

const theme = createTheme({
  lightColors: {},
  darkColors: {},
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <IndexComponent />
    </ThemeProvider>
  );
}
