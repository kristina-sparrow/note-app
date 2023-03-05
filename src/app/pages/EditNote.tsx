import React from "react";
import { NoteData, Tag } from "../App";
import { useNote } from "../components/NoteLayout";
import NoteForm from "../components/NoteForm";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function EditNote({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNoteProps) {
  const note = useNote();
  return (
    <Stack direction="column" justifyContent="flex-start" spacing={4} mt={4}>
      <Typography variant="h2" fontSize="50px" gutterBottom>
        Edit Note
      </Typography>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Stack>
  );
}
