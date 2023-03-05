import React, { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { KeyboardArrowRight } from "@mui/icons-material";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../App";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [titleError, setTitleError] = useState(false);
  const [markdownError, setMarkdownError] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTitleError(false);
    setMarkdownError(false);
    const currentTitle = titleRef.current!.value;
    const currentMarkdown = markdownRef.current!.value;

    if (currentTitle == "") {
      setTitleError(true);
    }
    if (currentMarkdown == "") {
      setMarkdownError(true);
    }

    if (currentTitle && currentMarkdown) {
      onSubmit({
        title: currentTitle,
        markdown: currentMarkdown,
        tags: selectedTags,
      });
      navigate("..");
    }
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Stack direction="column" justifyContent="flex-start" spacing={3}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Title"
              variant="outlined"
              required
              inputRef={titleRef}
              defaultValue={title}
              error={titleError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CreatableReactSelect
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  fontFamily: "Roboto",
                  padding: "9px",
                }),
              }}
              placeholder="Add tags..."
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
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
        <TextField
          label="Body"
          variant="outlined"
          multiline
          rows={15}
          fullWidth
          required
          inputRef={markdownRef}
          defaultValue={markdown}
          error={markdownError}
        />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button component={Link} to={".."} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            endIcon={<KeyboardArrowRight />}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
