import React from "react";
import NoteForm from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type CreateNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function CreateNote({
  onSubmit,
  onAddTag,
  availableTags,
}: CreateNoteProps) {
  return (
    <Stack direction="column" justifyContent="flex-start" spacing={4} mt={4}>
      <Typography variant="h2" gutterBottom>
        Create Note
      </Typography>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Stack>
  );
}
