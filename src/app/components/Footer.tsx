import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import Stack from "@mui/system/Stack";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      gap={1}
      py={2}
      minHeight="50px"
      className="footer"
    >
      <Typography variant="body2" fontSize={16} fontWeight={300}>
        Built by Kristina Sparrow
      </Typography>
      <a
        href="https://github.com/kristina-sparrow"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-link"
      >
        <GitHubIcon fontSize="small" />
      </a>
    </Stack>
  );
}
