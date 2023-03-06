import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tag } from "../components/Main";
import NoteCard, { SimplifiedNote } from "../components/NoteCard";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ReactSelect from "react-select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
};

type EditTagsModalProps = {
  open: boolean;
  availableTags: Tag[];
  handleClose: () => void;
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
  const [modalOpen, setModalOpen] = useState(false);

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
    <Stack direction="column" justifyContent="flex-start" spacing={4} my={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h2" fontSize="50px">
          Notes
        </Typography>
        <Stack direction="row" gap={2}>
          <Button
            component={Link}
            to={"/create"}
            variant="contained"
            color="primary"
          >
            Create Note
          </Button>
          <Button
            onClick={() => setModalOpen(true)}
            variant="outlined"
            color="primary"
          >
            Edit Tags
          </Button>
        </Stack>
      </Stack>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Filter by title..."
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <ReactSelect
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: "Roboto",
                  padding: "9px",
                }),
              }}
              placeholder="Filter by tags..."
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
          </Grid>
        </Grid>
      </form>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        rowSpacing={3}
      >
        {filteredNotes.map((note) => (
          <Grid item key={note.id} xs={12} sm={5}>
            <NoteCard
              key={note.id}
              id={note.id}
              title={note.title}
              tags={note.tags}
            />
          </Grid>
        ))}
      </Grid>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        availableTags={availableTags}
      />
    </Stack>
  );
}

function EditTagsModal({
  availableTags,
  handleClose,
  open,
  onDeleteTag,
  onUpdateTag,
}: EditTagsModalProps) {
  return (
    <Dialog open={open}>
      <Stack
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
        my={2}
        mx={4}
      >
        <Typography variant="h4">Edit Tags</Typography>
        <IconButton onClick={handleClose} color="primary" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Stack>
      <form>
        <Stack direction="column" gap={1} mt={1} mb={4} mx={4}>
          {availableTags.map((tag) => (
            <Stack
              key={tag.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <TextField
                value={tag.label}
                onChange={(e) => onUpdateTag(tag.id, e.target.value)}
              />
              <IconButton
                onClick={() => onDeleteTag(tag.id)}
                color="primary"
                size="large"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </form>
    </Dialog>
  );
}
