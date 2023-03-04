import React, { useMemo, useState } from "react";
import { Tag } from "../App";
import NoteCard, { SimplifiedNote } from "../components/NoteCard";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ReactSelect from "react-select";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

export default function NoteList({
  availableTags,
  notes,
  onUpdateTag,
  onDeleteTag,
}: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Stack direction="column" justifyContent="flex-start" spacing={4} mt={4}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h2">Notes</Typography>
          <Button
            component={Link}
            to={"/create"}
            variant="contained"
            color="primary"
          >
            Create Note
          </Button>
        </Stack>
        <form>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <ReactSelect
              value={selectedTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              options={availableTags.map((tag) => {
                return { label: tag.label, value: tag.id };
              })}
              onChange={(tags) => {
                setSelectedTags(
                  tags.map((tag) => {
                    return { label: tag.label, id: tag.value };
                  })
                );
              }}
              isMulti
            />
          </Stack>
        </form>
        <Stack direction="row" spacing={3}>
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          ))}
        </Stack>
      </Stack>
    </>
  );
}
