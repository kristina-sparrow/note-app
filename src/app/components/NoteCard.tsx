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
    <Card sx={{ minHeight: 150, maxWidth: 300 }} elevation={4}>
      <CardActionArea component={Link} to={`/${id}`}>
        <CardContent>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            my={3}
          >
            <Typography variant="h4">{title}</Typography>
            {tags.length > 0 && (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                flexWrap="wrap"
                gap={1}
              >
                {tags.map((tag) => (
                  <Chip color="primary" key={tag.id} label={`${tag.label}`} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
