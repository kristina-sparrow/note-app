import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "../App";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

export type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export default function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Card elevation={3}>
      <CardActionArea component={Link} to={`/${id}`} sx={{ height: "100%" }}>
        <CardContent sx={{ height: "100%" }}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            gap={3}
            sx={{ height: "100%" }}
          >
            <Typography
              variant="h4"
              fontWeight={300}
              fontSize="22px"
              textAlign="center"
            >
              {title}
            </Typography>
            {tags.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                {tags.map((tag) => (
                  <Chip
                    color="success"
                    size="small"
                    key={tag.id}
                    label={`${tag.label}`}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
