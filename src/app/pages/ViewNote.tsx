import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "../components/NoteLayout";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

type ViewNoteProps = {
  onDelete: (id: string) => void;
};

export default function ViewNote({ onDelete }: ViewNoteProps) {
  const note = useNote();
  const navigate = useNavigate();

  return (
    <Stack direction="column" justifyContent="flex-start" spacing={4} mt={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column">
          <Typography variant="h2" mb={2}>
            {note.title}
          </Typography>
          {note.tags.length > 0 && (
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {note.tags.map((tag) => (
                <Chip
                  color="success"
                  variant="outlined"
                  size="small"
                  key={tag.id}
                  label={`${tag.label}`}
                />
              ))}
            </Stack>
          )}
        </Stack>
        <Stack gap={2} direction="row">
          <Button
            component={Link}
            to={`/${note.id}/edit`}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
          <Button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
          <Button component={Link} to={"/"} variant="outlined" color="primary">
            Back
          </Button>
        </Stack>
      </Stack>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
    </Stack>
  );
}
