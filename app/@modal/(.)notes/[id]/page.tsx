import { fetchNoteById } from "@/lib/api";
import NotePreviewModal from "@/components/NotePreview/NotePreviewModal";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const data = await fetchNoteById(id);

  return <NotePreviewModal data={data}></NotePreviewModal>;
};

export default NotePreview;
