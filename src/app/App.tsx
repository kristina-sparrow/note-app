import React from "react";
import Container from "@mui/material/Container";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Stack from "@mui/material/Stack";

export default function App() {
  return (
    <Container className="page-container" maxWidth="md">
      <Stack className="page" direction="column" justifyContent="space-between">
        <Main />
        <Footer />
      </Stack>
    </Container>
  );
}
