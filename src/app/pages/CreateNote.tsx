import React from "react";
import NoteForm from "../components/NoteForm";
import { NoteData, Tag } from "../App";
import Typography from "@mui/material/Typography";

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
    <>
      <Typography variant="h2" gutterBottom>
        Create Note
      </Typography>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
