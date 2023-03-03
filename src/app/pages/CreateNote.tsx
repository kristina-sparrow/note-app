import NoteForm from "../components/NoteForm";
import { NoteData, Tag } from "../App";

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
      <h1 className="page-title">New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
